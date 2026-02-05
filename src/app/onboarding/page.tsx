'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Card, ProgressBar } from '@/components/ui';
import {
    Crown,
    ArrowRight,
    ArrowLeft,
    Building2,
    Globe,
    Link2,
    Target,
    Users,
    Check,
    Sparkles,
    ShoppingBag,
    Store,
    DollarSign,
    MapPin,
} from 'lucide-react';

const steps = [
    { id: 1, title: 'Business Info', icon: Building2 },
    { id: 2, title: 'Connect Store', icon: Store },
    { id: 3, title: 'Platforms', icon: Link2 },
    { id: 4, title: 'Goals', icon: Target },
    { id: 5, title: 'Meet Team', icon: Users },
];

const industries = [
    'Fashion & Apparel',
    'Electronics',
    'Beauty & Cosmetics',
    'Home & Garden',
    'Food & Beverage',
    'Health & Wellness',
    'Sports & Outdoors',
    'Toys & Games',
    'Other',
];

const revenueRanges = [
    '$0 - $10K',
    '$10K - $50K',
    '$50K - $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M+',
];

const goals = [
    { id: 'sales', icon: DollarSign, title: 'Increase Sales', description: 'Drive more conversions and revenue' },
    { id: 'leads', icon: Users, title: 'Generate Leads', description: 'Capture and nurture potential customers' },
    { id: 'traffic', icon: Globe, title: 'Boost Traffic', description: 'Get more visitors to your store' },
    { id: 'brand', icon: Sparkles, title: 'Brand Awareness', description: 'Build recognition and trust' },
];

