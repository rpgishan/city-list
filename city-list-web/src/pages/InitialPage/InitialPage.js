import React from "react";
import {useDispatch, useSelector} from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import {loadCitiesPage, selectCity} from "../CitiesPage/Actions";
import {useToken} from "../../common/useToken";
import CitiesPage from "../CitiesPage/CitiesPage";

const InitialPage = () => {

    const dispatch = useDispatch();
    // const useToken = useToken();
    // const token1 = useToken.token;
    // const token = useToken.token;
    // const setToken = useToken.setToken;
    const {token, setToken} = useToken();

    // if (token1) {
    // dispatch(setTokenInStore(token1));
    // }

    // const token = useSelector(state => state.loginPage.token);
    const isAuthenticated = useSelector(state => state.loginPage.isAuthenticated);
    const isTokenReceiving = useSelector(state => state.loginPage.retrievingData.pending);
    // const isAuthenticating = useSelector(state => state.loginPage.retrievingData.authenticating);
    // const tokenRetrievalFailure = useSelector(state => state.loginPage.retrievingData.failed);
    const citiesPage = useSelector(state => state.citiesPage.citiesPage);
    const selectedCity = useSelector(state => state.citiesPage.selectedCity);
    const isFailedToLoadCityData = useSelector(state => state.citiesPage.isFailedToLoadData);

    // const history = useHistory()
    console.log('token ', token);

    console.log('isAuthenticated ', isAuthenticated)
    console.log('isTokenReceiving ', isTokenReceiving)

    // if (!isAuthenticated)
    //     return (<LoginError errorMsg={genericAuthenticationFailure}/>);
    // if (isTokenReceiving || isAuthenticating) {
    //     return (<Loading/>)
    // }
    // if (tokenRetrievalFailure) {
    //     return (
    //         <div>Authentication failure
    //             <div>
    //                 <LoginPage/>
    //             </div>
    //         </div>
    //     )
    // }

    if (token) {
        console.log('running loadNewPage')
        if(!citiesPage.content) {
            loadNewPage(dispatch, token, 0);
        }
        // dispatch(loadCitiesPage(token, 0));
        console.log('authenticated ', token, isAuthenticated)
        console.log('isFailedToLoadCityData ',isFailedToLoadCityData)
        // history.push('/city')
        // return (
        //     <BrowserRouter>
        //         <Redirect to="/city"/>
        //     </BrowserRouter>)
        if (citiesPage.content) {
            return (
                <CitiesPage
                    citiesPage={citiesPage}
                    selectedCity={selectedCity}
                    loadNewPage={pageNo => loadNewPage(dispatch, token, pageNo)}
                    setSelectedCity={city => setSelectedCity(dispatch, city)}/>)
        }  else if (isFailedToLoadCityData){
            return (<LoginError errorMsg='Cities loading error' />)
        }else {
            return (<Loading/>)
        }
    }

    console.log('initial  last', token)

    // history.push('/login')
    // return (<BrowserRouter>
    //     <Redirect to="/login"/>
    // </BrowserRouter>)

    return <LoginPage setToken={setToken}/>

}

const setSelectedCity = (dispatch, city) => {
    dispatch(selectCity(city));
}

const loadNewPage = (dispatch, token, pageNo) => {
    dispatch(loadCitiesPage(token, pageNo));
}

const Loading = () => {
    return (
        <h1>Loading...</h1>
    )
}

const LoginError = ({errorMsg}) => {
    return (
        <div>
            <p>{errorMsg}</p>
        </div>
    );
}


export default InitialPage;