/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
'use strict';

const Assert = require('node-assert'),
	webLinks = require('node-weblinks'),
	libUtil = require('../lib/util');

/**
 * Retrieves a random fortune
 * @param  {Object}   req  The HTTP request
 * @param  {Object}   res  The HTTP response
 * @param  {Function} next The next express middleware function
 */
module.exports.getRandomFortune = function(req, res, next) {
	const params = req.swagger.params;
	const appLocals = req.app.locals;
	const teller = appLocals.fortuneTeller;
	const logger = req.logger;

	logger.debug('getrandom.begin');

	teller.getRandom((err, fortune) => {
		if (err) {
			logger.info('getrandom.error', {error: err.message});
			next(err);
			return;
		}

		let text = fortune.text;
		if (params.suffix.value) {
			text += (` ${params.suffix.value}`);
		}

		const obj = {
			text,
			id: fortune.id,
			link: webLinks.getResourceLink(req, {resourceId: fortune.id})
		};

		res.format({
			// JSON MUST be first: it is the default format
			'application/json': function() {
				res.json(obj);
			},
			'application/xml': function() {
				libUtil.streamXMLResponse(res, 'fortunes', obj);
			}
		});

		logger.debug('getrandom.end', {id: fortune.id});
	});
};

module.exports.getFortuneById = function(req, res, next) {
	const params = req.swagger.params;
	const appLocals = req.app.locals;
	const teller = appLocals.fortuneTeller;

	const fortuneId = params.fortuneId.value;
	teller.get(fortuneId, (err, fortune) => {
		if (err) {
			next(err);
			return;
		}

		res.format({
			// JSON MUST be first: it is the default format
			'application/json': function() {
				res.json(fortune);
			},
			'application/xml': function() {
				libUtil.streamXMLResponse(res, 'fortune', fortune);
			}
		});
	});
};

module.exports.makeFortune = function(req, res, next) {
	const params = req.swagger.params;
	const appLocals = req.app.locals;
	const teller = appLocals.fortuneTeller;

	const text = params.text.value;
	// node-swagger-trimstringparams ensures text is non-empty
	Assert.notEmpty(text, 'text');

	teller.add({text, author: params.author.value},
		(err, fortune) => {
			if (err) {
				next(err);
				return;
			}

			const obj = {link: webLinks.getResourceLink(req, {resourceId: fortune.id})};
			res.status(201);
			res.format({
				// JSON MUST be first: it is the default format
				'application/json': function() {
					res.json(obj);
				},
				'application/xml': function() {
					libUtil.streamXMLResponse(res, 'fortune', obj);
				}
			});
		});
};

module.exports.updateFortuneById = function(req, res, next) {
	const params = req.swagger.params;
	const teller = req.app.locals.fortuneTeller;
	const fortuneId = params.fortuneId.value;
	const fortuneInfo = params.data.value;

	teller.update(fortuneId, fortuneInfo, (err, result) => {
		if (err) {
			next(err);
			return;
		}

		res.status(204).end();
	});
};

module.exports.deleteFortuneById = function(req, res, next) {
	const params = req.swagger.params;
	const appLocals = req.app.locals;
	const teller = appLocals.fortuneTeller;

	const fortuneId = params.fortuneId.value;
	teller.delete(fortuneId, (err, result) => {
		if (err) {
			next(err);
			return;
		}

		res.status(204).end();
	});
};
