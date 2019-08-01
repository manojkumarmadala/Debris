/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const Assert = require('node-assert'),
  libErr = require('node-service-errors'),
  { Fortune } = require('../lib/fortune');

class MockFortuneTeller {
  constructor() {
    this._fortunes = {};
  }

  add(fortuneData, callback) {
    Assert.isObject(fortuneData, 'fortune');
    Assert.notEmpty(fortuneData.text, 'fortune.text');
    const text = fortuneData.text.toLowerCase();
    const fortune = new Fortune(text, fortuneData.author);
    this._fortunes[fortune.id] = fortune;
    callback(undefined, fortune);
  }

  /**
 * Retrieves the fortune with the specified identifier
 * @param  {string} id The fortune identifier
 * @param  {Function} callback The callback to invoke with an error or the fortune if it exists
 */
  get(id, callback) {
    Assert.notEmpty(id, 'id');

    const fortune = this._fortunes[id];
    let err;
    if (!fortune) {
      err = new libErr.NotFound(id);
    }

    callback(err, fortune);
  }

  /**
 * Retrieves the fortune with the specified identifier
 * @param  {string} id The fortune identifier
 * @param  {Object} fortuneData The fortune text
 * @param  {Function} callback The callback to invoke with an error or the fortune if it exists
 */
  update(id, fortuneData, callback) {
    Assert.notEmpty(id, 'id');
    Assert.isObject(fortuneData, 'fortuneData');

    const fortune = this._fortunes[id];
    let err;
    if (!fortune) {
      err = new libErr.NotFound(id);
    } else {
      if (fortuneData.text) {
        fortune.text = fortuneData.text;
      }
      if (fortuneData.author) {
        fortune.author = fortuneData.author;
      }
    }

    callback(err);
  }

  /**
 * Deletes the fortune with the specified identifier
 * @param  {string} id The fortune identifier
 * @param  {Function} callback The callback to invoke with the error or result
 */
  delete(id, callback) {
    Assert.notEmpty(id, 'id');

    const fortune = this._fortunes[id];
    if (fortune) {
      delete this._fortunes[id];
      callback(undefined, {});
      return;
    }

    callback(new libErr.NotFound(id));
  }

  /**
  * @return {Fortune} returns a random fortune
  */
  getRandom(callback) {
    const ids = Object.keys(this._fortunes);
    const randomIndex = Math.floor(Math.random() * 100) % ids.length;
    const randomId = ids[randomIndex];
    callback(undefined, this._fortunes[randomId]);
  }
}

module.exports = {
  FortuneTeller: MockFortuneTeller
};
