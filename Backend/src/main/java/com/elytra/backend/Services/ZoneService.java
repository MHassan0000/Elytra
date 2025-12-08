package com.elytra.backend.Services;

import com.elytra.backend.Models.Zone;
import com.elytra.backend.Models.City;
import com.elytra.backend.Models.Notification;
import com.elytra.backend.Models.User;
import com.elytra.backend.Models.Issue;
import com.elytra.backend.Repository.ZoneRepository;
import com.elytra.backend.Repository.CityRepository;
import com.elytra.backend.Repository.UserRepository;
import com.elytra.backend.Repository.IssueRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private IssueRepository issueRepository;

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
        Zone savedZone = zoneRepository.save(zone);

        // Notify all users
        notifyAllUsers("New zone added in " + city.getName() + ": " + savedZone.getName(),
                Notification.NotificationType.SYSTEM_ANNOUNCEMENT);

        return savedZone;
    }

    public Zone updateZone(Long id, Zone zoneDetails) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found with id: " + id));

        String oldName = zone.getName();
        zone.setName(zoneDetails.getName());
        Zone savedZone = zoneRepository.save(zone);

        // Notify all users
        notifyAllUsers("Zone updated: " + oldName + " → " + savedZone.getName(),
                Notification.NotificationType.SYSTEM_ANNOUNCEMENT);

        return savedZone;
    }

    public void deleteZone(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found with id: " + id));

        // Set zone_id and area_id to null for all issues referencing this zone or its
        // areas
        List<Issue> relatedIssues = issueRepository.findByZoneId(id);
        for (Issue issue : relatedIssues) {
            issue.setZone(null);
            issue.setArea(null);
        }
        issueRepository.saveAll(relatedIssues);

        String zoneName = zone.getName();
        zoneRepository.delete(zone);

        // Notify all users
        notifyAllUsers("Zone removed: " + zoneName, Notification.NotificationType.SYSTEM_ANNOUNCEMENT);
    }

    private void notifyAllUsers(String message, Notification.NotificationType type) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            notificationService.createNotification(user.getId(), null, message, type);
        }
    }
}
