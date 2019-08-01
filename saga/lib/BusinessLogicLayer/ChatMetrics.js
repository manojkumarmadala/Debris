
 'use strict';

var libUtil = require('../utilities/Date');
var chat = require('../DataAccessLayer/Chat');
var ChatFunnel = require('../model/chatFunnelMetrics');

let getAllFunnelMetrics = async () => {
    let responseObject = await chat.getAllFunnelMetrics();                
    var metricsArray = responseObject.hits.hits[0]._source;
    var funnelMetrics = new ChatFunnel(metricsArray.MtPEUVisitor,
        metricsArray.MtHLUVisitor,
        metricsArray.MtEUInvitesOfferedVisitor,
        metricsArray.MtEngAcceptedVisitor,
        metricsArray.MtChatStarted,
        metricsArray.MtInteractedChat,
        metricsArray.MtInsessionConversion,
        metricsArray.MtCrossSessionConversion,
        metricsArray.MtEUInvitesOfferedVisit,
        metricsArray.MtEngAcceptedVisit,
        metricsArray.MtPETotalEvent,
        metricsArray.MtHLTotalEvent,
        metricsArray.MtEngAcceptedEvent,
        metricsArray.MtEngageConcurrencyWithoutWrap ,
        metricsArray.MtAvgNoChatsPerHour,
        metricsArray.MtAvgHandleTime,
        metricsArray.MtAvgWrapUpTime,
        metricsArray.MtTotalConversion,
        //metricsArray.MtNumberInSessionConversion,
        metricsArray.MtTotalValueInSessionConversion,
        metricsArray.MtNumberCrossSessionConversion,
        metricsArray.MtTotalValueCrossSessionConversion,
        metricsArray.MtAOV,
        metricsArray.MtNumberSelfServiceConversion,
        metricsArray.MtTotalValueSelfServeConversion,
        metricsArray.MtTotalConversionValue,
        metricsArray.MtSurveySubmitted
        );
    return {"status" : 200,
            "message": funnelMetrics};  
}

let getMetricsByClient = async (from, to) => {  
    let responseObject = await chat.getMetricsByClient(from, to);

    var obj = new Array();
    var metricsArray = responseObject.aggregations.langs_client.buckets;
    for(var i=0; i<metricsArray.length; i++){
        var funnelMetrics = new ChatFunnel(metricsArray[i].MtPEUVisitor.value,
            metricsArray[i].MtHLUVisitor.value,
            metricsArray[i].MtEUInvitesOfferedVisitor.value,
            metricsArray[i].MtEngAcceptedVisitor.value,
            metricsArray[i].MtChatStarted.value,
            metricsArray[i].MtInteractedChat.value,
            metricsArray[i].MtInsessionConversion.value,
            metricsArray[i].MtCrossSessionConversion.value,
            metricsArray[i].MtEUInvitesOfferedVisit.value,
            metricsArray[i].MtEngAcceptedVisit.value,
            metricsArray[i].MtPETotalEvent.value,
            metricsArray[i].MtHLTotalEvent.value,
            metricsArray[i].MtEngAcceptedEvent.value,
            metricsArray[i].MtEngageConcurrencyWithoutWrap.value,
            metricsArray[i].MtAvgNoChatsPerHour.value,
            metricsArray[i].MtAvgHandleTime.value,
            metricsArray[i].MtAvgWrapUpTime.value,
            metricsArray[i].MtTotalConversion.value,
            //metricsArray[i].MtNumberInSessionConversion.value,
            metricsArray[i].MtTotalValueInSessionConversion.value,
            metricsArray[i].MtNumberCrossSessionConversion.value,
            metricsArray[i].MtTotalValueCrossSessionConversion.value,
            metricsArray[i].MtAOV.value,
            metricsArray[i].MtNumberSelfServiceConversion.value,
            metricsArray[i].MtTotalValueSelfServeConversion.value,
            metricsArray[i].MtTotalConversionValue.value,
            metricsArray[i].MtSurveySubmitted.value
            );
        obj.push({name: metricsArray[i].key, metrics: funnelMetrics});
    }
    return {'status': 200, 'message': obj};     
}

let getMetricsByFilter = async (from, to) => {
    let responseObject = await chat.getMetricsByFilter(from, to);    
    var metricsArray = responseObject.aggregations;
   // console.log(metricsArray);
    var funnelMetrics = new ChatFunnel(metricsArray.MtPEUVisitor.value,
        metricsArray.MtHLUVisitor.value,
        metricsArray.MtEUInvitesOfferedVisitor.value,
        metricsArray.MtEngAcceptedVisitor.value,
        metricsArray.MtChatStarted.value,
        metricsArray.MtInteractedChat.value,
        metricsArray.MtInsessionConversion.value,
        metricsArray.MtCrossSessionConversion.value,
        metricsArray.MtEUInvitesOfferedVisit.value,
        metricsArray.MtEngAcceptedVisit.value,
        metricsArray.MtPETotalEvent.value,
        metricsArray.MtHLTotalEvent.value,
        metricsArray.MtEngAcceptedEvent.value,
        metricsArray.MtEngageConcurrencyWithoutWrap.value,
        metricsArray.MtAvgNoChatsPerHour.value,
        metricsArray.MtAvgHandleTime.value,
        metricsArray.MtAvgWrapUpTime.value,
        metricsArray.MtTotalConversion.value,
        //metricsArray.MtNumberInSessionConversion.value,
        metricsArray.MtTotalValueInSessionConversion.value,
        metricsArray.MtNumberCrossSessionConversion.value,
        metricsArray.MtTotalValueCrossSessionConversion.value,
        metricsArray.MtAOV.value,
        metricsArray.MtNumberSelfServiceConversion.value,
        metricsArray.MtTotalValueSelfServeConversion.value,
        metricsArray.MtTotalConversionValue.value,
        metricsArray.MtSurveySubmitted.value
        );
    return {'status': 200, 'message': funnelMetrics};
}

module.exports = {
    getAllFunnelMetrics,
    getMetricsByClient,
    getMetricsByFilter
};
