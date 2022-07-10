import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import { loadCitiesPage } from "../CitiesPage/Actions";
import { useToken } from "../../common/useToken";
import CitiesPage from "../CitiesPage/CitiesPage";
import { initiateLogin, initiateLogout, verifyToken } from "./Actions";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const InitialPage = () => {
  const dispatch = useDispatch();
  const { token, saveToken, removeToken } = useToken();

  const citiesPage = useSelector((state) => state.citiesPage.citiesPage);
  const isAuthenticated = useSelector(
    (state) => state.initialPage.isAuthenticated
  );
  const isAuthenticating = useSelector(
    (state) => state.initialPage.retrievingData?.authenticating
  );
  const isFailedToLoadCityData = useSelector(
    (state) => state.citiesPage.isFailedToLoadData
  );

  const login = (username, password) => {
    dispatch(initiateLogin(username, password, saveToken));
  };

  const logout = () => {
    removeToken();
    if (isAuthenticated) {
      dispatch(initiateLogout());
    }
  };

  if (token && !isAuthenticated && !isAuthenticating) {
    dispatch(verifyToken(token, removeToken));
  }

  if (isAuthenticated) {
    if (!citiesPage.content) {
      loadNewPage(dispatch, token, 0);
    }

    if (citiesPage.content) {
      return (
        <div>
          <Logout logout={logout} />
          <CitiesPage token={token} />
        </div>
      );
    } else if (isFailedToLoadCityData) {
      return (
        <div>
          <Logout logout={logout} />
          <LoginError errorMsg="Cities loading error" />
        </div>
      );
    } else {
      return <Loading />;
    }
  }

  if (isAuthenticating) {
    return <Loading />;
  }

  return <LoginPage login={login} />;
};

const loadNewPage = (dispatch, token, pageNo) => {
  dispatch(loadCitiesPage(token, pageNo));
};

const Logout = ({ logout }) => {
  const onLogout = (event) => {
    event.preventDefault();
    logout();
  };
  return (
    <div className={"absoluteRight"}>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

const Loading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

const LoginError = ({ errorMsg }) => {
  return (
    <div>
      <p>{errorMsg}</p>
    </div>
  );
};

export default InitialPage;
