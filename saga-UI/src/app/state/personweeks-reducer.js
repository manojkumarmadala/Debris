import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isPersonWeeksDataAvailable: false,
	loading:false,
	personWeeksData: {},
	isPersonWeeksUpdated: false,
	personWeeksStatus:{}
};

export default function personWeeksReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_PERSONWEEKS_DATA_SUCCESS:
		return {
			...state,
			personWeeksData: {
				...action.payload
			},
			isPersonWeeksDataAvailable: true,
			loading:true
		};
	case ActionTypes.INVALIDATE_PERSONWEEKS_DATA:
		return {
			...state,
			isPersonWeeksDataAvailable: false
		};

	case ActionTypes.UPDATE_PERSONWEEKS_DATA_SUCCESS:
		return {
			...state,
			personWeeksStatus: {
				...action.payload
			},
			isPersonWeeksUpdated: true,
			loading: true
		};
	case ActionTypes.INVALIDATE_PERSONWEEKS_POST:
		return {
			...state,
			isPersonWeeksUpdated: false
		};
	default:
		return state;
	}
}