const agents = [
    { id: 'meta', icon: '📱', name: 'Meta Ads AI', desc: 'Facebook & Instagram campaigns' },
    { id: 'google', icon: '🔍', name: 'Google Ads AI', desc: 'Search & Shopping optimization' },
    { id: 'social', icon: '📸', name: 'Social Media AI', desc: 'Content & engagement' },
    { id: 'whatsapp', icon: '💬', name: 'WhatsApp Bot AI', desc: 'Customer communication' },
    { id: 'seo', icon: '📈', name: 'SEO AI', desc: 'Search rankings & traffic' },
    { id: 'analytics', icon: '📊', name: 'Analytics AI', desc: 'Insights & reporting' },
    { id: 'email', icon: '✉️', name: 'Email & CRM AI', desc: 'Email marketing flows' },
    { id: 'website', icon: '🌐', name: 'Website AI', desc: 'CRO & funnels' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { updateWorkspace, completeOnboarding } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        brandName: '',
        website: '',
        industry: '',
        monthlyRevenue: '',
        country: '',
        storePlatform: '',
        storeUrl: '',
        connectedPlatforms: [] as string[],
        selectedGoals: [] as string[],
    });

    const updateFormData = (key: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleArrayItem = (key: 'connectedPlatforms' | 'selectedGoals', item: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].includes(item)
                ? prev[key].filter((i: string) => i !== item)
                : [...prev[key], item],
        }));
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        updateWorkspace({
            brandName: formData.brandName,
            website: formData.website,
            industry: formData.industry,
            monthlyRevenue: formData.monthlyRevenue,
            country: formData.country,
            goals: formData.selectedGoals,
            onboardingCompleted: true,
        });

        completeOnboarding();
        router.push('/dashboard');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Tell us about your business</h2>
                            <p className="text-gray-400">This helps us customize your AI agents</p>
                        </div>

                        <Input
                            label="Brand Name"
                            placeholder="Your awesome brand"
                            value={formData.brandName}
                            onChange={(e) => updateFormData('brandName', e.target.value)}
                            icon={<Building2 className="w-4 h-4" />}
                        />

                        <Input
                            label="Website URL"
                            placeholder="https://yourbrand.com"
                            value={formData.website}
                            onChange={(e) => updateFormData('website', e.target.value)}
                            icon={<Globe className="w-4 h-4" />}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                            <div className="grid grid-cols-3 gap-2">
                                {industries.map((industry) => (
                                    <button
                                        key={industry}
                                        type="button"
                                        onClick={() => updateFormData('industry', industry)}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all ${formData.industry === industry
                                                ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300'
                                                : 'bg-[#1a1a24] border border-[#2a2a3a] text-gray-400 hover:border-[#3a3a4a]'
                                            }`}
                                    >
                                        {industry}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Revenue</label>
                            <div className="grid grid-cols-3 gap-2">
                                {revenueRanges.map((range) => (
                                    <button
                                        key={range}
                                        type="button"
                                        onClick={() => updateFormData('monthlyRevenue', range)}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all ${formData.monthlyRevenue === range
                                                ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300'
                                                : 'bg-[#1a1a24] border border-[#2a2a3a] text-gray-400 hover:border-[#3a3a4a]'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Country"
                            placeholder="United States"
                            value={formData.country}
                            onChange={(e) => updateFormData('country', e.target.value)}
                            icon={<MapPin className="w-4 h-4" />}
                        />
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Connect your store</h2>
                            <p className="text-gray-400">We&apos;ll sync your products and orders</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => updateFormData('storePlatform', 'shopify')}
                                className={`p-6 rounded-2xl border transition-all ${formData.storePlatform === 'shopify'
                                        ? 'bg-[#95BF47]/10 border-[#95BF47]/50'
                                        : 'bg-[#1a1a24] border-[#2a2a3a] hover:border-[#3a3a4a]'
                                    }`}
                            >
                                <div className="text-4xl mb-3">🛍️</div>
                                <h3 className="font-semibold text-white">Shopify</h3>
                                <p className="text-sm text-gray-500 mt-1">Most popular choice</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => updateFormData('storePlatform', 'woocommerce')}
                                className={`p-6 rounded-2xl border transition-all ${formData.storePlatform === 'woocommerce'
                                        ? 'bg-[#7B5FC5]/10 border-[#7B5FC5]/50'
                                        : 'bg-[#1a1a24] border-[#2a2a3a] hover:border-[#3a3a4a]'
                                    }`}
                            >
                                <div className="text-4xl mb-3">🔮</div>
                                <h3 className="font-semibold text-white">WooCommerce</h3>
                                <p className="text-sm text-gray-500 mt-1">WordPress integration</p>
                            </button>
                        </div>

                        {formData.storePlatform && (
                            <div className="animate-fade-in">
                                <Input
                                    label="Store URL"
                                    placeholder={formData.storePlatform === 'shopify' ? 'yourstore.myshopify.com' : 'yourstore.com'}
                                    value={formData.storeUrl}
                                    onChange={(e) => updateFormData('storeUrl', e.target.value)}
                                    icon={<Link2 className="w-4 h-4" />}
                                />

                                <Button className="w-full mt-4" variant="secondary">
                                    <ShoppingBag className="w-4 h-4" />
                                    Connect {formData.storePlatform === 'shopify' ? 'Shopify' : 'WooCommerce'}
                                </Button>

                                <div className="flex items-center gap-2 mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                                    <Check className="w-5 h-5 text-green-400" />
                                    <span className="text-sm text-green-400">Ready to connect (demo mode)</span>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Connect your platforms</h2>
                            <p className="text-gray-400">Enable powerful AI automation</p>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: 'meta', icon: '📱', name: 'Meta Ads', desc: 'Facebook & Instagram advertising', color: '#1877F2' },
                                { id: 'google', icon: '🔍', name: 'Google Ads', desc: 'Search & Shopping campaigns', color: '#4285F4' },
                                { id: 'whatsapp', icon: '💬', name: 'WhatsApp Business', desc: 'Customer messaging automation', color: '#25D366' },
                                { id: 'email', icon: '✉️', name: 'Email Provider', desc: 'SMTP or API integration', color: '#6366f1' },
                            ].map((platform) => (
                                <button
                                    key={platform.id}
                                    type="button"
                                    onClick={() => toggleArrayItem('connectedPlatforms', platform.id)}
                                    className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${formData.connectedPlatforms.includes(platform.id)
                                            ? 'bg-indigo-500/10 border-indigo-500/50'
                                            : 'bg-[#1a1a24] border-[#2a2a3a] hover:border-[#3a3a4a]'
                                        }`}
                                >
                                    <div className="text-2xl">{platform.icon}</div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-semibold text-white">{platform.name}</h3>
                                        <p className="text-sm text-gray-500">{platform.desc}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.connectedPlatforms.includes(platform.id)
                                            ? 'bg-indigo-500 border-indigo-500'
                                            : 'border-[#3a3a4a]'
                                        }`}>
                                        {formData.connectedPlatforms.includes(platform.id) && (
                                            <Check className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <p className="text-sm text-gray-500 text-center">
                            Don&apos;t worry, you can connect more platforms later
                        </p>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">What are your goals?</h2>
                            <p className="text-gray-400">We&apos;ll prioritize your AI agents accordingly</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {goals.map((goal) => (
                                <button
                                    key={goal.id}
                                    type="button"
                                    onClick={() => toggleArrayItem('selectedGoals', goal.id)}
                                    className={`p-5 rounded-2xl border transition-all text-left ${formData.selectedGoals.includes(goal.id)
                                            ? 'bg-indigo-500/10 border-indigo-500/50'
                                            : 'bg-[#1a1a24] border-[#2a2a3a] hover:border-[#3a3a4a]'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${formData.selectedGoals.includes(goal.id)
                                            ? 'bg-indigo-500/20'
                                            : 'bg-[#0a0a0f]'
                                        }`}>
                                        <goal.icon className={`w-5 h-5 ${formData.selectedGoals.includes(goal.id) ? 'text-indigo-400' : 'text-gray-500'
                                            }`} />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{goal.title}</h3>
                                    <p className="text-sm text-gray-500">{goal.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Meet your AI team</h2>
                            <p className="text-gray-400">8 specialized agents ready to execute</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {agents.map((agent, index) => (
                                <div
                                    key={agent.id}
                                    className="p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] animate-slide-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{agent.icon}</div>
                                        <div>
                                            <h3 className="font-medium text-white text-sm">{agent.name}</h3>
                                            <p className="text-xs text-gray-500">{agent.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl text-center">
                            <Crown className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                            <p className="text-white font-semibold">You are the Boss</p>
                            <p className="text-sm text-gray-400">These agents work for you 24/7</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Reon.ai</h1>
                        <p className="text-sm text-gray-400">Setup Wizard</p>
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`flex flex-col items-center ${step.id <= currentStep ? 'text-indigo-400' : 'text-gray-600'
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${step.id < currentStep
                                            ? 'bg-indigo-500 text-white'
                                            : step.id === currentStep
                                                ? 'bg-indigo-500/20 border border-indigo-500/50'
                                                : 'bg-[#1a1a24] border border-[#2a2a3a]'
                                        }`}
                                >
                                    {step.id < currentStep ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <step.icon className="w-5 h-5" />
                                    )}
                                </div>
                                <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                            </div>
                        ))}
                    </div>
                    <ProgressBar value={currentStep} max={5} />
                </div>

                {/* Step Content */}
                <Card className="mb-6">{renderStep()}</Card>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>

                    {currentStep < 5 ? (
                        <Button onClick={handleNext}>
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button onClick={handleComplete} loading={loading}>
                            {loading ? 'Launching...' : 'Launch Dashboard'}
                            <Sparkles className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
