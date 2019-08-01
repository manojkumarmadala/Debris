'use strict';

var Promise = require('promise');
var {getAvailabilityDataResponse} = require('../lib/BusinessLogicLayer/Availability');
var {getAvailabilityMonthRange} = require('../lib/utilities/Date');

let getDataForPlatform = async (req, res, next) => {
	let platform = req.query.platform;
	let from = req.query.from;
	let to = req.query.from;
	let monthRange;
    
	if(platform === undefined)
		platform='Chat';
	if(from===undefined||to===undefined)
		monthRange='.*';  

    

	try {
		let data = await getAvailabilityDataResponse(platform, getAvailabilityMonthRange(from, to));
		res.status(200);
		res.format({
			'application/json': function () {
				res.json(data);
			}
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getDataForPlatform
};