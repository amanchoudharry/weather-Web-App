"use client"

import React, { useState, useEffect } from 'react';
import axios from "./axiosInstance"
import CurrentWeather from "./components/CurrentWeather"
import DailyForecast from "./components/DailyForecast"
import SearchBar from "./components/SearchBar"
import UnitToggle from "./components/UnitToggle"
import WeatherDetails from "./components/WeatherDetails"
import HourlyTemperatureChart from "./components/HourlyTemperatureChart"
import WeatherBackground from "./components/WeatherBackground"

// Skeleton components
import CurrentWeatherSkeleton from "./components/skeletons/CurrentWeatherSkeleton"
import DailyForecastSkeleton from "./components/skeletons/DailyForecastSkeleton"
import WeatherDetailsSkeleton from "./components/skeletons/WeatherDetailsSkeleton"
import ChartSkeleton from "./components/skeletons/ChartSkeleton"

const App = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [hourlyForecast, setHourlyForecast] = useState(null)
  const [dailyForecast, setDailyForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isCelsius, setIsCelsius] = useState(true)

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32
  }

  const convertTemperature = (data) => {
    if (!data) return null

    if (Array.isArray(data)) {
      return data.map((item) => ({
        ...item,
        temp: item.temperature || item.temp,
        temperature: item.temperature,
        min: item.min,
        max: item.max,
        ...(!isCelsius && {
          temp: celsiusToFahrenheit(item.temperature || item.temp).toFixed(2),
          temperature: item.temperature ? celsiusToFahrenheit(item.temperature).toFixed(2) : undefined,
          min: item.min ? celsiusToFahrenheit(item.min).toFixed(2) : undefined,
          max: item.max ? celsiusToFahrenheit(item.max).toFixed(2) : undefined,
        }),
      }))
    }

    if (isCelsius) {
      return data
    }

    return {
      ...data,
      temperature: celsiusToFahrenheit(data.temperature).toFixed(2),
      min: data.min ? celsiusToFahrenheit(data.min).toFixed(2) : undefined,
      max: data.max ? celsiusToFahrenheit(data.max).toFixed(2) : undefined,
    }
  }

  const fetchWeatherData = async (city) => {
    setLoading(true)
    setError(null)
    try {
      // Fetch current weather
      const currentResponse = await axios.get(`/weather/current?city=${encodeURIComponent(city)}`)
      setWeatherData(currentResponse.data)

      // Fetch hourly forecast
      const hourlyResponse = await axios.get(`/weather/hourly?city=${encodeURIComponent(city)}`)
      setHourlyForecast(hourlyResponse.data)

      // Fetch daily forecast
      const dailyResponse = await axios.get(`/weather/daily?city=${encodeURIComponent(city)}`)
      setDailyForecast(dailyResponse.data)
    } catch (err) {
      console.error("Error fetching weather data:", err)
      // Handle different types of error responses
      if (err.response?.data) {
        // If the error response has a message field
        if (typeof err.response.data === "string") {
          setError(err.response.data)
        } else if (err.response.data.error) {
          setError(err.response.data.error)
        } else {
          setError("An error occurred while fetching weather data")
        }
      } else {
        setError(err.message || "Failed to fetch weather data")
      }
      setWeatherData(null)
      setHourlyForecast(null)
      setDailyForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSelect = (city) => {
    fetchWeatherData(city)
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Weather Background */}
      <WeatherBackground condition={weatherData?.condition} />

      {/* Content */}
      <div className="relative w-full min-h-screen px-4 py-6 md:py-8 mx-auto max-w-7xl z-10">
        <div className="flex flex-col h-full gap-4">
          <div className="flex justify-between items-center">
            <SearchBar onLocationSelect={handleLocationSelect} />
            <UnitToggle isCelsius={isCelsius} onToggle={setIsCelsius} />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CurrentWeatherSkeleton />
                <WeatherDetailsSkeleton />
              </div>
              <ChartSkeleton />
              <DailyForecastSkeleton />
            </div>
          ) : weatherData ? (
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CurrentWeather 
                  weatherData={convertTemperature(weatherData)} 
                  unit={isCelsius ? "°C" : "°F"} 
                />
                <WeatherDetails 
                  weatherData={convertTemperature(weatherData)} 
                  unit={isCelsius ? "°C" : "°F"} 
                />
              </div>
              <HourlyTemperatureChart 
                hourlyData={convertTemperature(hourlyForecast)} 
                unit={isCelsius ? "°C" : "°F"}
                locationTime={weatherData?.time} 
              />
              <DailyForecast 
                dailyData={convertTemperature(dailyForecast)} 
                unit={isCelsius ? "°C" : "°F"} 
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-8">
              Search for a city or allow location detection to see weather information
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
