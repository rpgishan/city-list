import {
    SET_AUTH_DATA,
    SET_IS_FAILED_TO_LOAD_AUTH_DATA,
    SET_RETRIEVING_TOKEN,
    SET_RETRIEVING_TOKEN_FAILURE,
    SET_RETRIEVING_TOKEN_SUCCESS
} from "./ActionTypes";

import axios from "axios";
import {defaultTokenData} from "./Constants";
import {coreAPI} from "../../common/constants";

export const login = (username, password) => {
    return (dispatch) => {
        if (username && password) {
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = {'username': username, 'password': password}
            const url = "http://" + coreAPI.host + ":" + coreAPI.port + "/authenticate"

            dispatch({type: SET_RETRIEVING_TOKEN, payload: true});
            axios.post(url, body, params)
                .then(response => {
                    dispatch({type: SET_RETRIEVING_TOKEN_SUCCESS, payload: true});
                    console.log(response)
                    const receivedData = response.data;
                    let tokenData;
                    if (receivedData) {
                        tokenData = {
                            isAuthenticated: true,
                            token: "Bearer " + response.data.token
                        }
                    } else {
                        tokenData = defaultTokenData
                    }
                    dispatch(setAuthData(tokenData));
                    dispatch(setIsFailedToLoadAuthData(false));
                })
                .catch(() => {
                    dispatch({type: SET_RETRIEVING_TOKEN_FAILURE, payload: true});
                    dispatch(setAuthData(defaultTokenData));
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