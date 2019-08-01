var config = require('../config');
var axios = require('axios');
var libUtil = require('../utilities/Date');
var ChatFunnel = require('../DataAccessLayer/chatFunnelMetrics');
var axiosInstance = axios.create({
	baseURL: config.getConfig(config.env).elasticHost,
});
class FunnelMetricsProvider {
	constructor() {
	}

	getAllFunnelMetrics(callback) {
		var currentDate = new Date();
		var dateId = currentDate.getFullYear()+'-'+currentDate.getMonth()+'-'+currentDate.getDate();        
		axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
		axiosInstance({
			method: 'get',
			url: '/chat/funnelMetrics/All2018-08-16/',
			headers: {
				'Content-Type' : 'application/json'
			}
		}).then(response => callback(undefined, response))
			.catch(error => console.log(error));
	}



	getChatMetricsByClient(from, to, callback) {
		axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
		axiosInstance({
			method: 'post',
			url: '/chat/funnelMetrics/_search',
			params: {
				'size' : 1000
			},
			data: {
				'query': { 
					'bool': { 
						'must_not': [       
							{ 'match': {
								'clientId':	{'query':'All'}	
							}}
						],
						'filter' : [ {
							'range' : {
								'metrics_date' : {
									'gte' : '2018-08-01',
									'lte' : '2018-08-30',
									'format' : 'yyyy-MM-dd'
								}
							}
						} ]
					}
				},
				'aggs' : {
					'langs_client' : {
						'terms' : 
                    { 
                    	'field' : 'clientAccountName.keyword',
                    	'order' : { '_term' : 'asc' },
                    	'size' : 500 
                    },    
						'aggs' : {
							'MtPEUVisitor' : { 'sum' : { 'field' :  'MtPEUVisitor'}},			
							'MtHLUVisitor' : { 'sum' : { 'field' :  'MtHLUVisitor'}	},
							'MtEUInvitesOfferedVisitor' : { 'sum' : { 'field' :  'MtEUInvitesOfferedVisitor'}	},
							'MtEngAcceptedVisitor' : { 'sum' : { 'field' :  'MtEngAcceptedVisitor'}	},
							'MtChatStarted' : { 'sum' : { 'field' :  'MtChatStarted'}	},
							'MtInteractedChat' : { 'sum' : { 'field' :  'MtInteractedChat'}	},
							'MtInsessionConversion' : { 'sum' : { 'field' :  'MtInsessionConversion'}	},
							'MtCrossSessionConversion' : { 'sum' : { 'field' :  'MtCrossSessionConversion'}	},
							'MtEUInvitesOfferedVisit' : { 'sum' : { 'field' :  'MtEUInvitesOfferedVisit'}	},
							'MtEngAcceptedVisit' : { 'sum' : { 'field' :  'MtEngAcceptedVisit'}	},
							'MtPETotalEvent' : { 'sum' : { 'field' :  'MtPETotalEvent'}	},
							'MtHLTotalEvent' : { 'sum' : { 'field' :  'MtHLTotalEvent'}	},
							'MtEngAcceptedEvent' : { 'sum' : { 'field' :  'MtEngAcceptedEvent'}	},
							'MtEngageConcurrencyWithoutWrap' : { 'sum' : { 'field' :  'MtEngageConcurrencyWithoutWrap'}	},
							'MtAvgNoChatsPerHour' : { 'sum' : { 'field' :  'MtAvgNoChatsPerHour'}	},
							'MtAvgHandleTime' : { 'sum' : { 'field' :  'MtAvgHandleTime'}	},
							'MtAvgWrapUpTime' : { 'sum' : { 'field' :  'MtAvgWrapUpTime'}	},
							'MtTotalConversion' : { 'sum' : { 'field' :  'MtTotalConversion'}	},
							'MtTotalValueInSessionConversion' : { 'sum' : { 'field' :  'MtTotalValueInSessionConversion'}	},
							'MtNumberCrossSessionConversion' : { 'sum' : { 'field' :  'MtNumberCrossSessionConversion'}	},
							'MtTotalValueCrossSessionConversion' : { 'sum' : { 'field' :  'MtTotalValueCrossSessionConversion'}	},
							'MtAOV' : { 'sum' : { 'field' :  'MtAOV'}	},
							'MtNumberSelfServiceConversion' : { 'sum' : { 'field' :  'MtNumberSelfServiceConversion'}	},
							'MtTotalValueSelfServeConversion' : { 'sum' : { 'field' :  'MtTotalValueSelfServeConversion'}	},
							'MtTotalConversionValue' : { 'sum' : { 'field' :  'MtTotalConversionValue'}	},
							'MtSurveySubmitted' : { 'sum' : { 'field' :  'MtSurveySubmitted'}	}
                        
						}
					}
				}
			}
		}).then(response => callback(undefined, response))
			.catch(error => console.log(error));
	}

