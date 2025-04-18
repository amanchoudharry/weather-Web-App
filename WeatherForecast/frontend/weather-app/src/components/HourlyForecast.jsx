import React from 'react';

const HourlyForecast = ({ hourlyData, unit }) => {
    if (!hourlyData || hourlyData.length === 0) return null;

    return (
        <div className="bg-white/10 rounded-xl p-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
            <div className="flex overflow-x-auto gap-4 pb-2">
                {hourlyData.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[60px]">
                        <span className="text-sm text-gray-300">{hour.time}</span>
                        <img 
                            src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`} 
                            alt={hour.condition}
                            className="w-12 h-12"
                        />
                        <span className="text-lg font-medium">
                            {(hour.temperature || hour.temp || '').toString().split('.')[0]}{unit}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast; 