import React, { useState, useEffect}  from 'react';

const City = (props) => {
    const id = props.match.params.id;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaXNoYW4iLCJleHAiOjE2NTcwNTA3NDMsImlhdCI6MTY1NzAzMjc0M30.MGtuOA68qKRv3hF4DOa6pZPCKKv2NMTsnWX7EJ3WFZ_Af_FO0sMviKfYU4UJ5H-NhDcDUI2tJTjEdGxZeWUThw'
        },
    };

    useEffect(() => {
        fetch("http://localhost:8082/city/" + id,requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setCity(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
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
}
export default City;