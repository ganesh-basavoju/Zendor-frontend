"use client";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical, ArrowUp, ShoppingBag, Clock, CheckCircle, RefreshCcw } from 'lucide-react';

const data = [
  { month: 'JUL', value: 50 },
  { month: 'AUG', value: 60 },
  { month: 'SEP', value: 70 },
  { month: 'OCT', value: 65 },
  { month: 'NOV', value: 90 },
  { month: 'DEC', value: 400 },
];

const statsCards = [
  { title: 'Total Sales', icon: ShoppingBag, color: 'blue', value: '₹526,500' },
  { title: 'Total Orders', icon: Clock, color: 'yellow', value: '2,345' },
  { title: 'Total Products', icon: CheckCircle, color: 'green', value: '1,287' },
  { title: 'Total Users', icon: RefreshCcw, color: 'red', value: '8,549' },
];

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('WEEKLY');

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#003f62]">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Home <span className="mx-1">&gt;</span> Dashboard
          </div>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
          Oct 11,2023 - Nov 11,2023
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map(({ title, icon: Icon, color, value }) => (
          <div key={title} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-${color}-50`}>
                  <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{title}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">{value}</h3>
            <div className="flex items-center text-sm mt-2">
              <ArrowUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 font-medium">34.7%</span>
              <span className="text-gray-500 ml-2 text-xs md:text-sm">Compared to Oct 2023</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Graph */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-[#003f62]">Sale Graph</h2>
          <div className="flex space-x-2">
            {['WEEKLY', 'MONTHLY', 'YEARLY'].map((period) => (
              <button
                key={period}
                className={`px-3 md:px-4 py-1 rounded text-sm transition-colors ${
                  timeframe === period 
                    ? 'bg-[#003f62] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setTimeframe(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#003f62" 
                strokeWidth={2}
                dot={{ fill: '#003f62', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 md:p-6 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-[#003f62]">Recent Orders</h2>
          <div className="flex items-center gap-2">
            <button className="text-sm text-[#003f62] font-medium hover:underline">
              View All
            </button>
            <button className="p-2 hover:bg-[#003f62]/10 rounded-full transition-colors">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 p-4"><input type="checkbox" className="rounded border-2 border-gray-300" /></th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Customer Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-right p-4 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-2 border-gray-300" /></td>
                  <td className="p-4 text-sm">Lorem ipsum</td>
                  <td className="p-4 text-sm font-medium text-[#003f62]">#2542{6-i}</td>
                  <td className="p-4 text-sm text-gray-600">Nov {9-i}th,2023</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#003f62]/10 rounded-full mr-2 flex items-center justify-center text-sm text-[#003f62] font-medium shadow-sm">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">User {i + 1}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      i % 3 === 0 
                        ? 'bg-green-100 text-green-700' 
                        : i % 3 === 1
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}>
                      {i % 3 === 0 ? 'Delivered' : i % 3 === 1 ? 'Pending' : 'Cancelled'}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm font-medium text-gray-800">₹200.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t text-center">
          <button className="text-[#003f62] hover:text-[#003f62]/80 font-medium text-sm transition-colors">
            Load More Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;