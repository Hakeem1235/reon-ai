'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Tabs, Avatar } from '@/components/ui';
import { mockCustomers } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Users, DollarSign, Repeat, UserPlus, Search, Filter, Mail, MoreVertical } from 'lucide-react';

export default function CustomersPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'all', label: `All (${mockCustomers.length})` },
        { id: 'vip', label: `VIP (${mockCustomers.filter(c => c.segment === 'vip').length})` },
        { id: 'returning', label: `Returning (${mockCustomers.filter(c => c.segment === 'returning').length})` },
        { id: 'new', label: `New (${mockCustomers.filter(c => c.segment === 'new').length})` },
        { id: 'at-risk', label: `At Risk (${mockCustomers.filter(c => c.segment === 'at-risk').length})` },
    ];

    const filteredCustomers = mockCustomers.filter(c => {
        const matchesTab = activeTab === 'all' || c.segment === activeTab;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const totalCustomers = mockCustomers.length;
    const avgLTV = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / totalCustomers;
    const vipCount = mockCustomers.filter(c => c.segment === 'vip').length;

    const segmentColors: Record<string, 'success' | 'warning' | 'error' | 'info' | 'accent'> = {
        vip: 'accent',
        returning: 'success',
        new: 'info',
        'at-risk': 'warning',
    };

    return (
        <div className="min-h-screen">
            <Header title="Customers" subtitle="Manage and segment your customer base" />

            <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard title="Total Customers" value={totalCustomers} change={8} icon={<Users className="w-5 h-5" />} />
                    <StatCard title="Avg. Lifetime Value" value={avgLTV} format="currency" change={12.3} icon={<DollarSign className="w-5 h-5" />} />
                    <StatCard title="VIP Customers" value={vipCount} change={5} icon={<Repeat className="w-5 h-5" />} />
                    <StatCard title="New This Week" value={12} icon={<UserPlus className="w-5 h-5" />} />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#13131a] border border-[#2a2a3a] rounded-xl px-4 py-2">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-48"
                            />
                        </div>
                        <Button variant="secondary" size="sm">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </div>
                </div>

                {/* Customers Table */}
                <Card>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#2a2a3a]">
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Customer</th>
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Segment</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">Orders</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">Total Spent</th>
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Last Order</th>
                                <th className="text-center text-xs text-gray-500 py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b border-[#1a1a24] hover:bg-[#1a1a24]">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={customer.name} size="sm" />
                                            <div>
                                                <p className="font-medium text-white">{customer.name}</p>
                                                <p className="text-xs text-gray-500">{customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <Badge variant={segmentColors[customer.segment]}>{customer.segment}</Badge>
                                    </td>
                                    <td className="py-4 px-4 text-right text-gray-300">{customer.orders}</td>
                                    <td className="py-4 px-4 text-right text-white font-medium">{formatCurrency(customer.totalSpent)}</td>
                                    <td className="py-4 px-4 text-gray-400 text-sm">{formatDate(customer.lastOrder)}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 hover:bg-[#2a2a3a] rounded-lg transition-colors">
                                                <Mail className="w-4 h-4 text-gray-400" />
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
