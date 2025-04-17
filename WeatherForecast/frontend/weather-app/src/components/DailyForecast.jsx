import React from 'react';

const DailyForecast = ({ dailyData }) => {
    if (!dailyData || dailyData.length === 0) return null;

    return (
        <div className="bg-white/10 rounded-xl p-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
            <div className="space-y-4">
                {dailyData.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{day.date}</span>
                        <div className="flex items-center gap-2">
                            <img 
                                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                                alt={day.condition}
                                className="w-8 h-8"
                            />
                            <span className="text-sm">{day.condition}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-300">{day.min}°</span>
                            <div className="w-16 h-1 bg-gray-600 rounded-full">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                                    style={{ width: `${(day.temp - day.min) / (day.max - day.min) * 100}%` }}
                                />
                            </div>
                            <span>{day.max}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast; 