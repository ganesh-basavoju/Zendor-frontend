"use client";
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ClipboardList, Grid, Users } from 'lucide-react';

const menuItems = [
  { name: 'DASHBOARD', path: '/admin', icon: LayoutDashboard },
  { name: 'ALL PRODUCTS', path: '/admin/products', icon: Package },
  { name: 'ORDER LIST', path: '/admin/orders', icon: ClipboardList },
  { name: 'USERS', path: '/admin/users', icon: Users },
  { name: 'Categories', path: '/admin/categories', icon: Grid },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white h-screen fixed left-0 top-16 shadow-lg">
        <div className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div 
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#003f62] text-white'
                    : 'text-gray-600 hover:bg-[#003f62]/10'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`p-2 rounded-lg ${
                isActive(item.path)
                  ? 'text-[#003f62]'
                  : 'text-gray-500'
              }`}
            >
              <item.icon size={24} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;