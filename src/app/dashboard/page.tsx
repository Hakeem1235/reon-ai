'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { AgentCard } from '@/components/agents/AgentCard';
import { RevenueChart, TrafficPieChart } from '@/components/charts/Charts';
import { Card, Badge } from '@/components/ui';
import {
    mockDashboardMetrics,
    mockAgents,
    revenueChartData,
    trafficSourceData,
    mockCampaigns,
} from '@/data/mockData';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import {
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Target,
    Zap,
    Activity,
    Eye,
    Percent,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [agents, setAgents] = useState(mockAgents);

    const handleAgentToggle = (id: string, active: boolean) => {
        setAgents(agents.map(agent =>
            agent.id === id
                ? { ...agent, status: active ? 'active' : 'paused' as const }
                : agent
        ));
    };

    const recentActions = mockAgents
        .filter(a => a.lastAction)
        .map(a => ({ ...a.lastAction!, agentName: a.name, agentIcon: a.icon }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

    return (
        <div className="min-h-screen">
            <Header title="Dashboard" subtitle="Welcome back, Boss" />

            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard
                        title="Today's Spend"
                        value={mockDashboardMetrics.todaySpend}
                        format="currency"
                        change={12.5}
                        changeLabel="vs yesterday"
                        icon={<DollarSign className="w-5 h-5" />}
                    />
                    <StatCard
                        title="Revenue"
                        value={mockDashboardMetrics.revenue}
                        format="currency"
                        change={23.1}
                        changeLabel="vs yesterday"
                        icon={<TrendingUp className="w-5 h-5" />}
                    />
                    <StatCard
                        title="ROAS"
                        value={`${mockDashboardMetrics.roas}x`}
                        change={8.3}
                        changeLabel="vs yesterday"
                        icon={<Target className="w-5 h-5" />}
                    />
                    <StatCard
                        title="Orders"
                        value={mockDashboardMetrics.orders}
                        change={15.2}
                        changeLabel="vs yesterday"
                        icon={<ShoppingCart className="w-5 h-5" />}
                    />
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                    <StatCard
                        title="Active Campaigns"
                        value={mockDashboardMetrics.activeCampaigns}
                        icon={<Zap className="w-5 h-5" />}
                    />
                    <StatCard
                        title="AI Actions Today"
                        value={mockDashboardMetrics.aiActionsToday}
                        icon={<Activity className="w-5 h-5" />}
                    />
                    <StatCard
                        title="Visitors"
                        value={mockDashboardMetrics.visitors}
                        format="number"
                        icon={<Eye className="w-5 h-5" />}
                    />
                    <StatCard
                        title="Conversion Rate"
                        value={`${mockDashboardMetrics.conversionRate}%`}
                        change={0.8}
                        icon={<Percent className="w-5 h-5" />}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Revenue & Spend</h3>
                                <p className="text-sm text-gray-500">Last 7 days performance</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                                    <span className="text-gray-400">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                    <span className="text-gray-400">Spend</span>
                                </div>
                            </div>
                        </div>
                        <RevenueChart data={revenueChartData} height={280} />
                    </Card>

                    {/* Traffic Sources */}
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
                        <TrafficPieChart data={trafficSourceData} height={200} />
                        <div className="mt-4 space-y-3">
                            {trafficSourceData.map((source) => (
                                <div key={source.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                                        <span className="text-sm text-gray-400">{source.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-white">{source.value}%</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* AI Agents & Actions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Active Agents */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">AI Agents</h3>
                            <Link
                                href="/dashboard/agents"
                                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                            >
                                View All
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {agents.slice(0, 4).map((agent) => (
                                <AgentCard
                                    key={agent.id}
                                    agent={agent}
                                    onToggle={handleAgentToggle}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Recent Actions */}
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-4">Recent AI Actions</h3>
                        <div className="space-y-4">
                            {recentActions.map((action, index) => (
                                <div
                                    key={action.id}
                                    className="p-3 bg-[#0a0a0f] rounded-xl border-l-2 border-indigo-500"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg">{action.agentIcon}</span>
                                        <span className="text-xs text-gray-500">{action.agentName}</span>
                                        <span className="text-xs text-gray-600">•</span>
                                        <span className="text-xs text-gray-500">
                                            {formatRelativeTime(new Date(action.timestamp))}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white mb-1">{action.action}</p>
                                    <p className="text-xs text-gray-500">{action.reason}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Campaigns Table */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Active Campaigns</h3>
                        <Link
                            href="/dashboard/ads"
                            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                            View All
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2a3a]">
                                    <th className="text-left text-xs text-gray-500 font-medium py-3 px-4">Campaign</th>
                                    <th className="text-left text-xs text-gray-500 font-medium py-3 px-4">Platform</th>
                                    <th className="text-left text-xs text-gray-500 font-medium py-3 px-4">Status</th>
                                    <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">Spent</th>
                                    <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">CTR</th>
                                    <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">ROAS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockCampaigns.slice(0, 5).map((campaign) => (
                                    <tr
                                        key={campaign.id}
                                        className="border-b border-[#1a1a24] hover:bg-[#1a1a24] transition-colors"
                                    >
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-white">{campaign.name}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge variant={campaign.platform === 'meta' ? 'accent' : 'info'}>
                                                {campaign.platform === 'meta' ? 'Meta' : 'Google'}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge variant={campaign.status === 'active' ? 'success' : 'warning'}>
                                                {campaign.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-300">
                                            {formatCurrency(campaign.spent)}
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-300">
                                            {campaign.ctr}%
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className={campaign.roas >= 3 ? 'text-green-400' : 'text-gray-300'}>
                                                {campaign.roas}x
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
