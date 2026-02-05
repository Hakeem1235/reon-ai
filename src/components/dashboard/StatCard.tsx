'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ReactNode;
    format?: 'currency' | 'number' | 'percentage' | 'none';
    className?: string;
}

export function StatCard({
    title,
    value,
    change,
    changeLabel,
    icon,
    format = 'none',
    className,
}: StatCardProps) {
    const formattedValue = () => {
        if (typeof value === 'string') return value;
        switch (format) {
            case 'currency':
                return formatCurrency(value);
            case 'number':
                return formatNumber(value);
            case 'percentage':
                return `${value}%`;
            default:
                return value.toString();
        }
    };

    const getTrendIcon = () => {
        if (change === undefined) return null;
        if (change > 0) return <TrendingUp className="w-3 h-3" />;
        if (change < 0) return <TrendingDown className="w-3 h-3" />;
        return <Minus className="w-3 h-3" />;
    };

    const getTrendColor = () => {
        if (change === undefined) return 'text-gray-400';
        if (change > 0) return 'text-green-400';
        if (change < 0) return 'text-red-400';
        return 'text-gray-400';
    };

    return (
        <div
            className={cn(
                'bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 relative overflow-hidden group hover:border-[#3a3a4a] transition-all duration-200',
                className
            )}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full -translate-y-8 translate-x-8" />

            <div className="relative">
                <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-400">{title}</span>
                    <div className="p-2 bg-[#1a1a24] rounded-lg text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                        {icon}
                    </div>
                </div>

                <div className="text-2xl font-bold text-white mb-1">{formattedValue()}</div>

                {change !== undefined && (
                    <div className={cn('flex items-center gap-1 text-xs font-medium', getTrendColor())}>
                        {getTrendIcon()}
                        <span>{change > 0 ? '+' : ''}{change}%</span>
                        {changeLabel && <span className="text-gray-500 ml-1">{changeLabel}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
