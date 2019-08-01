import * as ActionTypes from './action-types';

const INITIAL_STATE = {
    isChatFunnelDataAvailable: false,
    chatFunnelData: {}
};

export default function chatReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.LOAD_CHAT_FUNNEL_DATA_SUCCESS:
            return { ...state,
            chatData: {...action.payload },
            isChatFunnelDataAvailable: true
        };

        default:
            return state;
    }
}