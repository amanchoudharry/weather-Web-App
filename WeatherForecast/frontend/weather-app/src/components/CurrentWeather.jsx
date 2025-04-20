import React, { useState } from "react";

const CurrentWeather = ({ weatherData, unit }) => {
    const [showAqiDetails, setShowAqiDetails] = useState(false);

    if (!weatherData) return null;

    const {
        city,
        temperature,
        condition,
        min,
        max,
        aqi,
        co,
        no2,
        o3,
        so2,
        pm2_5,
        pm10,
    } = weatherData;

    const getAqiLevel = (aqi) => {
        if (aqi <= 50) return {
            level: 'Good',
            color: 'from-green-500/20 to-green-500/10',
            textColor: 'text-green-300',
            borderColor: 'border-green-500/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        };
        if (aqi <= 100) return {
            level: 'Moderate',
            color: 'from-yellow-500/20 to-yellow-500/10',
            textColor: 'text-yellow-300',
            borderColor: 'border-yellow-500/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        };
        if (aqi <= 150) return {
            level: 'Unhealthy for Sensitive Groups',
            color: 'from-orange-500/20 to-orange-500/10',
            textColor: 'text-orange-300',
            borderColor: 'border-orange-500/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        };
        if (aqi <= 200) return {
            level: 'Unhealthy',
            color: 'from-red-500/20 to-red-500/10',
            textColor: 'text-red-300',
            borderColor: 'border-red-500/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        };
        if (aqi <= 300) return {
            level: 'Very Unhealthy',
            color: 'from-purple-500/20 to-purple-500/10',
            textColor: 'text-purple-300',
            borderColor: 'border-purple-500/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
            )
        };
        return {
            level: 'Hazardous',
            color: 'from-red-900/20 to-red-900/10',
            textColor: 'text-red-400',
            borderColor: 'border-red-900/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01" />
                </svg>
            )
        };
    };

    const aqiInfo = getAqiLevel(aqi);

    return (
        <div className="text-white text-center py-8 px-4">
            <h2 className="text-3xl font-semibold">{city}</h2>
            <p className="text-sm text-gray-300">{condition} {max}{unit}/{min}{unit}</p>

            <div className="text-[8rem] font-light leading-none my-4">
                {temperature}{unit}
            </div>

            <div className="relative">
                <button 
                    className="flex justify-center items-center gap-2 mx-auto bg-blue-500/10 backdrop-blur-md px-4 py-2 rounded-full text-sm 
                        transition-all duration-300 hover:border-white/20"
                    onClick={() => setShowAqiDetails(!showAqiDetails)}
                    onMouseEnter={() => setShowAqiDetails(true)}
                    onMouseLeave={() => setShowAqiDetails(false)}
                >
                    <span className={`bg-gradient-to-br ${aqiInfo.color} backdrop-blur-md px-4 py-2 rounded-full text-sm 
                        transition-all duration-300 border ${aqiInfo.borderColor} hover:border-white/20 
                        ${aqiInfo.textColor} flex items-center gap-2`}
                    >
                        <span>{aqiInfo.icon}</span>
                        AQI {aqi} - {aqiInfo.level}
                    </span>
                </button>

                {showAqiDetails && (
                    <div className="absolute z-10 mt-2 p-4 backdrop-blur-md rounded-xl 
                        bg-gradient-to-br from-black/30 to-black/20
                        shadow-lg w-72 left-1/2 transform -translate-x-1/2 border border-white/10">
                        <div className={`flex items-center gap-2 mb-4 pb-3 border-b ${aqiInfo.borderColor}`}>
                            <span className={`p-2 rounded-full bg-gradient-to-br ${aqiInfo.color} 
                                backdrop-blur-sm ${aqiInfo.textColor} border ${aqiInfo.borderColor}`}>
                                {aqiInfo.icon}
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold">Air Quality</h3>
                                <p className={`text-sm ${aqiInfo.textColor}`}>{aqiInfo.level}</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Carbon Monoxide</span>
                                <span className="font-medium">{co?.toFixed(1)} μg/m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Nitrogen Dioxide</span>
                                <span className="font-medium">{no2?.toFixed(1)} μg/m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Ozone</span>
                                <span className="font-medium">{o3?.toFixed(1)} μg/m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Sulfur Dioxide</span>
                                <span className="font-medium">{so2?.toFixed(1)} μg/m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">PM2.5</span>
                                <span className="font-medium">{pm2_5?.toFixed(1)} μg/m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">PM10</span>
                                <span className="font-medium">{pm10?.toFixed(1)} μg/m³</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 text-xs text-gray-400 border-t border-white/10">
                            <p>Based on US EPA Air Quality Index</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentWeather;
