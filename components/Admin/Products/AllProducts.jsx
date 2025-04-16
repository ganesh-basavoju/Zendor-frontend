"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const images = [
  "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
  "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
  "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
  "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
];

const dummyProducts = Array(9).fill(null).map((_, index) => ({
  name: 'Lorem Ipsum',
  price: '₹156.40',
  image: images[index % images.length], // This will repeat the images in sequence
  summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
  sales: '1,200',
  remaining: 800,
  total: 1500
}));

const AllProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState(dummyProducts.map((product, index) => ({
    ...product,
    id: index + 1
  })));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const totalPages = 5;

  // Add handleDelete function
  const handleDelete = (productId) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#003f62]">Products</h1>
          <div className="text-sm text-gray-500">
            Home <span className="mx-1">&gt;</span> All Products
          </div>
        </div>
        <button 
          onClick={() => router.push('/admin/products/add')}
          className="flex items-center gap-2 bg-[#003f62] text-white px-4 py-2 rounded-lg hover:bg-[#003f62]/90 transition-colors w-full md:w-auto justify-center"
        >
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex gap-2 md:gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={20} />
              <span className="hidden md:inline">Filters</span>
            </button>
            <select className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Stock: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid - Updated to use filtered products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your search.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-1 md:gap-2">
        <button
          className="p-2 rounded-lg hover:bg-[#003f62]/10 text-[#003f62] disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex gap-1 md:gap-2">
          {[1, 2, 3, 4, 5].map(page => (
            <button
              key={page}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg transition-colors ${
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
          className="p-2 rounded-lg hover:bg-[#003f62]/10 text-[#003f62] disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default AllProducts;