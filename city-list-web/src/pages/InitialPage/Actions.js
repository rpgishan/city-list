import {
  REMOVE_AUTH_DATA,
  SET_AUTH_DATA,
  SET_IS_FAILED_TO_LOAD_AUTH_DATA,
  SET_RETRIEVING_TOKEN,
  SET_RETRIEVING_TOKEN_FAILURE,
  SET_RETRIEVING_TOKEN_SUCCESS,
} from "./ActionTypes";

import axios from "axios";
import { defaultTokenData } from "./Constants";
import { apiBaseURL } from "../../common/constants";

export const initiateLogin = (username, password, saveToken) => {
  return (dispatch) => {
    if (username && password) {
      const params = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = { username: username, password: password };
      const url = `${apiBaseURL}/authenticate`;

      dispatch({
        type: SET_RETRIEVING_TOKEN,
        payload: { pending: true, authenticating: true },
      });
      axios
        .post(url, body, params)
        .then((response) => {
          dispatch({ type: SET_RETRIEVING_TOKEN_SUCCESS, payload: true });
          const receivedData = response.data;
          let tokenData;
          if (receivedData) {
            tokenData = {
              isAuthenticated: true,
              token: `Bearer ${response.data.token}`,
            };
          } else {
            tokenData = defaultTokenData;
          }
          dispatch(setAuthData(tokenData, saveToken));
          dispatch(setIsFailedToLoadAuthData(false));
        })
        .catch(() => {
          dispatch({ type: SET_RETRIEVING_TOKEN_FAILURE, payload: true });
          dispatch(setAuthData(defaultTokenData, saveToken));
          dispatch(setIsFailedToLoadAuthData(true));
        })
        .finally(() => {
          dispatch({
            type: SET_RETRIEVING_TOKEN,
            payload: { pending: false, authenticating: false },
          });
        });
    }
  };
};

export const initiateLogout = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_AUTH_DATA,
    });
  };
};

const setAuthData = (authData, saveToken) => {
  if (authData) {
    saveToken(authData.token);
  }

  return {
    type: SET_AUTH_DATA,
    payload: authData.isAuthenticated,
  };
};

const setIsFailedToLoadAuthData = (isFailed) => {
  return {
    type: SET_IS_FAILED_TO_LOAD_AUTH_DATA,
    payload: isFailed,
  };
};
