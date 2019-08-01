import * as ActionTypes from './action-types';

const INITIAL_STATE = {
    isAivaFunnelDataAvailable: false,
    aivaFunnelData: {}
};

export default function aivaReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.LOAD_AIVA_FUNNEL_DATA_SUCCESS:
            return { ...state,
            aivaData: {...action.payload },
            isAivaFunnelDataAvailable: true
        };

        default:
            return state;
    }
}