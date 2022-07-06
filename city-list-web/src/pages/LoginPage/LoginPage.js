import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login} from "./Actions";
import {useHistory} from "react-router-dom";

const LoginPage = (setToken) => {

    const defaultUsername = "gishan";
    const defaultPassword = "youshallpass";
    const dispatch = useDispatch();
    // const history = useHistory()

    const [username, setUsername] = useState(defaultUsername);
    const [password, setPassword] = useState(defaultPassword);

    const handleUsernameChange = event => {
        setUsername(event.target.value);

        console.log('value is:', event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);

        console.log('value is:', event.target.value);
    };

    const loginButtonClicked = (event) => {
        event.preventDefault();

        dispatch(login(username, password,setToken));
        // history.push('/')
    };


    return (
        <div>
            <h1>Log In</h1>
            <div>
                <p>
                    <span>Username </span>
                    <input type="text" value={username}
                           onChange={handleUsernameChange} placeholder="Username"/>
                </p>
                <p>
                    <span>Password </span>
                    <input type="password" value={password}
                           onChange={handlePasswordChange} placeholder="password"/>
                </p>
                <p>
                    <button type="button" onClick={loginButtonClicked}>Login</button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
