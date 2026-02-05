'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Toggle, Tabs, ProgressBar } from '@/components/ui';
import { mockAgents } from '@/data/mockData';
import { Globe, MousePointer, ArrowRight, Lightbulb, Settings, Layout, Filter } from 'lucide-react';

export default function WebsiteFunnelAgentPage() {
    const agent = mockAgents.find(a => a.type === 'website-funnel')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('overview');

    const funnelSteps = [
        { name: 'Landing Page', visitors: 5000, dropoff: 0 },
        { name: 'Product Page', visitors: 3200, dropoff: 36 },
        { name: 'Add to Cart', visitors: 1200, dropoff: 62.5 },
        { name: 'Checkout', visitors: 800, dropoff: 33 },
        { name: 'Purchase', visitors: 500, dropoff: 37.5 },
    ];

    const croSuggestions = [
        { page: 'Product Page', suggestion: 'Add trust badges near Add to Cart button', impact: 'high' },
        { page: 'Checkout', suggestion: 'Reduce form fields from 8 to 5', impact: 'high' },
        { page: 'Cart', suggestion: 'Show shipping cost earlier', impact: 'medium' },
        { page: 'Homepage', suggestion: 'Add exit-intent popup with discount', impact: 'medium' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'funnel', label: 'Funnels' },
        { id: 'pages', label: 'Pages' },
        { id: 'tests', label: 'A/B Tests' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Website & Funnel AI Agent" subtitle="CRO optimization and funnel analysis" />

            <div className="p-6">
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-3xl">🌐</div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
                            <Badge variant={isActive ? 'success' : 'warning'}>{isActive ? 'Active' : 'Paused'}</Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Toggle checked={isActive} onChange={setIsActive} />
                        <Button variant="secondary" size="sm"><Settings className="w-4 h-4" /> Configure</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard title="Conversion Rate" value="3.2%" change={0.5} icon={<MousePointer className="w-5 h-5" />} />
                    <StatCard title="Pages Analyzed" value={12} icon={<Layout className="w-5 h-5" />} />
                    <StatCard title="Active Tests" value={2} icon={<Filter className="w-5 h-5" />} />
                    <StatCard title="CRO Suggestions" value={5} icon={<Lightbulb className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">CRO Suggestions</h3>
                            <div className="space-y-4">
                                {croSuggestions.map((item, i) => (
                                    <div key={i} className="p-4 bg-[#0a0a0f] rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="accent">{item.page}</Badge>
                                            <Badge variant={item.impact === 'high' ? 'success' : 'warning'}>{item.impact} impact</Badge>
                                        </div>
                                        <p className="text-white text-sm">{item.suggestion}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Funnel View</h3>
                            <div className="space-y-3">
                                {funnelSteps.map((step, i) => (
                                    <div key={step.name} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-medium">{i + 1}</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-white text-sm">{step.name}</span>
                                                <span className="text-gray-400 text-sm">{step.visitors.toLocaleString()}</span>
                                            </div>
                                            <ProgressBar value={(step.visitors / 5000) * 100} size="sm" />
                                        </div>
                                        {step.dropoff > 0 && (
                                            <span className="text-red-400 text-xs">-{step.dropoff}%</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'funnel' && (
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-6">Conversion Funnel</h3>
                        <div className="flex items-center justify-center gap-2">
                            {funnelSteps.map((step, i) => (
                                <React.Fragment key={step.name}>
                                    <div className="text-center">
                                        <div
                                            className="bg-gradient-to-b from-indigo-500/40 to-indigo-500/10 rounded-lg flex items-center justify-center mx-auto mb-2"
                                            style={{
                                                width: `${Math.max(60, (step.visitors / 5000) * 150)}px`,
                                                height: `${Math.max(60, (step.visitors / 5000) * 150)}px`,
                                            }}
                                        >
                                            <span className="text-white font-bold">{step.visitors.toLocaleString()}</span>
                                        </div>
                                        <p className="text-sm text-gray-400">{step.name}</p>
                                        {step.dropoff > 0 && <p className="text-xs text-red-400">-{step.dropoff}%</p>}
                                    </div>
                                    {i < funnelSteps.length - 1 && <ArrowRight className="w-6 h-6 text-gray-600" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'pages' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Homepage', 'Product Page', 'Category Page', 'Cart', 'Checkout', 'Thank You'].map((page) => (
                            <Card key={page}>
                                <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl mb-4 flex items-center justify-center">
                                    <Globe className="w-10 h-10 text-gray-600" />
                                </div>
                                <h4 className="font-medium text-white mb-2">{page}</h4>
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="text-gray-500">Conversion</span>
                                    <span className="text-white">{(2 + Math.random() * 5).toFixed(1)}%</span>
                                </div>
                                <Button variant="secondary" size="sm" className="w-full">Analyze</Button>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'tests' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'CTA Button Color Test', page: 'Product Page', status: 'running', winner: null, lift: null },
                            { name: 'Headline Variation Test', page: 'Homepage', status: 'completed', winner: 'Variant B', lift: 12.5 },
                        ].map((test) => (
                            <Card key={test.name}>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-white">{test.name}</h4>
                                    <Badge variant={test.status === 'running' ? 'info' : 'success'}>{test.status}</Badge>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Page: {test.page}</p>
                                {test.winner ? (
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <p className="text-green-400">Winner: {test.winner} (+{test.lift}% conversion)</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-[#0a0a0f] rounded-lg text-center">
                                            <p className="text-xs text-gray-500">Control</p>
                                            <p className="text-white">3.2%</p>
                                        </div>
                                        <div className="p-3 bg-[#0a0a0f] rounded-lg text-center">
                                            <p className="text-xs text-gray-500">Variant</p>
                                            <p className="text-white">3.5%</p>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
