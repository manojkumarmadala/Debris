/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const uuid = require('uuid');

// TODO: REMOVE. SAMPLE ONLY

class Fortune {
  constructor(text, author = null) {
    this.id = uuid();
    this.text = text;
    this.author = author;
  }
}

module.exports = {
  Fortune
};
