package com.elytra.backend.Services;

import com.elytra.backend.Models.City;
import com.elytra.backend.Models.Notification;
import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.CityRepository;
import com.elytra.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("null")
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public Optional<City> getCityById(Long id) {
        return cityRepository.findById(id);
    }

    public Optional<City> getCityByName(String name) {
        return cityRepository.findByName(name);
    }

    public City createCity(City city) {
        if (cityRepository.existsByName(city.getName())) {
            throw new RuntimeException("City already exists with name: " + city.getName());
        }
        City savedCity = cityRepository.save(city);

        // Notify all users
        notifyAllUsers("New city added: " + savedCity.getName(), Notification.NotificationType.SYSTEM);

        return savedCity;
    }

    public City updateCity(Long id, City cityDetails) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with id: " + id));

        String oldName = city.getName();
        city.setName(cityDetails.getName());
        City savedCity = cityRepository.save(city);

        // Notify all users
        notifyAllUsers("City updated: " + oldName + " → " + savedCity.getName(), Notification.NotificationType.SYSTEM);

        return savedCity;
    }

    public void deleteCity(Long id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with id: " + id));

        String cityName = city.getName();
        cityRepository.delete(city);

        // Notify all users
        notifyAllUsers("City removed: " + cityName, Notification.NotificationType.SYSTEM);
    }

    private void notifyAllUsers(String message, Notification.NotificationType type) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            notificationService.createNotification(user.getId(), null, message, type);
        }
    }
}
