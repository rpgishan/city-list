import React from 'react';

const CityDetails = ({city}) => {

    if (city.id && city.name && city.photo) {
        return (
            <div>
                <h1>{city.id} - {city.name}</h1>
                <p>
                    <img src={city.photo} alt={city.name}/>
                </p>
            </div>
        );
    } else {
        return (
            <div>no selected city</div>
        );
    }

};

export default CityDetails;