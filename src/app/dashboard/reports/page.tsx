'use client';

import React from 'react';
import { Header } from '@/components/dashboard/Header';
import { Card, Badge, Button } from '@/components/ui';
import { Download, Calendar, FileText, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

export default function ReportsPage() {
    const reports = [
        {
            id: 1,
            name: 'Weekly Performance Report',
            description: 'Comprehensive overview of all marketing channels',
            type: 'automatic',
            frequency: 'Weekly',
            lastGenerated: 'Jan 29, 2024',
            icon: TrendingUp,
        },
        {
            id: 2,
            name: 'Monthly Revenue Analysis',
            description: 'Detailed revenue breakdown by channel and product',
            type: 'automatic',
            frequency: 'Monthly',
            lastGenerated: 'Jan 28, 2024',
            icon: DollarSign,
        },
        {
            id: 3,
            name: 'Customer Segmentation Report',
            description: 'Customer behavior and segment analysis',
            type: 'automatic',
            frequency: 'Monthly',
            lastGenerated: 'Jan 28, 2024',
            icon: Users,
        },
        {
            id: 4,
            name: 'Ad Campaign Performance',
            description: 'Meta and Google Ads campaign analysis',
            type: 'automatic',
            frequency: 'Weekly',
            lastGenerated: 'Jan 27, 2024',
            icon: BarChart3,
        },
    ];

    const customReports = [
        { name: 'Q4 2023 Summary', created: 'Jan 15, 2024' },
        { name: 'Black Friday Analysis', created: 'Dec 1, 2023' },
        { name: 'Holiday Season Report', created: 'Dec 26, 2023' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Reports" subtitle="Automated reports and custom analytics" />

            <div className="p-6">
                {/* Quick Actions */}
                <div className="flex items-center gap-4 mb-6">
                    <Button>
                        <FileText className="w-4 h-4" /> Generate Custom Report
                    </Button>
                    <Button variant="secondary">
                        <Calendar className="w-4 h-4" /> Schedule Report
                    </Button>
                </div>

                {/* Automated Reports */}
                <h2 className="text-lg font-semibold text-white mb-4">Automated Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {reports.map((report) => (
                        <Card key={report.id} className="hover:border-indigo-500/50 transition-colors" hover>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <report.icon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-white">{report.name}</h3>
                                        <Badge variant="accent">{report.frequency}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">{report.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Last: {report.lastGenerated}</span>
                                        <Button variant="secondary" size="sm">
                                            <Download className="w-4 h-4" /> Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Custom Reports */}
                <h2 className="text-lg font-semibold text-white mb-4">Custom Reports</h2>
                <Card>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#2a2a3a]">
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Report Name</th>
                                <th className="text-left text-xs text-gray-500 py-3 px-4">Created</th>
                                <th className="text-right text-xs text-gray-500 py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customReports.map((report) => (
                                <tr key={report.name} className="border-b border-[#1a1a24] hover:bg-[#1a1a24]">
                                    <td className="py-4 px-4 font-medium text-white">{report.name}</td>
                                    <td className="py-4 px-4 text-gray-400">{report.created}</td>
                                    <td className="py-4 px-4 text-right">
                                        <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* Report Insights */}
                <h2 className="text-lg font-semibold text-white mt-8 mb-4">AI Insights from Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { insight: 'ROAS improved 23% this month', type: 'success' },
                        { insight: 'Customer acquisition cost down 12%', type: 'success' },
                        { insight: 'Cart abandonment needs attention', type: 'warning' },
                    ].map((item, i) => (
                        <Card key={i} className={`border-l-4 ${item.type === 'success' ? 'border-l-green-500' : 'border-l-amber-500'}`}>
                            <p className="text-white">{item.insight}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
