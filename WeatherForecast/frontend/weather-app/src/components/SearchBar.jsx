import React, { useState, useEffect, useRef } from 'react';
import axios from '../axiosInstance';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchTimeout = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Add click outside listener
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`/cities?query=${searchQuery}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(true);

        // Clear existing timeout
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        // Set new timeout for debouncing
        searchTimeout.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
    };

    const handleSuggestionClick = (cityName) => {
        setQuery(cityName);
        setShowSuggestions(false);
        onSearch(cityName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="relative mb-6" ref={wrapperRef}>
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                    className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && (query.trim() !== '') && (
                <div className="absolute w-full mt-1 bg-[#1f2f45] border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loading ? (
                        <div className="px-4 py-2 text-gray-400">Loading...</div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((city, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-white/10 text-white"
                                onClick={() => handleSuggestionClick(city.name)}
                            >
                                {city.name}, {city.country}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-400">No cities found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 