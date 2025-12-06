import api from './api';

export const voteService = {
    // Upvote an issue
    upvote: async (issueId: number): Promise<void> => {
        await api.post(`/issues/${issueId}/upvote`);
    },

    // Downvote an issue
    downvote: async (issueId: number): Promise<void> => {
        await api.post(`/issues/${issueId}/downvote`);
    },

    // Remove vote
    removeVote: async (issueId: number): Promise<void> => {
        await api.delete(`/issues/${issueId}/vote`);
    },

    // Get user's vote on an issue
    getUserVote: async (issueId: number): Promise<'up' | 'down' | null> => {
        try {
            const response = await api.get(`/issues/${issueId}/user-vote`);
            return response.data.vote;
        } catch {
            return null;
        }
    }
};
