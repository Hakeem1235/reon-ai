'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { AgentCard } from '@/components/agents/AgentCard';
import { mockAgents } from '@/data/mockData';
import { Button, Tabs } from '@/components/ui';
import { Filter, Grid, List } from 'lucide-react';

export default function AgentsPage() {
    const [agents, setAgents] = useState(mockAgents);
    const [filter, setFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const handleAgentToggle = (id: string, active: boolean) => {
        setAgents(agents.map(agent =>
            agent.id === id
                ? { ...agent, status: active ? 'active' : 'paused' as const }
                : agent
        ));
    };

    const filteredAgents = agents.filter(agent => {
        if (filter === 'all') return true;
        return agent.status === filter;
    });

    const tabs = [
        { id: 'all', label: `All (${agents.length})` },
        { id: 'active', label: `Active (${agents.filter(a => a.status === 'active').length})` },
        { id: 'paused', label: `Paused (${agents.filter(a => a.status === 'paused').length})` },
    ];

    return (
        <div className="min-h-screen">
            <Header title="AI Agents" subtitle="Your AI workforce at your command" />

            <div className="p-6">
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <Tabs tabs={tabs} activeTab={filter} onChange={setFilter} />

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-[#1a1a24] text-white' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-[#1a1a24] text-white' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Agent Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5">
                        <p className="text-sm text-gray-400 mb-1">Total Actions Today</p>
                        <p className="text-2xl font-bold text-white">
                            {agents.reduce((sum, a) => sum + a.actionsToday, 0)}
                        </p>
                    </div>
                    <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5">
                        <p className="text-sm text-gray-400 mb-1">Active Agents</p>
                        <p className="text-2xl font-bold text-green-400">
                            {agents.filter(a => a.status === 'active').length}
                        </p>
                    </div>
                    <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5">
                        <p className="text-sm text-gray-400 mb-1">Paused Agents</p>
                        <p className="text-2xl font-bold text-amber-400">
                            {agents.filter(a => a.status === 'paused').length}
                        </p>
                    </div>
                    <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5">
                        <p className="text-sm text-gray-400 mb-1">Error Status</p>
                        <p className="text-2xl font-bold text-red-400">
                            {agents.filter(a => a.status === 'error').length}
                        </p>
                    </div>
                </div>

                {/* Agents Grid */}
                <div className={view === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                    {filteredAgents.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                            onToggle={handleAgentToggle}
                        />
                    ))}
                </div>

                {filteredAgents.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-400">No agents match the current filter</p>
                    </div>
                )}
            </div>
        </div>
    );
}
