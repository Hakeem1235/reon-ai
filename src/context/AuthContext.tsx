'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User,
    Workspace,
    mockUser,
    mockWorkspace,
    isAuthenticated as checkAuth,
    setAuthenticated,
    getFromStorage,
    saveToStorage,
    clearStorage,
    validateCredentials,
} from '@/data/mockData';

interface AuthContextType {
    user: User | null;
    workspace: Workspace | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
    logout: () => void;
    updateWorkspace: (data: Partial<Workspace>) => void;
    completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // Check auth state on mount
        const authStatus = checkAuth();
        if (authStatus) {
            const savedUser = getFromStorage<User>('reon_user') || mockUser;
            const savedWorkspace = getFromStorage<Workspace>('reon_workspace') || mockWorkspace;
            setUser(savedUser);
            setWorkspace(savedWorkspace);
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (validateCredentials(email, password)) {
            const userData = { ...mockUser, email };
            setUser(userData);
            setWorkspace(mockWorkspace);
            setIsAuth(true);
            setAuthenticated(true);
            saveToStorage('reon_user', userData);
            saveToStorage('reon_workspace', mockWorkspace);
            return true;
        }
        return false;
    };

    const loginWithGoogle = async (): Promise<boolean> => {
        // Simulate Google OAuth
        await new Promise(resolve => setTimeout(resolve, 1500));

        const userData = { ...mockUser, email: 'boss@gmail.com' };
        setUser(userData);
        setWorkspace({ ...mockWorkspace, onboardingCompleted: false });
        setIsAuth(true);
        setAuthenticated(true);
        saveToStorage('reon_user', userData);
        saveToStorage('reon_workspace', { ...mockWorkspace, onboardingCompleted: false });
        return true;
    };

    const logout = () => {
        setUser(null);
        setWorkspace(null);
        setIsAuth(false);
        clearStorage();
    };

    const updateWorkspace = (data: Partial<Workspace>) => {
        if (workspace) {
            const updated = { ...workspace, ...data };
            setWorkspace(updated);
            saveToStorage('reon_workspace', updated);
        }
    };

    const completeOnboarding = () => {
        if (workspace) {
            const updated = { ...workspace, onboardingCompleted: true };
            setWorkspace(updated);
            saveToStorage('reon_workspace', updated);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                workspace,
                isLoading,
                isAuthenticated: isAuth,
                login,
                loginWithGoogle,
                logout,
                updateWorkspace,
                completeOnboarding,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
