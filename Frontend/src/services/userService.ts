import api from './api';
import type { User } from '../types/types';

export const userService = {
    // Get all users
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data;
    },

    // Get user by ID
    getUserById: async (id: number): Promise<User> => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    // Get user by username
    getUserByUsername: async (username: string): Promise<User> => {
        const response = await api.get(`/users/username/${username}`);
        return response.data;
    },

    // Update user
    updateUser: async (id: number, user: Partial<User>): Promise<User> => {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    },

    // Create user
    createUser: async (user: Partial<User>): Promise<User> => {
        const response = await api.post('/users', user);
        return response.data;
    },

    // Delete user
    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};
