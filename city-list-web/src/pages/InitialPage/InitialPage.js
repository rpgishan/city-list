import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import { loadCitiesPage } from "../CitiesPage/Actions";
import { useToken } from "../../common/useToken";
import CitiesPage from "../CitiesPage/CitiesPage";
import { initiateLogin, initiateLogout } from "./Actions";

const InitialPage = () => {
  const dispatch = useDispatch();
  const { token, saveToken, removeToken } = useToken();

  const citiesPage = useSelector((state) => state.citiesPage.citiesPage);
  const isFailedToLoadCityData = useSelector(
    (state) => state.citiesPage.isFailedToLoadData
  );

  const isValidToken = `${token}`.startsWith("Bearer ");

  const login = (username, password) => {
    dispatch(initiateLogin(username, password, saveToken));
  };

  const logout = () => {
    removeToken();
    if (isValidToken) {
      dispatch(initiateLogout());
    }
  };

  if (isValidToken) {
    if (!citiesPage.content) {
      loadNewPage(dispatch, token, 0);
    }

    if (citiesPage.content) {
      return <CitiesPage token={token} logout={logout} />;
    } else if (isFailedToLoadCityData) {
      return <LoginError errorMsg="Cities loading error" />;
    } else {
      return <Loading />;
    }
  }
  return <LoginPage login={login} />;
};

const loadNewPage = (dispatch, token, pageNo) => {
  dispatch(loadCitiesPage(token, pageNo));
};

const Loading = () => {
  return <h1>Loading...</h1>;
};

const LoginError = ({ errorMsg }) => {
  return (
    <div>
      <p>{errorMsg}</p>
    </div>
  );
};

export default InitialPage;
