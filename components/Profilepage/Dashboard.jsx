import { poppins } from '@/app/page';
import { Package2, Heart, Clock } from 'lucide-react';

const statsCards = [
  { title: "Total Orders", count: 9, icon: Package2, color: "bg-blue-500",state:2 },
  { title: "Wishlist Items", count: 10, icon: Heart, color: "bg-pink-500",state:3 },
  { title: "Pending Orders", count: 2, icon: Clock, color: "bg-amber-500" },
 
];

const DashboardCard = ({ title, count, icon: Icon, color,state=-1,setCurrent }) => (
  <div 
  onClick={()=>{state!=-1&&setCurrent(state)}}
  className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
    <div className={`${color} p-3 rounded-lg text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{count}</p>
    </div>
  </div>
);

export const Dashboard = ({ name = "Lalith Kumar" ,setCurrent}) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, <span className="capitalize">{name}</span>
        </h2>
        <p className="text-gray-600">
          Track your orders, manage wishlist items, and update your profile all in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <DashboardCard key={index} {...card} setCurrent={setCurrent} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package2 size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Order #12345 shipped</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Heart size={20} className="text-pink-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Added item to wishlist</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button  onClick={()=>setCurrent(2)} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <h3 className="font-medium text-gray-900">View Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Track your recent purchases</p>
        </button>
        <button  onClick={()=>setCurrent(5)} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <h3 className="font-medium text-gray-900" >Update Profile</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your account details</p>
        </button>
      </div>
    </div>
  );
};