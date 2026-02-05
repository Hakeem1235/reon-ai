'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button, Input } from '@/components/ui';
import { Crown, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                router.push('/dashboard');
            } else {
                setError('Invalid credentials. Try boss@reon.ai / reon123');
            }
        } catch {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            router.push('/onboarding');
        } catch {
            setError('Google login failed. Please try again.');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Reon.ai</h1>
                            <p className="text-sm text-gray-400">AI Business OS</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Your AI Boss is Ready<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            to Run Your Business
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-md">
                        8 AI Agents working 24/7 to automate your e-commerce marketing, ads,
                        communication, and analytics. You command, they execute.
                    </p>
                </div>

                <div className="relative flex items-center gap-8">
                    <div>
                        <p className="text-3xl font-bold text-white">8</p>
                        <p className="text-sm text-gray-500">AI Agents</p>
                    </div>
                    <div className="w-px h-12 bg-gray-700" />
                    <div>
                        <p className="text-3xl font-bold text-white">24/7</p>
                        <p className="text-sm text-gray-500">Automation</p>
                    </div>
                    <div className="w-px h-12 bg-gray-700" />
                    <div>
                        <p className="text-3xl font-bold text-white">10x</p>
                        <p className="text-sm text-gray-500">Faster Growth</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
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
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, Boss</h2>
                        <p className="text-gray-400">Sign in to command your AI workforce</p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6">
                        <p className="text-sm text-indigo-300 font-medium mb-1">Demo Credentials:</p>
                        <p className="text-sm text-gray-400">Email: boss@reon.ai</p>
                        <p className="text-sm text-gray-400">Password: reon123</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="boss@reon.ai"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail className="w-4 h-4" />}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock className="w-4 h-4" />}
                            required
                        />

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        <Button type="submit" className="w-full" loading={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#2a2a3a]" />
                        <span className="text-sm text-gray-500">or continue with</span>
                        <div className="flex-1 h-px bg-[#2a2a3a]" />
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleGoogleLogin}
                        loading={googleLoading}
                    >
                        {googleLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
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
                        )}
                        Continue with Google
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
