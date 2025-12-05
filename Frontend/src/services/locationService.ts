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
};
