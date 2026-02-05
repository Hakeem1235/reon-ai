'use client';

import React from 'react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, Badge, Button } from '@/components/ui';
import { mockStore } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { Package, ShoppingCart, DollarSign, RefreshCw, ExternalLink, Box, TrendingUp, AlertTriangle } from 'lucide-react';

export default function StorePage() {
    const recentOrders = [
        { id: '#12345', customer: 'Sarah J.', amount: 89, status: 'processing', time: '5 min ago' },
        { id: '#12344', customer: 'Mike C.', amount: 156, status: 'shipped', time: '15 min ago' },
        { id: '#12343', customer: 'Emma W.', amount: 234, status: 'delivered', time: '1 hour ago' },
        { id: '#12342', customer: 'John D.', amount: 78, status: 'processing', time: '2 hours ago' },
    ];

    const lowStockProducts = [
        { name: 'Summer Dress - Size M', stock: 3, sku: 'SD-M-001' },
        { name: 'Canvas Sneakers - White', stock: 5, sku: 'CS-W-042' },
        { name: 'Leather Belt - Brown', stock: 2, sku: 'LB-B-015' },
    ];

    return (
        <div className="min-h-screen">
            <Header title="Store Overview" subtitle="Manage your connected store" />

            <div className="p-6">
                {/* Connected Store */}
                <Card className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center text-3xl">
                                🛍️
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{mockStore.name}</h2>
                                <p className="text-sm text-gray-500">{mockStore.url}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="success">Connected</Badge>
                            <Button variant="secondary" size="sm">
                                <ExternalLink className="w-4 h-4" /> Open Store
                            </Button>
                            <Button variant="secondary" size="sm">
                                <RefreshCw className="w-4 h-4" /> Sync
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                    <StatCard title="Today's Orders" value={mockStore.ordersToday} change={12} icon={<ShoppingCart className="w-5 h-5" />} />
                    <StatCard title="Today's Revenue" value={mockStore.revenue} format="currency" change={23.1} icon={<DollarSign className="w-5 h-5" />} />
                    <StatCard title="Products" value={mockStore.productsCount} icon={<Package className="w-5 h-5" />} />
                    <StatCard title="Avg. Order Value" value={89} format="currency" change={5.2} icon={<TrendingUp className="w-5 h-5" />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                        <div className="space-y-3">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="p-3 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Box className="w-5 h-5 text-indigo-400" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-white">{order.id}</span>
                                                <span className="text-sm text-gray-500">{order.customer}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{order.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white">{formatCurrency(order.amount)}</span>
                                        <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'shipped' ? 'info' : 'warning'}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Low Stock Alert */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-400" /> Low Stock Alert
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {lowStockProducts.map((product) => (
                                <div key={product.sku} className="p-3 bg-[#0a0a0f] rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white">{product.name}</p>
                                        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                    </div>
                                    <Badge variant="error">{product.stock} left</Badge>
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" className="w-full mt-4">Restock Products</Button>
                    </Card>
                </div>

                {/* Top Products */}
                <Card className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Selling Products</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Summer Dress', 'Canvas Sneakers', 'Leather Bag', 'Denim Jacket'].map((product, i) => (
                            <div key={product} className="p-4 bg-[#0a0a0f] rounded-xl">
                                <div className="aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg mb-3 flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-600" />
                                </div>
                                <p className="font-medium text-white text-sm mb-1">{product}</p>
                                <p className="text-xs text-gray-500">{Math.floor(50 + Math.random() * 100)} sold</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
