/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const assert = require('assert'),
  Assert = require('node-assert'),
  request = require('supertest'),
  libUrl = require('url'),
  Constants = require('../lib/constants'),
  TestUtil = require('./test-util'),
  makeAndStartServer = TestUtil.makeAndStartServer;

describe('fortunes', function() {
  it('should makeFortune', function(done) {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .post('/v1/fortunes')
        .set('Content-Type', Constants.MIME_APP_URLENCODED)
        .send({
          text: 'you might get lucky'
        })
        .expect(201)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, Constants.MIME_APP_JSON);
          assert(res.body.link);
          server.close('die');
          done();
        });
    });
  });

  it('should makeFortune and getFortuneById', function(done) {
    const TEXT = 'you might get lucky';

    function getFortuneById(fortuneLink, server, httpServer) {
      const parsedLink = libUrl.parse(fortuneLink);
      Assert.notEmpty(parsedLink.hostname);

      request(httpServer)
        .get(parsedLink.pathname)
        .expect(200)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, Constants.MIME_APP_JSON);
          assert.equal(res.body.text, TEXT);
          server.close('die');
          done();
        });
    }

    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .post('/v1/fortunes')
        .set('Content-Type', Constants.MIME_APP_URLENCODED)
        .send({
          text: TEXT
        })
        .expect(201)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, Constants.MIME_APP_JSON);
          assert(res.body.link);
          getFortuneById(res.body.link, server, httpServer);
        });
    });
  });

  it('should makeFortune and deleteFortuneById', function(done) {
    const TEXT = 'you might get unlucky';

    function deleteFortuneById(fortuneLink, server, httpServer) {
      const parsedLink = libUrl.parse(fortuneLink);
      Assert.notEmpty(parsedLink.hostname);

      request(httpServer)
        .delete(parsedLink.pathname)
        .expect(204)
        .end((err, res) => {
          assert(!err, err);
          server.close('die');
          done();
        });
    }

    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .post('/v1/fortunes')
        .set('Content-Type', Constants.MIME_APP_URLENCODED)
        .send({
          text: TEXT
        })
        .expect(201)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, Constants.MIME_APP_JSON);
          assert(res.body.link);
          deleteFortuneById(res.body.link, server, httpServer);
        });
    });
  });

  it('should makeFortune and updateFortuneById', function(done) {
    const TEXT = 'you might get lucky';
    const UPDATED_TEXT = 'you might get replaced';

    function updateFortuneById(fortuneLink, server, httpServer) {
      const parsedLink = libUrl.parse(fortuneLink);
      Assert.notEmpty(parsedLink.hostname);

      request(httpServer)
        .patch(parsedLink.pathname)
        .set('Content-Type', Constants.MIME_APP_JSON)
        .send({
          text: UPDATED_TEXT
        })
        .expect(204)
        .end((err, res) => {
          assert(!err, err);
          server.close('die');
          done();
        });
    }

    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .post('/v1/fortunes')
        .set('Content-Type', Constants.MIME_APP_URLENCODED)
        .send({
          text: TEXT
        })
        .expect(201)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, Constants.MIME_APP_JSON);
          assert(res.body.link);
          updateFortuneById(res.body.link, server, httpServer);
        });
    });
  });

  it('should return 415 for an unsupported request media type', function(done) {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .post('/v1/fortunes')
        .set('Content-Type', Constants.MIME_APP_JSON)
        .send({
          text: 'you might get lucky'
        })
        .expect(415)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.type, Constants.MIME_APP_JSON);
          server.close('die');
          done();
        });
    });
  });

  it('should return 406 for an unsupported accept type', function(done) {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .post('/v1/fortunes')
        .set('Content-Type', Constants.MIME_APP_URLENCODED)
        .set('Accept', Constants.MIME_APP_URLENCODED)
        .send({
          text: 'you might get lucky'
        })
        .expect(406)
        .end((err, res) => {
          assert(!err, err);
          server.close('die');
          done();
        });
    });
  });

  it('should return a 405 for an unsupported operation', function(done) {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .delete('/v1/fortunes')
        .expect(405)
        .end((err, res) => {
          assert.equal(res.headers.allow, 'GET, POST');
          assert(!err, err);
          server.close('die');
          done();
        });
    });
  });

  it('should return a 400 for an invalid JSON payload', function(done) {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .patch('/v1/fortunes/7469b565-b999-468d-ad90-004d0bb179cf')
        .set('Content-Type', Constants.MIME_APP_JSON)
        .send('{"text": "yoda", "author }')
        .expect(400)
        .end((err, res) => {
          assert(!err, err);
          assert.equal(res.body.code, 400);
          // unexpected end of json input
          assert(/json/i.test(res.body.reason));
          server.close('die');
          done();
        });
    });
  });

  // the service log should also contain "detail":"Missing required property: text"
  it('should return a 400 when updateFortuneById is missing text', function(done) {
    makeAndStartServer((server, httpServer) => {
      request(httpServer)
        .patch('/v1/fortunes/7469b565-b999-468d-ad90-004d0bb179cf')
        .set('Content-Type', Constants.MIME_APP_JSON)
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(`ERROR: ${err.message}`);
          }

          assert(!err, err);
          assert.equal(res.body.code, 400);
          assert(/validation failed/i.test(res.body.reason));
          server.close('die');
          done();
        });
    });
  });
});
