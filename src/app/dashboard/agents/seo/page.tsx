'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Toggle, Tabs, ProgressBar } from '@/components/ui';
import { mockAgents } from '@/data/mockData';
import { TrendingUp, FileText, Search, Globe, Settings, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

export default function SEOAgentPage() {
    const agent = mockAgents.find(a => a.type === 'seo')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('overview');

    const keywords = [
        { keyword: 'summer dresses online', position: 5, change: 3, volume: 12400, difficulty: 45 },
        { keyword: 'buy fashion clothes', position: 12, change: -2, volume: 8900, difficulty: 62 },
        { keyword: 'womens clothing store', position: 8, change: 5, volume: 15600, difficulty: 58 },
        { keyword: 'trendy outfits 2024', position: 3, change: 1, volume: 6700, difficulty: 38 },
    ];

    const seoIssues = [
        { page: '/products/summer-dress', issue: 'Missing meta description', severity: 'high' },
        { page: '/category/shoes', issue: 'Duplicate title tag', severity: 'medium' },
        { page: '/about', issue: 'Low word count', severity: 'low' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'keywords', label: 'Keywords' },
        { id: 'pages', label: 'Pages' },
        { id: 'content', label: 'Content' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="SEO AI Agent" subtitle="Search engine optimization automation" />

            <div className="p-6">
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-3xl">📈</div>
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
                    <StatCard title="SEO Score" value="78/100" change={5} icon={<TrendingUp className="w-5 h-5" />} />
                    <StatCard title="Ranking Keywords" value={45} change={8} icon={<Search className="w-5 h-5" />} />
                    <StatCard title="Organic Traffic" value="5.2K" change={12.3} icon={<Globe className="w-5 h-5" />} />
                    <StatCard title="Avg. Position" value={12} change={-3} icon={<TrendingUp className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">SEO Health</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Technical SEO', score: 85 },
                                    { label: 'On-Page SEO', score: 72 },
                                    { label: 'Content Quality', score: 68 },
                                    { label: 'Backlink Profile', score: 45 },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-300">{item.label}</span>
                                            <span className="text-white font-medium">{item.score}%</span>
                                        </div>
                                        <ProgressBar value={item.score} />
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Issues to Fix</h3>
                            <div className="space-y-3">
                                {seoIssues.map((issue, i) => (
                                    <div key={i} className="p-3 bg-[#0a0a0f] rounded-xl flex items-center gap-3">
                                        {issue.severity === 'high' ? (
                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                        ) : issue.severity === 'medium' ? (
                                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                                        ) : (
                                            <AlertTriangle className="w-5 h-5 text-gray-400" />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-white text-sm">{issue.issue}</p>
                                            <p className="text-xs text-gray-500">{issue.page}</p>
                                        </div>
                                        <Badge variant={issue.severity === 'high' ? 'error' : issue.severity === 'medium' ? 'warning' : 'default'}>
                                            {issue.severity}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'keywords' && (
                    <Card>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2a3a]">
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Keyword</th>
                                    <th className="text-center text-xs text-gray-500 py-3 px-4">Position</th>
                                    <th className="text-center text-xs text-gray-500 py-3 px-4">Change</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Volume</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keywords.map((kw) => (
                                    <tr key={kw.keyword} className="border-b border-[#1a1a24]">
                                        <td className="py-4 px-4 font-medium text-white">{kw.keyword}</td>
                                        <td className="py-4 px-4 text-center">
                                            <Badge variant={kw.position <= 10 ? 'success' : 'warning'}>#{kw.position}</Badge>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className={`flex items-center justify-center gap-1 ${kw.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {kw.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                                {Math.abs(kw.change)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-300">{kw.volume.toLocaleString()}</td>
                                        <td className="py-4 px-4 text-right">
                                            <Badge variant={kw.difficulty < 40 ? 'success' : kw.difficulty < 60 ? 'warning' : 'error'}>{kw.difficulty}</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}

                {activeTab === 'pages' && (
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-4">Page Optimization Status</h3>
                        <div className="space-y-3">
                            {[
                                { page: '/', status: 'optimized', score: 92 },
                                { page: '/products', status: 'optimized', score: 85 },
                                { page: '/category/dresses', status: 'needs-work', score: 68 },
                                { page: '/about', status: 'needs-work', score: 55 },
                                { page: '/contact', status: 'optimized', score: 78 },
                            ].map((page) => (
                                <div key={page.page} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white">{page.page}</p>
                                        <ProgressBar value={page.score} size="sm" />
                                    </div>
                                    <Badge variant={page.status === 'optimized' ? 'success' : 'warning'}>{page.score}%</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'content' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">AI Blog Generator</h3>
                            <p className="text-gray-400 mb-4">Generate SEO-optimized blog content</p>
                            <Button className="w-full"><FileText className="w-4 h-4" /> Generate New Article</Button>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Recent Content</h3>
                            <div className="space-y-3">
                                {['Top 10 Summer Fashion Trends', 'How to Style Casual Outfits', 'Ultimate Guide to Accessories'].map((title, i) => (
                                    <div key={i} className="p-3 bg-[#0a0a0f] rounded-xl">
                                        <p className="text-white text-sm">{title}</p>
                                        <p className="text-xs text-gray-500">Published 3 days ago</p>
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
