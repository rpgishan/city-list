import {
    SET_CITIES_COUNT_DATA,
    SET_CITIES_PAGE_DATA,
    SET_IS_FAILED_TO_LOAD_CITIES_DATA,
    SET_RETRIEVING_CITIES_DATA,
    SET_RETRIEVING_CITIES_FAILURE,
    SET_RETRIEVING_CITIES_SUCCESS,
    SET_SELECTED_CITY_DATA
} from "./ActionTypes";
import axios from "axios";
import {coreAPI} from "../../common/constants";

export const loadCitiesCount = (token) => {
    return (dispatch) => {
        if (token) {
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            };
            const url = "http://" + coreAPI.host + ":" + coreAPI.port + "/city/count";

            dispatch({type: SET_RETRIEVING_CITIES_DATA, payload: true});
            axios.get(url, params)
                .then(response => {
                    dispatch({type: SET_RETRIEVING_CITIES_SUCCESS, payload: true});
                    console.log(response)
                    const receivedData = response.data;
                    let count;
                    if (receivedData) {
                        count = response.data
                    } else {
                        count = 0
                    }
                    dispatch(setCitiesCountData(count));
                    dispatch(setIsFailedToLoadData(false));
                })
                .catch(() => {
                    dispatch({type: SET_RETRIEVING_CITIES_FAILURE, payload: true});
                    dispatch(setCitiesCountData(0));
                    dispatch(setIsFailedToLoadData(true));
                })
                .finally(() => {
                    dispatch({type: SET_RETRIEVING_CITIES_DATA, payload: false});
                });
        }
    }
};

export const loadCitiesPage = (token, pageNo = 0) => {
    const pageSize = 10;
    return (dispatch) => {
        if (token) {
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            };
            const url = "http://" + coreAPI.host + ":" + coreAPI.port + "/city/page?pageNo=" + pageNo + "&pageSize=" + pageSize;

            dispatch({type: SET_RETRIEVING_CITIES_DATA, payload: true});
            axios.get(url, params)
                .then(response => {
                    dispatch({type: SET_RETRIEVING_CITIES_SUCCESS, payload: true});
                    console.log(response)
                    const receivedData = response.data;
                    let page;
                    if (receivedData) {
                        page = response.data
                    } else {
                        page = {}
                    }
                    dispatch(setCitiesPageData(page));
                    dispatch(setIsFailedToLoadData(false));
                })
                .catch(() => {
                    dispatch({type: SET_RETRIEVING_CITIES_FAILURE, payload: true});
                    dispatch(setCitiesPageData({}));
                    dispatch(setIsFailedToLoadData(true));
                })
                .finally(() => {
                    dispatch({type: SET_RETRIEVING_CITIES_DATA, payload: false});
                });
        }
    }
};

export const selectCity = (city) => {
    return (dispatch) => {
        if (city && city.name) {
            dispatch({type: SET_SELECTED_CITY_DATA, payload: city});
        }
    }
};

const setCitiesCountData = (count) => {
    return {
        type: SET_CITIES_COUNT_DATA,
        payload: count
    }
};

const setCitiesPageData = (page) => {
    return {
        type: SET_CITIES_PAGE_DATA,
        payload: page
    }
};

const setIsFailedToLoadData = (isFailed) => {
    return {
        type: SET_IS_FAILED_TO_LOAD_CITIES_DATA,
        payload: isFailed
    }
};