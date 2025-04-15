package com.Weather_App.WeatherForecast.repository;

import com.Weather_App.WeatherForecast.model.WeatherData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeatherRepository extends MongoRepository<WeatherData, String> {}
