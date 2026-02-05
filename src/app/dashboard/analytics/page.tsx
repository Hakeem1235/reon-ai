'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart, PerformanceChart, TrafficPieChart, BarChartComponent } from '@/components/charts/Charts';
import { Card, Badge, Tabs } from '@/components/ui';
import { revenueChartData, performanceTrendData, trafficSourceData, mockDashboardMetrics } from '@/data/mockData';
import { DollarSign, TrendingUp, Users, ShoppingCart, Eye, MousePointer } from 'lucide-react';

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [timeRange, setTimeRange] = useState('7d');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'acquisition', label: 'Acquisition' },
        { id: 'behavior', label: 'Behavior' },
        { id: 'conversions', label: 'Conversions' },
    ];

    const timeRanges = [
        { id: '7d', label: '7 days' },
        { id: '30d', label: '30 days' },
        { id: '90d', label: '90 days' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Analytics" subtitle="Detailed insights across all channels" />

            <div className="p-6">
                {/* Time Range Selector */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                    <div className="flex items-center gap-2 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-1">
                        {timeRanges.map((range) => (
                            <button
                                key={range.id}
                                onClick={() => setTimeRange(range.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === range.id ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                            <StatCard title="Revenue" value={mockDashboardMetrics.revenue} format="currency" change={23.1} icon={<DollarSign className="w-5 h-5" />} />
                            <StatCard title="Visitors" value={mockDashboardMetrics.visitors} format="number" change={15.2} icon={<Users className="w-5 h-5" />} />
                            <StatCard title="Conversion Rate" value={`${mockDashboardMetrics.conversionRate}%`} change={0.8} icon={<TrendingUp className="w-5 h-5" />} />
                            <StatCard title="Orders" value={mockDashboardMetrics.orders} change={12.5} icon={<ShoppingCart className="w-5 h-5" />} />
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <Card className="lg:col-span-2">
                                <h3 className="text-lg font-semibold text-white mb-4">Revenue & Spend Trend</h3>
                                <RevenueChart data={revenueChartData} height={300} />
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
                                <TrafficPieChart data={trafficSourceData} height={200} />
                                <div className="mt-4 space-y-2">
                                    {trafficSourceData.map((source) => (
                                        <div key={source.name} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                                                <span className="text-gray-400">{source.name}</span>
                                            </div>
                                            <span className="text-white">{source.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                            <PerformanceChart data={performanceTrendData} height={300} />
                        </Card>
                    </>
                )}

                {activeTab === 'acquisition' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Traffic by Channel</h3>
                            <TrafficPieChart data={trafficSourceData} height={250} />
                        </Card>
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Top Landing Pages</h3>
                            <div className="space-y-3">
                                {[
                                    { page: '/products/summer-dress', sessions: 2340, bounceRate: 32 },
                                    { page: '/category/new-arrivals', sessions: 1890, bounceRate: 28 },
                                    { page: '/', sessions: 1560, bounceRate: 45 },
                                    { page: '/sale', sessions: 1200, bounceRate: 25 },
                                ].map((item) => (
                                    <div key={item.page} className="p-3 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                        <span className="text-white text-sm">{item.page}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-400 text-sm">{item.sessions} sessions</span>
                                            <Badge variant={item.bounceRate < 35 ? 'success' : 'warning'}>{item.bounceRate}% bounce</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'behavior' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <StatCard title="Avg. Session" value="3:42" icon={<Eye className="w-5 h-5" />} />
                        <StatCard title="Pages/Session" value="4.2" icon={<MousePointer className="w-5 h-5" />} />
                        <StatCard title="Bounce Rate" value="35%" change={-2.1} icon={<TrendingUp className="w-5 h-5" />} />
                        <StatCard title="New Visitors" value="62%" icon={<Users className="w-5 h-5" />} />
                    </div>
                )}

                {activeTab === 'conversions' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h3>
                            <div className="space-y-4">
                                {[
                                    { step: 'Visited Site', count: 5000, rate: 100 },
                                    { step: 'Viewed Product', count: 3200, rate: 64 },
                                    { step: 'Added to Cart', count: 1200, rate: 24 },
                                    { step: 'Started Checkout', count: 800, rate: 16 },
                                    { step: 'Completed Purchase', count: 500, rate: 10 },
                                ].map((step) => (
                                    <div key={step.step}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-white text-sm">{step.step}</span>
                                            <span className="text-gray-400 text-sm">{step.count.toLocaleString()} ({step.rate}%)</span>
                                        </div>
                                        <div className="h-3 bg-[#0a0a0f] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${step.rate}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Goal Completions</h3>
                            <div className="space-y-4">
                                {[
                                    { goal: 'Purchase', completions: 500, value: 45000 },
                                    { goal: 'Email Signup', completions: 234, value: 0 },
                                    { goal: 'Add to Cart', completions: 1200, value: 0 },
                                ].map((goal) => (
                                    <div key={goal.goal} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">{goal.goal}</p>
                                            <p className="text-sm text-gray-500">{goal.completions} completions</p>
                                        </div>
                                        {goal.value > 0 && <span className="text-green-400 font-medium">${goal.value.toLocaleString()}</span>}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
