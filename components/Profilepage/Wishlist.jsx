"use client";
import { useState } from "react";
import Image from "next/image";
import { XCircle, Heart, Search, ShoppingCart, Trash2 } from "lucide-react";

const wishlistItems = [
  {
    id: 1,
    name: "Elegant Floral Wallpaper",
    priceRange: "₹2,499 – ₹4,999",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
    inStock: true,
    addedOn: "Mon, 24-Mar-2025",
    category: "Premium Wallpaper"
  },
  {
    id: 2,
    name: "Vintage Botanical Print",
    priceRange: "₹3,299 – ₹5,999",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
    inStock: true,
    addedOn: "Mon, 24-Mar-2025",
    category: "Designer Collection"
  },
  {
    id: 3,
    name: "Modern Abstract Pattern",
    priceRange: "₹2,899 – ₹4,599",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
    inStock: false,
    addedOn: "Tue, 25-Mar-2025",
    category: "Contemporary Series"
  },
  {
    id: 4,
    name: "Nature-Inspired Design",
    priceRange: "₹3,499 – ₹6,299",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
    inStock: true,
    addedOn: "Wed, 26-Mar-2025",
    category: "Luxury Wallpaper"
  },
];

const Wishlist = () => {
  const [items, setItems] = useState(wishlistItems);
  const [searchQuery, setSearchQuery] = useState("");

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mood Board</h2>
          <p className="text-gray-500 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search wishlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-500">{item.category}</p>
                <h3 className="font-medium text-gray-900 mt-1">{item.name}</h3>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">{item.priceRange}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.inStock 
                    ? "text-green-700 bg-green-50" 
                    : "text-red-700 bg-red-50"
                }`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm text-gray-500">
                  Added {new Date(item.addedOn).toLocaleDateString()}
                </span>
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={!item.inStock}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="text-gray-500 mt-1">Save items you love to your wishlist</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
