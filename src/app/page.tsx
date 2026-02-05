'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui';
import LandingPage from './(marketing)/page';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, workspace } = useAuth();
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (workspace?.onboardingCompleted) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      } else {
        // Show landing page for unauthenticated users
        setShowLanding(true);
      }
    }
  }, [isAuthenticated, isLoading, workspace, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LoadingSpinner size="lg" />
          </div>
          <p className="text-gray-400">Loading Reon.ai...</p>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <LoadingSpinner size="lg" />
        </div>
        <p className="text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
}
