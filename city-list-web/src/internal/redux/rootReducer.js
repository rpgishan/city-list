import { combineReducers } from "redux";
import initialPageReducer from "../../pages/InitialPage/Reducer";
import citiesPageReducer from "../../pages/CitiesPage/Reducer";

export default combineReducers({
  initialPage: initialPageReducer,
  citiesPage: citiesPageReducer,
});
