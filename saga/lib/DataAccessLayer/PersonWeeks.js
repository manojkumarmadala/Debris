var esClient = require('../elasticsearch/elasticsearch-client');

let getBoardsByPillar = async (pillar) => {
    let query = getBoardsByPillarQuery(pillar);

    let data = await esClient.search(query);
    return data;
};

let getBoardsByPillarQuery = (pillar) => {
    let query = {
        index: 'normalized',
        type: 'velocity',
        body: {
            'size': '0',
            "sort": [{
                "SprintCompleteDate": {
                    "order": "desc"
                }
            }],
            'query': {
               "bool": {
                   "must": [ {
                           "match": {
                               "PillarName": pillar

                           }
                       }] 
                    }
            },
            'aggs': {
                'boards': {
                    'terms': {
                        'field': 'BoardName.keyword',
                        'size': 50
                    },
                    "aggs": {
                        "sprints": {
                            "terms": {
                                "field": "SprintName.keyword",
                                "size": 15,
                                "order":{"sorted":"desc"}
                            },
                            
                            "aggs":{
                                "sorted": {
                                     "max": {
                                         "field": "SprintCompleteDate"
                                     }
                            },
                            "velocity": {
                                "terms": {
                                    "field": "SprintVelocity"
                                }
                            }
                            }
                        },

                    }        
                }
            }
        }
    };
    return query;
};

let postPersonWeeksQuery=(personWeeks,normalisedVelocity,sprintName)=>{
    let id = sprintName.replace(new RegExp("\\s", 'g'), "_");
    let query = {
        index: 'normalized',
        type: 'velocity',
        id: id,
        body: {
            "doc": {
                "NoOfPersonWeeks": personWeeks,
                "NormalizedVelocity": normalisedVelocity
            }
        }
    };
    return query;
}

let postPersonWeeks=async(personWeeks,normalisedVelocity,sprintName)=>{
     let query = postPersonWeeksQuery(personWeeks,normalisedVelocity,sprintName);
     let data = await esClient.update(query);
     return data;

}
module.exports = {
    getBoardsByPillar,
    postPersonWeeks
};