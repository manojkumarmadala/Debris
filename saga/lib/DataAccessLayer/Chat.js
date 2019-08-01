var config = require('../config');
var axios = require('axios');
var libUtil = require('../utilities/Date');
var client = require('../elasticsearch/elasticsearch-client');

let getAllFunnelMetrics = async () => {    
    let response = await client.search(getRequestQuery(1,'',''));
    return response;    
}

let getMetricsByClient = async (from, to) => {
    let response = await client.search(getRequestQuery(2, from, to));
    return response;    
}    

let getMetricsByFilter = async (from, to) => {
    let response = client.search(getRequestQuery(3, from, to));
    return response;    
}

function getRequestQuery(flag, from, to) {
    if(flag == 1){
        var currentDate = new Date();
        var dateId = currentDate.getFullYear()+"-"+currentDate.getMonth()+"-"+currentDate.getDate();
        return ({
            index: 'chat',
            type: 'funnelMetrics',
            body: {
                'size': 1000,
                'query': {
                    "match":{
                        "_id":  "All2018-10-17"
                    }                    
                }
            }
        });
    }
    else if(flag == 2) {
        return ({
            index: 'chat',
            type: 'funnelMetrics',
            body: {
                'size': 1000,
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
                                    "lte" : "2018-10-30",
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
                    "field" : "clientAccountName.keyword",
                    "order" : { "_term" : "asc" },
                    "size" : 500 
                    },    
                  "aggs" : {
                        "MtPEUVisitor" : { "sum" : { "field" :  "MtPEUVisitor"}},			
                        "MtHLUVisitor" : { "sum" : { "field" :  "MtHLUVisitor"}	},
                        "MtEUInvitesOfferedVisitor" : { "sum" : { "field" :  "MtEUInvitesOfferedVisitor"}	},
                        "MtEngAcceptedVisitor" : { "sum" : { "field" :  "MtEngAcceptedVisitor"}	},
                        "MtChatStarted" : { "sum" : { "field" :  "MtChatStarted"}	},
                        "MtInteractedChat" : { "sum" : { "field" :  "MtInteractedChat"}	},
                        "MtInsessionConversion" : { "sum" : { "field" :  "MtInsessionConversion"}	},
                        "MtCrossSessionConversion" : { "sum" : { "field" :  "MtCrossSessionConversion"}	},
                        "MtEUInvitesOfferedVisit" : { "sum" : { "field" :  "MtEUInvitesOfferedVisit"}	},
                        "MtEngAcceptedVisit" : { "sum" : { "field" :  "MtEngAcceptedVisit"}	},
                        "MtPETotalEvent" : { "sum" : { "field" :  "MtPETotalEvent"}	},
                        "MtHLTotalEvent" : { "sum" : { "field" :  "MtHLTotalEvent"}	},
                        "MtEngAcceptedEvent" : { "sum" : { "field" :  "MtEngAcceptedEvent"}	},
                        "MtEngageConcurrencyWithoutWrap" : { "sum" : { "field" :  "MtEngageConcurrencyWithoutWrap"}	},
                        "MtAvgNoChatsPerHour" : { "sum" : { "field" :  "MtAvgNoChatsPerHour"}	},
                        "MtAvgHandleTime" : { "sum" : { "field" :  "MtAvgHandleTime"}	},
                        "MtAvgWrapUpTime" : { "sum" : { "field" :  "MtAvgWrapUpTime"}	},
                        "MtTotalConversion" : { "sum" : { "field" :  "MtTotalConversion"}	},
                        "MtTotalValueInSessionConversion" : { "sum" : { "field" :  "MtTotalValueInSessionConversion"}	},
                        "MtNumberCrossSessionConversion" : { "sum" : { "field" :  "MtNumberCrossSessionConversion"}	},
                        "MtTotalValueCrossSessionConversion" : { "sum" : { "field" :  "MtTotalValueCrossSessionConversion"}	},
                        "MtAOV" : { "sum" : { "field" :  "MtAOV"}	},
                        "MtNumberSelfServiceConversion" : { "sum" : { "field" :  "MtNumberSelfServiceConversion"}	},
                        "MtTotalValueSelfServeConversion" : { "sum" : { "field" :  "MtTotalValueSelfServeConversion"}	},
                        "MtTotalConversionValue" : { "sum" : { "field" :  "MtTotalConversionValue"}	},
                        "MtSurveySubmitted" : { "sum" : { "field" :  "MtSurveySubmitted"}	}
                        
                    }
                            }
                    }
            }
        });
    }
    else if(flag == 3) {
        return ({
            index: 'chat',
            type: 'funnelMetrics',
            body: {
                'size': 1000,
                "query": { 
                    "bool": { 
                      "must": [       
                        { "match": {
                        "clientId":	{"query":"All"}	
                        }}
                     ],
                        "filter" : [ {
                            "range" : {
                                "metrics_date" : {
                                    "gte" : "2018-10-01",
                                    "lte" : "2018-10-16",
                                    "format" : "yyyy-MM-dd"
                                }
                            }
                        } ]
                    }
                },
                "aggs" : {
                    "MtPEUVisitor" : { "sum" : { "field" :  "MtPEUVisitor"}	},
                    "MtHLUVisitor" : { "sum" : { "field" :  "MtHLUVisitor"}	},
                    "MtEUInvitesOfferedVisitor" : { "sum" : { "field" :  "MtEUInvitesOfferedVisitor"}	},
                    "MtEngAcceptedVisitor" : { "sum" : { "field" :  "MtEngAcceptedVisitor"}	},
                    "MtChatStarted" : { "sum" : { "field" :  "MtChatStarted"}	},
                    "MtInteractedChat" : { "sum" : { "field" :  "MtInteractedChat"}	},
                    "MtInsessionConversion" : { "sum" : { "field" :  "MtInsessionConversion"}	},
                    "MtCrossSessionConversion" : { "sum" : { "field" :  "MtCrossSessionConversion"}	},
                    "MtEUInvitesOfferedVisit" : { "sum" : { "field" :  "MtEUInvitesOfferedVisit"}	},
                    "MtEngAcceptedVisit" : { "sum" : { "field" :  "MtEngAcceptedVisit"}	},
                    "MtPETotalEvent" : { "sum" : { "field" :  "MtPETotalEvent"}	},
                    "MtHLTotalEvent" : { "sum" : { "field" :  "MtHLTotalEvent"}	},
                    "MtEngAcceptedEvent" : { "sum" : { "field" :  "MtEngAcceptedEvent"}	},
                    "MtEngageConcurrencyWithoutWrap" : { "sum" : { "field" :  "MtEngageConcurrencyWithoutWrap"}	},
                    "MtAvgNoChatsPerHour" : { "sum" : { "field" :  "MtAvgNoChatsPerHour"}	},
                    "MtAvgHandleTime" : { "sum" : { "field" :  "MtAvgHandleTime"}	},
                    "MtAvgWrapUpTime" : { "sum" : { "field" :  "MtAvgWrapUpTime"}	},
                    "MtTotalConversion" : { "sum" : { "field" :  "MtTotalConversion"}	},
                    "MtTotalValueInSessionConversion" : { "sum" : { "field" :  "MtTotalValueInSessionConversion"}	},
                    "MtNumberCrossSessionConversion" : { "sum" : { "field" :  "MtNumberCrossSessionConversion"}	},
                    "MtTotalValueCrossSessionConversion" : { "sum" : { "field" :  "MtTotalValueCrossSessionConversion"}	},
                    "MtAOV" : { "sum" : { "field" :  "MtAOV"}	},
                    "MtNumberSelfServiceConversion" : { "sum" : { "field" :  "MtNumberSelfServiceConversion"}	},
                    "MtTotalValueSelfServeConversion" : { "sum" : { "field" :  "MtTotalValueSelfServeConversion"}	},
                    "MtTotalConversionValue" : { "sum" : { "field" :  "MtTotalConversionValue"}	},
                    "MtSurveySubmitted" : { "sum" : { "field" :  "MtSurveySubmitted"}	}
                    
                }
            }
        });
    } 
}

module.exports = {
    getAllFunnelMetrics,
    getMetricsByClient,
    getMetricsByFilter
};