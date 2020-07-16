import React from 'react';
import './App.css';

const App = () => {
	const fetchWeatherInformation = async (location) => {
		try {
			return await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=API_KEY`
			);
		} catch (error) {
			throw new Error('Not able to retrieve data from the server');
		}
	};

	const filterWeatherInformation = async (response) => {
		try {
			const responseData = await response.json();
			return {
				weatherMan: responseData.weather[0].main,
				weatherDescription: responseData.weather[0].description,
				temperature: responseData.main.temp,
				minimumTemperature: responseData.main['temp_min'],
				maximumTemperature: responseData.main['temp_max'],
				cityName: responseData.sys.name,
			};
		} catch (error) {
			throw new Error('Not able to convert fetch to json');
		}
	};

	return <div className="App"></div>;
};

export default App;
