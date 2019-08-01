/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const assert = require('assert'),
  request = require('supertest'),
  fs = require('fs'),
  TestUtil = require('./test-util'),
  makeAndStartServer = TestUtil.makeAndStartServer;

describe('server', () => {
  before(() => {
    fs.writeFileSync(TestUtil.getHeartbeatPath(), 'OK');
  });

  it('should start and stop the server', (done) => {
    makeAndStartServer((server, httpServer) => {
      assert(server, 'server');
      assert(httpServer, 'httpServer');
      server.close('die');
      done();
    });
  });

  it('should close gracefully if config does not log requests', (done) => {
    const rawConfig = TestUtil.getRawConfig();
    assert(rawConfig['request-log']['output-dir']);
    delete rawConfig['request-log']['output-dir'];
    makeAndStartServer((server) => {
      assert(server, 'server');
      server.close('die');
      done();
    });
  });

  it('should GET /v1/health', (done) => {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .get('/v1/health')
        .expect(200)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, 'text/plain');
          assert.equal(res.text, 'OK');
          server.close('die');
          done();
        });
    });
  });

  it('should return a 404 for an invalid route', (done) => {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .get('/v1/foobar')
        .expect(404)
        .end((err, res) => {
          assert(!err, err);
          server.close('die');
          done();
        });
    });
  });
});
