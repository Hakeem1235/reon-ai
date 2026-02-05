'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { LoadingSpinner } from '@/components/ui';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading, workspace } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (!workspace?.onboardingCompleted) {
                router.push('/onboarding');
            }
        }
    }, [isAuthenticated, isLoading, workspace, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Sidebar />
            <main className="ml-[280px] min-h-screen">
                {children}
            </main>
        </div>
    );
}
