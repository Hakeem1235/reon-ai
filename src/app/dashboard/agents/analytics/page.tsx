'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart, TrafficPieChart } from '@/components/charts/Charts';
import { Card, Badge, Button, Toggle, Tabs } from '@/components/ui';
import { mockAgents, performanceTrendData, trafficSourceData } from '@/data/mockData';
import { BarChart3, TrendingUp, FileText, Lightbulb, Settings, Download } from 'lucide-react';

export default function AnalyticsAgentPage() {
    const agent = mockAgents.find(a => a.type === 'analytics')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('insights');

    const insights = [
        { type: 'success', title: 'ROAS up 23% this week', description: 'Meta Ads performance significantly improved after audience optimization.', action: 'Review campaigns' },
        { type: 'warning', title: 'Cart abandonment increased', description: 'Cart abandonment rate went up by 5% compared to last week.', action: 'Check checkout flow' },
        { type: 'info', title: 'New traffic source detected', description: 'TikTok referral traffic increased by 150% this month.', action: 'Explore opportunity' },
    ];

    const tabs = [
        { id: 'insights', label: 'AI Insights' },
        { id: 'performance', label: 'Performance' },
        { id: 'reports', label: 'Reports' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Analytics & Reporting AI Agent" subtitle="Unified data insights and recommendations" />

            <div className="p-6">
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
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
                    <StatCard title="Reports Generated" value={12} icon={<FileText className="w-5 h-5" />} />
                    <StatCard title="AI Insights" value={34} change={8} icon={<Lightbulb className="w-5 h-5" />} />
                    <StatCard title="Data Accuracy" value="96%" icon={<BarChart3 className="w-5 h-5" />} />
                    <StatCard title="Predictions Made" value={8} icon={<TrendingUp className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'insights' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            {insights.map((insight, i) => (
                                <Card key={i} className={`border-l-4 ${insight.type === 'success' ? 'border-l-green-500' : insight.type === 'warning' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                                            <p className="text-gray-400 text-sm">{insight.description}</p>
                                        </div>
                                        <Button variant="secondary" size="sm">{insight.action}</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
                                <PerformanceChart data={performanceTrendData} height={250} />
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold text-white mb-4">Traffic Distribution</h3>
                                <TrafficPieChart data={trafficSourceData} height={200} />
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'performance' && (
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
                        <PerformanceChart data={performanceTrendData} height={350} />
                    </Card>
                )}

                {activeTab === 'reports' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Weekly Performance Report', date: 'Jan 29, 2024', type: 'Automatic' },
                            { name: 'Monthly Revenue Analysis', date: 'Jan 28, 2024', type: 'Automatic' },
                            { name: 'Ad Campaign Summary', date: 'Jan 25, 2024', type: 'Custom' },
                            { name: 'Customer Behavior Report', date: 'Jan 22, 2024', type: 'Custom' },
                        ].map((report) => (
                            <Card key={report.name} hover>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-white">{report.name}</h4>
                                    <Badge variant={report.type === 'Automatic' ? 'accent' : 'default'}>{report.type}</Badge>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Generated: {report.date}</p>
                                <Button variant="secondary" size="sm" className="w-full"><Download className="w-4 h-4" /> Download</Button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
