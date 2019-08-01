import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isRevenueDataAvailable: false,
	revenueData: {},
  
};

export default function revenueReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_REVENUE_DATA_SUCCESS:
		return { ...state,
			revenueData: { ...action.payload
			},
			isRevenueDataAvailable: true
		};

	default:
		return state;
	}
}