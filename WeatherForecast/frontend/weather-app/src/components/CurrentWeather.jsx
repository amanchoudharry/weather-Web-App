import React from "react";

const CurrentWeather = ({ weatherData }) => {
    if (!weatherData) return null;

    const {
        city,
        temperature,
        condition,
        min,
        max,
        aqi,
    } = weatherData;

    return (
        <div className="text-white text-center py-8 px-4">
            <h2 className="text-3xl font-semibold">{city}</h2>
            <p className="text-sm text-gray-300">{condition} {max}°/{min}°</p>

            <div className="text-[8rem] font-light leading-none my-4">
                {temperature}°
            </div>

            <div className="flex justify-center items-center gap-2">
        <span className="bg-white/10 px-4 py-1 rounded-full text-sm">
          AQI {aqi}
        </span>
            </div>
        </div>
    );
};

export default CurrentWeather;
