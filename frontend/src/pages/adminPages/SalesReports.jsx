import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Utensils, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';

// Extended sample data
const data = [
    { date: '2025-02-08', total: 20.95 },
    { date: '2025-02-09', total: 25.40 },
    { date: '2025-02-10', total: 18.75 }
];

const pieData = [
    { name: 'Sales', value: 20.95 },
    { name: 'Returns', value: 5.05 }
];

const topSellingItems = [
    { name: 'Pizza', quantity: 45, revenue: 675 },
    { name: 'Burger', quantity: 38, revenue: 418 },
    { name: 'Salad', quantity: 32, revenue: 384 },
    { name: 'Pasta', quantity: 28, revenue: 392 }
];

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const SalesReports = () => {
    const [timePeriod, setTimePeriod] = useState('day');

    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
        // Filter data based on selected time period
        // Update charts and statistics accordingly
    };

    const totalSales = data.reduce((sum, item) => sum + item.total, 0);
    const averageSales = totalSales / data.length;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Time Period Selector */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Sales Report</h1>
                <select
                    value={timePeriod}
                    onChange={handleTimePeriodChange}
                    className="p-2 border rounded"
                >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white shadow rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Sales</p>
                            <h3 className="text-2xl font-bold">${totalSales.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white shadow rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-100 rounded-full">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Average Sales</p>
                            <h3 className="text-2xl font-bold">${averageSales.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white shadow rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-full">
                            <Utensils className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Orders</p>
                            <h3 className="text-2xl font-bold">{topSellingItems.reduce((sum, item) => sum + item.quantity, 0)}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white shadow rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-yellow-100 rounded-full">
                            <BarChart2 className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Items Sold</p>
                            <h3 className="text-2xl font-bold">{topSellingItems.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Distribution */}
                <div className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Sales Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Selling Items */}
                <div className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Top Selling Items</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topSellingItems}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" fill="#0088FE" name="Quantity Sold" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Selling Items Table */}
            <div className="p-4 bg-white shadow rounded-lg mt-6">
                <h2 className="text-lg font-semibold mb-4">Detailed Sales Breakdown</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Item</th>
                                <th className="text-right p-4">Quantity Sold</th>
                                <th className="text-right p-4">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSellingItems.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.name}</td>
                                    <td className="text-right p-4">{item.quantity}</td>
                                    <td className="text-right p-4">${item.revenue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesReports;