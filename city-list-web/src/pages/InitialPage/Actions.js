import {
  REMOVE_AUTH_DATA,
  SET_AUTH_DATA,
  SET_IS_FAILED_TO_LOAD_AUTH_DATA,
  SET_RETRIEVING_TOKEN,
  SET_RETRIEVING_TOKEN_FAILURE,
  SET_RETRIEVING_TOKEN_SUCCESS,
  SET_VALID_TOKEN,
  SET_VALIDATING_TOKEN,
  SET_VALIDATING_TOKEN_FAILURE,
  SET_VALIDATING_TOKEN_SUCCESS,
} from "./ActionTypes";

import axios from "axios";
import { defaultTokenData } from "./Constants";
import { apiBaseURL } from "../../common/constants";
import { StatusCodes } from "http-status-codes";

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
          const status = response.status;
          let tokenData;
          if (status === StatusCodes.OK && receivedData) {
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

export const verifyToken = (token, removeToken) => {
  return (dispatch) => {
    if (token) {
      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const url = `${apiBaseURL}/validate`;

      dispatch({
        type: SET_VALIDATING_TOKEN,
        payload: { pending: true, authenticating: true },
      });
      axios
        .get(url, params)
        .then((response) => {
          dispatch({ type: SET_VALIDATING_TOKEN_SUCCESS, payload: true });
          const status = response.status;
          if (status === StatusCodes.OK) {
            dispatch({
              type: SET_VALID_TOKEN,
              payload: true,
            });
          } else {
            dispatch({ type: REMOVE_AUTH_DATA });
          }
          dispatch(setIsFailedToLoadAuthData(false));
        })
        .catch(() => {
          dispatch({ type: SET_VALIDATING_TOKEN_FAILURE, payload: true });
          dispatch(removeAuthData(removeToken));
          dispatch(setIsFailedToLoadAuthData(true));
        })
        .finally(() => {
          dispatch({
            type: SET_VALIDATING_TOKEN,
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

const removeAuthData = (removeToken) => {
  removeToken();

  return {
    type: REMOVE_AUTH_DATA,
  };
};

const setIsFailedToLoadAuthData = (isFailed) => {
  return {
    type: SET_IS_FAILED_TO_LOAD_AUTH_DATA,
    payload: isFailed,
  };
};
