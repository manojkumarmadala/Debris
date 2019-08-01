
'use strict';

var {getBoardsByPillarResponse} = require('../lib/BusinessLogicLayer/PersonWeeks');
var {postPersonWeeksResponse} = require('../lib/BusinessLogicLayer/PersonWeeks');
module.exports.getData = async (req, res, next) =>{
   try
   {
	    let pillar =  req.query.pillar;
		if(pillar === undefined){
            pillar = 'Assisted and Central Services';
        }
		let data = await getBoardsByPillarResponse(pillar);
		res.status(200);
		res.format({
			'application/json': function () {
				res.json(data);
			}
		});
	}
	catch(error){
		next(error);
	}
};

module.exports.postData = async (req, res, next) => {
try {
	//console.log(req.swagger.params.user.originalValue);
	let personWeeks = req.swagger.params.user.originalValue.NoOfPersonWeeks;
	let normalisedVelocity = req.swagger.params.user.originalValue.NormalizedVelocity;
	let sprintName = req.swagger.params.user.originalValue.SprintName;
	let data=await postPersonWeeksResponse(personWeeks,normalisedVelocity,sprintName);
	res.status(200);
	res.format({
		'application/json': function () {
			res.json(data);
		}
	});
} 
catch (error) {
	next(error);
}
};