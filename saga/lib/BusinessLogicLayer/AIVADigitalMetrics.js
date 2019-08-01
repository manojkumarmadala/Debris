
 'use strict';

var libUtil = require('../utilities/Date');
var aiva = require('../DataAccessLayer/AIVADigital');
var AIVAFunnel = require('../model/aivaFunnelMetrics');

let getAivaFunnelMetricsByClient = async (from, to) => {
    let aivaResponse = await aiva.getFunnelMetricsByClient(from, to);
    console.log(aivaResponse);
    var obj = new Array();
    var metricsArray = aivaResponse.aggregations.langs_client.buckets;
    for(var i=0; i<metricsArray.length; i++) {
        var funnelMetrics = new AIVAFunnel(metricsArray[i].visits.value,
                metricsArray[i].aivaSessionsStarted.value,
                metricsArray[i].engagedCustomerSessions.value,                
                metricsArray[i].chatInvites.value,
                metricsArray[i].chatEscalations.value);
                
        obj.push({name: metricsArray[i].key, metrics: funnelMetrics});
    }
    return {'status': 200, 'message': obj};
}


module.exports = {
    getAivaFunnelMetricsByClient
};