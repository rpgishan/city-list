import {
    SET_AUTH_DATA,
    SET_IS_FAILED_TO_LOAD_AUTH_DATA,
    SET_RETRIEVING_TOKEN,
    SET_RETRIEVING_TOKEN_FAILURE,
    SET_RETRIEVING_TOKEN_SUCCESS
} from "./ActionTypes";

const initialState = {
    isAuthenticated: false,
    token: false,
    isFailedToLoadData: false,
    retrievingData: {
        pending: false,
        authenticating: false,
        success: false,
        failed: false
    }
};

export default (state = initialState, {type, payload} = {}) => {
    // disabling no-small-switch eslint warning
    /* eslint-disable */
    switch (type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                token: payload.token,
                retrievingData: {
                    pending: false,
                    authenticating: false,
                    success: true,
                    failed: false
                }
            };
        case SET_IS_FAILED_TO_LOAD_AUTH_DATA:
            return {
                ...state,
                isFailedToLoadData: payload,
                retrievingData: {
                    pending: false,
                    authenticating: false,
                    success: false,
                    failed: false
                }
            };
        case SET_RETRIEVING_TOKEN_SUCCESS:
            return {
                ...state,
                retrievingData: {
                    pending: false,
                    authenticating: true,
                    success: true,
                    failed: false
                }
            }
        case SET_RETRIEVING_TOKEN_FAILURE:
            return {
                ...state,
                retrievingData: {
                    pending: false,
                    authenticating: false,
                    success: false,
                    failed: true
                }
            }
        case SET_RETRIEVING_TOKEN:
            return {
                ...state,
                retrievingData: {
                    pending: payload.pending,
                    authenticating: payload.authenticating,
                    success: false,
                    failed: false
                }
            }
        default:
            return state
    }
}