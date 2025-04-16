"use client";
import { useState } from 'react';
import { Bell, ChevronDown, Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const router = useRouter();

  // Sample search data - replace with your actual data
  const searchItems = [
    { id: 1, title: 'Orders', type: 'Page', link: '/admin/orders' },
    { id: 2, title: 'Products', type: 'Page', link: '/admin/products' },
    { id: 3, title: 'Customers', type: 'Page', link: '/admin/customers' },
    { id: 4, title: 'Settings', type: 'Page', link: '/admin/settings' },
    { id: 5, title: 'Wallpaper Collection', type: 'Product', link: '/admin/products/wallpaper' },
    { id: 6, title: 'Wooden Flooring', type: 'Product', link: '/admin/products/flooring' },
  ];

  // Filter search results
  const filteredResults = searchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="bg-white top-0 shadow-md h-16 px-4 md:px-6 flex items-center justify-between fixed w-full z-50">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 hover:bg-[#003f62]/10 rounded-lg text-[#003f62]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <span className="text-2xl font-bold text-[#003f62] tracking-tight">Zendor</span>
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="relative group">
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            className="w-[350px] pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 
            text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 
            focus:border-[#003f62]/30 focus:bg-white transition-all duration-200 text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#003f62] transition-colors" size={18} />
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchQuery && (
            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border-0 overflow-hidden 
            ring-1 ring-black ring-opacity-5 transition-all duration-200">
              {filteredResults.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(item.link);
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center 
                      justify-between group transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <Search size={16} className="text-gray-400 group-hover:text-[#003f62]" />
                        <span className="text-gray-700 group-hover:text-[#003f62] font-medium">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-[#003f62] font-medium px-2 py-1 
                      bg-gray-100 group-hover:bg-[#003f62]/10 rounded-full transition-colors">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* <button className="relative p-2 hover:bg-[#003f62]/10 rounded-full transition-colors">
          <Bell size={20} className="text-[#003f62]" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
            2
          </span>
        </button> */}

        <div className="relative">
          <button 
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-[#003f62]/10 transition-colors text-[#003f62]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="font-medium">Admin</span>
            <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-[#003f62]/10 transition-colors text-[#003f62]"
                onClick={() => router.push('/admin/settings')}
              >
                Change Password
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                onClick={() => {
                  localStorage.removeItem('userToken');
                  router.push('/');
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40">
          <div className="p-4 space-y-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#003f62]" size={18} />
              
              {/* Mobile Search Results */}
              {showSearchResults && searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border overflow-hidden">
                  {filteredResults.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            router.push(item.link);
                            setSearchQuery('');
                            setShowSearchResults(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-[#003f62]/5 flex items-center justify-between group"
                        >
                          <span className="text-gray-800">{item.title}</span>
                          <span className="text-sm text-gray-500 group-hover:text-[#003f62]">
                            {item.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-gray-600 text-center">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-[#003f62]/10 rounded-lg flex items-center justify-between text-[#003f62]">
                <span>Notifications</span>
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="w-full text-left p-3 hover:bg-[#003f62]/10 rounded-lg text-[#003f62]">
                Change Password
              </button>
              <button className="w-full text-left p-3 hover:bg-red-50 rounded-lg text-red-600">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
);
};

export default AdminNavbar;