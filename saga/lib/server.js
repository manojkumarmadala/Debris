/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const Assert = require('node-assert'),
  cors = require('cors'),
  libPath = require('path'),
  { BaseObject } = require('node-baseobject'),
  express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  libCorr = require('node-service-correlators'),
  swaggerTools = require('swagger-tools-wrapper'),
  { RequestLogger } = require('node-requestlogger'),
  { SessionLogger } = require('node-sessionlogger'),
  Constants = require('./constants'),
  libUtil = require('./util'),
  swaggerDoc = require('../api/swagger.json');

const LISTEN_PORT_CONFIG_KEY = 'listen.port';
const KEEPALIVE_TIMEOUT_CONFIG_KEY = 'listen.keepAliveTimeout';
const REQUEST_LOG_CONFIG_KEY = 'request-log.output-dir';
const REQUEST_LOG_FLUSHINTERVAL_CONFIG_KEY = 'request-log.flushinterval';
const HEARTBEAT_PATH_CONFIG_KEY = 'health.heartbeat-path';

/**
 * The server
 * @class
 * @param {object} opts Options for creating the server
 * @memberof module:server
 */
class Server extends BaseObject {
  constructor(opts) {
    Assert.isObject(opts, 'opts');
    Assert.isObject(opts.config, 'opts.config');
    Assert.isObject(opts.logmgr, 'opts.logmgr');
    Assert.isObject(opts.fortuneTeller, 'opts.fortuneTeller');

    super(opts.logmgr, 'SRVR');

    this._config = opts.config;
    this._logmgr = opts.logmgr;

    this.listenPort = Number(process.env.LISTEN_PORT || this._config.get(LISTEN_PORT_CONFIG_KEY));
    Assert.isNumber(this.listenPort, LISTEN_PORT_CONFIG_KEY);

    this.keepAliveTimeout = this._config.get(KEEPALIVE_TIMEOUT_CONFIG_KEY);
    if (this.keepAliveTimeout !== undefined) {
      Assert.isNumberInclusive(this.keepAliveTimeout, KEEPALIVE_TIMEOUT_CONFIG_KEY, 0);
    }

    this._version = libUtil.readVersion();

    this._heartbeatPath = this._config.get(HEARTBEAT_PATH_CONFIG_KEY);
    Assert.notEmpty(this._heartbeatPath, HEARTBEAT_PATH_CONFIG_KEY);
    this.info('health check', {path: this._heartbeatPath});

    this._server = undefined;
    this.app = express();

    // alive means service has started running and hasn't been closed yet
    this._alive = undefined;

    // TODO: REMOVE. SAMPLE ONLY
    this.app.locals.fortuneTeller = opts.fortuneTeller;
    this.app.locals.logger = this;

    this.app.disable(Constants.X_POWERED_BY);

    // OMNI-418: typical dynamic servers won't 304 an I-N-M
    // if your service can validate an I-N-M, remove this
    this.app.set('etag', false);

    this._configureMiddlewareAndRoutes();
  }

  /**
   * Starts the server's HTTP listener(s)
  */
  run() {
    this._alive = true;
    this._server = this.app.listen(this.listenPort, () => {
      this.info('listening', {
        port: this._server.address().port,
        version: this._version,
        env: this.app.get('env'),
        keepAliveTimeout: this._server.keepAliveTimeout
      });

      this.emit('listening', {httpServer: this._server});
    });

    if (this.keepAliveTimeout !== undefined) {
      this._server.keepAliveTimeout = this.keepAliveTimeout;
    }

    this._server.once('close', () => {
      this.emit('close');
    });
  }

  isAlive() {
    return this._alive;
  }

