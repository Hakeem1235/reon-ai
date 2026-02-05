'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Toggle, Tabs } from '@/components/ui';
import { mockAgents } from '@/data/mockData';
import {
    MessageCircle,
    ShoppingCart,
    CheckCircle,
    Clock,
    Send,
    Settings,
    Bot,
    Users,
    DollarSign,
} from 'lucide-react';

export default function WhatsAppAgentPage() {
    const agent = mockAgents.find(a => a.type === 'whatsapp')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('overview');

    const conversations = [
        { id: 1, customer: 'Sarah J.', message: 'Where is my order #12345?', time: '2 min ago', status: 'replied' },
        { id: 2, customer: 'Mike C.', message: 'Do you have size M in stock?', time: '5 min ago', status: 'replied' },
        { id: 3, customer: 'Emma W.', message: 'I want to return my purchase', time: '10 min ago', status: 'pending' },
        { id: 4, customer: 'John D.', message: 'Thanks for the quick delivery!', time: '15 min ago', status: 'replied' },
    ];

    const templates = [
        { name: 'Order Confirmation', uses: 234, success: 98 },
        { name: 'Shipping Update', uses: 189, success: 97 },
        { name: 'Abandoned Cart', uses: 156, success: 23 },
        { name: 'COD Confirmation', uses: 89, success: 76 },
        { name: 'Review Request', uses: 67, success: 34 },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'conversations', label: 'Conversations' },
        { id: 'templates', label: 'Templates' },
        { id: 'flows', label: 'Flows' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="WhatsApp Bot AI Agent" subtitle="Automated customer communication" />

            <div className="p-6">
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center text-3xl">💬</div>
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
                    <StatCard title="Messages Today" value={892} change={12.3} icon={<MessageCircle className="w-5 h-5" />} />
                    <StatCard title="Recovery Rate" value="23%" change={5.2} icon={<ShoppingCart className="w-5 h-5" />} />
                    <StatCard title="Response Rate" value="94%" icon={<CheckCircle className="w-5 h-5" />} />
                    <StatCard title="Revenue Recovered" value={1240} format="currency" icon={<DollarSign className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Recent Conversations</h3>
                            <div className="space-y-3">
                                {conversations.map((conv) => (
                                    <div key={conv.id} className="p-3 bg-[#0a0a0f] rounded-xl flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                                            {conv.customer.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-white">{conv.customer}</span>
                                                <span className="text-xs text-gray-500">{conv.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-400 truncate">{conv.message}</p>
                                        </div>
                                        <Badge variant={conv.status === 'replied' ? 'success' : 'warning'}>{conv.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Message Types</h3>
                            <div className="space-y-4">
                                {[
                                    { type: 'Order Tracking', count: 234, icon: '📦' },
                                    { type: 'COD Confirmation', count: 89, icon: '💰' },
                                    { type: 'Cart Recovery', count: 156, icon: '🛒' },
                                    { type: 'FAQ Responses', count: 312, icon: '❓' },
                                    { type: 'Upsells', count: 45, icon: '⬆️' },
                                ].map((item) => (
                                    <div key={item.type} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-white">{item.type}</span>
                                        </div>
                                        <span className="text-gray-400">{item.count} messages</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'conversations' && (
                    <Card>
                        <div className="space-y-4">
                            {[...conversations, ...conversations].map((conv, i) => (
                                <div key={i} className="p-4 bg-[#0a0a0f] rounded-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                                            {conv.customer.charAt(0)}
                                        </div>
                                        <div>
                                            <span className="font-medium text-white">{conv.customer}</span>
                                            <p className="text-xs text-gray-500">{conv.time}</p>
                                        </div>
                                        <Badge variant={conv.status === 'replied' ? 'success' : 'warning'} className="ml-auto">{conv.status}</Badge>
                                    </div>
                                    <p className="text-gray-300 mb-3">{conv.message}</p>
                                    {conv.status === 'replied' && (
                                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <p className="text-sm text-green-400 flex items-center gap-2"><Bot className="w-4 h-4" /> AI Response sent automatically</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'templates' && (
                    <Card>
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Message Templates</h3>
                            <Button size="sm">Create Template</Button>
                        </div>
                        <div className="space-y-4">
                            {templates.map((template) => (
                                <div key={template.name} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-white">{template.name}</h4>
                                        <p className="text-sm text-gray-500">{template.uses} uses this week</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-400">{template.success}% success</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'flows' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Order Tracking Flow', triggers: 234, status: 'active' },
                            { name: 'Abandoned Cart Recovery', triggers: 156, status: 'active' },
                            { name: 'COD Confirmation', triggers: 89, status: 'active' },
                            { name: 'Post-Purchase Upsell', triggers: 45, status: 'paused' },
                        ].map((flow) => (
                            <Card key={flow.name}>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-white">{flow.name}</h4>
                                    <Badge variant={flow.status === 'active' ? 'success' : 'warning'}>{flow.status}</Badge>
                                </div>
                                <p className="text-gray-500 mb-4">{flow.triggers} triggers this week</p>
                                <div className="flex gap-2">
                                    <div className="flex-1 h-2 bg-[#0a0a0f] rounded-full">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                                    </div>
                                    <span className="text-xs text-gray-500">75% completion</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