	getChatMetricsByFilter(from, to, callback) {
		axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
		axiosInstance({
			method: 'post',
			url: '/chat/funnelMetrics/_search',
			params: {
				'size' : 1000
			},
			data: {
				'query': { 
					'bool': { 
						'must': [       
							{ 'match': {
								'clientId':	{'query':'All'}	
							}}
						],
						'filter' : [ {
							'range' : {
								'metrics_date' : {
									'gte' : '2018-08-15',
									'lte' : '2018-08-16',
									'format' : 'yyyy-MM-dd'
								}
							}
						} ]
					}
				},
				'aggs' : {
					'MtPEUVisitor' : { 'sum' : { 'field' :  'MtPEUVisitor'}	},
					'MtHLUVisitor' : { 'sum' : { 'field' :  'MtHLUVisitor'}	},
					'MtEUInvitesOfferedVisitor' : { 'sum' : { 'field' :  'MtEUInvitesOfferedVisitor'}	},
					'MtEngAcceptedVisitor' : { 'sum' : { 'field' :  'MtEngAcceptedVisitor'}	},
					'MtChatStarted' : { 'sum' : { 'field' :  'MtChatStarted'}	},
					'MtInteractedChat' : { 'sum' : { 'field' :  'MtInteractedChat'}	},
					'MtInsessionConversion' : { 'sum' : { 'field' :  'MtInsessionConversion'}	},
					'MtCrossSessionConversion' : { 'sum' : { 'field' :  'MtCrossSessionConversion'}	},
					'MtEUInvitesOfferedVisit' : { 'sum' : { 'field' :  'MtEUInvitesOfferedVisit'}	},
					'MtEngAcceptedVisit' : { 'sum' : { 'field' :  'MtEngAcceptedVisit'}	},
					'MtPETotalEvent' : { 'sum' : { 'field' :  'MtPETotalEvent'}	},
					'MtHLTotalEvent' : { 'sum' : { 'field' :  'MtHLTotalEvent'}	},
					'MtEngAcceptedEvent' : { 'sum' : { 'field' :  'MtEngAcceptedEvent'}	},
					'MtEngageConcurrencyWithoutWrap' : { 'sum' : { 'field' :  'MtEngageConcurrencyWithoutWrap'}	},
					'MtAvgNoChatsPerHour' : { 'sum' : { 'field' :  'MtAvgNoChatsPerHour'}	},
					'MtAvgHandleTime' : { 'sum' : { 'field' :  'MtAvgHandleTime'}	},
					'MtAvgWrapUpTime' : { 'sum' : { 'field' :  'MtAvgWrapUpTime'}	},
					'MtTotalConversion' : { 'sum' : { 'field' :  'MtTotalConversion'}	},
					'MtTotalValueInSessionConversion' : { 'sum' : { 'field' :  'MtTotalValueInSessionConversion'}	},
					'MtNumberCrossSessionConversion' : { 'sum' : { 'field' :  'MtNumberCrossSessionConversion'}	},
					'MtTotalValueCrossSessionConversion' : { 'sum' : { 'field' :  'MtTotalValueCrossSessionConversion'}	},
					'MtAOV' : { 'sum' : { 'field' :  'MtAOV'}	},
					'MtNumberSelfServiceConversion' : { 'sum' : { 'field' :  'MtNumberSelfServiceConversion'}	},
					'MtTotalValueSelfServeConversion' : { 'sum' : { 'field' :  'MtTotalValueSelfServeConversion'}	},
					'MtTotalConversionValue' : { 'sum' : { 'field' :  'MtTotalConversionValue'}	},
					'MtSurveySubmitted' : { 'sum' : { 'field' :  'MtSurveySubmitted'}	}
                    
				}
			}
		}).then(response => callback(undefined, response))
			.catch(error => console.log(error));
	}    
}


module.exports = FunnelMetricsProvider;