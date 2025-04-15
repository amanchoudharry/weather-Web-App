package com.Weather_App.WeatherForecast.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "weather")
public class WeatherData {
    @Id
    private String id;
    private String city;
    private String temperature;
    private String description;
}
