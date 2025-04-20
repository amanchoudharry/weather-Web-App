import React from 'react';

const WeatherMapControls = ({ selectedLayer, onLayerChange }) => {
  const layers = [
    { id: 'wind', label: 'Wind', icon: '🌬️' },
    { id: 'precipitation', label: 'Precipitation', icon: '🌧️' },
    { id: 'temperature', label: 'Temperature', icon: '🌡️' },
    { id: 'pressure', label: 'Pressure', icon: '📊' },
    { id: 'radar', label: 'Radar', icon: '📡' }
  ];

  return (
    <div className="absolute top-4 left-4 bg-black/50 p-2 rounded-lg">
      <div className="flex flex-col gap-2">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => onLayerChange(layer.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              selectedLayer === layer.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span>{layer.icon}</span>
            <span>{layer.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherMapControls; 