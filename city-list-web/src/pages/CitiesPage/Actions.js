import {
  SET_CITIES_DATA,
  SET_CITIES_PAGE_DATA,
  SET_CITY_EDIT,
  SET_CITY_VIEW,
  SET_IS_FAILED_TO_LOAD_CITIES_DATA,
  SET_RETRIEVING_CITIES_DATA,
  SET_RETRIEVING_CITIES_FAILURE,
  SET_RETRIEVING_CITIES_SUCCESS,
  SET_SELECTED_CITY_DATA,
  SET_SELECTED_CITY_UPDATE,
  SET_SELECTED_CITY_UPDATE_FAILURE,
  SET_SELECTED_CITY_UPDATE_SUCCESS,
  SET_SELECTED_CITY_UPDATING,
} from "./ActionTypes";
import axios from "axios";
import { apiBaseURL } from "../../common/constants";

export const loadCitiesPage = (token, pageNo = 0) => {
  const pageSize = 10;
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
          let page;
          if (receivedData) {
            page = response.data;
          } else {
            page = {};
          }
          dispatch(setCitiesPageData(page));
          dispatch(setIsFailedToLoadData(false));
        })
        .catch(() => {
          dispatch({ type: SET_RETRIEVING_CITIES_FAILURE, payload: true });
          dispatch(setCitiesPageData({}));
          dispatch(setIsFailedToLoadData(true));
        })
        .finally(() => {
          dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: false });
        });
    }
  };
};

export const loadCitiesByName = (token, name) => {
  return (dispatch) => {
    if (token) {
      const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const url = `${apiBaseURL}/city/name?name=${name}`;

      dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: true });
      axios
        .get(url, params)
        .then((response) => {
          dispatch({ type: SET_RETRIEVING_CITIES_SUCCESS, payload: true });
          const receivedData = response.data;
          let cities;
          if (receivedData) {
            cities = response.data;
          } else {
            cities = {};
          }
          dispatch(setCitiesData(cities));
          dispatch(setIsFailedToLoadData(false));
        })
        .catch(() => {
          dispatch({ type: SET_RETRIEVING_CITIES_FAILURE, payload: true });
          dispatch(setCitiesData([]));
          dispatch(setIsFailedToLoadData(true));
        })
        .finally(() => {
          dispatch({ type: SET_RETRIEVING_CITIES_DATA, payload: false });
        });
    }
  };
};

export const updateCity = (token, city, citiesPage) => {
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
          let resCity;
          if (receivedData) {
            resCity = response.data;
          } else {
            resCity = {};
          }
          dispatch(setSeletedCityUpdated(resCity));
          dispatch(setIsFailedToUpdateData(false));
        })
        .catch(() => {
          dispatch(setSeletedCityUpdated({}));
          dispatch(setIsFailedToUpdateData(true));
        })
        .finally(() => {
          dispatch({ type: SET_SELECTED_CITY_UPDATING, payload: false });
          dispatch(loadCitiesPage(token, citiesPage.pageNo || 0));
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

export const setEditMode = (isEditMode) => {
  return (dispatch) => {
    if (isEditMode) {
      dispatch({ type: SET_CITY_EDIT });
    } else {
      dispatch({ type: SET_CITY_VIEW });
    }
  };
};

const setCitiesPageData = (page) => {
  return {
    type: SET_CITIES_PAGE_DATA,
    payload: page,
  };
};

const setCitiesData = (cities) => {
  return {
    type: SET_CITIES_DATA,
    payload: cities,
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
