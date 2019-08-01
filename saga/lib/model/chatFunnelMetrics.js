/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
 'use strict';

 class ChatFunnel {
     constructor(mtPEUVisitor, mtHLUVisitor,mtEUInvitesOfferedVisitor,mtEngAcceptedVisitor,mtChatStarted,mtInteractedChat,mtInsessionConversion,mtCrossSessionConversion,mtEUInvitesOfferedVisit,mtEngAcceptedVisit,mtPETotalEvent,mtHLTotalEvent,mtEngAcceptedEvent,mtEngageConcurrencyWithoutWrap,mtAvgNoChatsPerHour,mtAvgHandleTime,mtAvgWrapUpTime,mtTotalConversion,
        //mtNumberInSessionConversion,
        mtTotalValueInSessionConversion,mtNumberCrossSessionConversion,mtTotalValueCrossSessionConversion,mtAOV,mtNumberSelfServiceConversion,mtTotalValueSelfServeConversion,mtTotalConversionValue,mtSurveySubmitted){
        this.MtPEUVisitor = mtPEUVisitor;
        this.MtHLUVisitor = mtHLUVisitor;
        this.MtEUInvitesOfferedVisitor = mtEUInvitesOfferedVisitor;
        this.MtEngAcceptedVisitor = mtEngAcceptedVisitor;
        this.MtChatStarted = mtChatStarted;
        this.MtInteractedChat = mtInteractedChat;
        this.MtInsessionConversion = mtInsessionConversion;
        this.MtCrossSessionConversion = mtCrossSessionConversion;
        this.MtEUInvitesOfferedVisit = mtEUInvitesOfferedVisit;
        this.MtEngAcceptedVisit = mtEngAcceptedVisit;
        this.MtPETotalEvent = mtPETotalEvent;
        this.MtHLTotalEvent = mtHLTotalEvent;
        this.MtEngAcceptedEvent = mtEngAcceptedEvent;
        this.MtEngageConcurrencyWithoutWrap = mtEngageConcurrencyWithoutWrap;
        this.MtAvgNoChatsPerHour = mtAvgNoChatsPerHour;
        this.MtAvgHandleTime = mtAvgHandleTime;
        this.MtAvgWrapUpTime = mtAvgWrapUpTime;
        this.MtTotalConversion = mtTotalConversion;
        //this.MtNumberInSessionConversion = mtNumberInSessionConversion;
        this.MtTotalValueInSessionConversion = mtTotalValueInSessionConversion;
        this.MtNumberCrossSessionConversion = mtNumberCrossSessionConversion;
        this.MtTotalValueCrossSessionConversion = mtTotalValueCrossSessionConversion;
        this.MtAOV = mtAOV;
        this.MtNumberSelfServiceConversion = mtNumberSelfServiceConversion;
        this.MtTotalValueSelfServeConversion = mtTotalValueSelfServeConversion;
        this.MtTotalConversionValue = mtTotalConversionValue;
        this.MtSurveySubmitted = mtSurveySubmitted;

     }
 }

 module.exports = ChatFunnel;