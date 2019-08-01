import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isDailyDataAvailable: false,
	isWeeklyDataAvailable: false,
	isMonthlyDataAvailable: false,
	incidentsDailyData: {},
	incidentsWeeklyData: {},
	incidentsMonthlyData: {}
};

export default function incidentsDaeReducer(state = INITIAL_STATE, action){
	switch(action.type){
	case ActionTypes.LOAD_INCIDENTS_DAE_DAILY_DATA_SUCCESS:
		return {
			...state,
			incidentsDailyData: action.payload,
			isDailyDataAvailable: true
		};
	case ActionTypes.LOAD_INCIDENTS_DAE_WEEKLY_DATA_SUCCESS:
		return {
			...state,
			incidentsWeeklyData: action.payload,
			isWeeklyDataAvailable: true
		};
	
	case ActionTypes.LOAD_INCIDENTS_DAE_MONTHLY_DATA_SUCCESS:
		return {
			...state,
			incidentsMonthlyData: action.payload,
			isMonthlyDataAvailable: true
		};
	case ActionTypes.INCIDENTS_DAE_DAILY_DATA_INVALID:
		return {
			...state,
			isDailyDataAvailable: false
		};
	case ActionTypes.INCIDENTS_DAE_WEEKLY_DATA_INVALID:
		return {
			...state,
			isWeeklyDataAvailable: false
		};
	case ActionTypes.INCIDENTS_DAE_MONTHLY_DATA_INVALID:
		return {
			...state,
			isMonthlyDataAvailable: false
		};
	default: 
		return state;
	}
}