  _configureMiddlewareAndRoutes() {
    const app = this.app;

    this._setupRequestLogger();

    // allow the world to use this service
    app.use(cors());

    // generate session id
    app.use(libCorr.addTransactionId);
    app.use(bodyParser.urlencoded({extended: false}));
    // TODO: only install this if your real API consumes json
    app.use(bodyParser.json());

    // log cross-service correlators
    app.use(libCorr.log.bind(this));

    /*
     * Install a per-request logger that injects current transaction/session id
     * into the metadata of each log event
     */
    app.use((req, res, next) => {
      req.logger = new SessionLogger({logmgr: this._logmgr, request: req, logregion: 'FORTUNE'});
      next();
    });
    
    app.use((req, res, next) => {
     // for(let i=0;i<2;i++)
     //   console.log("we can use auth middleware here");
      next();
    });

    
    app.use('/v1/health', (req, res, next) => {
      fs.stat(this._heartbeatPath, (err, stats) => {
        libUtil.makeNonCacheable(res).set(Constants.X_SERVICE_VERSION_HEADER, this._version);
        if (err) {
          res.status(404).end();
        } else {
          res.set('Content-Type', 'text/plain').end('OK');
        }
      });
    });

    app.post('*',
      // swagger forces us to pick one of formData or query
      // allow query params to override the body
      // this facilitates convenient linking behavior
      (req, res, next) => {
        const qlen = Object.keys(req.query);
        if (qlen.length === 0) {
          next();
          return;
        }

        let doMerge = false;
        const ctype = libUtil.getBareContentType(req);
        if (!ctype) {
          req.headers['content-type'] = Constants.MIME_APP_URLENCODED;
          doMerge = true;
        } else if (ctype === Constants.MIME_APP_URLENCODED) {
          doMerge = true;
        }

        if (doMerge) {
          Object.assign(req.body, req.query);
        }

        next();
      });

    this._setupSwagger();
  }

  /**
   * Terminates the server
   * @param  {string} [reason] The reason for termination
   */
  close(reason) {
    if (!this._alive) {
      /* eslint-disable no-console */
      console.log('The process might still be alive due to open TCP connections. Committing suicide...');
      /* eslint-enable no-console */
      process.exit(1);
    }

    this.info(`Shutting down due to ${reason}...`);
    this._alive = false;
    if (this._requestLogger) {
      this._server.once('close', this._shutdownRequestLogger.bind(this));
    }
    this._server.close();
  }

  /* eslint-disable class-methods-use-this */
  toString() {
    return '';
  }
  /* eslint-enable class-methods-use-this */

  _setupRequestLogger() {
    let logDir = this._config.get(REQUEST_LOG_CONFIG_KEY);
    if (!logDir) {
      this.info(`request logs are not enabled. Missing ${REQUEST_LOG_CONFIG_KEY}`);
      return;
    }

    logDir = libPath.resolve(logDir);

    const flushInterval = this._config.get(REQUEST_LOG_FLUSHINTERVAL_CONFIG_KEY);

    this._requestLogger = new RequestLogger({
      basePath: logDir,
      serviceName: Constants.SERVICE_NAME,
      logger: this,
      flushInterval
    });

    this.app.use(this._requestLogger.getMiddleware());

    this._reopenRequestLogger = () => {
      this._requestLogger.reopen();
    };
    process.on('SIGUSR2', this._reopenRequestLogger);
  }

  _shutdownRequestLogger() {
    this._requestLogger.close();
    process.removeListener('SIGUSR2', this._reopenRequestLogger);
  }

  _setupSwagger() {
    const app = this.app;

    swaggerTools.initializeMiddleware(app,
      swaggerDoc,
      `${__dirname}/../controllers`,
      () => {
        app.use(handleErrors.bind(this));
      },
      {
        trimOptions: {maxDepth: 2}
      });
  }
}

// last resort error handler
function handleErrors(err, req, res, next) {
  const logger = req.logger || this;

  let publicError = false;
  let code = res.statusCode;
  if (!code || code === 200) {
    code = err.code || err.status || err.statusCode || 500;
  }

  // avoid core node RangeError exception
  if (code > 999) {
    code = 500;
  }

  res.status(code);

  const logAttrs = {
    url: req.url,
    code,
    method: req.method
  };

  if (code >= 500) {
    logAttrs.stack = err.stack;
    logger.error(err.message, logAttrs);
  } else {
    // body-parser detail, if any is in err.type
    logAttrs.detail = swaggerTools.getValidationErrorDetail(err) || err.type;
    publicError = true;
    logger.info(err.message, logAttrs);
  }

  if (!publicError) {
    res.end();
    return;
  }

  res.format({
    'application/json': function() {
      const error = {
        code,
        reason: err.message
      };

      res.json(error);
    },
    default() {
      res.send(err.message);
    }
  });
}

/**
 * The server module
 * @module server
 */
module.exports = {
  Server
};
