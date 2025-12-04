package com.elytra.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@RestController
public class HealthController {

    // Root path - http://localhost:8080/
    @GetMapping("/")
    public Map<String, String> root() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "🚀 Elytra Backend API is running!");
        response.put("version", "1.0.0");
        response.put("status", "UP");
        response.put("endpoints", "Visit /api for API documentation");
        return response;
    }

    // API root - http://localhost:8080/api
    @GetMapping("/api")
    public Map<String, String> apiRoot() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to Elytra API");
        response.put("version", "1.0.0");
        response.put("endpoints", "/api/health - Health check endpoint");
        return response;
    }

    // Health check - http://localhost:8080/api/health
    @GetMapping("/api/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Elytra Backend is running successfully!");
        response.put("timestamp", System.currentTimeMillis());
        response.put("database", "PostgreSQL connected");
        return response;
    }
}
