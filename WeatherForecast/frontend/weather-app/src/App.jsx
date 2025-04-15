import React, { useEffect, useState } from "react";
import axios from "./axiosInstance";
import Dashboard from "./components/Dashboard";
import CurrentWeather from "./components/CurrentWeather";

function App() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        axios
            .get("/weather/current?city=Patna")
            .then((res) => setWeatherData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0e172b] to-[#1f2f45] text-white">
            {/* Xiaomi-Style Hero Section */}
            <CurrentWeather weatherData={weatherData} />

            {/* Heading */}
            <h1 className="text-2xl font-bold px-4 pb-4">Weather Forecast App</h1>

            {/* Dashboard Section */}
            <Dashboard />
        </div>
    );
}

export default App;
