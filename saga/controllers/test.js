/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

// const Assert = require('node-assert'),
//   webLinks = require('node-weblinks'),
const libUtil = require('../lib/util');
var fs = require('fs'); 
var csv = require('fast-csv');

/**
  * Retrieves a random fortune
  * @param  {Object}   req  The HTTP request
  * @param  {Object}   res  The HTTP response
  * @param  {Function} next The next express middleware function
  */
module.exports.post = function(req, res, next) {
	// const params = req.swagger.params;
	// const appLocals = req.app.locals;
	// const teller = appLocals.fortuneTeller;
	const logger = req.logger;

	let csv_string = req.files.samplefile[0].buffer.toString('utf-8');
	var values=[];
	csv
		.fromString(csv_string, {headers: true})
		.on('data', function(data){
			values.push(data);
			console.log(data);
		})
		.on('end', function(){
			res.status(200);
			res.format({
				'application/json': function() {
					res.json(values);
				}
			});
			console.log('done');
		});
	logger.debug('test begin');
};

module.exports.get = function(req, res, next) {
	// const params = req.swagger.params;
	// const appLocals = req.app.locals;
	// const teller = appLocals.fortuneTeller;
	// const logger = req.logger;
	const test = {
		name: 'shivam',
		age: 25,
		org: '[24]7.ai'
	};
	res.status(200);
	res.format({
		// JSON MUST be first: it is the default format
		'application/json': function() {
			res.json(test);
		}
	});
};
