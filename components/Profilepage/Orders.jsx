import Image from "next/image";
import { PackageCheck, Truck, Clock, Search, ChevronRight } from "lucide-react";
import { useState } from "react";

const orderStatuses = {
  Delivered: { icon: PackageCheck, color: "text-green-600 bg-green-50" },
  Shipped: { icon: Truck, color: "text-blue-600 bg-blue-50" },
  Processing: { icon: Clock, color: "text-amber-600 bg-amber-50" }
};

const orders = [
  {
    id: "ORD-2024-001",
    name: "Cows Of Pichwai (Gold) Metallic",
    price: "₹2,500",
    status: "Delivered",
    date: "Mon, 24-Mar-2025",
    image: "https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg",
    quantity: 1
  },
  {
    id: 2,
    name: "Winter Romance",
    price: "₹3,200",
    status: "Shipped",
    date: "Sun, 23-Mar-2025",
    image: "https://images.pexels.com/photos/31305798/pexels-photo-31305798/free-photo-of-elegant-white-handbag-against-yellow-wall.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Summer Breeze",
    price: "₹1,800",
    status: "Processing",
    date: "Sat, 22-Mar-2025",
    image: "https://images.pexels.com/photos/31305798/pexels-photo-31305798/free-photo-of-elegant-white-handbag-against-yellow-wall.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Madagascar Mondays",
    price: "₹2,000",
    status: "Delivered",
    date: "Fri, 21-Mar-2025",
    image: "https://images.pexels.com/photos/31305798/pexels-photo-31305798/free-photo-of-elegant-white-handbag-against-yellow-wall.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];


export default function Orders() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  const filteredOrders = selectedStatus === "All" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
          <p className="text-gray-500 mt-1">Track and manage your orders</p>
        </div>
        
        {/* Filter and Search Section */}
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="All">All Orders</option>
            {Object.keys(orderStatuses).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => {
          const StatusIcon = orderStatuses[order.status].icon;
          
          return (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start gap-6">
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={order.image}
                    alt={order.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{order.name}</h3>
                    <span className="text-gray-900 font-medium">{order.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Order #{order.id}</span>
                    <span>•</span>
                    <span>Qty: {order.quantity}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${orderStatuses[order.status].color}`}>
                      <StatusIcon size={16} />
                      <span className="text-sm font-medium">{order.status}</span>
                    </div>

                    <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                      Track Order
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <PackageCheck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500 mt-1">Start shopping to see your orders here</p>
        </div>
      )}
    </div>
  );
}
