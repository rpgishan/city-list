import {
  REMOVE_SEARCHED_CITY_NAME,
  SET_CITIES_PAGE_DATA,
  SET_CITY_EDIT,
  SET_CITY_VIEW,
  SET_IS_FAILED_TO_LOAD_CITIES_DATA,
  SET_RETRIEVING_CITIES_DATA,
  SET_RETRIEVING_CITIES_FAILURE,
  SET_RETRIEVING_CITIES_SUCCESS,
  SET_SEARCHED_CITY_NAME,
  SET_SELECTED_CITY_DATA,
  SET_SELECTED_CITY_UPDATE,
  SET_SELECTED_CITY_UPDATE_FAILURE,
  SET_SELECTED_CITY_UPDATE_SUCCESS,
  SET_SELECTED_CITY_UPDATING,
} from "./ActionTypes";

const initialState = {
  selectedCity: {
    id: false,
    name: false,
    photo: false,
  },
  citiesPage: {},
  isEditMode: false,
  isFailedToLoadData: false,
  isPaginated: false,
  isNameSearch: false,
  searchedName: undefined,
  updatingData: {
    pending: false,
    success: false,
    failed: false,
  },
  retrievingData: {
    pending: false,
    success: false,
    failed: false,
  },
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SET_CITIES_PAGE_DATA:
      return {
        ...state,
        citiesPage: payload.citiesPage,
        isPaginated: true,
        isNameSearch: payload.isNameSearch,
      };
    case SET_SELECTED_CITY_DATA:
    case SET_SELECTED_CITY_UPDATE:
      return {
        ...state,
        selectedCity: payload,
      };
    case SET_CITY_EDIT:
      return {
        ...state,
        isEditMode: true,
      };
    case SET_CITY_VIEW:
      return {
        ...state,
        isEditMode: false,
      };
    case SET_IS_FAILED_TO_LOAD_CITIES_DATA:
      return {
        ...state,
        isFailedToLoadData: payload,
      };
    case SET_SELECTED_CITY_UPDATE_SUCCESS:
      return {
        ...state,
        isEditMode: false,
        updatingData: {
          pending: false,
          success: true,
          failed: false,
        },
      };
    case SET_SELECTED_CITY_UPDATE_FAILURE:
      return {
        ...state,
        updatingData: {
          pending: false,
          success: false,
          failed: true,
        },
      };
    case SET_SELECTED_CITY_UPDATING:
      return {
        ...state,
        updatingData: {
          pending: payload,
          success: false,
          failed: false,
        },
      };
    case SET_RETRIEVING_CITIES_SUCCESS:
      return {
        ...state,
        retrievingData: {
          pending: false,
          success: true,
          failed: false,
        },
      };
    case SET_RETRIEVING_CITIES_FAILURE:
      return {
        ...state,
        retrievingData: {
          pending: false,
          success: false,
          failed: true,
        },
      };
    case SET_RETRIEVING_CITIES_DATA:
      return {
        ...state,
        retrievingData: {
          pending: payload,
          success: false,
          failed: false,
        },
      };
    case SET_SEARCHED_CITY_NAME:
      return {
        ...state,
        isNameSearch: true,
        searchedName: payload,
      };
    case REMOVE_SEARCHED_CITY_NAME:
      return {
        ...state,
        isNameSearch: false,
        searchedName: undefined,
      };
    default:
      return state;
  }
};
