'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/charts/Charts';
import { Card, Badge, Button, Toggle, Tabs } from '@/components/ui';
import { mockAgents, mockCampaigns, performanceTrendData } from '@/data/mockData';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import {
    DollarSign,
    Target,
    MousePointer,
    Image,
    Play,
    Pause,
    RefreshCw,
    Settings,
    Zap,
    TrendingUp,
    AlertCircle,
    CheckCircle,
} from 'lucide-react';

export default function MetaAdsAgentPage() {
    const agent = mockAgents.find(a => a.type === 'meta-ads')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('overview');

    const metaCampaigns = mockCampaigns.filter(c => c.platform === 'meta');

    const optimizationRules = [
        { id: 1, rule: 'Pause ads with CTR < 1%', status: 'active', triggered: 3 },
        { id: 2, rule: 'Scale ads with ROAS > 3x', status: 'active', triggered: 7 },
        { id: 3, rule: 'Rotate creatives on fatigue score > 70', status: 'active', triggered: 2 },
        { id: 4, rule: 'Auto-adjust budget by performance', status: 'active', triggered: 12 },
    ];

    const actionLogs = [
        { time: '2 hours ago', action: 'Budget increased by 20%', reason: 'ROAS reached 3.4x, exceeding target', status: 'success' },
        { time: '5 hours ago', action: 'Paused 2 underperforming ads', reason: 'CTR dropped below 0.8%', status: 'success' },
        { time: '8 hours ago', action: 'New creative variant launched', reason: 'Original creative fatigue score at 75', status: 'success' },
        { time: '1 day ago', action: 'Audience expansion applied', reason: 'Lookalike audience exhaustion detected', status: 'success' },
        { time: '1 day ago', action: 'Bid strategy adjusted', reason: 'Cost-per-result increased by 15%', status: 'warning' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'campaigns', label: 'Campaigns' },
        { id: 'creatives', label: 'Creatives' },
        { id: 'rules', label: 'Rules' },
        { id: 'logs', label: 'Action Logs' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Meta Ads AI Agent" subtitle="Facebook & Instagram advertising automation" />

            <div className="p-6">
                {/* Agent Control Bar */}
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-3xl">
                            📱
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={isActive ? 'success' : 'warning'}>
                                    {isActive ? 'Active' : 'Paused'}
                                </Badge>
                                <span className="text-sm text-gray-500">{agent.actionsToday} actions today</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Toggle checked={isActive} onChange={setIsActive} />
                        <Button variant="secondary" size="sm">
                            <Settings className="w-4 h-4" />
                            Configure
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard
                        title="Total Spend"
                        value={847}
                        format="currency"
                        change={12.5}
                        icon={<DollarSign className="w-5 h-5" />}
                    />
                    <StatCard
                        title="ROAS"
                        value="3.4x"
                        change={8.3}
                        icon={<Target className="w-5 h-5" />}
                    />
                    <StatCard
                        title="Active Campaigns"
                        value={5}
                        icon={<Play className="w-5 h-5" />}
                    />
                    <StatCard
                        title="Active Ads"
                        value={23}
                        icon={<Image className="w-5 h-5" />}
                    />
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <h3 className="text-lg font-semibold text-white mb-4">Performance Trend</h3>
                            <PerformanceChart data={performanceTrendData} height={300} />
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Permissions</h3>
                            <div className="space-y-3">
                                {agent.permissions.map((permission, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-gray-300">{permission}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'campaigns' && (
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#2a2a3a]">
                                        <th className="text-left text-xs text-gray-500 font-medium py-3 px-4">Campaign</th>
                                        <th className="text-left text-xs text-gray-500 font-medium py-3 px-4">Status</th>
                                        <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">Budget</th>
                                        <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">Spent</th>
                                        <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">Impressions</th>
                                        <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">CTR</th>
                                        <th className="text-right text-xs text-gray-500 font-medium py-3 px-4">ROAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metaCampaigns.map((campaign) => (
                                        <tr key={campaign.id} className="border-b border-[#1a1a24] hover:bg-[#1a1a24]">
                                            <td className="py-4 px-4 font-medium text-white">{campaign.name}</td>
                                            <td className="py-4 px-4">
                                                <Badge variant={campaign.status === 'active' ? 'success' : 'warning'}>{campaign.status}</Badge>
                                            </td>
                                            <td className="py-4 px-4 text-right text-gray-300">{formatCurrency(campaign.budget)}</td>
                                            <td className="py-4 px-4 text-right text-gray-300">{formatCurrency(campaign.spent)}</td>
                                            <td className="py-4 px-4 text-right text-gray-300">{campaign.impressions.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-right text-gray-300">{campaign.ctr}%</td>
                                            <td className="py-4 px-4 text-right">
                                                <span className={campaign.roas >= 3 ? 'text-green-400' : 'text-gray-300'}>{campaign.roas}x</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {activeTab === 'creatives' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} hover glow>
                                <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center">
                                    <Image className="w-12 h-12 text-gray-600" />
                                </div>
                                <h4 className="font-medium text-white mb-1">Creative Variant {i}</h4>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">CTR: {(1.5 + Math.random() * 2).toFixed(2)}%</span>
                                    <Badge variant={i <= 4 ? 'success' : 'warning'}>{i <= 4 ? 'Active' : 'Testing'}</Badge>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'rules' && (
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Optimization Rules</h3>
                            <Button size="sm">Add Rule</Button>
                        </div>
                        <div className="space-y-4">
                            {optimizationRules.map((rule) => (
                                <div key={rule.id} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Zap className="w-5 h-5 text-indigo-400" />
                                        <div>
                                            <p className="font-medium text-white">{rule.rule}</p>
                                            <p className="text-sm text-gray-500">Triggered {rule.triggered} times this week</p>
                                        </div>
                                    </div>
                                    <Toggle checked={rule.status === 'active'} onChange={() => { }} />
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'logs' && (
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-6">Action Logs</h3>
                        <div className="space-y-4">
                            {actionLogs.map((log, i) => (
                                <div key={i} className="p-4 bg-[#0a0a0f] rounded-xl border-l-2 border-indigo-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        {log.status === 'success' ? (
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4 text-amber-400" />
                                        )}
                                        <span className="text-xs text-gray-500">{log.time}</span>
                                    </div>
                                    <p className="font-medium text-white mb-1">{log.action}</p>
                                    <p className="text-sm text-gray-500">{log.reason}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
