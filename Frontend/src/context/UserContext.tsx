import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/types';
import { userService } from '../services/userService';

interface UserContextType {
    currentUser: User | null;
    userId: number;
    loading: boolean;
    error: string | null;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // TODO: Replace with actual auth when implemented
    // For now, using hardcoded userId = 1 (Hassan)
    const MOCK_USER_ID = 1;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const user = await userService.getUserById(MOCK_USER_ID);
            setCurrentUser(user);
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const refreshUser = async () => {
        await fetchUser();
    };

    const value: UserContextType = {
        currentUser,
        userId: MOCK_USER_ID,
        loading,
        error,
        refreshUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
