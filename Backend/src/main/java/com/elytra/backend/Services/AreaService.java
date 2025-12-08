package com.elytra.backend.Services;

import com.elytra.backend.Models.Area;
import com.elytra.backend.Models.Zone;
import com.elytra.backend.Models.Notification;
import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.AreaRepository;
import com.elytra.backend.Repository.ZoneRepository;
import com.elytra.backend.Repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

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
        Area savedArea = areaRepository.save(area);

        // Notify all users
        notifyAllUsers("New area added in " + zone.getName() + ": " + savedArea.getName(),
                Notification.NotificationType.SYSTEM);

        return savedArea;
    }

    public Area updateArea(Long id, Area areaDetails) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Area not found with id: " + id));

        String oldName = area.getName();
        area.setName(areaDetails.getName());
        Area savedArea = areaRepository.save(area);

        // Notify all users
        notifyAllUsers("Area updated: " + oldName + " → " + savedArea.getName(), Notification.NotificationType.SYSTEM);

        return savedArea;
    }

    public void deleteArea(Long id) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Area not found with id: " + id));

        String areaName = area.getName();
        areaRepository.delete(area);

        // Notify all users
        notifyAllUsers("Area removed: " + areaName, Notification.NotificationType.SYSTEM);
    }

    private void notifyAllUsers(String message, Notification.NotificationType type) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            notificationService.createNotification(user.getId(), null, message, type);
        }
    }
}
