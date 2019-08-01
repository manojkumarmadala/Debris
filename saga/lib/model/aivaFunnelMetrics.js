/*
  * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
  * unpublished, proprietary work which is fully protected under
  * copyright law. This code may only be used pursuant to a valid
  * license from 24/7 Customer, Inc.
  */
 'use strict';

 class AIVAFunnel {
     constructor(visits, aivaSessionsStarted, engagedCustomerSessions, chatInvites, chatEscalations){
         this.visits = visits;
         this.aivaSessionsStarted = aivaSessionsStarted;
         this.engagedCustomerSessions = engagedCustomerSessions;
         this.chatInvites = chatInvites;
         this.chatEscalations = chatEscalations;
     }
 }

 module.exports = AIVAFunnel;