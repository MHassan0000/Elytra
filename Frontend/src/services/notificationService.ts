import api from './api';

export interface Notification {
    id: number;
    userId: number;
    issueId?: number;
    issueTitle?: string;
    message: string;
    type: 'ISSUE_UPDATE' | 'ISSUE_RESOLVED' | 'ISSUE_IN_PROGRESS' | 'SYSTEM_ANNOUNCEMENT';
    isRead: boolean;
    createdAt: string;
}

export const notificationService = {
    // Get all user notifications
    getUserNotifications: async (userId: number): Promise<Notification[]> => {
        const response = await api.get(`/notifications/user/${userId}`);
        return response.data;
    },

    // Get unread notifications
    getUnreadNotifications: async (userId: number): Promise<Notification[]> => {
        const response = await api.get(`/notifications/user/${userId}/unread`);
        return response.data;
    },

    // Get unread count
    getUnreadCount: async (userId: number): Promise<number> => {
        const response = await api.get(`/notifications/user/${userId}/unread-count`);
        return response.data.count;
    },

    // Mark notification as read
    markAsRead: async (notificationId: number): Promise<void> => {
        await api.patch(`/notifications/${notificationId}/read`);
    },

    // Delete notification
    deleteNotification: async (notificationId: number): Promise<void> => {
        await api.delete(`/notifications/${notificationId}`);
    }
};
