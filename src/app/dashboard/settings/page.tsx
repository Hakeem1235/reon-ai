'use client';

import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Card, Badge, Button, Toggle, Tabs, Input, Avatar } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { User, Building, Bell, Shield, CreditCard, Users, Palette, Zap } from 'lucide-react';

export default function SettingsPage() {
    const { user, workspace } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'workspace', label: 'Workspace' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'billing', label: 'Billing' },
        { id: 'team', label: 'Team' },
        { id: 'integrations', label: 'Integrations' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Settings" subtitle="Manage your account and preferences" />

            <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                </div>

                {activeTab === 'profile' && (
                    <div className="max-w-2xl space-y-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <User className="w-5 h-5" /> Profile Information
                            </h3>
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar name={user?.name || 'Boss'} size="lg" />
                                <Button variant="secondary" size="sm">Change Avatar</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="First Name" defaultValue={user?.name?.split(' ')[0] || 'The'} />
                                <Input label="Last Name" defaultValue={user?.name?.split(' ')[1] || 'Boss'} />
                                <Input label="Email" type="email" defaultValue={user?.email || 'boss@reon.ai'} className="col-span-2" />
                            </div>
                            <Button className="mt-6">Save Changes</Button>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5" /> Security
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-xl">
                                    <div>
                                        <p className="font-medium text-white">Password</p>
                                        <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                                    </div>
                                    <Button variant="secondary" size="sm">Change</Button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-xl">
                                    <div>
                                        <p className="font-medium text-white">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                    </div>
                                    <Toggle checked={false} onChange={() => { }} />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'workspace' && (
                    <div className="max-w-2xl space-y-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Building className="w-5 h-5" /> Workspace Settings
                            </h3>
                            <div className="space-y-4">
                                <Input label="Workspace Name" defaultValue={workspace?.name || 'My Business'} />
                                <Input label="Business Type" defaultValue={workspace?.businessType || 'E-commerce'} />
                                <Input label="Website URL" defaultValue={workspace?.website || 'https://mystore.com'} />
                            </div>
                            <Button className="mt-6">Save Changes</Button>
                        </Card>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="max-w-2xl">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Bell className="w-5 h-5" /> Notification Preferences
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'AI Agent Actions', description: 'Notify when agents take important actions', enabled: true },
                                    { label: 'Campaign Alerts', description: 'Performance alerts for ad campaigns', enabled: true },
                                    { label: 'Weekly Reports', description: 'Receive weekly summary reports via email', enabled: true },
                                    { label: 'Low Stock Alerts', description: 'Notify when products are running low', enabled: false },
                                    { label: 'New Customer Alerts', description: 'Notify for VIP customer activities', enabled: false },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-xl">
                                        <div>
                                            <p className="font-medium text-white">{item.label}</p>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        <Toggle checked={item.enabled} onChange={() => { }} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="max-w-2xl space-y-6">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" /> Current Plan
                            </h3>
                            <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-500/30 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Badge variant="accent" className="mb-2">Growth Plan</Badge>
                                        <p className="text-2xl font-bold text-white">$199/month</p>
                                        <p className="text-sm text-gray-400">Renews on Feb 15, 2024</p>
                                    </div>
                                    <Button variant="secondary">Upgrade</Button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">AI Actions Used</span>
                                    <span className="text-white">3,240 / 5,000</span>
                                </div>
                                <div className="h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '65%' }} />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                            <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded" />
                                    <span className="text-white">•••• •••• •••• 4242</span>
                                </div>
                                <Button variant="ghost" size="sm">Update</Button>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div className="max-w-2xl">
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Users className="w-5 h-5" /> Team Members
                                </h3>
                                <Button size="sm">Invite Member</Button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'The Boss', email: 'boss@reon.ai', role: 'Owner' },
                                    { name: 'Sarah Manager', email: 'sarah@company.com', role: 'Admin' },
                                    { name: 'Mike Assistant', email: 'mike@company.com', role: 'Member' },
                                ].map((member) => (
                                    <div key={member.email} className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={member.name} size="sm" />
                                            <div>
                                                <p className="font-medium text-white">{member.name}</p>
                                                <p className="text-sm text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <Badge variant={member.role === 'Owner' ? 'accent' : 'default'}>{member.role}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'integrations' && (
                    <div className="max-w-3xl">
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Connected Integrations
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'Shopify', icon: '🛍️', connected: true },
                                    { name: 'Meta Ads', icon: '📱', connected: true },
                                    { name: 'Google Ads', icon: '🔍', connected: true },
                                    { name: 'WhatsApp', icon: '💬', connected: true },
                                    { name: 'Klaviyo', icon: '✉️', connected: false },
                                    { name: 'Slack', icon: '💬', connected: false },
                                ].map((integration) => (
                                    <div key={integration.name} className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{integration.icon}</span>
                                            <span className="font-medium text-white">{integration.name}</span>
                                        </div>
                                        <Badge variant={integration.connected ? 'success' : 'default'}>
                                            {integration.connected ? 'Connected' : 'Connect'}
                                        </Badge>
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
