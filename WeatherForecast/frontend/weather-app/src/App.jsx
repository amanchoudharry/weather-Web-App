import React, { useEffect, useState } from "react";
import axios from "./axiosInstance";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import WeatherDetails from "./components/WeatherDetails";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true);

    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
    };

    const convertTemperature = (data) => {
        if (!data) return null;

        if (Array.isArray(data)) {
            return data.map(item => ({
                ...item,
                temp: item.temperature || item.temp,
                temperature: item.temperature,
                min: item.min,
                max: item.max,
                ...((!isCelsius && {
                    temp: celsiusToFahrenheit(item.temperature || item.temp).toFixed(2),
                    temperature: item.temperature ? celsiusToFahrenheit(item.temperature).toFixed(2) : undefined,
                    min: item.min ? celsiusToFahrenheit(item.min).toFixed(2) : undefined,
                    max: item.max ? celsiusToFahrenheit(item.max).toFixed(2) : undefined
                }))
            }));
        }

        if (isCelsius) {
            return data;
        }

        return {
            ...data,
            temperature: celsiusToFahrenheit(data.temperature).toFixed(2),
            min: data.min ? celsiusToFahrenheit(data.min).toFixed(2) : undefined,
            max: data.max ? celsiusToFahrenheit(data.max).toFixed(2) : undefined
        };
    };

    const fetchWeatherData = async (city = "Patna") => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch current weather
            const currentResponse = await axios.get(`/weather/current?city=${city}`);
            setWeatherData(currentResponse.data);

            // Fetch hourly forecast
            const hourlyResponse = await axios.get(`/weather/hourly?city=${city}`);
            setHourlyData(hourlyResponse.data);

            // Fetch daily forecast
            const dailyResponse = await axios.get(`/weather/daily?city=${city}`);
            setDailyData(dailyResponse.data);
        } catch (err) {
            console.error("Error fetching weather data:", err);
            // Handle different types of error responses
            if (err.response?.data) {
                // If the error response has a message field
                if (typeof err.response.data === 'string') {
                    setError(err.response.data);
                } else if (err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError("An error occurred while fetching weather data");
                }
            } else {
                setError(err.message || "Failed to fetch weather data");
            }
            setWeatherData(null);
            setHourlyData([]);
            setDailyData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0e172b] to-[#1f2f45] text-white">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <SearchBar onSearch={fetchWeatherData} />
                <UnitToggle isCelsius={isCelsius} onToggle={setIsCelsius} />
                
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <CurrentWeather 
                            weatherData={convertTemperature(weatherData)} 
                            unit={isCelsius ? "°C" : "°F"} 
                        />
                        <HourlyForecast 
                            hourlyData={convertTemperature(hourlyData)} 
                            unit={isCelsius ? "°C" : "°F"} 
                        />
                        <DailyForecast 
                            dailyData={convertTemperature(dailyData)} 
                            unit={isCelsius ? "°C" : "°F"} 
                        />
                        <WeatherDetails 
                            weatherData={convertTemperature(weatherData)} 
                            unit={isCelsius ? "°C" : "°F"} 
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
