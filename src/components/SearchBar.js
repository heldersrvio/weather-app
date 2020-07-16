import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = (props) => {
	const [inputValue, setInputValue] = useState('');
	const errorMessage = props.hasError ? (
		<div id="error-message">
			<span>Location could not be found</span>
		</div>
	) : null;
	const handleSearchClick = () => {
		props.lookUpWeatherInformation(inputValue);
	};

	return (
		<div id="search-bar">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			></input>
			<br></br>
			{errorMessage}
			<div id="search-button">
				<button onClick={handleSearchClick}>Search</button>
			</div>
		</div>
	);
};

SearchBar.propTypes = {
	hasError: PropTypes.bool,
	lookUpWeatherInformation: PropTypes.func,
};

export default SearchBar;
