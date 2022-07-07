import {combineReducers} from "redux";
import loginPageReducer from "../../pages/LoginPage/Reducer";
import citiesPageReducer from "../../pages/CitiesPage/Reducer";


export default combineReducers({
    loginPage: loginPageReducer,
    citiesPage: citiesPageReducer,
});