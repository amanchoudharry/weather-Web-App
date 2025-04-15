package com.Weather_App.WeatherForecast.controller;

import com.Weather_App.WeatherForecast.model.WeatherData;
import com.Weather_App.WeatherForecast.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @PostMapping
    public WeatherData addWeather(@RequestBody WeatherData data) {
        return weatherService.saveWeatherData(data);
    }

    @GetMapping
    public List<WeatherData> getAllWeather() {
        return weatherService.getAllWeather();
    }
}
