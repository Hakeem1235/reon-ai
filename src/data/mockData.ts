// Mock Data for Reon.ai Frontend MVP
// All data is stored in localStorage for persistence

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
}

export interface Workspace {
    id: string;
    name: string;
    brandName: string;
    website: string;
    industry: string;
    country: string;
    currency: string;
    monthlyRevenue: string;
    goals: string[];
    plan: 'starter' | 'growth' | 'pro';
    onboardingCompleted: boolean;
}

export interface Store {
    id: string;
    platform: 'shopify' | 'woocommerce';
    name: string;
    url: string;
    connected: boolean;
    productsCount: number;
    ordersToday: number;
    revenue: number;
}

export interface AdAccount {
    id: string;
    platform: 'meta' | 'google';
    name: string;
    connected: boolean;
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
}

export interface Agent {
    id: string;
    type: 'meta-ads' | 'google-ads' | 'social-media' | 'whatsapp' | 'seo' | 'analytics' | 'email-crm' | 'website-funnel';
    name: string;
    description: string;
    status: 'active' | 'paused' | 'error';
    icon: string;
    permissions: string[];
    actionsToday: number;
    lastAction?: AgentAction;
    metrics: Record<string, number | string>;
}

export interface AgentAction {
    id: string;
    agentId: string;
    action: string;
    reason: string;
    result: string;
    timestamp: Date;
    status: 'success' | 'pending' | 'failed';
}

export interface Campaign {
    id: string;
    name: string;
    platform: 'meta' | 'google';
    status: 'active' | 'paused' | 'completed';
    budget: number;
    spent: number;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roas: number;
    createdAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    orders: number;
    totalSpent: number;
    lastOrder: Date;
    segment: 'new' | 'returning' | 'vip' | 'at-risk';
}

export interface DashboardMetrics {
    todaySpend: number;
    revenue: number;
    roas: number;
    orders: number;
    activeCampaigns: number;
    aiActionsToday: number;
    visitors: number;
    conversionRate: number;
}

// Default Mock Data
export const mockUser: User = {
    id: 'usr_001',
    email: 'boss@reon.ai',
    name: 'Alex Morgan',
    createdAt: new Date('2024-01-15'),
};

export const mockWorkspace: Workspace = {
    id: 'ws_001',
    name: 'Main Workspace',
    brandName: 'TechStyle',
    website: 'https://techstyle.com',
    industry: 'Fashion & Apparel',
    country: 'United States',
    currency: 'USD',
    monthlyRevenue: '$50K - $100K',
    goals: ['sales', 'brand-awareness'],
    plan: 'growth',
    onboardingCompleted: true,
};

export const mockStore: Store = {
    id: 'store_001',
    platform: 'shopify',
    name: 'TechStyle Store',
    url: 'techstyle.myshopify.com',
    connected: true,
    productsCount: 156,
    ordersToday: 47,
    revenue: 8432,
};

export const mockAdAccounts: AdAccount[] = [
    {
        id: 'ad_001',
        platform: 'meta',
        name: 'TechStyle Meta Ads',
        connected: true,
        spend: 847,
        impressions: 125000,
        clicks: 3200,
        conversions: 89,
    },
    {
        id: 'ad_002',
        platform: 'google',
        name: 'TechStyle Google Ads',
        connected: true,
        spend: 400,
        impressions: 85000,
        clicks: 2100,
        conversions: 45,
    },
];

