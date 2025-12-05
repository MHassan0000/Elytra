import api from './api';

export const upvoteService = {
    // Add upvote
    addUpvote: async (userId: number, issueId: number): Promise<void> => {
        await api.post(`/upvotes?userId=${userId}&issueId=${issueId}`);
    },

    // Remove upvote
    removeUpvote: async (userId: number, issueId: number): Promise<void> => {
        await api.delete(`/upvotes?userId=${userId}&issueId=${issueId}`);
    },

    // Check if user has upvoted
    checkUpvote: async (userId: number, issueId: number): Promise<boolean> => {
        const response = await api.get(`/upvotes/check?userId=${userId}&issueId=${issueId}`);
        return response.data.hasUpvoted;
    },

    // Get upvote count for an issue
    getUpvoteCount: async (issueId: number): Promise<number> => {
        const response = await api.get(`/upvotes/count/${issueId}`);
        return response.data.count;
    },
};
