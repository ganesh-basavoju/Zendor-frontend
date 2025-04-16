"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Tag, Loader2 } from "lucide-react";
import { products, categories } from "@/data/products";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // Memoize filtered products for better performance
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white pt-15'>
      {/* Header with gradient */}
      <div className='bg-white shadow-md backdrop-blur-sm bg-white/30'>
        <div className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
          <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>
            Discover Amazing Products
          </h1>
          <p className='mt-2 text-gray-600'>Find what you love</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        {/* Sidebar */}
        <div className='lg:sticky lg:top-24 w-full lg:w-80 rounded-lg bg-white p-6 shadow-sm'>
          <div className='relative mb-6'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
            <Input
              type='text'
              placeholder='Search products...'
              className='pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            {["All", ...categories].map((category) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#4A90E2] text-white shadow-lg shadow-[#4A90E2]/30"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid with Animation */}
        <div className='flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {filteredProducts.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className='bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer'
              >
                <div className='relative aspect-w-3 aspect-h-2 overflow-hidden rounded-t-xl'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500'
                    loading="lazy"
                  />
                </div>
                <div className='p-6'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>
                        {product.name}
                      </h3>
                      <p className='text-sm text-gray-500'>{product.category}</p>
                    </div>
                    <span className='text-lg font-bold text-primary'>
                      ${product.price}
                    </span>
                  </div>
                  <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
                    {product.description}
                  </p>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200'
                      >
                        <Tag className='w-3 h-3 mr-1' />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced No Results Message */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-center py-12 bg-white rounded-xl shadow-sm p-8'
            >
              <h3 className='text-xl font-medium text-gray-900'>
                No products found
              </h3>
              <p className='mt-2 text-gray-500'>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
