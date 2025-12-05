package com.elytra.backend.Controller;

import com.elytra.backend.Models.Area;
import com.elytra.backend.Services.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin(origins = "*")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping
    public ResponseEntity<List<Area>> getAllAreas() {
        return ResponseEntity.ok(areaService.getAllAreas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Area> getAreaById(@PathVariable Long id) {
        return areaService.getAreaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/zone/{zoneId}")
    public ResponseEntity<List<Area>> getAreasByZoneId(@PathVariable Long zoneId) {
        return ResponseEntity.ok(areaService.getAreasByZoneId(zoneId));
    }

    @PostMapping
    public ResponseEntity<?> createArea(@RequestBody Area area, @RequestParam Long zoneId) {
        try {
            Area createdArea = areaService.createArea(area, zoneId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdArea);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateArea(@PathVariable Long id, @RequestBody Area area) {
        try {
            Area updatedArea = areaService.updateArea(id, area);
            return ResponseEntity.ok(updatedArea);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArea(@PathVariable Long id) {
        try {
            areaService.deleteArea(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Area deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
