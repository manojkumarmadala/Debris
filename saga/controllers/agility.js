'use strict';

var Promise = require('promise');
var { getAgilityDataResponse } = require('../lib/BusinessLogicLayer/Agility');

let getDataForTeam = async (req, res, next) => {
	const teamId = req.query.teamId;
	const numberOfRecords = req.query.numberOfRecords;

	try{
		let data = await getAgilityDataResponse(teamId, numberOfRecords);
		res.status(200);
		res.format({
			'application/json': function() {
				res.json(data);
			}
		});
	}
	catch(error){
		next(error);
	}
};

module.exports ={
	getDataForTeam
};