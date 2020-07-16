import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
	const [hasError, setHasError] = useState(false);
	const [weather, setWeather] = useState({
		weatherMain: '--',
		weatherDescription: '--',
		weatherIcon: '01d',
		temperature: 273,
		minimumTemperature: 273,
		maximumTemperature: 273,
		cityName: '--',
	});

	const setToDefaultWeatherInformation = async () => {
		try {
			const response = await fetchWeatherInformationWithCity('San Francisco');
			const weatherInformation = await filterWeatherInformation(response);
			setHasError(false);
			setWeather(weatherInformation);
		} catch (error) {
			setHasError(true);
		}
	};

	const setToUserLocation = async () => {
		if (navigator.geolocation) {
			try {
				navigator.geolocation.getCurrentPosition(
          setWeatherInformationFromCoordinates,
          null,
          { timeout: 7000 },
				);
				setHasError(false);
			} catch (error) {
        setHasError(true);
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
		} catch (error) {
			setHasError(true);
		}
  };
  
  const setWeatherInformationFromCoordinates = async (position) => {
    const response = await fetchWeatherInformationWithCoordinates(position);
    const weatherInformation = await filterWeatherInformation(response);
    setWeather(weatherInformation);
  };

	const fetchWeatherInformationWithCoordinates = async (position) => {
		return await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`,
			{
				mode: 'cors',
			}
		);
	};

	const fetchWeatherInformationWithCity = async (city) => {
		return await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
			{
				mode: 'cors',
			}
		);
  };
  
  useEffect(() => {
    setToUserLocation();
  }, []);

	const filterWeatherInformation = async (response) => {
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
	};
  
	return (
		<div
			id="App"
			className={weather.weatherMain !== '--' ? weather.weatherMain : 'Generic'}
		>
			<WeatherCard
				weatherMain={weather.weatherMain}
				weatherDescription={weather.weatherDescription}
				weatherIcon={weather.weatherIcon}
				temperature={weather.temperature}
				minimumTemperature={weather.minimumTemperature}
				maximumTemperature={weather.maximumTemperature}
				cityName={weather.cityName}
			/>
			<SearchBar
				hasError={hasError}
				lookUpWeatherInformation={lookUpWeatherInformation}
			/>
		</div>
	);
};

export default App;
