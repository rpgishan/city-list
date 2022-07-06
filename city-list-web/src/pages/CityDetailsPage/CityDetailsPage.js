import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Route} from "react-router-dom";
import InitialPage from "../InitialPage/InitialPage";
import {coreAPI} from "../../common/constants";

const CityDetailsPage = (props) => {

    const token = useSelector(state => state.loginPage.token);
    const id = props.match.params.id;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    };
    const url = "http://" + coreAPI.host + ":" + coreAPI.port + "/city/" + id

    useEffect(() => {
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setCity(data);
                    setIsLoaded(true);
                },
                (err) => {
                    setIsLoaded(true);
                    setError(err);
                }
            )
    }, [])

    if (token) {
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        if (city) {
            return (
                <div>
                    <h1>{city.name}</h1>
                    <p>
                        <img src={city.photo} width={1000} height={500} alt={city.name}/>
                    </p>
                </div>
            );
        }
    } else {
        return (
            <Route exact path="/" component={InitialPage}/>
        )
    }


}
export default CityDetailsPage;