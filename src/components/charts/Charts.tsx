'use client';

import React from 'react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];

interface ChartProps {
    data: any[];
    height?: number;
}

export function RevenueChart({ data, height = 300 }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#13131a',
                        border: '1px solid #2a2a3a',
                        borderRadius: '12px',
                        color: '#fff',
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                />
                <Line
                    type="monotone"
                    dataKey="spend"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export function PerformanceChart({ data, height = 300 }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#13131a',
                        border: '1px solid #2a2a3a',
                        borderRadius: '12px',
                        color: '#fff',
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="roas"
                    name="ROAS"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', strokeWidth: 0 }}
                />
                <Line
                    type="monotone"
                    dataKey="ctr"
                    name="CTR %"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 0 }}
                />
                <Line
                    type="monotone"
                    dataKey="cvr"
                    name="CVR %"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 0 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

interface PieChartProps {
    data: { name: string; value: number; color: string }[];
    height?: number;
}

export function TrafficPieChart({ data, height = 250 }: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#13131a',
                        border: '1px solid #2a2a3a',
                        borderRadius: '12px',
                        color: '#fff',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function BarChartComponent({ data, height = 300 }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#13131a',
                        border: '1px solid #2a2a3a',
                        borderRadius: '12px',
                        color: '#fff',
                    }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
