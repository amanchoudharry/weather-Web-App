import React from 'react';

const HourlyForecast = ({ hourlyData, unit }) => {
    if (!hourlyData || hourlyData.length === 0) return null;

    return (
        <div className="bg-white/10 rounded-xl p-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
            <div className="flex overflow-x-auto gap-4 pb-2">
                {hourlyData.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[80px] bg-white/5 rounded-lg p-2">
                        <span className="text-sm text-gray-300">{hour.time}</span>
                        <img 
                            src={`https:${hour.icon}`} 
                            alt={hour.condition}
                            className="w-12 h-12 my-1"
                        />
                        <span className="text-lg font-medium">
                            {Math.round(hour.temperature)}{unit}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
                            </svg>
                            <span className="text-xs text-gray-400">{hour.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L8 7h8L12 2zm0 20l4-5H8l4 5z"/>
                            </svg>
                            <span className="text-xs text-gray-400">{hour.windSpeed} m/s</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast; 