export const mockAgents: Agent[] = [
    {
        id: 'agent_meta',
        type: 'meta-ads',
        name: 'Meta Ads AI',
        description: 'Manages Facebook & Instagram advertising campaigns',
        status: 'active',
        icon: '📱',
        permissions: ['ads_management', 'ads_read', 'business_management', 'pages_read_engagement', 'instagram_basic'],
        actionsToday: 12,
        lastAction: {
            id: 'action_001',
            agentId: 'agent_meta',
            action: 'Budget increased by 20%',
            reason: 'ROAS reached 3.4x, exceeding target of 2.5x',
            result: 'Daily budget: $150 → $180',
            timestamp: new Date(Date.now() - 1800000),
            status: 'success',
        },
        metrics: {
            spend: 847,
            roas: 3.4,
            campaigns: 5,
            activeAds: 23,
        },
    },
    {
        id: 'agent_google',
        type: 'google-ads',
        name: 'Google Ads AI',
        description: 'Optimizes Search & Shopping campaigns',
        status: 'active',
        icon: '🔍',
        permissions: ['campaign_management', 'keyword_optimization', 'bid_adjustment'],
        actionsToday: 8,
        lastAction: {
            id: 'action_002',
            agentId: 'agent_google',
            action: 'Paused underperforming keywords',
            reason: 'CTR below 1% for 7 consecutive days',
            result: '5 keywords paused, $45/day saved',
            timestamp: new Date(Date.now() - 3600000),
            status: 'success',
        },
        metrics: {
            spend: 400,
            roas: 2.8,
            campaigns: 3,
            keywords: 156,
        },
    },
    {
        id: 'agent_social',
        type: 'social-media',
        name: 'Social Media AI',
        description: 'Creates and schedules social content',
        status: 'active',
        icon: '📸',
        permissions: ['post_content', 'schedule_posts', 'analytics_read'],
        actionsToday: 4,
        lastAction: {
            id: 'action_003',
            agentId: 'agent_social',
            action: 'Scheduled 3 Instagram posts',
            reason: 'Best engagement times identified: 9am, 1pm, 7pm',
            result: 'Posts queued for next 24 hours',
            timestamp: new Date(Date.now() - 7200000),
            status: 'success',
        },
        metrics: {
            posts: 24,
            engagement: '4.5%',
            followers: '12.4K',
            reach: '45K',
        },
    },
    {
        id: 'agent_whatsapp',
        type: 'whatsapp',
        name: 'WhatsApp Bot AI',
        description: 'Automated customer support & cart recovery',
        status: 'active',
        icon: '💬',
        permissions: ['send_messages', 'read_messages', 'template_messages'],
        actionsToday: 156,
        lastAction: {
            id: 'action_004',
            agentId: 'agent_whatsapp',
            action: 'Recovered abandoned cart',
            reason: 'Customer left $89 cart 2 hours ago',
            result: 'Order completed - $89 recovered',
            timestamp: new Date(Date.now() - 900000),
            status: 'success',
        },
        metrics: {
            messages: 892,
            recovery: '23%',
            responses: 156,
            satisfaction: '94%',
        },
    },
    {
        id: 'agent_seo',
        type: 'seo',
        name: 'SEO AI',
        description: 'Optimizes search rankings and content',
        status: 'active',
        icon: '📈',
        permissions: ['content_edit', 'meta_tags', 'keyword_research'],
        actionsToday: 6,
        lastAction: {
            id: 'action_005',
            agentId: 'agent_seo',
            action: 'Updated product meta descriptions',
            reason: '15 products had missing SEO tags',
            result: '15 product pages optimized',
            timestamp: new Date(Date.now() - 14400000),
            status: 'success',
        },
        metrics: {
            score: 78,
            keywords: 45,
            ranking: 12,
            traffic: '5.2K',
        },
    },
    {
        id: 'agent_analytics',
        type: 'analytics',
        name: 'Analytics AI',
        description: 'Unified insights and recommendations',
        status: 'active',
        icon: '📊',
        permissions: ['data_read', 'report_generation', 'insights'],
        actionsToday: 3,
        lastAction: {
            id: 'action_006',
            agentId: 'agent_analytics',
            action: 'Generated weekly performance report',
            reason: 'Scheduled weekly analysis',
            result: 'Report available in Reports section',
            timestamp: new Date(Date.now() - 28800000),
            status: 'success',
        },
        metrics: {
            reports: 12,
            insights: 34,
            accuracy: '96%',
            predictions: 8,
        },
    },
    {
        id: 'agent_email',
        type: 'email-crm',
        name: 'Email & CRM AI',
        description: 'Automated email flows and segmentation',
        status: 'active',
        icon: '✉️',
        permissions: ['send_emails', 'segment_customers', 'ab_testing'],
        actionsToday: 2,
        lastAction: {
            id: 'action_007',
            agentId: 'agent_email',
            action: 'Launched abandoned cart flow',
            reason: '34 carts abandoned in last 24h',
            result: 'Email sequence triggered for 34 customers',
            timestamp: new Date(Date.now() - 43200000),
            status: 'success',
        },
        metrics: {
            sent: 1250,
            openRate: '42%',
            clickRate: '8.5%',
            revenue: '$2.4K',
        },
    },
    {
        id: 'agent_website',
        type: 'website-funnel',
        name: 'Website & Funnel AI',
        description: 'CRO optimization and funnel analysis',
        status: 'paused',
        icon: '🌐',
        permissions: ['page_edit', 'funnel_analysis', 'ab_testing'],
        actionsToday: 0,
        lastAction: {
            id: 'action_008',
            agentId: 'agent_website',
            action: 'Agent paused by user',
            reason: 'Manual override requested',
            result: 'Agent inactive',
            timestamp: new Date(Date.now() - 86400000),
            status: 'pending',
        },
        metrics: {
            pages: 12,
            conversion: '3.2%',
            tests: 2,
            suggestions: 5,
        },
    },
];

