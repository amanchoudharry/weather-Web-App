package com.Weather_App.WeatherForecast.service;

import com.Weather_App.WeatherForecast.model.WeatherResponse;
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
    private static final double KPH_TO_MPS = 0.277778; // Conversion factor from KPH to m/s

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> detectLocation(String ip, Double lat, Double lon) {
        try {
            String url;
            if (lat != null && lon != null) {
                // Use coordinates for location detection
                url = String.format("%s/current.json?key=%s&q=%s,%s", BASE_URL, apiKey, lat, lon);
            } else {
                // Fallback to IP-based detection
                String qParam = (ip == null || ip.trim().isEmpty()) ? "auto" : ip;
                url = String.format("%s/current.json?key=%s&q=%s", BASE_URL, apiKey, qParam);
            }
            
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> weatherData = response.getBody();
                Map<String, Object> location = (Map<String, Object>) weatherData.get("location");
                Map<String, Object> result = new HashMap<>();
                
                // Extract relevant location data
                result.put("city", location.get("name"));
                result.put("region", location.get("region"));
                result.put("country", location.get("country"));
                result.put("lat", location.get("lat"));
                result.put("lon", location.get("lon"));
                
                return result;
            } else {
                throw new RuntimeException("Failed to detect location: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error detecting location: " + e.getMessage());
        }
    }

    public List<Map<String, Object>> searchLocations(String query) {
        String url = String.format("%s/search.json?key=%s&q=%s", BASE_URL, apiKey, query);
        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);
        return response.getBody();
    }

    private double convertKphToMps(double kph) {
        double mps = kph * KPH_TO_MPS;
        return Math.round(mps * 100.0) / 100.0;
    }

    public WeatherResponse getCurrentWeather(String city) {
        String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=yes&alerts=yes", BASE_URL, apiKey, city);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> weatherData = response.getBody();
        
        Map<String, Object> current = (Map<String, Object>) weatherData.get("current");
        Map<String, Object> location = (Map<String, Object>) weatherData.get("location");
        Map<String, Object> condition = (Map<String, Object>) current.get("condition");
        Map<String, Object> airQuality = (Map<String, Object>) current.get("air_quality");
        
        // Get forecast data for max/min temperatures and astro data
        Map<String, Object> forecast = (Map<String, Object>) weatherData.get("forecast");
        List<Map<String, Object>> forecastDays = (List<Map<String, Object>>) forecast.get("forecastday");
        Map<String, Object> today = forecastDays.get(0);
        Map<String, Object> day = (Map<String, Object>) today.get("day");
        Map<String, Object> astro = (Map<String, Object>) today.get("astro");
        
        WeatherResponse weatherResponse = new WeatherResponse();
        weatherResponse.setCity(location.get("name").toString());
        weatherResponse.setLatitude((Double) location.get("lat"));
        weatherResponse.setLongitude((Double) location.get("lon"));
        weatherResponse.setTemperature((Double) current.get("temp_c"));
        weatherResponse.setFeelsLike((Double) current.get("feelslike_c"));
        weatherResponse.setMin((Double) day.get("mintemp_c"));
        weatherResponse.setMax((Double) day.get("maxtemp_c"));
        weatherResponse.setPressure(((Number) current.get("pressure_mb")).intValue());
        weatherResponse.setHumidity(((Number) current.get("humidity")).intValue());
        weatherResponse.setCondition(condition.get("text").toString());
        weatherResponse.setDescription(condition.get("text").toString());
        weatherResponse.setIcon(condition.get("icon").toString());
        weatherResponse.setWindSpeed(convertKphToMps((Double) current.get("wind_kph")));
        weatherResponse.setWindDirection(((Number) current.get("wind_degree")).intValue());
        weatherResponse.setWindGust(convertKphToMps((Double) current.get("gust_kph")));
        weatherResponse.setVisibility(((Number) current.get("vis_km")).intValue());
        weatherResponse.setCloudiness(((Number) current.get("cloud")).intValue());
        weatherResponse.setTime(location.get("localtime").toString());
        weatherResponse.setUvIndex((Double) current.get("uv"));
        
        // Add sunrise, sunset, and moon data
        weatherResponse.setSunrise(astro.get("sunrise").toString());
        weatherResponse.setSunset(astro.get("sunset").toString());
        weatherResponse.setMoonrise(astro.get("moonrise").toString());
        weatherResponse.setMoonset(astro.get("moonset").toString());
        weatherResponse.setMoonPhase(astro.get("moon_phase").toString());
        weatherResponse.setMoonIllumination(Double.parseDouble(astro.get("moon_illumination").toString()));
        
        // Add air quality data
        if (airQuality != null) {
            weatherResponse.setCo((Double) airQuality.get("co"));
            weatherResponse.setNo2((Double) airQuality.get("no2"));
            weatherResponse.setO3((Double) airQuality.get("o3"));
            weatherResponse.setSo2((Double) airQuality.get("so2"));
            weatherResponse.setPm2_5((Double) airQuality.get("pm2_5"));
            weatherResponse.setPm10((Double) airQuality.get("pm10"));
            weatherResponse.setUsEpaIndex(((Number) airQuality.get("us-epa-index")).intValue());
            weatherResponse.setGbDefraIndex(((Number) airQuality.get("gb-defra-index")).intValue());
        }
        
        return weatherResponse;
    }

    public List<WeatherResponse> getHourlyForecast(String city) {
        String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=yes&alerts=yes", BASE_URL, apiKey, city);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> forecastData = response.getBody();
            
            List<WeatherResponse> hourlyForecast = new ArrayList<>();
        
        try {
            // Get the forecast object
            Map<String, Object> forecast = (Map<String, Object>) forecastData.get("forecast");
            if (forecast != null) {
                // Get the forecastday array
                List<Map<String, Object>> forecastDays = (List<Map<String, Object>>) forecast.get("forecastday");
                if (forecastDays != null && !forecastDays.isEmpty()) {
                    // Get the first day's forecast
                    Map<String, Object> firstDay = forecastDays.get(0);
                    // Get the hourly forecast array
                    List<Map<String, Object>> hours = (List<Map<String, Object>>) firstDay.get("hour");
                    
                    if (hours != null) {
                        // Get current hour to start from
                        LocalDateTime now = LocalDateTime.now();
                        int currentHour = now.getHour();
                        
                        // Process next 24 hours
                        for (int i = 0; i < 24; i++) {
                            int hourIndex = (currentHour + i) % 24;
                            Map<String, Object> hour = hours.get(hourIndex);
                            Map<String, Object> condition = (Map<String, Object>) hour.get("condition");
                            
                            WeatherResponse weatherResponse = new WeatherResponse();
                            weatherResponse.setCity(((Map<String, Object>) forecastData.get("location")).get("name").toString());
                            weatherResponse.setTemperature((Double) hour.get("temp_c"));
                            weatherResponse.setFeelsLike((Double) hour.get("feelslike_c"));
                            weatherResponse.setPressure(((Number) hour.get("pressure_mb")).intValue());
                            weatherResponse.setHumidity(((Number) hour.get("humidity")).intValue());
                            weatherResponse.setCondition(condition.get("text").toString());
                            weatherResponse.setDescription(condition.get("text").toString());
                            weatherResponse.setIcon(condition.get("icon").toString());
                            weatherResponse.setWindSpeed(convertKphToMps((Double) hour.get("wind_kph")));
                            weatherResponse.setWindDirection(((Number) hour.get("wind_degree")).intValue());
                            weatherResponse.setWindGust(convertKphToMps((Double) hour.get("gust_kph")));
                            weatherResponse.setVisibility(((Number) hour.get("vis_km")).intValue());
                            weatherResponse.setCloudiness(((Number) hour.get("cloud")).intValue());
                            
                            // Format time to show only hour
                            String time = hour.get("time").toString();
                            String formattedTime = time.substring(time.length() - 5); // Get HH:MM
                            weatherResponse.setTime(formattedTime);
                            
                            hourlyForecast.add(weatherResponse);
                        }
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error processing hourly forecast data: " + e.getMessage());
        }
        
        return hourlyForecast;
    }

    public List<WeatherResponse> getDailyForecast(String city) {
        String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=yes&alerts=yes", BASE_URL, apiKey, city);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> weatherData = response.getBody();
        
        Map<String, Object> location = (Map<String, Object>) weatherData.get("location");
        Map<String, Object> forecast = (Map<String, Object>) weatherData.get("forecast");
        List<Map<String, Object>> forecastDays = (List<Map<String, Object>>) forecast.get("forecastday");
        
        List<WeatherResponse> dailyForecast = new ArrayList<>();
        
        for (Map<String, Object> forecastDay : forecastDays) {
            Map<String, Object> day = (Map<String, Object>) forecastDay.get("day");
            Map<String, Object> condition = (Map<String, Object>) day.get("condition");
            Map<String, Object> astro = (Map<String, Object>) forecastDay.get("astro");
            Map<String, Object> airQuality = (Map<String, Object>) day.get("air_quality");
            
            WeatherResponse weatherResponse = new WeatherResponse();
            weatherResponse.setCity(location.get("name").toString());
            weatherResponse.setLatitude(((Number) location.get("lat")).doubleValue());
            weatherResponse.setLongitude(((Number) location.get("lon")).doubleValue());
            weatherResponse.setTemperature(((Number) day.get("avgtemp_c")).doubleValue());
            weatherResponse.setMin(((Number) day.get("mintemp_c")).doubleValue());
            weatherResponse.setMax(((Number) day.get("maxtemp_c")).doubleValue());
            weatherResponse.setHumidity(((Number) day.get("avghumidity")).intValue());
            weatherResponse.setCondition(condition.get("text").toString());
            weatherResponse.setDescription(condition.get("text").toString());
            weatherResponse.setIcon(condition.get("icon").toString());
            weatherResponse.setWindSpeed(convertKphToMps(((Number) day.get("maxwind_kph")).doubleValue()));
            
            // Handle optional fields with null checks
            Object visibilityObj = day.get("avgvis_km");
            if (visibilityObj != null) {
                weatherResponse.setVisibility(((Number) visibilityObj).intValue());
            }
            
            // Set the date in the correct format
            String date = forecastDay.get("date").toString();
            weatherResponse.setTime(date); // For consistency with the UI
            weatherResponse.setDate(date);
            
            Object uvObj = day.get("uv");
            if (uvObj != null) {
                weatherResponse.setUvIndex(((Number) uvObj).doubleValue());
            }
            
            // Add sunrise, sunset, and moon data with null checks
            if (astro != null) {
                weatherResponse.setSunrise(astro.get("sunrise") != null ? astro.get("sunrise").toString() : null);
                weatherResponse.setSunset(astro.get("sunset") != null ? astro.get("sunset").toString() : null);
                weatherResponse.setMoonrise(astro.get("moonrise") != null ? astro.get("moonrise").toString() : null);
                weatherResponse.setMoonset(astro.get("moonset") != null ? astro.get("moonset").toString() : null);
                weatherResponse.setMoonPhase(astro.get("moon_phase") != null ? astro.get("moon_phase").toString() : null);
                if (astro.get("moon_illumination") != null) {
                    weatherResponse.setMoonIllumination(Double.parseDouble(astro.get("moon_illumination").toString()));
                }
            }
            
            // Add air quality data with null checks
            if (airQuality != null) {
                Object coObj = airQuality.get("co");
                if (coObj != null) weatherResponse.setCo(((Number) coObj).doubleValue());
                
                Object no2Obj = airQuality.get("no2");
                if (no2Obj != null) weatherResponse.setNo2(((Number) no2Obj).doubleValue());
                
                Object o3Obj = airQuality.get("o3");
                if (o3Obj != null) weatherResponse.setO3(((Number) o3Obj).doubleValue());
                
                Object so2Obj = airQuality.get("so2");
                if (so2Obj != null) weatherResponse.setSo2(((Number) so2Obj).doubleValue());
                
                Object pm25Obj = airQuality.get("pm2_5");
                if (pm25Obj != null) weatherResponse.setPm2_5(((Number) pm25Obj).doubleValue());
                
                Object pm10Obj = airQuality.get("pm10");
                if (pm10Obj != null) weatherResponse.setPm10(((Number) pm10Obj).doubleValue());
                
                Object usEpaObj = airQuality.get("us-epa-index");
                if (usEpaObj != null) weatherResponse.setUsEpaIndex(((Number) usEpaObj).intValue());
                
                Object gbDefraObj = airQuality.get("gb-defra-index");
                if (gbDefraObj != null) weatherResponse.setGbDefraIndex(((Number) gbDefraObj).intValue());
            }
            
            dailyForecast.add(weatherResponse);
        }
        
        return dailyForecast;
    }
}
