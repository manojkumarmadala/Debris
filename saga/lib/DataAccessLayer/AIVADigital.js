var config = require('../config');
var axios = require('axios');
var libUtil = require('../utilities/Date');
var esClient = require('../elasticsearch/elasticsearch-client');

let getFunnelMetricsByClient = async (from, to) => {

    let response = await esClient.search(getRequestQuery(from, to));
    return response;
}

function getRequestQuery(from, to) {
    return ({
        index: 'aiva',
        type: 'funnelMetrics',
        body: {
            "size": 1000,
            "query": { 
                "bool": { 
                  "must_not": [       
                    { "match": {
                    "clientId":	{"query":"All"}	
                    }}
                 ],
                    "filter" : [ {
                        "range" : {
                            "metrics_date" : {
                                "gte" : "2018-10-01",
                                "lte" : "2018-10-31",
                                "format" : "yyyy-MM-dd"
                            }
                        }
                    } ]
                }
              },
              "aggs" : {
                        "langs_client" : {
                "terms" : 
                { 
                "field" : "clientId.keyword",
                "order" : { "_term" : "asc" },
                "size" : 500 
                },
                        
                    
              "aggs" : {
                    "visits" : { "sum" : { "field" :  "visits"}},			
                    "aivaSessionsStarted" : { "sum" : { "field" :  "aivaSessionsStarted"}	},
                    "engagedCustomerSessions" : { "sum" : { "field" :  "engagedCustomerSessions"}	},
                    "chatInvites" : { "sum" : { "field" :  "chatInvites"}	},
                    "chatEscalations" : { "sum" : { "field" :  "chatEscalations"}	}
                    
                }
                        }
                }
        }
    });
}

module.exports = {
    getFunnelMetricsByClient
};