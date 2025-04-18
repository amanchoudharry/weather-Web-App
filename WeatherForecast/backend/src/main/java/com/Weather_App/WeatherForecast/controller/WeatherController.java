package com.Weather_App.WeatherForecast.controller;

import com.Weather_App.WeatherForecast.model.WeatherResponse;
import com.Weather_App.WeatherForecast.service.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class WeatherController {

    private static final Logger logger = LoggerFactory.getLogger(WeatherController.class);

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentWeather(@RequestParam String city) {
        try {
            logger.info("Received request for current weather in city: {}", city);
            WeatherResponse response = weatherService.getCurrentWeather(city);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching current weather for city {}: {}", city, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hourly")
    public ResponseEntity<?> getHourlyForecast(@RequestParam String city) {
        try {
            logger.info("Received request for hourly forecast in city: {}", city);
            List<WeatherResponse> response = weatherService.getHourlyForecast(city);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching hourly forecast for city {}: {}", city, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/daily")
    public ResponseEntity<?> getDailyForecast(@RequestParam String city) {
        try {
            logger.info("Received request for daily forecast in city: {}", city);
            List<WeatherResponse> response = weatherService.getDailyForecast(city);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching daily forecast for city {}: {}", city, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
