import {
    SET_CITIES_COUNT_DATA,
    SET_CITIES_PAGE_DATA,
    SET_IS_FAILED_TO_LOAD_CITIES_DATA,
    SET_RETRIEVING_CITIES_DATA,
    SET_RETRIEVING_CITIES_FAILURE,
    SET_RETRIEVING_CITIES_SUCCESS,
    SET_SELECTED_CITY_DATA
} from "./ActionTypes";

const initialState = {
    selectedCity: {
        id: false,
        name: false,
        photo: false
    },
    citiesPage: {},
    citiesCount:0,
    isFailedToLoadData: false,
    retrievingData: {
        pending: false,
        success: false,
        failed: false
    }
};

export default (state = initialState, {type, payload} = {}) => {
    // disabling no-small-switch eslint warning
    /* eslint-disable */
    switch (type) {
        case SET_CITIES_COUNT_DATA:
            return {
                ...state,
                citiesCount: payload
            };
        case SET_CITIES_PAGE_DATA:
            return {
                ...state,
                citiesPage: payload
            };
        case SET_SELECTED_CITY_DATA:
            return {
                ...state,
                selectedCity: payload
            };
        case SET_IS_FAILED_TO_LOAD_CITIES_DATA:
            return {
                ...state,
                isFailedToLoadData: payload
            };
        case SET_RETRIEVING_CITIES_SUCCESS:
            return {
                ...state,
                retrievingData: {
                    pending: false,
                    success: true,
                    failed: false
                }
            }
        case SET_RETRIEVING_CITIES_FAILURE:
            return {
                ...state,
                retrievingData: {
                    pending: false,
                    success: false,
                    failed: true
                }
            }
        case SET_RETRIEVING_CITIES_DATA:
            return {
                ...state,
                retrievingData: {
                    pending: payload,
                    success: false,
                    failed: false
                }
            }
        default:
            return state
    }
}