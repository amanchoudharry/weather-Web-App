import React from 'react';

const WeatherDetails = ({ weatherData, unit = "°C" }) => {
    if (!weatherData) return null;

    const getWindDirection = (degrees) => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(((degrees % 360) / 22.5));
        return directions[index % 16];
    };

    const formatVisibility = (meters) => {
        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(1)} km`;
        }
        return `${meters} m`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Sunrise & Sunset Card */}
            <div className="bg-white/10 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Sunrise & Sunset</h3>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-500/20 rounded-full mr-4">
                            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L8 6h3v6h2V6h3L12 2zm0 14c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Sunrise</p>
                            <p className="text-xl">{weatherData.sunrise}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 bg-orange-500/20 rounded-full mr-4">
                            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 22L8 18h3v-6h2v6h3l-4 4zm0-14c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Sunset</p>
                            <p className="text-xl">{weatherData.sunset}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wind Information Card */}
            <div className="bg-white/10 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Wind Information</h3>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                            <svg 
                                className="w-6 h-6 text-blue-500" 
                                style={{ transform: `rotate(${weatherData.windDirection}deg)` }}
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L8 7h8L12 2zm0 20l4-5H8l4 5z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Direction</p>
                            <p className="text-xl">{getWindDirection(weatherData.windDirection)}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 bg-teal-500/20 rounded-full mr-4">
                            <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.5 17.5c0 1.38-1.12 2.5-2.5 2.5S9.5 18.88 9.5 17.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm-9-7c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S5.5 11.88 5.5 10.5z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Speed</p>
                            <p className="text-xl">{weatherData.windSpeed} m/s</p>
                            {weatherData.windGust && (
                                <p className="text-sm text-gray-400">
                                    Gust: {weatherData.windGust} m/s
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Visibility Card */}
            <div className="bg-white/10 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Visibility</h3>
                <div className="flex items-center">
                    <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                        <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Current Visibility</p>
                        <p className="text-xl">{formatVisibility(weatherData.visibility)}</p>
                    </div>
                </div>
            </div>

            {/* Feels Like Temperature Card */}
            <div className="bg-white/10 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Feels Like</h3>
                <div className="flex items-center">
                    <div className="p-3 bg-red-500/20 rounded-full mr-4">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2c-1.1 0-2 .9-2 2v7.17c-1.17.41-2 1.52-2 2.83 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.31-.83-2.42-2-2.83V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Feels Like Temperature</p>
                        <p className="text-xl">{weatherData.feelsLike}{unit}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails; 