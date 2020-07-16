import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WeatherCard.css';

const WeatherCard = (props) => {
    const [currentUnit, setCurrentUnit] = useState('C');
    const [temperature, setTemperature] = useState(props.temperature - 273);
    const [minimumtemperature, setMinimumTemperature] = useState(props.minimumTemperature - 273);
    const [maximumTemperature, setMaximumTemperature] = useState(props.maximumTemperature - 273);

    const switchToFahrenheit = () => {
        setCurrentUnit('F');
    };

    const switchToCelsius = () => {
        setCurrentUnit('C');
    };

    useEffect(() => {
        if (currentUnit === 'C') {
            setTemperature(props.temperature - 273);
            setMinimumTemperature(props.minimumTemperature - 273);
            setMaximumTemperature(props.maximumTemperature - 273);
        } else {
            setTemperature(props.temperature * (9 / 5) - 459.67);
            setMinimumTemperature(props.minimumTemperature * (9 / 5) - 459.67);
            setMaximumTemperature(props.maximumTemperature * (9 / 5) - 459.67);
        }
    }, [currentUnit, props.temperature, props.maximumTemperature, props.minimumTemperature]);

	return (
		<div id="weather-card">
			<div id="city-name">
				<h2>{props.cityName.toUpperCase()}</h2>
			</div>
            <div id="toggle-units-buttons">
                <button onClick={switchToCelsius}>°C</button>
                <button onClick={switchToFahrenheit}>°F</button>
            </div>
			<div id="icon">
				<img
					src={`http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`}
					alt={props.weatherDescription}
				/>
			</div>
			<div id="weather-conditions">
				<span id="weather-main">{props.weatherMain}</span>
                <br></br>
				<span id="weather-description">{props.weatherDescription}</span>
			</div>
			<div id="temperatures">
				<div id="main-temperature">
					<span>{Math.round(temperature)}°</span>
				</div>
				<div id="min-max-temperatures">
					<span>
						{Math.round(minimumtemperature)}° | {Math.round(maximumTemperature)}°F
					</span>
				</div>
			</div>
		</div>
	);
};

WeatherCard.propTypes = {
	cityName: PropTypes.string,
	weatherIcon: PropTypes.string,
	weatherDescription: PropTypes.string,
	weatherMain: PropTypes.string,
	temperature: PropTypes.number,
	minimumTemperature: PropTypes.number,
	maximumTemperature: PropTypes.number,
};

export default WeatherCard;
