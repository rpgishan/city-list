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
    isFailedToLoadUserData: false,
    retrievingToken: {
        pending: false,
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
                token: payload.token
            };
        case SET_IS_FAILED_TO_LOAD_AUTH_DATA:
            return {
                ...state,
                isFailedToLoadUserData: payload
            };
        case SET_RETRIEVING_TOKEN_SUCCESS:
            return {
                ...state,
                retrievingToken: {
                    pending: false,
                    success: true,
                    failed: false
                }
            }
        case SET_RETRIEVING_TOKEN_FAILURE:
            return {
                ...state,
                retrievingToken: {
                    pending: false,
                    success: false,
                    failed: true
                }
            }
        case SET_RETRIEVING_TOKEN:
            return {
                ...state,
                retrievingToken: {
                    pending: payload,
                    success: false,
                    failed: false
                }
            }
        default:
            return state
    }
}