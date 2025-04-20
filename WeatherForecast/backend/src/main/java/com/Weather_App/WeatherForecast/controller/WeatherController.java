package com.Weather_App.WeatherForecast.controller;

import com.Weather_App.WeatherForecast.model.WeatherResponse;
import com.Weather_App.WeatherForecast.service.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class WeatherController {

    private static final Logger logger = LoggerFactory.getLogger(WeatherController.class);

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/detect-location")
    public ResponseEntity<?> detectLocation(
            @RequestParam(required = false) String ip,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon) {
        try {
            logger.info("Attempting to detect location for coordinates: lat={}, lon={}", lat, lon);
            Map<String, Object> location = weatherService.detectLocation(ip, lat, lon);
            if (location == null || location.isEmpty()) {
                logger.warn("No location data found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Unable to detect location. Please try again or provide a specific location.");
            }
            return ResponseEntity.ok(location);
        } catch (Exception e) {
            logger.error("Error detecting location: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error detecting location: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchLocations(@RequestParam String query) {
        try {
            List<Map<String, Object>> locations = weatherService.searchLocations(query);
            return ResponseEntity.ok(locations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error searching locations: " + e.getMessage());
        }
    }

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
