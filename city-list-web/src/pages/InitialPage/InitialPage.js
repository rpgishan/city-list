import React from "react";
import {useSelector} from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import {BrowserRouter, Redirect, useHistory} from "react-router-dom";

const InitialPage = () => {
    const token = useSelector(state => state.loginPage.token);
    const isAuthenticated = useSelector(state => state.loginPage.isAuthenticated);
    const isTokenReceiving = useSelector(state => state.loginPage.retrievingToken.pending);
    const tokenRetrievalFailure = useSelector(state => state.loginPage.retrievingToken.failed);

    const history = useHistory()

    if (token) {
        console.log('initial page', token)
        history.push('/city')
        return (
            <BrowserRouter>
                <Redirect to="/city"/>
            </BrowserRouter>)
    }

    // if (!isAuthenticated)
    //     return (<LoginError errorMsg={genericAuthenticationFailure}/>);
    if (isTokenReceiving)
        return (
            <div>Loading</div>
        )
    if (tokenRetrievalFailure)
        return (
            <div>Authentication failure
                <div>
                    <LoginPage/>
                </div>
            </div>
        )


    history.push('/login')
    return (<BrowserRouter>
        <Redirect to="/login"/>
    </BrowserRouter>)
}

const LoginError = ({errorMsg}) => {
    return (
        <div>
            <p>{errorMsg}</p>
        </div>
    );
}


export default InitialPage;