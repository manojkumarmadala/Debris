/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const Assert = require('node-assert'),
  libErr = require('node-service-errors'),
  { Fortune } = require('./fortune');

// TODO: REMOVE. SAMPLE ONLY

const CANNED_FORTUNES = [
  'you will be prosperous',
  'you will achieve enlightenment',
  'you are getting sleepy'
];

/**
 * Simple demo data source that manages fortunes
 * @type {Object}
 */
class FortuneTeller {
  constructor() {
    this._fortunes = new Map();

    CANNED_FORTUNES.forEach(function(txt) {
      const fortune = new Fortune(txt);
      this._fortunes.set(fortune.id, fortune);
    }, this);
  }

  /**
     * Adds a new fortune
     * @param {Object} fortuneData the fortune info
     * @param {string} fortuneData.text The fortune text
     * @param {string} [fortuneData.author] The author of the fortune
     * @param  {Function} callback The callback to invoke with an error
     *     or success if the fortune was added
     */
  add(fortuneData, callback) {
    Assert.isObject(fortuneData, 'fortune');
    Assert.notEmpty(fortuneData.text, 'fortune.text');
    // fortuneData.author MAY be null

    const text = fortuneData.text.toLowerCase();
    if (this._isDupe(text, callback)) {
      return;
    }

    const fortune = new Fortune(text, fortuneData.author);
    this._fortunes.set(fortune.id, fortune);
    callback(undefined, fortune);
  }

  _isDupe(str, callback) {
    for (const fortune of this._fortunes.values()) {
      if (fortune.text === str) {
        callback(new libErr.Conflict(fortune.id));
        return true;
      }
    }

    return false;
  }

  /**
     * Retrieves the fortune with the specified identifier
     * @param  {string} id The fortune identifier
     * @param  {Function} callback The callback to invoke with an error or the fortune if it exists
     */
  get(id, callback) {
    if (!id) {
      callback(new libErr.BadRequest('missing id'));
      return;
    }

    const fortune = this._fortunes.get(id);
    if (!fortune) {
      callback(new libErr.NotFound(id));
      return;
    }

    callback(undefined, fortune);
  }

  /**
     * Updates the fortune with the specified identifier
     * @param  {string} id The fortune identifier
     * @param {Object} fortuneInfo The fortune data
     * @param  {Function} callback The callback to invoke with an error if the fortune didn't exist
     */
  update(id, fortuneInfo, callback) {
    if (!id) {
      callback(new libErr.BadRequest('missing id'));
      return;
    }

    const fortuneRef = this._fortunes.get(id);
    if (!fortuneRef) {
      callback(new libErr.NotFound(id));
      return;
    }

    let text;
    if (fortuneInfo.text) {
      text = fortuneInfo.text.toLowerCase();
      if (this._isDupe(text, callback)) {
        return;
      }
    }

    if (text && fortuneRef.text !== text) {
      fortuneRef.text = text;
    }

    if (fortuneInfo.author !== undefined) {
      fortuneRef.author = fortuneInfo.author;
    }

    callback();
  }

  /**
     * Deletes the fortune with the specified identifier
     * @param  {string} id The fortune identifier
     * @param  {Function} callback The callback to invoke with the error or result
     */
  delete(id, callback) {
    if (!id) {
      callback(new libErr.BadRequest('missing id'));
      return;
    }

    const deleted = this._fortunes.delete(id);
    const err = (deleted ? undefined : new libErr.NotFound(id));
    callback(err);
  }

  /**
     * @return {Fortune} returns a random fortune
     */
  getRandom(callback) {
    // don't do this in production code...
    const ids = Array.from(this._fortunes.keys());
    const randomIndex = Math.floor(Math.random() * 100) % ids.length;
    const randomId = ids[randomIndex];
    callback(undefined, this._fortunes.get(randomId));
  }
}

module.exports = {
  FortuneTeller
};
