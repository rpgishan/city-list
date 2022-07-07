import React, { useState } from "react";
import "./LoginPage.scss";

const LoginPage = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginButtonClicked = (event) => {
    event.preventDefault();

    login(username, password);
  };

  return (
    <div className="wrapper">
      <form className="login">
        <p className="title">Log in</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          autoFocus
        />
        <i className="fa fa-user" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <i className="fa fa-key" />
        <button onClick={loginButtonClicked}>
          <i className="spinner" />
          <span className="state">Log in</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
