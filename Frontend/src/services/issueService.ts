import api from './api';
import type { Issue, IssueStats, CreateIssueRequest } from '../types/types';

export const issueService = {
    // Get all issues
    getAllIssues: async (): Promise<Issue[]> => {
        const response = await api.get('/issues');
        return response.data;
    },

    // Get issues sorted by upvotes (for Community Board)
    getIssuesSortedByUpvotes: async (): Promise<Issue[]> => {
        const response = await api.get('/issues/sorted-by-upvotes');
        return response.data;
    },

    // Get issues by user ID
    getIssuesByUserId: async (userId: number): Promise<Issue[]> => {
        const response = await api.get(`/issues/user/${userId}`);
        return response.data;
    },

    // Get issue by ID
    getIssueById: async (id: number): Promise<Issue> => {
        const response = await api.get(`/issues/${id}`);
        return response.data;
    },

    // Get user's issue statistics
    getUserIssueStats: async (userId: number): Promise<IssueStats> => {
        const response = await api.get(`/issues/user/${userId}/stats`);
        return response.data;
    },

    // Create new issue
    createIssue: async (
        issue: CreateIssueRequest,
        userId: number,
        cityId?: number,
        zoneId?: number,
        areaId?: number
    ): Promise<Issue> => {
        const params = new URLSearchParams();
        params.append('userId', userId.toString());
        if (cityId) params.append('cityId', cityId.toString());
        if (zoneId) params.append('zoneId', zoneId.toString());
        if (areaId) params.append('areaId', areaId.toString());

        const response = await api.post(`/issues?${params.toString()}`, issue);
        return response.data;
    },

    // Update issue
    updateIssue: async (id: number, issue: Partial<Issue>): Promise<Issue> => {
        const response = await api.put(`/issues/${id}`, issue);
        return response.data;
    },

    // Delete issue
    deleteIssue: async (id: number): Promise<void> => {
        await api.delete(`/issues/${id}`);
    },

    // Get issues by status
    getIssuesByStatus: async (status: string): Promise<Issue[]> => {
        const response = await api.get(`/issues/status/${status}`);
        return response.data;
    },

    // Get issues by city
    getIssuesByCityId: async (cityId: number): Promise<Issue[]> => {
        const response = await api.get(`/issues/city/${cityId}`);
        return response.data;
    },

    // Admin methods
    updateIssueStatus: async (issueId: number, status: string): Promise<Issue> => {
        const response = await api.put(`/admin/issues/${issueId}/status`, { status });
        return response.data;
    },

    getAdminStats: async (): Promise<any> => {
        const response = await api.get('/admin/stats');
        return response.data;
    },
};
