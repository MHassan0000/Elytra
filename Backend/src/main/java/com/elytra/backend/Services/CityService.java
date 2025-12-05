package com.elytra.backend.Services;

import com.elytra.backend.Models.City;
import com.elytra.backend.Repository.CityRepository;
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
        return cityRepository.save(city);
    }

    public City updateCity(Long id, City cityDetails) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with id: " + id));

        city.setName(cityDetails.getName());
        return cityRepository.save(city);
    }

    public void deleteCity(Long id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with id: " + id));
        cityRepository.delete(city);
    }
}