export const mockCampaigns: Campaign[] = [
    {
        id: 'camp_001',
        name: 'Summer Sale - Lookalike',
        platform: 'meta',
        status: 'active',
        budget: 150,
        spent: 127,
        impressions: 45000,
        clicks: 1200,
        conversions: 34,
        ctr: 2.67,
        cpc: 0.11,
        roas: 4.2,
        createdAt: new Date('2024-01-20'),
    },
    {
        id: 'camp_002',
        name: 'Retargeting - Cart Abandoners',
        platform: 'meta',
        status: 'active',
        budget: 80,
        spent: 72,
        impressions: 28000,
        clicks: 890,
        conversions: 28,
        ctr: 3.18,
        cpc: 0.08,
        roas: 5.8,
        createdAt: new Date('2024-01-18'),
    },
    {
        id: 'camp_003',
        name: 'Brand Search',
        platform: 'google',
        status: 'active',
        budget: 100,
        spent: 89,
        impressions: 32000,
        clicks: 1100,
        conversions: 22,
        ctr: 3.44,
        cpc: 0.08,
        roas: 3.1,
        createdAt: new Date('2024-01-15'),
    },
    {
        id: 'camp_004',
        name: 'Shopping - Best Sellers',
        platform: 'google',
        status: 'active',
        budget: 200,
        spent: 178,
        impressions: 65000,
        clicks: 2100,
        conversions: 45,
        ctr: 3.23,
        cpc: 0.08,
        roas: 3.8,
        createdAt: new Date('2024-01-10'),
    },
    {
        id: 'camp_005',
        name: 'New Collection Launch',
        platform: 'meta',
        status: 'paused',
        budget: 300,
        spent: 245,
        impressions: 89000,
        clicks: 2800,
        conversions: 56,
        ctr: 3.15,
        cpc: 0.09,
        roas: 2.9,
        createdAt: new Date('2024-01-05'),
    },
];

export const mockCustomers: Customer[] = [
    { id: 'cust_001', name: 'Sarah Johnson', email: 'sarah.j@email.com', orders: 5, totalSpent: 489, lastOrder: new Date('2024-01-28'), segment: 'vip' },
    { id: 'cust_002', name: 'Michael Chen', email: 'mchen@email.com', orders: 3, totalSpent: 267, lastOrder: new Date('2024-01-27'), segment: 'returning' },
    { id: 'cust_003', name: 'Emily Davis', email: 'emily.d@email.com', orders: 1, totalSpent: 89, lastOrder: new Date('2024-01-29'), segment: 'new' },
    { id: 'cust_004', name: 'Robert Wilson', email: 'rwilson@email.com', orders: 8, totalSpent: 1234, lastOrder: new Date('2024-01-26'), segment: 'vip' },
    { id: 'cust_005', name: 'Lisa Anderson', email: 'lisa.a@email.com', orders: 2, totalSpent: 156, lastOrder: new Date('2024-01-20'), segment: 'at-risk' },
    { id: 'cust_006', name: 'James Brown', email: 'jbrown@email.com', orders: 1, totalSpent: 78, lastOrder: new Date('2024-01-29'), segment: 'new' },
    { id: 'cust_007', name: 'Jennifer Martinez', email: 'jmartinez@email.com', orders: 4, totalSpent: 345, lastOrder: new Date('2024-01-25'), segment: 'returning' },
    { id: 'cust_008', name: 'David Lee', email: 'dlee@email.com', orders: 6, totalSpent: 678, lastOrder: new Date('2024-01-28'), segment: 'vip' },
];

