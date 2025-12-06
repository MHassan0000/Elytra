import React, { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface UserContextType {
    currentUser: any | null;
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
    const { user, loading, refreshUser } = useAuth();

    const value: UserContextType = {
        currentUser: user,
        userId: user?.id || 0,
        loading,
        error: null,
        refreshUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
