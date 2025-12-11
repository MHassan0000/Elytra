import api from './api';

export const voteService = {
    // Upvote an issue
    upvote: async (issueId: number, userId?: number): Promise<void> => {
        const params = userId ? `?userId=${userId}` : '';
        await api.post(`/issues/${issueId}/upvote${params}`);
    },



    // Remove vote
    removeVote: async (issueId: number, userId?: number): Promise<void> => {
        const params = userId ? `?userId=${userId}` : '';
        await api.delete(`/issues/${issueId}/vote${params}`);
    },

    // Get user's vote on an issue
    getUserVote: async (issueId: number, userId?: number): Promise<'up' | 'down' | null> => {
        try {
            const params = userId ? `?userId=${userId}` : '';
            const response = await api.get(`/issues/${issueId}/user-vote${params}`);
            return response.data.vote;
        } catch {
            return null;
        }
    }
};
