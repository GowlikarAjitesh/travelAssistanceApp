import { useState, useEffect } from "react";
import logo from '../../img/logo.svg';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl library
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
mapboxgl.accessToken = 'pk.eyJ1IjoiYWppdGVzaC1raXR0dSIsImEiOiJjbHNtb3p6ZW8wcWswMmxyMGJuZjU1N2kyIn0.GxjbL0VzOH2-MebPnhN08A';// Replace with your Mapbox access token

const Header = ({ setCoordinates }) => {
    const [search, setSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Fetch data from Mapbox API based on user input
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.features) {
                    // Extract city names from the Mapbox API response
                    const cityNames = data.features.map(feature => feature.place_name);
                    setSuggestions(cityNames);
                }
            })
            .catch(error => console.error('Error fetching suggestions:', error));
    };

    const handleSuggestionClick = (cityName) => {
        // Fetch coordinates for the selected city
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const coordinates = data.features[0].center;
                    setCoordinates({ lat: coordinates[1], lng: coordinates[0] });
                }
            })
            .catch(error => console.error('Error fetching coordinates:', error));
        
        setInputValue(cityName);
        setSuggestions([]); // Clear suggestions
    };

    return (
        <div className="flex items-center w-full p-2 absolute top-0 z-10">
            <div className="flex bg-white justify-between items-center w-full p-3 md:p-4 rounded-sm shadow-md">
                {/* Logo displays only when */}
                {!search && (
                    <img src={logo} alt="letsGo" className="h-6 sm:h-7 md:h-8" />
                )}
                {/* --- */}

                {/* Search Form - Toggle between Hidden and Visible on Mobile, determined by the 'search' state */}
                <div className={`relative w-full md:w-auto md:block ${!search && 'hidden'}`}>
                    {/* Autocomplete enabled Search Input Field */}
                    <input
                        className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-1 md:py-2 pl-10 ring-1 ring-slate-200"
                        type="text"
                        placeholder="Search Location..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    {/* Suggestions dropdown */}
                    {inputValue && (
                        <ul className="absolute w-full bg-white shadow-md mt-1 py-1">
                            {[...suggestions].map((cityName, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer px-3 py-1 hover:bg-gray-200"
                                    onClick={() => handleSuggestionClick(cityName)}
                                >
                                    {cityName}
                                </li>
                            ))}
                        </ul>
                    )}
                    {/* --- */}
                </div>
                {/* --- */}

                {/* Search Form Toggle for Mobile Only */}
                <div
                    className="cursor-pointer md:hidden p-2 -mr-2"

                    // Click Event to toggle Search form state
                    onClick={() => setSearch(!search)}
                >
                    {!search ? (
                        // Search Button - Displays when search = false
                        <svg className="w-5 h-5 transition ease-out duration-1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    ) : (
                        // Close Search Button - Displays when search = true
                        <svg className="w-5 h-5 transition ease-out duration-1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
                {/* --- */}
            </div>
        </div>
    );
}

export default Header;
