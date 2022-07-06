import {useState} from 'react';

export const useToken = () => {
    // const dispatch = useDispatch();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        console.log('tokenString ',tokenString)
        const userToken = JSON.parse(tokenString);
        console.log('userToken ',userToken)
        return userToken||false;
    };

    const [token, setToken] = useState(getToken());
    // const setToken =(token) => {
    //     // dispatch(setTokenInStore(token));
    // };

    const saveToken = userToken => {
        console.log('saveToken - userToken - ',userToken)
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    // const token = getToken()

    console.log('useToken token - ',token);
    // setToken(token);

    return {
        setToken: saveToken,
        token
    }
}