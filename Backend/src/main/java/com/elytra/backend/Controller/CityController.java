package com.elytra.backend.Controller;

import com.elytra.backend.Models.City;
import com.elytra.backend.Services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "*")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        return ResponseEntity.ok(cityService.getAllCities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id) {
        return cityService.getCityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<City> getCityByName(@PathVariable String name) {
        return cityService.getCityByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCity(@RequestBody City city) {
        try {
            City createdCity = cityService.createCity(city);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCity);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCity(@PathVariable Long id, @RequestBody City city) {
        try {
            City updatedCity = cityService.updateCity(id, city);
            return ResponseEntity.ok(updatedCity);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        try {
            cityService.deleteCity(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "City deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
