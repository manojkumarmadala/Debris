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
var Promise = require('promise');

var revenueData=require('../lib/DataAccessLayer/Revenue');
var revenueBody = require('../lib/BusinessLogicLayer/Revenue');


/**
 * Retrieves a random fortune
 * @param  {Object}   req  The HTTP request
 * @param  {Object}   res  The HTTP response
 * @param  {Function} next The next express middleware function
 */
  
module.exports.postRevenue = function (req, res, next) {
	const logger = req.logger;
	let csv_string = req.files.file[0].buffer.toString('utf-8');
	var values = [];
	csv
		.fromString(csv_string, {
			headers: true
		})
		.on('data', function (data) {
			values.push(data);
		})
		.on('end', function () {
			var promise = revenueBody.getBody(values);
			
			promise.then((result) => {
				res.status(200);
				res.format({
					'application/json': function () {
						res.json(result);
					}
				});
			}).catch((err) => {
				res.status(400);
				res.format({
					'application/json': function () {
						res.json(err);
					}
				});
			});
					
				
		});

	logger.debug('test begin');
};
module.exports.getRevenue = function (req, res, next) {
	// const params = req.swagger.params;
	// const appLocals = req.app.locals;
	// const teller = appLocals.fortuneTeller;
	// const logger = req.logger;
	//console.log(req);
	var Year = req.query.Year;
	var Month = req.query.Month;
	var promise = revenueData.getRevenueData(Month, Year);
	promise.then((result) => {
		res.status(200);
		res.format({
			'application/json': function () {
				res.json(result);
			}
		});
	}).catch((err) => {
		res.status(400);
		res.format({
			'application/json': function () {
				res.json(err);
			}
		});
	});

	
   
	
};
