"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaStore,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaCartPlus,
  FaHeart,
} from "react-icons/fa";
import LocationModal from "./LocationModal";

const Navbar = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Mumbai");
  const [selectedPincode, setSelectedPincode] = useState("400017");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample products data for search functionality
  const [products, setProducts] = useState([
    { id: 1, name: "Floral Wallpaper", category: "Wallpaper" },
    { id: 2, name: "Geometric Wallpaper", category: "Wallpaper" },
    { id: 3, name: "Oak Flooring", category: "Wooden Flooring" },
    { id: 4, name: "Maple Flooring", category: "Wooden Flooring" },
    { id: 5, name: "Persian Carpet", category: "Carpets" },
    { id: 6, name: "Modern Carpet", category: "Carpets" },
    { id: 7, name: "Acoustic Panels", category: "Acoustics" },
    { id: 8, name: "Outdoor Decking", category: "Outdoor" },
  ]);

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();

  // Add menuItems array
  const menuItems = [
    "Wallpaper",
    "Wooden Flooring",
    "Acoustics",
  ];

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSearchResults(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Don't render navbar if we're in an admin route
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSignIn = () => {
    // Toggle the login modal or navigate to login page
    router.push('/login');
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isHomePage && !isScrolled 
        ? 'bg-transparent backdrop-blur-md' 
        : 'bg-[#012b5b] shadow-lg'
    }`}>
      <div className='max-w-7xl mx-auto px-4 py-2'>
        {/* Top navbar */}
        <div className='flex items-center justify-between gap-4 py-1'>
          {/* Logo and Location */}
          <div className='flex items-center space-x-6 min-w-[200px]'>
            <div 
              className='text-2xl font-bold text-white cursor-pointer transition-transform hover:scale-105'
              onClick={() => router.push("/")}
            >
              Zendor
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className='hidden md:flex items-center space-x-2 text-gray-200 hover:text-white transition-colors'
            >
              <FaMapMarkerAlt className="text-white" />
              <span className='font-medium'>{selectedLocation}</span>
              <span className='text-gray-300'>{selectedPincode}</span>
            </button>
          </div>

          {/* Centered Search Bar */}
          <div className='hidden md:block flex-1 max-w-2xl mx-auto'>
            <div className='relative group'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder='Search for wallpapers, floorings, and more...'
                className='w-full pl-12 pr-4 py-1 rounded-full border border-gray-400 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30'
              />
              <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-300' />
              
              {/* Search Results - Updated styles */}
              {showSearchResults && searchQuery && (
                <div className='absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-[60]'>
                  {filteredProducts.length > 0 ? (
                    <div className='max-h-[300px] overflow-y-auto bg-white'>
                      {filteredProducts.map(product => (
                        <button
                          key={product.id}
                          onClick={() => {
                            router.push(`/category/${product.category.toLowerCase()}`);
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          className='w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between group bg-white'
                        >
                          <span>{product.name}</span>
                          <span className='text-sm text-gray-500 group-hover:text-[#012b5b]'>
                            {product.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className='px-4 py-3 text-gray-600 text-center bg-white'>
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <div className='hidden md:flex items-center space-x-6 min-w-[200px] justify-end text-white'>
            <button 
              onClick={() => router.push("/visit-store")}
              className='flex items-center space-x-2 hover:text-gray-200 transition-colors'
            >
              <FaStore />
              <span>Visit Store</span>
            </button>

            <div className='flex items-center space-x-4'>
              <button onClick={handleSignIn} className='p-2.5 hover:bg-white/10 rounded-full transition-colors text-white'>
                <FaUser className="text-xl" />
              </button>
              
              <button onClick={() => router.push("/cart")} className='p-2.5 hover:bg-white/10 rounded-full transition-colors text-white'>
                <FaCartPlus className="text-xl" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2.5 hover:bg-white/10 rounded-lg transition-colors'
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Categories Menu - Updated styles */}
        <div className='hidden md:flex justify-center mt-1 border-t border-white/10 pt-2'>
          <div className='flex space-x-8 items-center'>
            {menuItems.map((item) => {
              const path = `/category/${item.toLowerCase()}`;
              const isActive = pathname.startsWith(path);
              return (
                <button
                  key={item}
                  onClick={() => router.push(path)}
                  className={`group relative px-3 py-2 transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className='flex items-center space-x-1'>
                    {item}
                    <FaChevronDown className={`ml-1 transition-transform group-hover:rotate-180`} />
                  </span>
                  <div className='absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform' />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Updated styles */}
      <div className={`md:hidden bg-[#012b5b] border-t border-gray-700 ${
        isMobileMenuOpen ? 'block' : 'hidden'
      }`}>
        <div className='px-4 py-3 space-y-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              className='w-full pl-10 pr-4 py-2.5 rounded-full border-0 bg-[#283593] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20'
            />
            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-300' />
          </div>
          
          <div className='flex flex-col space-y-2'>
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  router.push(`/category/${item.toLowerCase()}`);
                  setIsMobileMenuOpen(false);
                }}
                className='flex items-center justify-between p-3 hover:bg-[#283593] rounded-lg text-gray-200 hover:text-white'
              >
                {item}
                <FaChevronDown />
              </button>
            ))}
          </div>

          <div className='grid grid-cols-3 gap-4 pt-4 border-t border-[#283593]'>
            <button onClick={handleSignIn} className='flex flex-col items-center space-y-1 p-3 text-gray-200 hover:bg-[#283593] rounded-lg'>
              <FaUser />
              <span className='text-sm'>Account</span>
            </button>
            <button onClick={() => router.push("/wishlist")} className='flex flex-col text-gray-200 items-center space-y-1 p-3 hover:bg-[#283593] rounded-lg'>
              <FaHeart />
              <span className='text-sm'>Wishlist</span>
            </button>
            <button onClick={() => router.push("/cart")} className='flex flex-col items-center text-gray-200 space-y-1 p-3 hover:bg-[#283593] rounded-lg'>
              <FaCartPlus />
              <span className='text-sm'>Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={(location, pincode) => {
            setSelectedLocation(location);
            setSelectedPincode(pincode);
            setShowLocationModal(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
