import {
  REMOVE_AUTH_DATA,
  SET_AUTH_DATA,
  SET_IS_FAILED_TO_LOAD_AUTH_DATA,
  SET_REMOVING_TOKEN,
  SET_REMOVING_TOKEN_FAILURE,
  SET_REMOVING_TOKEN_SUCCESS,
  SET_RETRIEVING_TOKEN,
  SET_RETRIEVING_TOKEN_FAILURE,
  SET_RETRIEVING_TOKEN_SUCCESS,
  SET_VALID_TOKEN,
  SET_VALIDATING_TOKEN,
  SET_VALIDATING_TOKEN_FAILURE,
  SET_VALIDATING_TOKEN_SUCCESS,
} from "./ActionTypes";

const initialState = {
  isAuthenticated: false,
  isFailedToLoadData: false,
  retrievingData: {
    pending: false,
    authenticating: false,
    success: false,
    failed: false,
  },
  removingData: {
    pending: false,
    success: false,
    failed: false,
  },
};

export default (state = initialState, { type, payload } = {}) => {
  // disabling no-small-switch eslint warning
  /* eslint-disable */
  switch (type) {
    case SET_AUTH_DATA:
    case SET_VALID_TOKEN:
      return {
        ...state,
        isAuthenticated: payload,
        retrievingData: {
          pending: false,
          authenticating: false,
          success: true,
          failed: false,
        },
      };
    case SET_IS_FAILED_TO_LOAD_AUTH_DATA:
      return {
        ...state,
        isFailedToLoadData: payload,
        retrievingData: {
          pending: false,
          authenticating: false,
          success: false,
          failed: false,
        },
      };
    case SET_RETRIEVING_TOKEN_SUCCESS:
    case SET_VALIDATING_TOKEN_SUCCESS:
      return {
        ...state,
        retrievingData: {
          pending: false,
          authenticating: true,
          success: true,
          failed: false,
        },
      };
    case SET_RETRIEVING_TOKEN_FAILURE:
    case SET_VALIDATING_TOKEN_FAILURE:
      return {
        ...state,
        retrievingData: {
          pending: false,
          authenticating: false,
          success: false,
          failed: true,
        },
      };
    case SET_RETRIEVING_TOKEN:
    case SET_VALIDATING_TOKEN:
      return {
        ...state,
        retrievingData: {
          ...state.retrievingData,
          pending: payload.pending,
          authenticating: payload.authenticating,
        },
      };
    case REMOVE_AUTH_DATA:
      return initialState;
    case SET_REMOVING_TOKEN_SUCCESS:
      return {
        ...state,
        removingData: {
          pending: false,
          success: true,
          failed: false,
        },
      };
    case SET_REMOVING_TOKEN_FAILURE:
      return {
        ...state,
        removingData: {
          pending: false,
          success: false,
          failed: true,
        },
      };
    case SET_REMOVING_TOKEN:
      return {
        ...state,
        isAuthenticated: false,
        removingData: {
          ...state.removingData,
          pending: payload,
        },
      };
    default:
      return state;
  }
};
