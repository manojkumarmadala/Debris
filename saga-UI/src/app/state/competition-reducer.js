import * as ActionTypes from './action-types';

const INITIAL_STATE = {
	isCompetitionDataAvailable:false,
	isNewsDataAvailable:false,
	competitionData:{},
	competitionNewsData:{}
};

export default function competitionReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case ActionTypes.LOAD_COMPETITION_DATA_SUCCESS:
		return {...state, competitionData: {...action.payload}, isCompetitionDataAvailable: true};
      
	case ActionTypes.LOAD_COMPETITION_NEWS_DATA_SUCCESS:
		return {...state, competitionNewsData: [...action.payload], isNewsDataAvailable:true};
    
	default:
		return state;
	}
}