import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getorderdetails } from '../../actions/AdminActions';

const SalesDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('day');
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    averageSales: 0,
    totalOrders: 0,
    totalItemsSold: 0,
  });
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data1 = await getorderdetails();
        processData(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeFilter]);

  const processData = (data) => {
    const now = new Date();
    let filteredData = [];

    if (timeFilter === 'day') {
      filteredData = data.filter(order => new Date(order.time).toDateString() === now.toDateString());
    } 
    else if (timeFilter === 'week') {
      const currentDay = now.getDay();
      const monday = new Date(now);
      monday.setDate(now.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
      monday.setHours(0, 0, 0, 0);

      filteredData = data.filter(order => new Date(order.time) >= monday);
    } 
    else if (timeFilter === 'month') {
      filteredData = data.filter(order => {
        const orderDate = new Date(order.time);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      });
    } 
    else if (timeFilter === 'year') {
      filteredData = data.filter(order => new Date(order.time).getFullYear() === now.getFullYear());
    }

    const totalSales = filteredData.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredData.length;
    const averageSales = totalOrders > 0 ? totalSales / totalOrders : 0;

    const itemMap = new Map();
    let totalItemsSold = 0;

    filteredData.forEach(order => {
      order.items.forEach(item => {
        totalItemsSold += item.quantity;

        if (itemMap.has(item.name)) {
          const existing = itemMap.get(item.name);
          itemMap.set(item.name, {
            name: item.name,
            quantity: existing.quantity + item.quantity,
            revenue: existing.revenue + (item.price * item.quantity)
          });
        } else {
          itemMap.set(item.name, {
            name: item.name,
            quantity: item.quantity,
            revenue: item.price * item.quantity
          });
        }
      });
    });

    setStats({
      totalSales,
      averageSales,
      totalOrders,
      totalItemsSold,
    });

    setItemsData(Array.from(itemMap.values()).sort((a, b) => b.quantity - a.quantity));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading sales data...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Report</h1>
        <select 
          className="border border-gray-300 rounded-md p-2"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-lg font-bold text-gray-800">Rs: {stats.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Sales</h3>
          <p className="text-lg font-bold text-gray-800">Rs: {stats.averageSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-lg font-bold text-gray-800">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Items Sold</h3>
          <p className="text-lg font-bold text-gray-800">{stats.totalItemsSold}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sales by Items</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={itemsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}`, 'Quantity Sold']} labelFormatter={(value) => `Item: ${value}`} />
            <Bar dataKey="quantity" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
        <h2 className="text-lg font-semibold mb-4">Detailed Sales Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itemsData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs: {item.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