export const mockDashboardMetrics: DashboardMetrics = {
    todaySpend: 1247,
    revenue: 8432,
    roas: 6.76,
    orders: 47,
    activeCampaigns: 12,
    aiActionsToday: 189,
    visitors: 3456,
    conversionRate: 3.2,
};

// Chart Data
export const revenueChartData = [
    { day: 'Mon', revenue: 1200, spend: 180 },
    { day: 'Tue', revenue: 1450, spend: 195 },
    { day: 'Wed', revenue: 980, spend: 165 },
    { day: 'Thu', revenue: 1680, spend: 210 },
    { day: 'Fri', revenue: 2100, spend: 245 },
    { day: 'Sat', revenue: 1890, spend: 220 },
    { day: 'Sun', revenue: 1420, spend: 190 },
];

export const trafficSourceData = [
    { name: 'Meta Ads', value: 45, color: '#6366f1' },
    { name: 'Google Ads', value: 25, color: '#8b5cf6' },
    { name: 'Organic', value: 20, color: '#22c55e' },
    { name: 'Direct', value: 10, color: '#f59e0b' },
];

export const performanceTrendData = [
    { date: '01/23', roas: 2.8, ctr: 2.1, cvr: 2.8 },
    { date: '01/24', roas: 3.1, ctr: 2.3, cvr: 3.0 },
    { date: '01/25', roas: 2.9, ctr: 2.0, cvr: 2.7 },
    { date: '01/26', roas: 3.4, ctr: 2.5, cvr: 3.2 },
    { date: '01/27', roas: 3.8, ctr: 2.8, cvr: 3.5 },
    { date: '01/28', roas: 4.1, ctr: 3.0, cvr: 3.8 },
    { date: '01/29', roas: 3.9, ctr: 2.9, cvr: 3.6 },
];

// Auth Helper Functions
export const DUMMY_CREDENTIALS = {
    email: 'boss@reon.ai',
    password: 'reon123',
};

export function validateCredentials(email: string, password: string): boolean {
    return email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password;
}

// LocalStorage Helpers
const STORAGE_KEYS = {
    USER: 'reon_user',
    WORKSPACE: 'reon_workspace',
    AUTH: 'reon_auth',
    ONBOARDING: 'reon_onboarding',
};

export function saveToStorage<T>(key: string, data: T): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export function getFromStorage<T>(key: string): T | null {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
}

export function clearStorage(): void {
    if (typeof window !== 'undefined') {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    }
}

export function isAuthenticated(): boolean {
    return getFromStorage<boolean>(STORAGE_KEYS.AUTH) === true;
}

export function setAuthenticated(value: boolean): void {
    saveToStorage(STORAGE_KEYS.AUTH, value);
}

export function isOnboardingCompleted(): boolean {
    const workspace = getFromStorage<Workspace>(STORAGE_KEYS.WORKSPACE);
    return workspace?.onboardingCompleted === true;
}

export function setOnboardingStep(step: number): void {
    saveToStorage(STORAGE_KEYS.ONBOARDING, { step, completed: step >= 5 });
}

export function getOnboardingStep(): number {
    const data = getFromStorage<{ step: number }>(STORAGE_KEYS.ONBOARDING);
    return data?.step || 1;
}
