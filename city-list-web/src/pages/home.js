import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cities, setCities] = useState([]);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaXNoYW4iLCJleHAiOjE2NTcwNTA3NDMsImlhdCI6MTY1NzAzMjc0M30.MGtuOA68qKRv3hF4DOa6pZPCKKv2NMTsnWX7EJ3WFZ_Af_FO0sMviKfYU4UJ5H-NhDcDUI2tJTjEdGxZeWUThw'
        },
    };
    useEffect(() => {
        fetch("http://localhost:8082/city", requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setCities(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <ul>
            {cities.map(city => (
                <li key={city.id}>
                    <Link to={`city/${city.id}`}>{city.name} - <img src={city.photo} width={100} height={50} alt={city.name}/></Link>
                </li>
            ))}
        </ul>
        );
    }
}
export default Home;