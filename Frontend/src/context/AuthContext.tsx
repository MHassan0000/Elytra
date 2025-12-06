import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import authService, { type AuthResponse, type UserProfile, type LoginRequest, type SignupRequest, type UpdateProfileRequest } from '../services/authService';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    logout: () => void;
    updateProfile: (data: UpdateProfileRequest) => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const initAuth = async () => {
            const token = authService.getToken();
            if (token) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    authService.removeToken();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            const response: AuthResponse = await authService.login(credentials);
            authService.setToken(response.token);

            // Fetch full user profile
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    };

    const signup = async (data: SignupRequest) => {
        try {
            const response: AuthResponse = await authService.signup(data);
            authService.setToken(response.token);

            // Fetch full user profile
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Signup failed');
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateProfile = async (data: UpdateProfileRequest) => {
        try {
            const updatedUser = await authService.updateProfile(data);
            setUser(updatedUser);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Profile update failed');
        }
    };

    const refreshUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error: any) {
            console.error('Failed to refresh user:', error);
            throw new Error(error.response?.data?.error || 'Failed to refresh user data');
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        refreshUser,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
