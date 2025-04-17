package com.Weather_App.WeatherForecast.controller;

import com.Weather_App.WeatherForecast.model.WeatherResponse;
import com.Weather_App.WeatherForecast.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentWeather(@RequestParam String city) {
        try {
            WeatherResponse response = weatherService.getCurrentWeather(city);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hourly")
    public ResponseEntity<?> getHourlyForecast(@RequestParam String city) {
        try {
            List<WeatherResponse> response = weatherService.getHourlyForecast(city);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/daily")
    public ResponseEntity<?> getDailyForecast(@RequestParam String city) {
        try {
            List<WeatherResponse> response = weatherService.getDailyForecast(city);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
