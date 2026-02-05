'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils';
import { Agent } from '@/data/mockData';
import { Badge, Toggle } from '@/components/ui';
import { ChevronRight, Activity, Zap } from 'lucide-react';

interface AgentCardProps {
    agent: Agent;
    onToggle?: (id: string, status: boolean) => void;
}

export function AgentCard({ agent, onToggle }: AgentCardProps) {
    const statusColors = {
        active: 'success',
        paused: 'warning',
        error: 'error',
    } as const;

    const agentRoutes: Record<string, string> = {
        'meta-ads': '/dashboard/agents/meta-ads',
        'google-ads': '/dashboard/agents/google-ads',
        'social-media': '/dashboard/agents/social-media',
        'whatsapp': '/dashboard/agents/whatsapp',
        'seo': '/dashboard/agents/seo',
        'analytics': '/dashboard/agents/analytics',
        'email-crm': '/dashboard/agents/email-crm',
        'website-funnel': '/dashboard/agents/website-funnel',
    };

    return (
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 hover:border-[#3a3a4a] transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-2xl">
                        {agent.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{agent.name}</h3>
                        <Badge variant={statusColors[agent.status]} size="sm">
                            {agent.status}
                        </Badge>
                    </div>
                </div>
                <Toggle
                    checked={agent.status === 'active'}
                    onChange={(checked) => onToggle?.(agent.id, checked)}
                />
            </div>

            <p className="text-sm text-gray-400 mb-4">{agent.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(agent.metrics).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="bg-[#0a0a0f] rounded-lg p-3">
                        <p className="text-xs text-gray-500 capitalize">{key}</p>
                        <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                ))}
            </div>

            {/* Last Action */}
            {agent.lastAction && (
                <div className="bg-[#0a0a0f] rounded-lg p-3 mb-4 border-l-2 border-indigo-500">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-3 h-3 text-indigo-400" />
                        <span className="text-xs text-gray-400">
                            {formatRelativeTime(new Date(agent.lastAction.timestamp))}
                        </span>
                    </div>
                    <p className="text-sm text-white">{agent.lastAction.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{agent.lastAction.reason}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Activity className="w-3 h-3" />
                    <span>{agent.actionsToday} actions today</span>
                </div>
                <Link
                    href={agentRoutes[agent.type]}
                    className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 font-medium group-hover:gap-2 transition-all"
                >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
