var data = require('../../config/pillars.json');
var esClient = require('../elasticsearch/elasticsearch-client');

let getAgilityData = async (teamId, numberOfSprints) => {
	if(numberOfSprints === undefined){
		numberOfSprints = 10;
	}

	let team = getTeam(teamId);
	let graph = new Array();
	
	
	for(let i=0; i<team.boards.length;i++){
	 
		graph.push({});
		graph.push({'_source':['SprintName','NormalizedVelocity','SprintVelocity','PlannedStoryPoints','BoardName','NoOfPersonWeeks'],
			'query' : { 'bool' : { 'must' : [ {'match': { 'BoardName' : team.boards[i].regexForBoard }},
				team.boards[i].regexForSprints]
				}
				},
			'size' :numberOfSprints, 'sort' : [ { 'SprintCompleteDate' : { 'order' : 'desc' } } ]    });
	}


	
    
	let data = await esClient.msearch({
		index: 'normalized',
		body: graph
	});




	let agility_map = [];
	for(var i=0;i<data.responses.length;i++){
		data.responses[i].teamName = team.name;
		data.responses[i].teamId = teamId;
		agility_map.push(data.responses[i]);
	}

	return agility_map;

};

let getTeam = teamId => {
	let team=undefined;
	for(let i=0; i<data.pillars.length;i++)
	{
		team = data.pillars[i].teams.find(team => team.id == teamId);
		if(team!== undefined)
			break;
	}
//	console.log(team);
	return team;
};
module.exports = {
	getAgilityData
};