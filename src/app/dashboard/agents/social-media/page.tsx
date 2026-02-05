'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button, Toggle, Tabs } from '@/components/ui';
import { mockAgents } from '@/data/mockData';
import {
    Users,
    Heart,
    MessageCircle,
    Share2,
    Image,
    Calendar,
    Settings,
    Instagram,
    Facebook,
    Plus,
    Clock,
} from 'lucide-react';

export default function SocialMediaAgentPage() {
    const agent = mockAgents.find(a => a.type === 'social-media')!;
    const [isActive, setIsActive] = useState(agent.status === 'active');
    const [activeTab, setActiveTab] = useState('calendar');

    const scheduledPosts = [
        { id: 1, time: '9:00 AM', platform: 'instagram', type: 'Reel', caption: 'Summer collection just dropped! 🔥', status: 'scheduled' },
        { id: 2, time: '1:00 PM', platform: 'facebook', type: 'Post', caption: 'Behind the scenes of our latest shoot...', status: 'scheduled' },
        { id: 3, time: '7:00 PM', platform: 'instagram', type: 'Story', caption: 'Flash sale announcement', status: 'scheduled' },
    ];

    const hashtagSuggestions = [
        { tag: '#summerfashion', engagement: '4.2M', trend: 'up' },
        { tag: '#ootd', engagement: '12.8M', trend: 'stable' },
        { tag: '#streetstyle', engagement: '8.1M', trend: 'up' },
        { tag: '#fashioninspo', engagement: '5.6M', trend: 'down' },
    ];

    const tabs = [
        { id: 'calendar', label: 'Calendar' },
        { id: 'posts', label: 'Posts' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'hashtags', label: 'Hashtags' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Social Media AI Agent" subtitle="Content creation and engagement automation" />

            <div className="p-6">
                {/* Agent Control */}
                <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-3xl">
                            📸
                        </div>
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

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard title="Followers" value="12.4K" change={3.2} icon={<Users className="w-5 h-5" />} />
                    <StatCard title="Engagement Rate" value="4.5%" change={0.8} icon={<Heart className="w-5 h-5" />} />
                    <StatCard title="Posts This Week" value={24} icon={<Image className="w-5 h-5" />} />
                    <StatCard title="Reach" value="45K" change={15.3} icon={<Share2 className="w-5 h-5" />} />
                </div>

                <div className="mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'calendar' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-white">Today&apos;s Schedule</h3>
                                <Button size="sm"><Plus className="w-4 h-4" /> Create Post</Button>
                            </div>
                            <div className="space-y-4">
                                {scheduledPosts.map((post) => (
                                    <div key={post.id} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                                            {post.platform === 'instagram' ? <Instagram className="w-6 h-6 text-pink-400" /> : <Facebook className="w-6 h-6 text-blue-400" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="accent">{post.type}</Badge>
                                                <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                                            </div>
                                            <p className="text-sm text-white">{post.caption}</p>
                                        </div>
                                        <Badge variant="info">{post.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Best Posting Times</h3>
                            <div className="space-y-3">
                                {['9:00 AM', '12:00 PM', '3:00 PM', '7:00 PM', '9:00 PM'].map((time, i) => (
                                    <div key={time} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-xl">
                                        <span className="text-white">{time}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${90 - i * 15}%` }} />
                                            </div>
                                            <span className="text-xs text-gray-500">{90 - i * 15}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'posts' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Card key={i} className="p-0 overflow-hidden">
                                <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                                    <Image className="w-10 h-10 text-gray-600" />
                                </div>
                                <div className="p-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1 text-pink-400"><Heart className="w-3 h-3" /> {Math.floor(100 + Math.random() * 900)}</span>
                                        <span className="flex items-center gap-1 text-gray-500"><MessageCircle className="w-3 h-3" /> {Math.floor(10 + Math.random() * 50)}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Engagement by Day</h3>
                            <div className="space-y-3">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <div key={day} className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500 w-8">{day}</span>
                                        <div className="flex-1 h-6 bg-[#0a0a0f] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: `${40 + Math.random() * 50}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Content Performance</h3>
                            <div className="space-y-4">
                                {[{ type: 'Reels', engagement: 8.2 }, { type: 'Stories', engagement: 5.4 }, { type: 'Posts', engagement: 3.8 }, { type: 'Carousels', engagement: 6.1 }].map((item) => (
                                    <div key={item.type} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-xl">
                                        <span className="text-white">{item.type}</span>
                                        <span className="text-pink-400">{item.engagement}% avg engagement</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'hashtags' && (
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-6">Recommended Hashtags</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hashtagSuggestions.map((h) => (
                                <div key={h.tag} className="p-4 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-indigo-400">{h.tag}</p>
                                        <p className="text-sm text-gray-500">{h.engagement} posts</p>
                                    </div>
                                    <Badge variant={h.trend === 'up' ? 'success' : h.trend === 'down' ? 'error' : 'default'}>
                                        {h.trend === 'up' ? '↑ Trending' : h.trend === 'down' ? '↓ Declining' : '→ Stable'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
