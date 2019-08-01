import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isAgilityDataAvailable: false,
	agilityData: {},
};

export default function agilityReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_AGILITY_DATA_SUCCESS:
		return { 
			...state,
			agilityData: { ...action.payload.data },
			isAgilityDataAvailable: true
		};
	case ActionTypes.INVALIDATE_AGILITY_DATA:
		return{
			...state,
			isAgilityDataAvailable:false
		}
	default:
		return state;
	}
}