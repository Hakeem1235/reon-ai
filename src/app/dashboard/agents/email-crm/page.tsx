'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Toggle, Tabs } from '@/components/ui';
import { mockAgents } from '@/data/mockData';
import { Mail, Users, MousePointer, DollarSign, Settings, Send, Inbox, BarChart3 } from 'lucide-react';

export default function EmailCRMAgentPage() {
    const agent = mockAgents.find(a => a.type === 'email-crm')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('flows');

    const emailFlows = [
        { name: 'Welcome Series', subscribers: 234, openRate: 52, clickRate: 12, revenue: 1240 },
        { name: 'Abandoned Cart', subscribers: 156, openRate: 48, clickRate: 15, revenue: 890 },
        { name: 'Post-Purchase', subscribers: 89, openRate: 45, clickRate: 8, revenue: 345 },
        { name: 'Re-engagement', subscribers: 312, openRate: 28, clickRate: 5, revenue: 156 },
    ];

    const segments = [
        { name: 'VIP Customers', count: 234, avgValue: 450 },
        { name: 'New Subscribers', count: 856, avgValue: 0 },
        { name: 'At-Risk', count: 123, avgValue: 89 },
        { name: 'Repeat Buyers', count: 445, avgValue: 280 },
    ];

    const tabs = [
        { id: 'flows', label: 'Email Flows' },
        { id: 'campaigns', label: 'Campaigns' },
        { id: 'segments', label: 'Segments' },
        { id: 'templates', label: 'Templates' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Email & CRM AI Agent" subtitle="Automated email marketing and customer segmentation" />

            <div className="p-6">
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-3xl">✉️</div>
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
                    <StatCard title="Emails Sent" value="1,250" change={15.3} icon={<Send className="w-5 h-5" />} />
                    <StatCard title="Open Rate" value="42%" change={3.2} icon={<Inbox className="w-5 h-5" />} />
                    <StatCard title="Click Rate" value="8.5%" change={1.8} icon={<MousePointer className="w-5 h-5" />} />
                    <StatCard title="Revenue" value={2400} format="currency" change={22.1} icon={<DollarSign className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'flows' && (
                    <Card>
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Email Flows</h3>
                            <Button size="sm">Create Flow</Button>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2a3a]">
                                    <th className="text-left text-xs text-gray-500 py-3 px-4">Flow Name</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Subscribers</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Open Rate</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Click Rate</th>
                                    <th className="text-right text-xs text-gray-500 py-3 px-4">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emailFlows.map((flow) => (
                                    <tr key={flow.name} className="border-b border-[#1a1a24]">
                                        <td className="py-4 px-4 font-medium text-white">{flow.name}</td>
                                        <td className="py-4 px-4 text-right text-gray-300">{flow.subscribers}</td>
                                        <td className="py-4 px-4 text-right text-gray-300">{flow.openRate}%</td>
                                        <td className="py-4 px-4 text-right text-gray-300">{flow.clickRate}%</td>
                                        <td className="py-4 px-4 text-right text-green-400">${flow.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}

                {activeTab === 'campaigns' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Flash Sale Announcement', sent: 'Jan 28', opens: 2340, revenue: 4500 },
                            { name: 'New Collection Launch', sent: 'Jan 25', opens: 1890, revenue: 3200 },
                            { name: 'Winter Clearance', sent: 'Jan 20', opens: 1560, revenue: 2800 },
                        ].map((campaign) => (
                            <Card key={campaign.name}>
                                <h4 className="font-semibold text-white mb-2">{campaign.name}</h4>
                                <p className="text-sm text-gray-500 mb-4">Sent: {campaign.sent}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-[#0a0a0f] rounded-lg">
                                        <p className="text-xs text-gray-500">Opens</p>
                                        <p className="text-lg font-bold text-white">{campaign.opens.toLocaleString()}</p>
                                    </div>
                                    <div className="p-3 bg-[#0a0a0f] rounded-lg">
                                        <p className="text-xs text-gray-500">Revenue</p>
                                        <p className="text-lg font-bold text-green-400">${campaign.revenue}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'segments' && (
                    <Card>
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Customer Segments</h3>
                            <Button size="sm">Create Segment</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {segments.map((segment) => (
                                <div key={segment.name} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-indigo-400" />
                                        <div>
                                            <p className="font-medium text-white">{segment.name}</p>
                                            <p className="text-sm text-gray-500">{segment.count} customers</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white">${segment.avgValue}</p>
                                        <p className="text-xs text-gray-500">Avg. value</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'templates' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Welcome Email', 'Cart Reminder', 'Order Confirmation', 'Shipping Update', 'Review Request', 'Win-Back'].map((template) => (
                            <Card key={template}>
                                <div className="aspect-video bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-xl mb-4 flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-gray-600" />
                                </div>
                                <h4 className="font-medium text-white mb-2">{template}</h4>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" className="flex-1">Edit</Button>
                                    <Button variant="ghost" size="sm" className="flex-1">Preview</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
