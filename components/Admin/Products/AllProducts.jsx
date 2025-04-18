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

const AllProducts = ({name}) => {


  const router = useRouter();
  const [products, setProducts] = useState(dummyProducts.map((product, index) => ({
    ...product,
    id: index + 1
  })));

  const [showFilters, setShowFilters] = useState(false);
const [selectedFilters, setSelectedFilters] = useState([]);
const [subCategories, setSubCategories] = useState([
  'Engineered Wood',
  'Laminate Flooring',
  'Solid Wood',
  'Vinyl Flooring'
]);

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
          <h1 className="text-xl md:text-2xl font-semibold text-[#003f62] capitalize">{name}</h1>
         
        </div>
        <button 
          onClick={() => router.push(`/admin/products/${name}/add`)}
          className="flex items-center gap-2 bg-[#003f62] text-white px-4 py-2 rounded-lg hover:bg-[#003f62]/90 transition-colors w-full md:w-auto justify-center"
        >
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md mb-3 border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${showFilters ? 'bg-gray-50 border-[#003f62] text-[#003f62]' : ''}`}
                >
                  <Filter size={20} />
                  <span className="hidden md:inline font-medium">Filters</span>
                </button>
                
                {showFilters && (
                  <div className="absolute top-full mt-2 right-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">Sub Categories</h3>
                    </div>
                    <div className="p-4 max-h-64 overflow-y-auto">
                      {subCategories.map((category) => (
                        <label key={category} className="flex items-center gap-3 py-2 px-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters([...selectedFilters, category]);
                              } else {
                                setSelectedFilters(selectedFilters.filter(f => f !== category));
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-[#003f62] focus:ring-[#003f62] transition-colors"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] font-medium text-gray-700">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Stock: Low to High</option>
              </select>
            </div>
          </div>
        </div>
        
        {selectedFilters.length > 0 && (
          <div className="px-4 md:px-6 py-3 bg-gray-50 rounded-b-xl flex flex-wrap gap-2">
            {selectedFilters.map(filter => (
              <span key={filter} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700">
                {filter}
                <button
                  onClick={() => setSelectedFilters(selectedFilters.filter(f => f !== filter))}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid - Updated to use filtered products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard 
            category={name}
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