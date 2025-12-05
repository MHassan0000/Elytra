package com.elytra.backend.Services;

import com.elytra.backend.Models.Zone;
import com.elytra.backend.Models.City;
import com.elytra.backend.Repository.ZoneRepository;
import com.elytra.backend.Repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("null")
public class ZoneService {

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private CityRepository cityRepository;

    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    public Optional<Zone> getZoneById(Long id) {
        return zoneRepository.findById(id);
    }

    public List<Zone> getZonesByCityId(Long cityId) {
        return zoneRepository.findByCityId(cityId);
    }

    public Zone createZone(Zone zone, Long cityId) {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new RuntimeException("City not found with id: " + cityId));

        if (zoneRepository.existsByCityIdAndName(cityId, zone.getName())) {
            throw new RuntimeException("Zone already exists in this city");
        }

        zone.setCity(city);
        return zoneRepository.save(zone);
    }

    public Zone updateZone(Long id, Zone zoneDetails) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found with id: " + id));

        zone.setName(zoneDetails.getName());
        return zoneRepository.save(zone);
    }

    public void deleteZone(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found with id: " + id));
        zoneRepository.delete(zone);
    }
}
