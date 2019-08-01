import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isIncidentsDataAvailable: false,
	incidentsData: {},
};

export default function incidentsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_INCIDENTS_DATA_SUCCESS:
		return {
			...state,
			incidentsData: { ...action.payload
			},
			isIncidentsDataAvailable: true
		};
	case ActionTypes.INVALIDATE_INCIDENTS_DATA:
		return {
			...state,
			isIncidentsDataAvailable: false
		}
	default:
		return state;
	}
}