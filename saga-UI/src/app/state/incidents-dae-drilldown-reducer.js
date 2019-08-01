import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	
	isWeeklyDataAvailable: false,
	isMonthlyDataAvailable: false,
	incidentsWeeklyData: {},
	incidentsMonthlyData: {}
};

export default function incidentsDaeDrilldownReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_INCIDENTS_DAE_WEEKLY_DRILLDOWN_DATA_SUCCESS:
		return {
			...state,
			incidentsWeeklyData: action.payload,
			isWeeklyDataAvailable: true
		};

	case ActionTypes.LOAD_INCIDENTS_DAE_MONTHLY_DRILLDOWN_DATA_SUCCESS:
		return {
			...state,
			incidentsMonthlyData: action.payload,
			isMonthlyDataAvailable: true
		};
	case ActionTypes.INCIDENTS_DAE_WEEKLY_DRILLDOWN_DATA_INVALID:
		return {
			...state,
			isWeeklyDataAvailable: false
		};
	case ActionTypes.INCIDENTS_DAE_MONTHLY_DRILLDOWN_DATA_INVALID:
		return {
			...state,
			isMonthlyDataAvailable: false
		};
	default:
		return state;
	}
}