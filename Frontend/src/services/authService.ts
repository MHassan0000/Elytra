import api from '../config/axiosConfig';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    tokenType: string;
    userId: number;
    username: string;
    email: string;
    role: string;
    provider: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    role: string;
    status: string;
    provider: string;
    profilePicture?: string;
    emailVerified: boolean;
    createdAt: string;
}

export interface UpdateProfileRequest {
    username?: string;
    profilePicture?: string;
}

const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async signup(data: SignupRequest): Promise<AuthResponse> {
        const response = await api.post('/auth/signup', data);
        return response.data;
    },

    async getCurrentUser(): Promise<UserProfile> {
        const response = await api.get('/auth/me');
        return response.data;
    },

    async updateProfile(data: UpdateProfileRequest): Promise<{ user: UserProfile; token?: string }> {
        const response = await api.put('/auth/profile', data);
        // Response may contain { user: UserProfile, token?: string }
        if (response.data.token) {
            // New token provided (username was changed)
            this.setToken(response.data.token);
            return { user: response.data.user, token: response.data.token };
        }
        // No token means only non-critical fields were updated
        return { user: response.data.user || response.data };
    },

    async logout(): Promise<void> {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    setToken(token: string): void {
        localStorage.setItem('token', token);
    },

    removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};

export default authService;
