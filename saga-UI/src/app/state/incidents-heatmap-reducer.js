import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isDataAvailable: false,
	heatMapData: [],
};

export default function incidentsHeatMapReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_INCIDENTS_HEATMAP_DATA_SUCCESS:
		return {
			...state,
			heatMapData: [...action.payload.data],
			isDataAvailable: true
		};

	default:
		return state;
	}
}