package com.Weather_App.WeatherForecast.service;

import com.Weather_App.WeatherForecast.model.WeatherData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Weather_App.WeatherForecast.repository.WeatherRepository;

import java.util.List;

@Service
public class WeatherService {

    @Autowired
    private WeatherRepository weatherRepository;

    public WeatherData saveWeatherData(WeatherData data) {
        return weatherRepository.save(data);
    }

    public List<WeatherData> getAllWeather() {
        return weatherRepository.findAll();
    }
}
