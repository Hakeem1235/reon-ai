'use client';

import React from 'react';
import { Bell, Search, Command } from 'lucide-react';
import { Avatar } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1a1a24] flex items-center justify-between px-6 sticky top-0 z-30">
            <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-[#13131a] border border-[#2a2a3a] rounded-xl px-4 py-2 text-gray-500">
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Search...</span>
                    <div className="flex items-center gap-1 ml-8 bg-[#1a1a24] px-2 py-0.5 rounded text-xs">
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </div>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-[#13131a] rounded-xl transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
                </button>

                {/* User */}
                <div className="hidden sm:block">
                    <Avatar name={user?.name || 'Boss'} size="sm" />
                </div>
            </div>
        </header>
    );
}
