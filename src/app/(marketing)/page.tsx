'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Zap,
    BarChart3,
    Bot,
    Shield,
    Check,
    Play,
    Star,
    ChevronRight,
    Sparkles,
    TrendingUp,
    Users,
    DollarSign,
    MousePointer,
    MessageCircle,
    Search,
    Mail,
    Globe,
} from 'lucide-react';

const agents = [
    { icon: '📱', name: 'Meta Ads AI', desc: 'Auto-optimize Facebook & Instagram campaigns', color: 'from-blue-500 to-purple-500' },
    { icon: '🔍', name: 'Google Ads AI', desc: 'Smart bidding & keyword optimization', color: 'from-blue-500 to-green-500' },
    { icon: '📸', name: 'Social Media AI', desc: 'Auto-schedule & engage followers', color: 'from-pink-500 to-purple-500' },
    { icon: '💬', name: 'WhatsApp Bot AI', desc: 'Recover carts & confirm COD orders', color: 'from-green-500 to-emerald-500' },
    { icon: '📈', name: 'SEO AI', desc: 'Rank higher with AI content', color: 'from-green-500 to-blue-500' },
    { icon: '📊', name: 'Analytics AI', desc: 'Unified insights & predictions', color: 'from-blue-500 to-cyan-500' },
    { icon: '✉️', name: 'Email & CRM AI', desc: 'Personalized flows & segments', color: 'from-violet-500 to-pink-500' },
    { icon: '🌐', name: 'Website AI', desc: 'CRO & funnel optimization', color: 'from-cyan-500 to-blue-500' },
];

const stats = [
    { value: '3.4x', label: 'Average ROAS', icon: TrendingUp },
    { value: '47%', label: 'Cost Reduction', icon: DollarSign },
    { value: '24/7', label: 'AI Optimization', icon: Zap },
    { value: '10K+', label: 'Brands Trust Us', icon: Users },
];

const testimonials = [
    { name: 'Sarah K.', role: 'E-commerce Owner', quote: 'Reon.ai 3x\'d our ROAS in just 2 weeks. The AI agents work around the clock!', avatar: 'S' },
    { name: 'Mike T.', role: 'D2C Brand Founder', quote: 'Finally, I can focus on products while AI handles all my marketing.', avatar: 'M' },
    { name: 'Elena R.', role: 'Shopify Merchant', quote: 'The WhatsApp bot alone recovered $12K in abandoned carts last month.', avatar: 'E' },
];

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#030308] text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-[200px]" />
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030308]/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">Reon.ai</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                        <a href="#agents" className="text-gray-400 hover:text-white transition-colors">AI Agents</a>
                        <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</a>
                        <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors hidden sm:block">
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">AI-Powered E-commerce Automation</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            Your AI Workforce
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            That Never Sleeps
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        8 AI agents working 24/7 to grow your e-commerce brand. From ads to emails,
                        SEO to social — let AI handle it while you focus on what matters.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            href="/signup"
                            className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl font-semibold text-lg flex items-center gap-2 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="group px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold text-lg flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all">
                            <Play className="w-5 h-5 text-indigo-400" />
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat) => (
                            <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <stat.icon className="w-6 h-6 text-indigo-400 mb-3 mx-auto" />
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-indigo-400 font-semibold mb-3">FEATURES</p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Everything You Need to Scale</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            One platform, infinite possibilities. Connect your store and let AI do the heavy lifting.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Bot, title: 'AI Agents', desc: '8 specialized agents working together to optimize every aspect of your business.', color: 'indigo' },
                            { icon: BarChart3, title: 'Unified Analytics', desc: 'See all your data in one place with AI-powered insights and predictions.', color: 'purple' },
                            { icon: Shield, title: 'Full Transparency', desc: 'Every AI action is logged with reasoning. You\'re always in control.', color: 'pink' },
                            { icon: Zap, title: 'Auto-Optimization', desc: 'AI continuously tests and improves campaigns, creatives, and targeting.', color: 'blue' },
                            { icon: MessageCircle, title: 'Smart Automation', desc: 'From WhatsApp to email, automate customer touchpoints intelligently.', color: 'green' },
                            { icon: TrendingUp, title: 'Revenue Growth', desc: 'Average 3.4x ROAS improvement within the first 30 days.', color: 'amber' },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Agents Showcase */}
            <section id="agents" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-16">
                        <p className="text-indigo-400 font-semibold mb-3">YOUR AI TEAM</p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet Your 8 AI Agents</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Each agent is specialized, trained, and ready to work. You're the boss — they follow your rules.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {agents.map((agent) => (
                            <div
                                key={agent.name}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {agent.icon}
                                </div>
                                <h3 className="font-bold mb-2">{agent.name}</h3>
                                <p className="text-sm text-gray-500">{agent.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-indigo-400 font-semibold mb-3">TESTIMONIALS</p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Loved by 10,000+ Brands</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.name} className="p-8 rounded-3xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-lg text-gray-300 mb-6 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{t.name}</p>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
                <div className="max-w-5xl mx-auto relative">
                    <div className="text-center mb-16">
                        <p className="text-indigo-400 font-semibold mb-3">PRICING</p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-gray-400 text-lg">Start free. Upgrade when you're ready to scale.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Starter', price: '$49', desc: 'Perfect for small stores', features: ['2 AI Agents', '1,000 AI actions/mo', 'Basic analytics', 'Email support'] },
                            { name: 'Growth', price: '$199', desc: 'Most popular for scaling brands', features: ['All 8 AI Agents', '10,000 AI actions/mo', 'Advanced analytics', 'Priority support', 'Custom rules'], popular: true },
                            { name: 'Enterprise', price: 'Custom', desc: 'For large operations', features: ['Unlimited AI actions', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'White-label option'] },
                        ].map((plan) => (
                            <div
                                key={plan.name}
                                className={`p-8 rounded-3xl border ${plan.popular ? 'bg-gradient-to-b from-indigo-500/10 to-purple-500/10 border-indigo-500/30' : 'bg-white/5 border-white/5'}`}
                            >
                                {plan.popular && (
                                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-gray-500 mb-1">/month</span>}
                                </div>
                                <p className="text-gray-500 mb-6">{plan.desc}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-gray-300">
                                            <Check className="w-5 h-5 text-green-400" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/signup"
                                    className={`block w-full py-3 rounded-xl text-center font-semibold transition-all ${plan.popular
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25'
                                            : 'bg-white/10 hover:bg-white/15'
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to 10x Your Growth?</h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Join 10,000+ brands using Reon.ai to automate their success.
                        </p>
                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all"
                        >
                            Start Your Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="text-gray-500 mt-4">No credit card required</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold">Reon.ai</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Support</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                        <p className="text-sm text-gray-600">© 2024 Reon.ai. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
