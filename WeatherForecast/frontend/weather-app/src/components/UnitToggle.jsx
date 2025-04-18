import React from 'react';

const UnitToggle = ({ isCelsius, onToggle }) => {
    return (
        <div className="flex justify-center mb-4">
            <div className="bg-white/10 rounded-full p-1 flex">
                <button
                    className={`px-4 py-1 rounded-full transition-colors ${
                        isCelsius ? 'bg-blue-500 text-white' : 'text-gray-300'
                    }`}
                    onClick={() => onToggle(true)}
                >
                    °C
                </button>
                <button
                    className={`px-4 py-1 rounded-full transition-colors ${
                        !isCelsius ? 'bg-blue-500 text-white' : 'text-gray-300'
                    }`}
                    onClick={() => onToggle(false)}
                >
                    °F
                </button>
            </div>
        </div>
    );
};

export default UnitToggle; 