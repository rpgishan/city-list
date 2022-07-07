import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    const userToken = localStorage.getItem("token");
    return userToken || false;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return {
    token,
    saveToken,
    removeToken,
  };
};
