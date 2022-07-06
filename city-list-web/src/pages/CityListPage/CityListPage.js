import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {coreAPI} from "../../common/constants";

const CityListPage = () => {
    const token = useSelector(state => state.loginPage.token);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cities, setCities] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    };
    const url = "http://" + coreAPI.host + ":" + coreAPI.port + "/city"
    useEffect(() => {
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setCities(data);
                },
                (err) => {
                    setIsLoaded(true);
                    setError(err);
                }
            )
    }, [])

    console.log('city list page 1')
    if (token) {
        console.log('city list page in if ', token)
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {cities.map(city => (
                        <li key={city.id}>
                            <Link to={`/citydetails/${city.id}`}>{city.name} - <img src={city.photo} width={100}
                                                                                    height={50}
                                                                                    alt={city.name}/></Link>
                        </li>
                    ))}
                </ul>
            );
        }
    } else {
        console.log('city list page in else ', token)
        return (
            <BrowserRouter>
                <Redirect to="/"/>
            </BrowserRouter>)
    }
}
export default CityListPage;