package com.Weather_App.WeatherForecast.service;

import com.Weather_App.WeatherForecast.model.WeatherResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);

    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("EEE, MMM d");

    public WeatherResponse getCurrentWeather(String city) {
        try {
            logger.info("Fetching current weather for city: {}", city);
            String url = String.format(
                "https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric",
                city, apiKey
            );
            logger.debug("API URL: {}", url);

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response == null) {
                logger.error("Null response received from OpenWeatherMap API");
                throw new RuntimeException("Failed to fetch weather data");
            }

            // Check if the response contains an error message
            if (response.containsKey("message")) {
                String errorMessage = (String) response.get("message");
                logger.error("OpenWeatherMap API error: {}", errorMessage);
                throw new RuntimeException(errorMessage);
            }

            return mapToWeatherResponse(response, city);
        } catch (HttpClientErrorException e) {
            logger.error("HTTP error fetching weather data: {}", e.getMessage());
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("City not found: " + city);
            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("Invalid API key");
            }
            throw new RuntimeException("Error fetching weather data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch weather data: " + e.getMessage());
        }
    }

    public List<WeatherResponse> getHourlyForecast(String city) {
        try {
            logger.info("Fetching hourly forecast for city: {}", city);
            String url = String.format(
                "https://api.openweathermap.org/data/2.5/forecast?q=%s&appid=%s&units=metric",
                city, apiKey
            );
            logger.debug("API URL: {}", url);

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response == null) {
                logger.error("Null response received from OpenWeatherMap API");
                throw new RuntimeException("Failed to fetch forecast data");
            }

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> list = (List<Map<String, Object>>) response.get("list");
            if (list == null) {
                logger.error("Invalid forecast data format");
                throw new RuntimeException("Invalid forecast data format");
            }
            
            List<WeatherResponse> hourlyForecast = new ArrayList<>();
            for (int i = 0; i < Math.min(24, list.size()); i++) {
                Map<String, Object> item = list.get(i);
                WeatherResponse weather = mapToWeatherResponse(item, city);
                hourlyForecast.add(weather);
            }
            
            return hourlyForecast;
        } catch (HttpClientErrorException e) {
            logger.error("Error fetching forecast data: {}", e.getMessage());
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("City not found: " + city);
            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("Invalid API key. Please check your configuration.");
            }
            throw new RuntimeException("Failed to fetch forecast data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            throw new RuntimeException("An unexpected error occurred: " + e.getMessage());
        }
    }

    public List<WeatherResponse> getDailyForecast(String city) {
        try {
            logger.info("Fetching daily forecast for city: {}", city);
            String url = String.format(
                "https://api.openweathermap.org/data/2.5/forecast?q=%s&appid=%s&units=metric",
                city, apiKey
            );
            logger.debug("API URL: {}", url);

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response == null) {
                logger.error("Null response received from OpenWeatherMap API");
                throw new RuntimeException("Failed to fetch forecast data");
            }

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> list = (List<Map<String, Object>>) response.get("list");
            if (list == null) {
                logger.error("Invalid forecast data format");
                throw new RuntimeException("Invalid forecast data format");
            }
            
            List<WeatherResponse> dailyForecast = new ArrayList<>();
            String currentDate = "";
            
            for (Map<String, Object> item : list) {
                long dt = ((Number) item.get("dt")).longValue();
                LocalDateTime dateTime = LocalDateTime.ofInstant(
                    Instant.ofEpochSecond(dt),
                    ZoneId.systemDefault()
                );
                String date = dateTime.format(dateFormatter);
                
                if (!date.equals(currentDate)) {
                    WeatherResponse weather = mapToWeatherResponse(item, city);
                    weather.setDate(date);
                    dailyForecast.add(weather);
                    currentDate = date;
                }
            }
            
            return dailyForecast;
        } catch (HttpClientErrorException e) {
            logger.error("Error fetching forecast data: {}", e.getMessage());
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("City not found: " + city);
            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("Invalid API key. Please check your configuration.");
            }
            throw new RuntimeException("Failed to fetch forecast data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            throw new RuntimeException("An unexpected error occurred: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private WeatherResponse mapToWeatherResponse(Map<String, Object> data, String city) {
        WeatherResponse response = new WeatherResponse();
        response.setCity(city);
        
        // Extract coordinates
        Map<String, Object> coord = (Map<String, Object>) data.get("coord");
        if (coord != null) {
            response.setLatitude(((Number) coord.get("lat")).doubleValue());
            response.setLongitude(((Number) coord.get("lon")).doubleValue());
        }
        
        // Extract main weather data
        Map<String, Object> main = (Map<String, Object>) data.get("main");
        if (main != null) {
            response.setTemperature(((Number) main.get("temp")).doubleValue());
            response.setFeelsLike(((Number) main.get("feels_like")).doubleValue());
            response.setMin(((Number) main.get("temp_min")).doubleValue());
            response.setMax(((Number) main.get("temp_max")).doubleValue());
            response.setPressure(((Number) main.get("pressure")).intValue());
            response.setHumidity(((Number) main.get("humidity")).intValue());
        }
        
        // Extract weather conditions
        List<Map<String, Object>> weather = (List<Map<String, Object>>) data.get("weather");
        if (weather != null && !weather.isEmpty()) {
            Map<String, Object> weatherData = weather.get(0);
            response.setCondition((String) weatherData.get("main"));
            response.setDescription((String) weatherData.get("description"));
            response.setIcon((String) weatherData.get("icon"));
        }
        
        // Extract wind data
        Map<String, Object> wind = (Map<String, Object>) data.get("wind");
        if (wind != null) {
            response.setWindSpeed(((Number) wind.get("speed")).doubleValue());
            response.setWindDirection(((Number) wind.get("deg")).intValue());
            if (wind.containsKey("gust")) {
                response.setWindGust(((Number) wind.get("gust")).doubleValue());
            }
        }
        
        // Extract visibility
        if (data.containsKey("visibility")) {
            response.setVisibility(((Number) data.get("visibility")).intValue());
        }
        
        // Extract clouds
        Map<String, Object> clouds = (Map<String, Object>) data.get("clouds");
        if (clouds != null) {
            response.setCloudiness(((Number) clouds.get("all")).intValue());
        }
        
        // Extract timestamp
        if (data.containsKey("dt")) {
            long dt = ((Number) data.get("dt")).longValue();
            LocalDateTime dateTime = LocalDateTime.ofInstant(
                Instant.ofEpochSecond(dt),
                ZoneId.systemDefault()
            );
            response.setTime(dateTime.format(timeFormatter));
            response.setDate(dateTime.format(dateFormatter));
        }
        
        // Extract sunrise and sunset
        Map<String, Object> sys = (Map<String, Object>) data.get("sys");
        if (sys != null) {
            if (sys.containsKey("sunrise")) {
                long sunrise = ((Number) sys.get("sunrise")).longValue();
                response.setSunrise(LocalDateTime.ofInstant(
                    Instant.ofEpochSecond(sunrise),
                    ZoneId.systemDefault()
                ).format(timeFormatter));
            }
            if (sys.containsKey("sunset")) {
                long sunset = ((Number) sys.get("sunset")).longValue();
                response.setSunset(LocalDateTime.ofInstant(
                    Instant.ofEpochSecond(sunset),
                    ZoneId.systemDefault()
                ).format(timeFormatter));
            }
        }
        
        return response;
    }
}
