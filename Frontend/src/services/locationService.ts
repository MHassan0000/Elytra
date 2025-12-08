import api from './api';
import type { City, Zone, Area } from '../types/types';

export const locationService = {
    // Get all cities
    getAllCities: async (): Promise<City[]> => {
        const response = await api.get('/cities');
        return response.data;
    },

    // Get city by ID
    getCityById: async (id: number): Promise<City> => {
        const response = await api.get(`/cities/${id}`);
        return response.data;
    },

    // Get all zones
    getAllZones: async (): Promise<Zone[]> => {
        const response = await api.get('/zones');
        return response.data;
    },

    // Get zones by city ID
    getZonesByCityId: async (cityId: number): Promise<Zone[]> => {
        const response = await api.get(`/zones/city/${cityId}`);
        return response.data;
    },

    // Get all areas
    getAllAreas: async (): Promise<Area[]> => {
        const response = await api.get('/areas');
        return response.data;
    },

    // Get areas by zone ID
    getAreasByZoneId: async (zoneId: number): Promise<Area[]> => {
        const response = await api.get(`/areas/zone/${zoneId}`);
        return response.data;
    },

    // Admin methods - Cities
    createCity: async (city: Partial<City>): Promise<City> => {
        const response = await api.post('/cities', city);
        return response.data;
    },

    updateCity: async (cityId: number, city: Partial<City>): Promise<City> => {
        const response = await api.put(`/cities/${cityId}`, city);
        return response.data;
    },

    deleteCity: async (cityId: number): Promise<void> => {
        await api.delete(`/cities/${cityId}`);
    },

    // Admin methods - Zones
    createZone: async (zone: Partial<Zone>, cityId: number): Promise<Zone> => {
        const response = await api.post(`/zones?cityId=${cityId}`, zone);
        return response.data;
    },

    updateZone: async (zoneId: number, zone: Partial<Zone>): Promise<Zone> => {
        const response = await api.put(`/zones/${zoneId}`, zone);
        return response.data;
    },

    deleteZone: async (zoneId: number): Promise<void> => {
        await api.delete(`/zones/${zoneId}`);
    },

    // Admin methods - Areas
    createArea: async (area: Partial<Area>, zoneId: number): Promise<Area> => {
        const response = await api.post(`/areas?zoneId=${zoneId}`, area);
        return response.data;
    },

    updateArea: async (areaId: number, area: Partial<Area>): Promise<Area> => {
        const response = await api.put(`/areas/${areaId}`, area);
        return response.data;
    },

    deleteArea: async (areaId: number): Promise<void> => {
        await api.delete(`/areas/${areaId}`);
    },
};
