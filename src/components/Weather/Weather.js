import React from 'react';

const Weather = props => {
    return(
        <div className='weather-wrapper' style={style}>
            <p><strong>City</strong>: {props.city}</p>
            <p><strong>Country</strong>: {props.country}</p>
            <p><strong>Temperature</strong>: {props.temperature} </p>
            <p><strong>Feels Like</strong>: {props.feel_like_temp}</p>
            <p><strong>Humidity</strong>: {props.humidity}</p>
            <p><strong>Description</strong>: {props.description}</p>
        </div>
    );
}

const style = {
    marginTop: '50px',
}

export default Weather;