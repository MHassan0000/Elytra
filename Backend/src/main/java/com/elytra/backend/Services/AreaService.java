package com.elytra.backend.Services;

import com.elytra.backend.Models.Area;
import com.elytra.backend.Models.Zone;
import com.elytra.backend.Repository.AreaRepository;
import com.elytra.backend.Repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("null")
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    public Optional<Area> getAreaById(Long id) {
        return areaRepository.findById(id);
    }

    public List<Area> getAreasByZoneId(Long zoneId) {
        return areaRepository.findByZoneId(zoneId);
    }

    public Area createArea(Area area, Long zoneId) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found with id: " + zoneId));

        if (areaRepository.existsByZoneIdAndName(zoneId, area.getName())) {
            throw new RuntimeException("Area already exists in this zone");
        }

        area.setZone(zone);
        return areaRepository.save(area);
    }

    public Area updateArea(Long id, Area areaDetails) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Area not found with id: " + id));

        area.setName(areaDetails.getName());
        return areaRepository.save(area);
    }

    public void deleteArea(Long id) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Area not found with id: " + id));
        areaRepository.delete(area);
    }
}
