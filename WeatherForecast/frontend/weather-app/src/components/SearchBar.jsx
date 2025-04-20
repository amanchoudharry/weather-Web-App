import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onLocationSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        // Detect location on component mount
        detectLocation();

        // Click outside handler
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const detectLocation = async () => {
        try {
            setLoading(true);
            
            // Get user's location using browser's geolocation API
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            
            // Fetch location data using coordinates
            const response = await fetch(`http://localhost:8080/api/weather/detect-location?lat=${latitude}&lon=${longitude}`);
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }
            
            const data = await response.json();
            if (data) {
                onLocationSelect(data.city || data.name);
                setQuery(data.city || data.name);
            }
        } catch (error) {
            console.error('Error detecting location:', error);
            // Show error message to user
            alert('Unable to detect your location. Please enable location services or search for a city manually.');
        } finally {
            setLoading(false);
        }
    };

    const searchLocations = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/weather/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error searching locations:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Debounce search
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            searchLocations(value);
        }, 300);
    };

    const handleSuggestionClick = (suggestion) => {
        const locationName = suggestion.name;
        setQuery(locationName);
        setSuggestions([]);
        setShowSuggestions(false);
        onLocationSelect(locationName);
    };

    return (
        <div className="relative w-full max-w-md mx-auto mb-8" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-full 
                        backdrop-blur-sm text-white placeholder-white/50 pr-12
                        focus:outline-none focus:border-white/40 transition-all"
                />
                <button
                    onClick={detectLocation}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 
                        hover:text-white transition-colors"
                    title="Detect my location"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            {/* Loading indicator */}
            {loading && (
                <div className="absolute right-14 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 
                        rounded-full animate-spin"></div>
                </div>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-2 w-full bg-black/40 backdrop-blur-md rounded-xl 
                    border border-white/10 shadow-lg overflow-hidden z-50">
                    <ul className="max-h-60 overflow-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={`${suggestion.id || suggestion.name}-${index}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 hover:bg-white/10 cursor-pointer text-white 
                                    transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4 text-white/70" fill="none" 
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                        strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <div>
                                    <div className="font-medium">{suggestion.name}</div>
                                    {suggestion.region && suggestion.country && (
                                        <div className="text-sm text-white/70">
                                            {suggestion.region}, {suggestion.country}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar; 