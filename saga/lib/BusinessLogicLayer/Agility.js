var Promise = require('promise');
var { getAgilityData } = require('../DataAccessLayer/Agility');

let getAgilityDataResponse = async (teamId, numberOfSprints) => {
	
	let agilityData = await getAgilityData(teamId, numberOfSprints);
	
	let sprintNames = [];
	let predictabilityMetricsData = [];
	let normalizedMetricsData = [];
	let commitedData = [];
	let completedData = [];
	for (let i = agilityData[0].hits.hits.length - 1; i >= 0; i--) {
		let hit = agilityData[0].hits.hits[i];
		let predictabilityPercentage = ((hit._source.SprintVelocity * 100) / hit._source.PlannedStoryPoints)
			.toFixed(0);
		let color = getColor(predictabilityPercentage);
		normalizedMetricsData.push(parseFloat(hit._source.NormalizedVelocity));
		predictabilityMetricsData.push([parseFloat(predictabilityPercentage), color]);
		sprintNames.push(hit._source.SprintName);
		commitedData.push(parseFloat(hit._source.PlannedStoryPoints));
		completedData.push(parseFloat(hit._source.SprintVelocity));
	}

	return {'teamName':agilityData[0].teamName,
		'teamId': agilityData[0].teamId,
		'sprintNames':sprintNames,
		'predictabilityData': predictabilityMetricsData,
		'normalizedData': normalizedMetricsData,
		'commitedData':commitedData,
		'completedData':completedData};
};

function getColor (predictabilityPercentage)  {
	if (predictabilityPercentage < 80 || predictabilityPercentage > 110) {
		return '#E57373';
	} else
		return '#82C77E';
}

module.exports = {
	getAgilityDataResponse
};