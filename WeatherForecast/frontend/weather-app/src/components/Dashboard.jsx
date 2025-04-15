import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

function Dashboard() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get('/weather/London')
            .then(res => setWeather(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Current Weather</h2>
            {weather ? (
                <div>
                    <p>Temperature: {weather.temp} °C</p>
                    <p>Description: {weather.description}</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default Dashboard;