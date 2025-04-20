import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import * as maptilerweather from '@maptiler/weather';

const WeatherMap = ({ selectedLayer = 'wind' }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [weatherLayer, setWeatherLayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    maptilersdk.config.apiKey = 'qHdkqfOEO9akcsAcJozH';

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BACKDROP,
      zoom: 2,
      center: [0, 40],
      projection: 'globe',
      projectionControl: true
    });

    map.current.on('load', () => {
      map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
      
      // Initialize weather layer based on selected type
      let layer;
      switch(selectedLayer) {
        case 'wind':
          layer = new maptilerweather.WindLayer();
          break;
        case 'precipitation':
          layer = new maptilerweather.PrecipitationLayer();
          break;
        case 'temperature':
          layer = new maptilerweather.TemperatureLayer();
          break;
        case 'pressure':
          layer = new maptilerweather.PressureLayer();
          break;
        case 'radar':
          layer = new maptilerweather.RadarLayer();
          break;
        default:
          layer = new maptilerweather.WindLayer();
      }

      map.current.addLayer(layer, 'Water');
      setWeatherLayer(layer);

      // Set up layer events
      layer.on("sourceReady", () => {
        const currentDate = layer.getAnimationTimeDate();
        setCurrentTime(currentDate);
      });

      layer.on("tick", () => {
        setCurrentTime(layer.getAnimationTimeDate());
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [selectedLayer]);

  const toggleAnimation = () => {
    if (weatherLayer) {
      if (isPlaying) {
        weatherLayer.animateByFactor(0);
      } else {
        weatherLayer.animateByFactor(3600);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">
            {selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)}
          </span>
          <button
            onClick={toggleAnimation}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
        
        {currentTime && (
          <div className="text-white text-sm">
            {currentTime.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherMap; 