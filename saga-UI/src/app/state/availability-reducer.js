import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isAvailabilityDataAvailable: false,
	availabilityData: {},
};

export default function availabilityReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_AVAILABILITY_DATA_SUCCESS:
		return { 
			...state,
			availabilityData: { ...action.payload },
			isAvailabilityDataAvailable: true
		};

	default:
		return state;
	}
}