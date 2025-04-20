private static final String BASE_URL = "http://api.weatherapi.com/v1";

public WeatherResponse getCurrentWeather(String city) {
    String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=yes&alerts=yes", BASE_URL, apiKey, city);
    // ... existing code ...
}

public List<WeatherResponse> getHourlyForecast(String city) {
    String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=yes&alerts=yes", BASE_URL, apiKey, city);
    // ... existing code ...
}

public List<WeatherResponse> getDailyForecast(String city) {
    String url = String.format("%s/forecast.json?key=%s&q=%s&days=7&aqi=yes&alerts=yes", BASE_URL, apiKey, city);
    // ... existing code ...
} 