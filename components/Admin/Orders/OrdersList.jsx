"use client";
import { useState } from 'react';
import { MoreVertical, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

const dummyOrders = [
  { id: '#25426', date: 'Nov 8th,2023', customer: 'Kavin', status: 'Delivered', amount: '₹200.00' },
  { id: '#25425', date: 'Nov 7th,2023', customer: 'Komael', status: 'Canceled', amount: '₹200.00' },
  { id: '#25424', date: 'Nov 6th,2023', customer: 'Nikhil', status: 'Delivered', amount: '₹200.00' },
  { id: '#25423', date: 'Nov 5th,2023', customer: 'Shivam', status: 'Canceled', amount: '₹200.00' },
  { id: '#25422', date: 'Nov 4th,2023', customer: 'Shadab', status: 'Delivered', amount: '₹200.00' },
  { id: '#25421', date: 'Nov 2nd,2023', customer: 'Yogesh', status: 'Delivered', amount: '₹200.00' },
  { id: '#25423', date: 'Nov 1st,2023', customer: 'Sunita', status: 'Canceled', amount: '₹200.00' },
  { id: '#25421', date: 'Nov 1st,2023', customer: 'Priyanka', status: 'Delivered', amount: '₹200.00' },
];

const OrdersList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter orders based on search term and status
  const filteredOrders = dummyOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      selectedStatus === 'all' || 
      order.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (orderId) => {
    router.push(`/admin/orders/${orderId.replace('#', '')}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Orders</h1>
        <div className="text-sm text-gray-500">Home &gt; Order List</div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-2 md:p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-white 
              focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
              <option value="pending">Pending</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg 
            hover:border-[#003f62] hover:bg-[#003f62]/5 transition-all">
              <Filter size={20} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 md:p-6 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-[#003f62]">Recent Orders</h2>
          <button className="p-2 hover:bg-[#003f62]/10 rounded-full transition-colors">
            <MoreVertical className="text-gray-500" size={20} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 p-4"><input type="checkbox" className="rounded" /></th>
                <th className="text-left p-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left p-4 font-medium text-gray-600">Date</th>
                <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                <th className="text-right p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-4"><input type="checkbox" className="rounded" /></td>
                    <td className="p-4 font-medium text-[#003f62]">{order.id}</td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#003f62]/10 rounded-full mr-2 flex items-center justify-center text-[#003f62] font-medium">
                          {order.customer[0]}
                        </div>
                        <span className="text-gray-700">{order.customer}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : order.status === 'Canceled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-gray-700">{order.amount}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleViewDetails(order.id)}
                        className="text-[#003f62] hover:text-[#003f62]/80 font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Search size={40} className="text-gray-300 mb-2" />
                      <p>No orders found matching your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 md:p-6 border-t">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Showing {filteredOrders.length > 0 ? `1-${filteredOrders.length} of ${filteredOrders.length}` : '0'} orders
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg hover:bg-[#003f62]/10 text-[#003f62] disabled:opacity-50 transition-colors"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg transition-colors ${
                    currentPage === page 
                      ? 'bg-[#003f62] text-white' 
                      : 'hover:bg-[#003f62]/10 text-[#003f62]'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              className="p-2 rounded-lg hover:bg-[#003f62]/10 text-[#003f62] transition-colors"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 5))}
              disabled={currentPage === 5}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;