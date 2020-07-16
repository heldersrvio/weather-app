import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [hasError, setHasError] = useState(false);
  const [weather, setWeather] = useState({
    weatherMain: "--",
    weatherDescription: "--",
    weatherIcon: "01d",
    temperature: 273,
    minimumTemperature: 273,
    maximumTemperature: 273,
    cityName: "--",
  });

	const setToDefaultWeatherInformation = async () => {
    try {
      const response = await fetchWeatherInformationWithCity('San Francisco');
      const weatherInformation = await filterWeatherInformation(response);
      setHasError(false);
      setWeather(weatherInformation);
    } catch(error) {
      setHasError(true);
    }
	};

	const setToUserLocation = async () => {
    let weatherInformation;
		if (navigator.geolocation) {
			try {
				const response = navigator.geolocation.getCurrentPosition(
					fetchWeatherInformationWithCoordinates
				);
        weatherInformation = await filterWeatherInformation(response);
        setHasError(false);
        setWeather(weatherInformation);
			} catch (error) {
				setToDefaultWeatherInformation();
			}
		} else {
			setToDefaultWeatherInformation();
    }
  };

	const lookUpWeatherInformation = async (city) => {
    try {
      const response = await fetchWeatherInformationWithCity(city);
      const weatherInformation = await filterWeatherInformation(response);
      setHasError(false);
      setWeather(weatherInformation);
    } catch(error) {
      setHasError(true);
    }
	};

	const fetchWeatherInformationWithCoordinates = async (position) => {
    return await fetch(
      `api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`, {
        mode: 'cors'
      }
    );
	};

	const fetchWeatherInformationWithCity = async (city) => {
    return await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`, {
        mode: 'cors'
      }
    );
	};

	const filterWeatherInformation = async (response) => {
		try {
      const responseData = await response.json();
			return {
				weatherMain: responseData.weather[0].main,
				weatherDescription: responseData.weather[0].description,
				weatherIcon: responseData.weather[0].icon,
				temperature: responseData.main.temp,
				minimumTemperature: responseData.main['temp_min'],
				maximumTemperature: responseData.main['temp_max'],
				cityName: responseData.name,
			};
		} catch (error) {
			throw new Error('Not able to convert fetch to json');
		}
  };

	return (
		<div id="App" className={weather.weatherMain}>
			<WeatherCard
				weatherMain={weather.weatherMain}
				weatherDescription={weather.weatherDescription}
				weatherIcon={weather.weatherIcon}
				temperature={weather.temperature}
				minimumTemperature={weather.minimumTemperature}
				maximumTemperature={weather.maximumTemperature}
				cityName={weather.cityName}
			/>
      <SearchBar hasError={hasError} lookUpWeatherInformation={lookUpWeatherInformation} />
		</div>
	);
};

export default App;
