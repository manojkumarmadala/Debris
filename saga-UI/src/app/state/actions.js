import {getCompetitionData, getNewsData } from '../api/competition';
import {getRevenueData } from '../api/revenue';
import getAgilityData from '../api/agility';
import {getAivaFunnelData} from '../api/aiva';
import {getChatFunnelData} from '../api/chat';
import getIncidentsData from '../api/incidents';
import {getPersonweeksData,postPersonweeksData} from '../api/personweeks';
import { getIncidentsHeatMapData, dae_getIncidentsData ,dae_getIncidentsDrilldownData} from '../api/incidents';
import getAvailabilityData from '../api/availability';
import * as actions from './action-types';

export function loadCompetitionData() {  
	return function(dispatch) {
		return getCompetitionData().then(data => {
			dispatch(loadCompetitionDataSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}
export function loadNewsData() {  
	return function(dispatch) {
		return getNewsData().then(data => {
			dispatch(loadCompetitionNewsDataSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadAivaFunnelData() {
	return function(dispatch) {
		return getAivaFunnelData().then(data => {
			dispatch(loadAivaFunnelDataSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadAivaFunnelDataSuccess(data) {
	return {
		type: actions.LOAD_AIVA_FUNNEL_DATA_SUCCESS,
		payload: data
	};
}

export function loadChatFunnelData() {
	return function(dispatch) {
		return getChatFunnelData().then(data => {
			dispatch(loadChatFunnelDataSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadChatFunnelDataSuccess(data) {
	return {
		type: actions.LOAD_CHAT_FUNNEL_DATA_SUCCESS,
		payload: data
	};
}

export function loadRevenueData() {
	return function (dispatch) {
		return getRevenueData().then(data => {
			dispatch(loadRevenueDataSuccess(data));
		}).catch(error => {
			throw (error);
		});
	};
}

export function loadRevenueDataSuccess(data) {
	return {
		type:actions.LOAD_REVENUE_DATA_SUCCESS,
		payload:data
	};    
}
export function loadCompetitionDataSuccess(data) {
	return {
		type: actions.LOAD_COMPETITION_DATA_SUCCESS,
		payload: data
	};
}


export function loadCompetitionNewsDataSuccess(data) {  
	return {
		type:actions.LOAD_COMPETITION_NEWS_DATA_SUCCESS,
		payload:data
	};    
}

export function loadAgilityData(teamId, numberOfRecords){
	return function (dispatch) {
		return getAgilityData(teamId, numberOfRecords).then(data => {
			dispatch(loadAgilityDataSuccess(data));
		}).catch(error => {
			throw (error);
		});
	};
}

export function loadAgilityDataSuccess(data) { 
	//console.log('agility data loaded successfully');
	return {
		type:actions.LOAD_AGILITY_DATA_SUCCESS,
		payload:data
	};    
}
export function invalidateAgilityData(){
	return {
		type: 'INVALIDATE_AGILITY_DATA'
	};
}
export function loadIncidentsData(product, severity, reportedBy, fromDate, toDate, environment){
	return function(dispatch){
		return getIncidentsData(product, severity, reportedBy, fromDate, toDate, environment).then(data=>{
			dispatch(loadIncidentsDataSuccess(data));
		}).catch(error=>{
			throw (error);
		});
	};
}

export function loadIncidentsDataSuccess(data){
	//console.log('Incidents data retireved');
	return{
		type:actions.LOAD_INCIDENTS_DATA_SUCCESS,
		payload:data
	};
}
export function invalidateIncidentsData(){
	return {
		type: 'INVALIDATE_INCIDENTS_DATA'
	};
}
export function loadAvailabilityData(){
	return function(dispatch){
		return getAvailabilityData().then(data=>{
			//console.log('Availability data retireved');
			dispatch(loadAvailabilityDataSuccess(data));
		}).catch(error=>{
			throw (error);
		});
	};
}

export function loadAvailabilityDataSuccess(data){
	return {
		type:actions.LOAD_AVAILABILITY_DATA_SUCCESS,
		payload:data
	};
}

export function loadIncidentsHeatMapData(product, severity, reportedBy, fromDate, toDate, environment){
	return function(dispatch){
		return getIncidentsHeatMapData(product, severity, reportedBy, fromDate, toDate, environment).then(data=>{
			console.log('Incidents data retireved');
			console.log(data);
			dispatch(loadIncidentsHeatMapDataSuccess(data));
		}).catch(error=>{
			throw (error);
		});
	};
}

export function loadIncidentsHeatMapDataSuccess(data){
	return{
		type:actions.LOAD_INCIDENTS_HEATMAP_DATA_SUCCESS,
		payload:data
	};
}

export function dae_loadIncidentsData(product, trend){
	return function(dispatch){
		return dae_getIncidentsData(product, trend).then(data=>{
			console.log('Incidents data retireved');
			console.log(data);
			dispatch(dae_loadIncidentsDataSuccess(data,trend));
		}).catch(error=>{
			throw (error);
		});
	};
}

export function dae_loadIncidentsDrilldownData(product, trend,timeframe) {
	return function (dispatch) {
		return dae_getIncidentsDrilldownData(product, trend, timeframe).then(data => {
			console.log('Incidents drilldown data retireved');
			console.log(data);
			dispatch(dae_loadIncidentsDrilldownDataSuccess(data, trend));
		}).catch(error => {
			throw (error);
		});
	};
}
export function dae_loadIncidentsDrilldownDataSuccess(data, trend) {

	if (trend === 'weekly') {
		return {
			type: actions.LOAD_INCIDENTS_DAE_WEEKLY_DRILLDOWN_DATA_SUCCESS,
			payload: data
		};
	}
	if (trend === 'monthly') {
		return {
			type: actions.LOAD_INCIDENTS_DAE_MONTHLY_DRILLDOWN_DATA_SUCCESS,
			payload: data
		};
	}
}
export function dae_loadIncidentsDataSuccess(data,trend){
	if(trend==='daily'){
		return{
			type:actions.LOAD_INCIDENTS_DAE_DAILY_DATA_SUCCESS,
			payload:data
		};}
	if(trend==='weekly'){
		return {
			type: actions.LOAD_INCIDENTS_DAE_WEEKLY_DATA_SUCCESS,
			payload: data
		};
	}
	if( trend==='monthly'){
		return {
			type: actions.LOAD_INCIDENTS_DAE_MONTHLY_DATA_SUCCESS,
			payload: data
		};
	}
}

export function dae_invalidateDailyIncidentsData(){
	return {
		type: 'INCIDENTS_DAE_DAILY_DATA_INVALID'
	};
}
export function dae_invalidateWeeklyIncidentsData() {
	return {
		type: 'INCIDENTS_DAE_WEEKLY_DATA_INVALID'
	};
}
export function dae_invalidateMonthlyIncidentsData() {
	return {
		type: 'INCIDENTS_DAE_MONTHLY_DATA_INVALID'
	};
}

export function dae_invalidateWeeklyIncidentsDrilldownData() {
	return {
		type: 'INCIDENTS_DAE_WEEKLY_DRILLDOWN_DATA_INVALID'
	};
}
export function dae_invalidateMonthlyIncidentsDrilldownData() {
	return {
		type: 'INCIDENTS_DAE_MONTHLY_DRILLDOWN_DATA_INVALID'
	};
}

export function loadPersonWeeksData(pillar) {
	return function (dispatch) {
		return getPersonweeksData( pillar).then(data => {
			console.log('Personweeks data retireved');
			console.log(data);
			dispatch(loadPersonweeksDataSuccess(data));
		}).catch(error => {
			throw (error);
		});
	};
}

export function loadPersonweeksDataSuccess(data) {
	
	return{
		type: actions.LOAD_PERSONWEEKS_DATA_SUCCESS,
		payload:data
	};
	
}

export function invalidatePersonweeksData() {
	return {
		type: 'INVALIDATE_PERSONWEEKS_DATA'
	};
}

export function updatePersonWeeksData(data) {
	return function (dispatch) {
		return postPersonweeksData(data).then(data => {
			console.log('Personweeks data posted');
			console.log(data);
			dispatch(updatePersonweeksDataSuccess(data));
		}).catch(error => {
			throw (error);
		});
	};
}

export function updatePersonweeksDataSuccess(data) {
	
	return{
		type: actions.UPDATE_PERSONWEEKS_DATA_SUCCESS,
		payload:data
	};
	
}

export function invalidatePersonweeksPost() {
	return {
		type: actions.INVALIDATE_PERSONWEEKS_POST
	};
}