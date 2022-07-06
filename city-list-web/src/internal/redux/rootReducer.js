import {combineReducers} from "redux";
import loginPageReducer from "../../pages/LoginPage/Reducer";


export default combineReducers({
    loginPage: loginPageReducer,
});