import {
    SET_AUTH_DATA,
    SET_IS_FAILED_TO_LOAD_AUTH_DATA,
    SET_RETRIEVING_TOKEN,
    SET_RETRIEVING_TOKEN_FAILURE,
    SET_RETRIEVING_TOKEN_SUCCESS
} from "./ActionTypes";
import axios from "axios";
import config from "../../internal/config";
import {defaultUserData} from "./Constants";

/**
 * Action generator for load user data from token
 *
 * @param {string} token - Authentication token
 * @returns {Function} Returns thunk async function
 */
export const loadUserData = (token) => {
    return (dispatch) => {
        if (token) {
            const query = window.location.search.substring(1)
            if (query.length && window.history !== undefined && window.history.pushState !== undefined) {
                window.history.pushState({}, document.title, window.location.pathname);
            }

            dispatch({type: SET_RETRIEVING_TOKEN, payload: true});
            axios.post(config.introspectUrl, null, {params: {token}})
                .then(response => {
                    dispatch({type: SET_RETRIEVING_TOKEN_SUCCESS, payload: true});
                    const receivedData = response.data;
                    let userData;
                    if (receivedData && receivedData.active) {
                        userData = {
                            isAuthenticated: true,
                            authenticatedUser: response.data
                        }
                    } else {
                        userData = {
                            isAuthenticated: true,
                            authenticatedUser: defaultUserData
                        }
                    }
                    dispatch(setAuthData(userData));
                    dispatch(setIsFailedToLoadAuthData(false));
                })
                .catch(() => {
                    dispatch({type: SET_RETRIEVING_TOKEN_FAILURE, payload: true});
                    const userData = {
                        isAuthenticated: true,
                        authenticatedUser: defaultUserData
                    }
                    dispatch(setAuthData(userData));
                    dispatch(setIsFailedToLoadAuthData(true));
                })
                .finally(() => {
                    dispatch({type: SET_RETRIEVING_TOKEN, payload: false});
                });
        }
    }
};

export const setAuthData = (authData) => {
    return {
        type: SET_AUTH_DATA,
        payload: authData
    }
};

export const setIsFailedToLoadAuthData = (isFailed) => {
    return {
        type: SET_IS_FAILED_TO_LOAD_AUTH_DATA,
        payload: isFailed
    }
};
