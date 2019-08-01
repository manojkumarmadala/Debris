'use strict';

var {getIncidents}=require('../lib/BusinessLogicLayer/Incidents');
var {getIncidentsByTrend } = require('../lib/BusinessLogicLayer/IncidentsByTrend');
var {getIncidentsByTimeframe } = require('../lib/BusinessLogicLayer/IncidentsDrilldown');
var {getShortDateString, addMonths, monthDiff} = require('../lib/utilities/Date');

let getIncidentsData = async (req, res, next) => {
	
	try{
		
		let product = Array.isArray(req.query.product) ? req.query.product : req.query.product.split(',');
		let environment = req.query.environment;
		let from = req.query.from;
		let to = req.query.to;
		let reportedBy = req.query.reportedBy;
		let severity = req.query.severity;
		let trend=req.query.trend;
		let timeframe = req.query.timeframe;
		let todaysDate = new Date();

		if(product === undefined)
			product = ['24/7 Chat'];
		if(environment === undefined)
			environment = 'Production';
		if(from === undefined || to === undefined){
			let toDate = addMonths(todaysDate, -6);
			from = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
			from=getShortDateString(from);
			to = new Date();
			to=getShortDateString(to);
		}
		if(reportedBy === undefined){
			reportedBy = 'Client Internal';
		}
		if(severity===undefined){
			severity = 'S[1-2]';
		}
		let size = monthDiff(from, to);

		if((!(trend===undefined)) &&(!(timeframe===undefined))) 
		{
		let data = await getIncidentsByTimeframe(product,trend,timeframe);
		res.status(200);
		res.format({
			'application/json': function () {
				res.json(data);
			}
		});
		}
		else if((!(trend===undefined))&&(timeframe===undefined)){
			let data = await getIncidentsByTrend(product, trend);
			res.status(200);
			res.format({
				'application/json': function () {
					res.json(data);
				}
			});
		}
		else{
			
			let data = await getIncidents(severity, reportedBy, from, to, environment, product, size);
			res.status(200);
			res.format({
				'application/json': function () {
					res.json(data);
				}
			});
		}
	
	}
	catch(error){
		next(error);
	}
};

module.exports ={
	getIncidentsData
};