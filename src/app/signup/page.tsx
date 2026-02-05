'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button, Input } from '@/components/ui';
import { Crown, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { loginWithGoogle } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const features = [
        '8 AI Agents at your command',
        'Meta & Google Ads automation',
        'WhatsApp & Email marketing',
        'Real-time analytics & insights',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        // Simulate signup
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For demo, redirect to onboarding
        router.push('/onboarding');
        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            router.push('/onboarding');
        } catch {
            setError('Google signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Reon.ai</h1>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Start Your AI Journey</h2>
                        <p className="text-gray-400">Create your account and meet your AI team</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            icon={<User className="w-4 h-4" />}
                            required
                        />

                        <Input
                            type="email"
                            label="Email"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={<Mail className="w-4 h-4" />}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            icon={<Lock className="w-4 h-4" />}
                            required
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            icon={<Lock className="w-4 h-4" />}
                            required
                        />

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 w-4 h-4 rounded bg-[#1a1a24] border-[#2a2a3a] text-indigo-500 focus:ring-indigo-500"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                I agree to the{' '}
                                <Link href="#" className="text-indigo-400 hover:text-indigo-300">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="#" className="text-indigo-400 hover:text-indigo-300">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button type="submit" className="w-full" loading={loading}>
                            Create Account
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#2a2a3a]" />
                        <span className="text-sm text-gray-500">or</span>
                        <div className="flex-1 h-px bg-[#2a2a3a]" />
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleGoogleSignup}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign up with Google
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-12 flex-col justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Reon.ai</h1>
                            <p className="text-sm text-gray-400">AI Business OS</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">
                        Everything You Need to<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Scale Your E-commerce
                        </span>
                    </h2>

                    <div className="space-y-4">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-indigo-400" />
                                </div>
                                <p className="text-gray-300">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-[#0a0a0f]/50 backdrop-blur-xl rounded-2xl border border-[#2a2a3a]">
                        <p className="text-gray-400 italic mb-4">
                            &ldquo;Reon.ai increased our ROAS by 340% in just 2 months. The AI agents handle everything while I focus on product development.&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                S
                            </div>
                            <div>
                                <p className="text-white font-medium">Sarah Chen</p>
                                <p className="text-sm text-gray-500">Founder, StyleHouse</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
