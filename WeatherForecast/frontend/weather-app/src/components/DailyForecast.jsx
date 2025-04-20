import React from 'react';

const DailyForecast = ({ dailyData, unit }) => {
    if (!dailyData || dailyData.length === 0) return null;

    // Format date to show day name and date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Show only weekday on mobile, full date on larger screens
        return {
            short: date.toLocaleDateString('en-US', { weekday: 'short' }),
            full: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        };
    };

    // Calculate temperature bar width
    const getTemperatureBarWidth = (min, max) => {
        // Always show full width since we're displaying min to max range
        return "100%";
    };

    return (
        <div className="bg-white/10 rounded-xl p-2 sm:p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2 sm:mb-4 px-2">7-Day Forecast</h3>
            <div className="space-y-2 sm:space-y-4">
                {dailyData.map((day, index) => {
                    const date = formatDate(day.date);
                    return (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/5 p-2 sm:p-3 rounded-lg gap-2 sm:gap-0">
                        {/* Date - Responsive */}
                        <span className="text-gray-300 w-full sm:w-24">
                            <span className="sm:hidden">{date.short}</span>
                            <span className="hidden sm:inline">{date.full}</span>
                        </span>

                        {/* Weather Icon and Condition - Responsive */}
                        <div className="flex items-center gap-2 w-full sm:w-32">
                            <img 
                                src={`https:${day.icon}`} 
                                alt={day.condition}
                                className="w-8 h-8"
                            />
                            <span className="text-sm text-gray-300 line-clamp-1">{day.condition}</span>
                        </div>

                        {/* Temperature Range - Responsive */}
                        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L8 7h8L12 2zm0 20l4-5H8l4 5z"/>
                                </svg>
                                <span className="text-gray-300 text-sm sm:text-base">{Math.round(day.min)}{unit}</span>
                            </div>
                            <div className="w-16 sm:w-24 h-2 bg-gray-600/30 rounded-full">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                                    style={{ 
                                        width: getTemperatureBarWidth(day.min, day.max)
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L8 7h8L12 2zm0 20l4-5H8l4 5z" transform="rotate(180 12 12)"/>
                                </svg>
                                <span className="text-gray-300 text-sm sm:text-base">{Math.round(day.max)}{unit}</span>
                            </div>
                        </div>

                        {/* Wind Speed - Responsive */}
                        <div className="flex items-center gap-1 text-sm text-gray-400 w-full sm:w-auto justify-end">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L8 7h8L12 2zm0 20l4-5H8l4 5z"/>
                            </svg>
                            <span>{Math.round(day.windSpeed)} m/s</span>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
};

export default DailyForecast; 