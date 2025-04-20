package com.Weather_App;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class WeatherService {

    @Value("${weatherapi.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private static final String BASE_URL = "http://api.weatherapi.com/v1";

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getCurrentWeather(String city) {
        String url = String.format("%s/current.json?key=%s&q=%s&aqi=no", BASE_URL, apiKey, city);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> weatherData = response.getBody();
        
        Map<String, Object> currentWeather = new HashMap<>();
        Map<String, Object> current = (Map<String, Object>) weatherData.get("current");
        Map<String, Object> location = (Map<String, Object>) weatherData.get("location");
        
        currentWeather.put("city", location.get("name"));
        currentWeather.put("country", location.get("country"));
        currentWeather.put("temperature", current.get("temp_c"));
        currentWeather.put("feels_like", current.get("feelslike_c"));
        currentWeather.put("humidity", current.get("humidity"));
        currentWeather.put("wind_speed", current.get("wind_kph"));
        currentWeather.put("description", ((Map<String, Object>) current.get("condition")).get("text"));
        currentWeather.put("icon", ((Map<String, Object>) current.get("condition")).get("icon"));
        
        return currentWeather;
    }

    public List<Map<String, Object>> getHourlyForecast(String city) {
        String url = String.format("%s/forecast.json?key=%s&q=%s&days=1&aqi=no&alerts=no", BASE_URL, apiKey, city);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> forecastData = response.getBody();
        
        List<Map<String, Object>> hourlyForecast = new ArrayList<>();
        List<Map<String, Object>> forecastDay = (List<Map<String, Object>>) ((Map<String, Object>) ((List<Map<String, Object>>) forecastData.get("forecast")).get(0)).get("hour");
        
        for (Map<String, Object> hour : forecastDay) {
            Map<String, Object> hourlyData = new HashMap<>();
            hourlyData.put("time", hour.get("time"));
            hourlyData.put("temperature", hour.get("temp_c"));
            hourlyData.put("feels_like", hour.get("feelslike_c"));
            hourlyData.put("humidity", hour.get("humidity"));
            hourlyData.put("wind_speed", hour.get("wind_kph"));
            hourlyData.put("description", ((Map<String, Object>) hour.get("condition")).get("text"));
            hourlyData.put("icon", ((Map<String, Object>) hour.get("condition")).get("icon"));
            hourlyForecast.add(hourlyData);
        }
        
        return hourlyForecast;
    }

    public List<Map<String, Object>> getDailyForecast(String city) {
        String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=no&alerts=no", BASE_URL, apiKey, city);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> forecastData = response.getBody();
        
        List<Map<String, Object>> dailyForecast = new ArrayList<>();
        List<Map<String, Object>> forecastDays = (List<Map<String, Object>>) ((Map<String, Object>) forecastData.get("forecast")).get("forecastday");
        
        for (Map<String, Object> day : forecastDays) {
            Map<String, Object> dailyData = new HashMap<>();
            dailyData.put("date", day.get("date"));
            dailyData.put("max_temp", ((Map<String, Object>) day.get("day")).get("maxtemp_c"));
            dailyData.put("min_temp", ((Map<String, Object>) day.get("day")).get("mintemp_c"));
            dailyData.put("avg_temp", ((Map<String, Object>) day.get("day")).get("avgtemp_c"));
            dailyData.put("humidity", ((Map<String, Object>) day.get("day")).get("avghumidity"));
            dailyData.put("description", ((Map<String, Object>) ((Map<String, Object>) day.get("day")).get("condition")).get("text"));
            dailyData.put("icon", ((Map<String, Object>) ((Map<String, Object>) day.get("day")).get("condition")).get("icon"));
            dailyForecast.add(dailyData);
        }
        
        return dailyForecast;
    }
} 