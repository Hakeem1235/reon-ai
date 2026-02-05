'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5',
        secondary: 'bg-[#1a1a24] text-gray-100 border border-[#2a2a3a] hover:border-indigo-500/50 hover:bg-[#1e1e2a]',
        ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1a1a24]',
        danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : icon}
            {children}
        </button>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        'w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-xl px-4 py-3 text-white placeholder-gray-500',
                        'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
                        'transition-all duration-200',
                        icon && 'pl-11',
                        error && 'border-red-500',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
        </div>
    );
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-6',
                'transition-all duration-200',
                hover && 'hover:border-[#3a3a4a] hover:-translate-y-1',
                glow && 'hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10',
                className
            )}
        >
            {children}
        </div>
    );
}

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'accent' | 'default';
    size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
    const variants = {
        success: 'bg-green-500/15 text-green-400',
        warning: 'bg-amber-500/15 text-amber-400',
        error: 'bg-red-500/15 text-red-400',
        info: 'bg-blue-500/15 text-blue-400',
        accent: 'bg-indigo-500/15 text-indigo-400',
        default: 'bg-gray-500/15 text-gray-400',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
    };

    return (
        <span className={cn('inline-flex items-center rounded-full font-semibold', variants[variant], sizes[size])}>
            {children}
        </span>
    );
}

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                checked ? 'bg-indigo-500' : 'bg-[#2a2a3a]',
                disabled && 'opacity-50 cursor-not-allowed'
            )}
        >
            <span
                className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                    checked ? 'translate-x-6' : 'translate-x-1'
                )}
            />
        </button>
    );
}

interface AvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div
            className={cn(
                'rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-white',
                sizes[size]
            )}
        >
            {src ? (
                <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
                initials
            )}
        </div>
    );
}

interface ProgressBarProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    size?: 'sm' | 'md';
}

export function ProgressBar({ value, max = 100, showLabel = false, size = 'md' }: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="w-full">
            <div className={cn(
                'w-full bg-[#1a1a24] rounded-full overflow-hidden',
                size === 'sm' ? 'h-1.5' : 'h-2'
            )}>
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <p className="text-sm text-gray-400 mt-1">{Math.round(percentage)}%</p>
            )}
        </div>
    );
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-6 max-w-md w-full mx-4 animate-slide-up">
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                {children}
            </div>
        </div>
    );
}

interface TabsProps {
    tabs: { id: string; label: string; icon?: React.ReactNode }[];
    activeTab: string;
    onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <div className="flex gap-1 p-1 bg-[#0a0a0f] rounded-xl">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        activeTab === tab.id
                            ? 'bg-[#1a1a24] text-white'
                            : 'text-gray-400 hover:text-white'
                    )}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-[#1a1a24] rounded-2xl flex items-center justify-center text-gray-500 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm max-w-sm mb-6">{description}</p>
            {action}
        </div>
    );
}

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={cn('animate-spin rounded-full border-2 border-gray-600 border-t-indigo-500', sizes[size])} />
    );
}
