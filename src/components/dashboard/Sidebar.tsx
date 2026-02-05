'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/ui';
import {
    LayoutDashboard,
    Bot,
    Megaphone,
    Store,
    Users,
    BarChart3,
    FileText,
    Settings,
    LogOut,
    Crown,
    ChevronRight,
    Zap,
} from 'lucide-react';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Agents', href: '/dashboard/agents', icon: Bot },
    { name: 'Ads', href: '/dashboard/ads', icon: Megaphone },
    { name: 'Store', href: '/dashboard/store', icon: Store },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, workspace, logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#0a0a0f] border-r border-[#1a1a24] flex flex-col z-40">
            {/* Logo Section */}
            <div className="p-6 border-b border-[#1a1a24]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Reon.ai</h1>
                        <p className="text-xs text-gray-500">AI Business OS</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href));

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                            : 'text-gray-400 hover:text-white hover:bg-[#13131a]'
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Plan Banner */}
            <div className="p-4">
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-semibold text-white capitalize">{workspace?.plan || 'Growth'} Plan</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">8 AI Agents Active</p>
                    <Link
                        href="/dashboard/settings"
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                        Upgrade Plan →
                    </Link>
                </div>
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-[#1a1a24]">
                <div className="flex items-center gap-3">
                    <Avatar name={user?.name || 'User'} size="md" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'Boss'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || 'boss@reon.ai'}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
