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
import axios from "axios";
import { apiBaseURL, pageSize } from "../../common/constants";
import { REMOVE_AUTH_DATA } from "../InitialPage/ActionTypes";
import { StatusCodes } from "http-status-codes";

export const loadCitiesPage = (token, pageNo = 0) => {
  return (dispatch) => {
    if (token) {
      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const url = `${apiBaseURL}/city/page?pageNo=${pageNo}&pageSize=${pageSize}`;

      dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: true });
      axios
        .get(url, params)
        .then((response) => {
          dispatch({ type: SET_RETRIEVING_CITIES_SUCCESS, payload: true });
          const receivedData = response.data;
          const status = response.status;
          let page;
          if (status === StatusCodes.OK && receivedData) {
            page = response.data;
          } else if (status === StatusCodes.UNAUTHORIZED) {
            dispatch({ type: REMOVE_AUTH_DATA });
          } else {
            page = {};
          }
          dispatch(setNonSearchedCitiesPageData(page));
          dispatch(setIsFailedToLoadData(false));
        })
        .catch((error) => {
          const status = error.response.status;
          if (status === StatusCodes.UNAUTHORIZED) {
            dispatch({ type: REMOVE_AUTH_DATA });
          } else if (status === StatusCodes.FORBIDDEN) {
            alert("The user is not authorized to perform this action");
          } else {
            dispatch({ type: SET_RETRIEVING_CITIES_FAILURE, payload: true });
            dispatch(setNonSearchedCitiesPageData({}));
            dispatch(setIsFailedToLoadData(true));
          }
        })
        .finally(() => {
          dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: false });
        });
    }
  };
};

export const loadCitiesByName = (token, name, pageNo = 0) => {
  return (dispatch) => {
    if (token) {
      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const url = `${apiBaseURL}/city/namepage?name=${name}&pageNo=${pageNo}&pageSize=${pageSize}`;

      dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: true });
      axios
        .get(url, params)
        .then((response) => {
          dispatch({ type: SET_RETRIEVING_CITIES_SUCCESS, payload: true });
          const receivedData = response.data;
          const status = response.status;
          let page;
          if (status === StatusCodes.OK && receivedData) {
            page = response.data;
          } else if (status === StatusCodes.UNAUTHORIZED) {
            dispatch({ type: REMOVE_AUTH_DATA });
          } else {
            page = {};
          }
          dispatch(setSearchedCitiesPageData(page));
          dispatch(setIsFailedToLoadData(false));
        })
        .catch((error) => {
          const status = error.response.status;
          if (status === StatusCodes.UNAUTHORIZED) {
            dispatch({ type: REMOVE_AUTH_DATA });
          } else if (status === StatusCodes.FORBIDDEN) {
            alert("The user is not authorized to perform this action");
          } else {
            dispatch({ type: SET_RETRIEVING_CITIES_FAILURE, payload: true });
            dispatch(setSearchedCitiesPageData({}));
            dispatch(setIsFailedToLoadData(true));
          }
        })
        .finally(() => {
          dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: false });
        });
    }
  };
};

export const updateCity = (
  token,
  city,
  citiesPage,
  isNameSearch,
  searchedName
) => {
  return (dispatch) => {
    if (token && city && city.id && city.name && city.photo) {
      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const url = `${apiBaseURL}/city/update?id=${city.id}`;

      dispatch({ type: SET_SELECTED_CITY_UPDATING, payload: true });
      axios
        .put(url, city, params)
        .then((response) => {
          dispatch({ type: SET_SELECTED_CITY_UPDATE_SUCCESS, payload: true });
          const receivedData = response.data;
          const status = response.status;
          let resCity;
          if (status === StatusCodes.OK && receivedData) {
            resCity = response.data;
          } else if (status === StatusCodes.UNAUTHORIZED) {
            dispatch({ type: REMOVE_AUTH_DATA });
          } else {
            resCity = {};
          }
          dispatch(setSelectedCityUpdated(resCity));
          dispatch(setIsFailedToUpdateData(false));
        })
        .catch((error) => {
          const status = error.response.status;
          if (status === StatusCodes.UNAUTHORIZED) {
            dispatch({ type: REMOVE_AUTH_DATA });
          } else if (status === StatusCodes.FORBIDDEN) {
            alert("The user is not authorized to perform this action");
          } else {
            dispatch(setSelectedCityUpdated({}));
            dispatch(setIsFailedToUpdateData(true));
          }
        })
        .finally(() => {
          dispatch({ type: SET_SELECTED_CITY_UPDATING, payload: false });
          if (isNameSearch) {
            dispatch(
              loadCitiesByName(token, searchedName, citiesPage.pageNo || 0)
            );
          } else {
            dispatch(loadCitiesPage(token, citiesPage.pageNo || 0));
          }
        });
    }
  };
};

export const selectCity = (city) => {
  return (dispatch) => {
    if (city && city.name) {
      dispatch({ type: SET_SELECTED_CITY_DATA, payload: city });
    }
  };
};

export const setSearchedCityName = (token, name, pageNo) => {
  return (dispatch) => {
    if (name) {
      dispatch({ type: SET_SEARCHED_CITY_NAME, payload: name });
      dispatch(loadCitiesByName(token, name, pageNo));
    }
  };
};

export const removeSearchedCityName = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_SEARCHED_CITY_NAME });
  };
};

export const setEditMode = (isEditMode) => {
  return (dispatch) => {
    if (isEditMode) {
      dispatch({ type: SET_CITY_EDIT });
    } else {
      dispatch({ type: SET_CITY_VIEW });
    }
  };
};

const setNonSearchedCitiesPageData = (page) => {
  return setCitiesPageData({ citiesPage: page, isNameSearch: false });
};

const setSearchedCitiesPageData = (page) => {
  return setCitiesPageData({ citiesPage: page, isNameSearch: true });
};

const setCitiesPageData = (payload) => {
  return {
    type: SET_CITIES_PAGE_DATA,
    payload,
  };
};

const setIsFailedToLoadData = (isFailed) => {
  return {
    type: SET_IS_FAILED_TO_LOAD_CITIES_DATA,
    payload: isFailed,
  };
};

const setSelectedCityUpdated = (city) => {
  return {
    type: SET_SELECTED_CITY_UPDATE,
    payload: city,
  };
};

const setIsFailedToUpdateData = (isFailed) => {
  return {
    type: SET_SELECTED_CITY_UPDATE_FAILURE,
    payload: isFailed,
  };
};
