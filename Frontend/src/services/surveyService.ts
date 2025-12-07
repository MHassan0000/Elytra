import api from './api';

export interface Survey {
    id: number;
    title: string;
    description: string;
    questions: string; // JSON string
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    responseCount?: number;
}

export interface SurveyQuestion {
    id: string;
    question: string;
    type: 'text' | 'radio' | 'checkbox' | 'rating';
    options?: string[];
    required?: boolean;
}

export interface SurveyResponseData {
    [questionId: string]: string | string[] | number;
}

export const surveyService = {
    // Get all active surveys
    getActiveSurveys: async (): Promise<Survey[]> => {
        const response = await api.get('/surveys/active');
        return response.data;
    },

    // Get survey by ID
    getSurveyById: async (id: number): Promise<Survey> => {
        const response = await api.get(`/surveys/${id}`);
        return response.data;
    },

    // Submit survey response
    submitSurveyResponse: async (surveyId: number, userId: number, responses: SurveyResponseData): Promise<void> => {
        await api.post(`/surveys/${surveyId}/responses`, {
            surveyId,
            userId,
            responses: JSON.stringify(responses)
        });
    },

    // Check if user has submitted survey
    hasUserSubmittedSurvey: async (surveyId: number, userId: number): Promise<boolean> => {
        const response = await api.get(`/surveys/${surveyId}/check/${userId}`);
        return response.data.hasSubmitted;
    }
};
