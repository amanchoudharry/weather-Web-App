package com.Weather_App.WeatherForecast.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CityController {

    private final List<Map<String, String>> cities;

    public CityController() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new ClassPathResource("cities.json").getInputStream());
        cities = mapper.convertValue(root.get("cities"), mapper.getTypeFactory().constructCollectionType(List.class, Map.class));
    }

    @GetMapping("/cities")
    public ResponseEntity<List<Map<String, String>>> searchCities(@RequestParam String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        String lowercaseQuery = query.toLowerCase().trim();
        List<Map<String, String>> filteredCities = cities.stream()
                .filter(city -> city.get("name").toLowerCase().contains(lowercaseQuery))
                .limit(10)
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredCities);
    }
} 