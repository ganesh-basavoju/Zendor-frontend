"use client";
import { useState } from "react";
import Image from "next/image";
import AccountDetails from "@/components/Profilepage/AccountDetails";
import  {Addresses}  from "@/components/Profilepage/Addresses";
import { Dashboard } from "@/components/Profilepage/Dashboard";
import Orders from "@/components/Profilepage/Orders";
import {
  LayoutDashboard,
  ShoppingCart,
  Heart,
  MapPin,
  User,
  LogOut,
} from "lucide-react";
import MoodBoard from "@/components/Profilepage/Wishlist";

const menuItems = [
  { id: 1, icon: LayoutDashboard, text: "Dashboard", label: "Overview of your account", component: Dashboard },
  { id: 2, icon: ShoppingCart, text: "Orders", label: "Track your orders", component: Orders },
  { id: 3, icon: Heart, text: "Mood Board", label: "Your saved items", component: MoodBoard },
  { id: 4, icon: MapPin, text: "Addresses", label: "Manage delivery addresses", component: Addresses },
  { id: 5, icon: User, text: "Account Details", label: "Update your information", component: AccountDetails },
];

const NavButton = ({ item, isActive, onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`
      ${isMobile 
        ? `flex flex-col items-center p-2 ${isActive ? 'text-gray-900' : 'text-gray-500'}`
        : `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`
      }
    `}
  >
    <item.icon size={isMobile ? 24 : 20} />
    {isMobile ? (
      <span className="text-xs mt-1">{item.text}</span>
    ) : (
      <div className="text-left">
        <span className="block text-sm font-medium">{item.text}</span>
        <span className="text-xs opacity-75">{item.label}</span>
      </div>
    )}
  </button>
);

const Profilepage = () => {
  const [current, setCurrent] = useState(1);
  const CurrentComponent = menuItems.find(item => item.id === current)?.component || Dashboard;

  return (
    <div className="mt-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          My Account
        </h1>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden sm:block w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full object-cover w-full h-full ring-4 ring-gray-50"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                </div>
                <h2 className="font-semibold text-gray-900">Lalithkumar</h2>
                <p className="text-sm text-gray-500">Member since 2024</p>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <NavButton
                    key={item.id}
                    item={item}
                    isActive={current === item.id}
                    onClick={() => setCurrent(item.id)}
                  />
                ))}
                <button
                  onClick={() => console.log("Logging out...")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Mobile Navigation */}
          <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <div className="flex justify-around p-2">
              {menuItems.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={current === item.id}
                  onClick={() => setCurrent(item.id)}
                  isMobile
                />
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-xl shadow-sm p-6">
            {current==1?
            <Dashboard setCurrent={setCurrent} />:
            <CurrentComponent />
             }
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
