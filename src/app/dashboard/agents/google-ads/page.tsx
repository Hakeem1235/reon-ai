'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Toggle, Tabs } from '@/components/ui';
import { mockAgents, mockCampaigns } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import {
    DollarSign,
    Target,
    Search,
    ShoppingBag,
    Settings,
    TrendingUp,
    TrendingDown,
    Minus,
} from 'lucide-react';

export default function GoogleAdsAgentPage() {
    const agent = mockAgents.find(a => a.type === 'google-ads')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('overview');

    const googleCampaigns = mockCampaigns.filter(c => c.platform === 'google');

    const keywords = [
        { keyword: 'summer dresses', matchType: 'Phrase', clicks: 456, cpc: 0.45, conversions: 23, status: 'active' },
        { keyword: 'womens fashion', matchType: 'Broad', clicks: 892, cpc: 0.32, conversions: 45, status: 'active' },
        { keyword: 'buy clothes online', matchType: 'Exact', clicks: 234, cpc: 0.67, conversions: 12, status: 'active' },
        { keyword: 'fashion store near me', matchType: 'Phrase', clicks: 123, cpc: 0.55, conversions: 8, status: 'paused' },
        { keyword: 'cheap clothing', matchType: 'Negative', clicks: 0, cpc: 0, conversions: 0, status: 'negative' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'campaigns', label: 'Campaigns' },
        { id: 'keywords', label: 'Keywords' },
        { id: 'shopping', label: 'Shopping' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Google Ads AI Agent" subtitle="Search & Shopping campaign optimization" />

            <div className="p-6">
                {/* Agent Control */}
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl flex items-center justify-center text-3xl">
                            🔍
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
                            <Badge variant={isActive ? 'success' : 'warning'}>{isActive ? 'Active' : 'Paused'}</Badge>
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

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard title="Total Spend" value={400} format="currency" change={8.2} icon={<DollarSign className="w-5 h-5" />} />
                    <StatCard title="ROAS" value="2.8x" change={5.4} icon={<Target className="w-5 h-5" />} />
                    <StatCard title="Search Campaigns" value={2} icon={<Search className="w-5 h-5" />} />
                    <StatCard title="Shopping Campaigns" value={1} icon={<ShoppingBag className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Keywords</h3>
                            <div className="space-y-3">
                                {keywords.filter(k => k.status === 'active').slice(0, 5).map((kw, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-xl">
                                        <div>
                                            <p className="font-medium text-white">{kw.keyword}</p>
                                            <p className="text-xs text-gray-500">{kw.matchType} match</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-white">{kw.conversions} conv</p>
                                            <p className="text-xs text-gray-500">${kw.cpc} CPC</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Recent Optimizations</h3>
                            <div className="space-y-3">
                                {[
                                    { action: 'Increased bid for "summer dresses"', change: '+15%', type: 'up' },
                                    { action: 'Added negative keyword "cheap"', change: 'New', type: 'neutral' },
                                    { action: 'Decreased bid for "fashion store"', change: '-10%', type: 'down' },
                                    { action: 'Paused low-performing ad group', change: 'Saved $12', type: 'down' },
                                ].map((opt, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0a0f] rounded-xl">
                                        {opt.type === 'up' ? (
                                            <TrendingUp className="w-5 h-5 text-green-400" />
                                        ) : opt.type === 'down' ? (
                                            <TrendingDown className="w-5 h-5 text-red-400" />
                                        ) : (
                                            <Minus className="w-5 h-5 text-gray-400" />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm text-white">{opt.action}</p>
                                        </div>
                                        <Badge variant={opt.type === 'up' ? 'success' : opt.type === 'down' ? 'error' : 'default'}>
                                            {opt.change}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'campaigns' && (
                    <Card>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2a3a]">
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Campaign</th>
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Type</th>
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Status</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Spent</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Conversions</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">ROAS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {googleCampaigns.map((c) => (
                                    <tr key={c.id} className="border-b border-[#1a1a24]">
                                        <td className="py-4 px-4 font-medium text-white">{c.name}</td>
                                        <td className="py-4 px-4"><Badge variant="info">{c.name.includes('Shopping') ? 'Shopping' : 'Search'}</Badge></td>
                                        <td className="py-4 px-4"><Badge variant={c.status === 'active' ? 'success' : 'warning'}>{c.status}</Badge></td>
                                        <td className="py-4 px-4 text-right text-gray-300">{formatCurrency(c.spent)}</td>
                                        <td className="py-4 px-4 text-right text-gray-300">{c.conversions}</td>
                                        <td className="py-4 px-4 text-right text-green-400">{c.roas}x</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}

                {activeTab === 'keywords' && (
                    <Card>
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Keyword Management</h3>
                            <Button size="sm">Add Keyword</Button>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2a3a]">
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Keyword</th>
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Match Type</th>
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Status</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Clicks</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">CPC</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Conversions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keywords.map((kw, i) => (
                                    <tr key={i} className="border-b border-[#1a1a24]">
                                        <td className="py-4 px-4 font-medium text-white">{kw.keyword}</td>
                                        <td className="py-4 px-4"><Badge variant="default">{kw.matchType}</Badge></td>
                                        <td className="py-4 px-4">
                                            <Badge variant={kw.status === 'active' ? 'success' : kw.status === 'negative' ? 'error' : 'warning'}>{kw.status}</Badge>
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-300">{kw.clicks}</td>
                                        <td className="py-4 px-4 text-right text-gray-300">${kw.cpc}</td>
                                        <td className="py-4 px-4 text-right text-gray-300">{kw.conversions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}

                {activeTab === 'shopping' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Summer Dress Collection', 'Winter Essentials', 'Accessories Bundle', 'New Arrivals', 'Sale Items', 'Best Sellers'].map((product, i) => (
                            <Card key={i}>
                                <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl mb-4 flex items-center justify-center">
                                    <ShoppingBag className="w-10 h-10 text-gray-600" />
                                </div>
                                <h4 className="font-medium text-white mb-2">{product}</h4>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">{Math.floor(100 + Math.random() * 500)} clicks</span>
                                    <span className="text-green-400">{(2 + Math.random() * 3).toFixed(1)}x ROAS</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
