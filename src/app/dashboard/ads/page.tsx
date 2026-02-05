'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Tabs } from '@/components/ui';
import { mockCampaigns, mockAdAccounts } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, Target, MousePointer, Eye, Plus, Play, Pause, MoreVertical } from 'lucide-react';

export default function AdsPage() {
    const [activeTab, setActiveTab] = useState('all');

    const totalSpend = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgRoas = mockCampaigns.reduce((sum, c) => sum + c.roas, 0) / mockCampaigns.length;

    const tabs = [
        { id: 'all', label: 'All Campaigns' },
        { id: 'meta', label: 'Meta Ads' },
        { id: 'google', label: 'Google Ads' },
    ];

    const filteredCampaigns = activeTab === 'all'
        ? mockCampaigns
        : mockCampaigns.filter(c => c.platform === activeTab);

    return (
        <div className="min-h-screen">
            <Header title="Ads Management" subtitle="Manage all your advertising campaigns" />

            <div className="p-6">
                {/* Connected Accounts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {mockAdAccounts.map((account) => (
                        <Card key={account.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${account.platform === 'meta' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                                    {account.platform === 'meta' ? '📱' : '🔍'}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{account.name}</h3>
                                    <p className="text-sm text-gray-500">{account.platform === 'meta' ? 'Meta Business Suite' : 'Google Ads'}</p>
                                </div>
                            </div>
                            <Badge variant={account.connected ? 'success' : 'error'}>{account.connected ? 'Connected' : 'Disconnected'}</Badge>
                        </Card>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard title="Total Spend" value={totalSpend} format="currency" change={12.5} icon={<DollarSign className="w-5 h-5" />} />
                    <StatCard title="Avg. ROAS" value={`${avgRoas.toFixed(1)}x`} change={8.3} icon={<Target className="w-5 h-5" />} />
                    <StatCard title="Conversions" value={totalConversions} change={15.2} icon={<MousePointer className="w-5 h-5" />} />
                    <StatCard title="Impressions" value="389K" change={22.1} icon={<Eye className="w-5 h-5" />} />
                </div>

                {/* Campaigns */}
                <div className="flex items-center justify-between mb-4">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                    <Button><Plus className="w-4 h-4" /> Create Campaign</Button>
                </div>

                <Card>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#2a2a3a]">
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Campaign</th>
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Platform</th>
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Status</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">Budget</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">Spent</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">Impressions</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">CTR</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">ROAS</th>
                                <th className="text-center text-xs text-gray-500 py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCampaigns.map((campaign) => (
                                <tr key={campaign.id} className="border-b border-[#1a1a24] hover:bg-[#1a1a24]">
                                    <td className="py-4 px-4 font-medium text-white">{campaign.name}</td>
                                    <td className="py-4 px-4">
                                        <Badge variant={campaign.platform === 'meta' ? 'accent' : 'info'}>
                                            {campaign.platform === 'meta' ? 'Meta' : 'Google'}
                                        </Badge>
                                    </td>
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
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 hover:bg-[#2a2a3a] rounded-lg transition-colors">
                                                {campaign.status === 'active' ? <Pause className="w-4 h-4 text-gray-400" /> : <Play className="w-4 h-4 text-gray-400" />}
                                            </button>
                                            <button className="p-1.5 hover:bg-[#2a2a3a] rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}
