"use client";
import Image from "next/image";
import { Heart, ShoppingCart, Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";

const subcategories = [
  { id: 1, name: "Laminate Flooring" },
  { id: 2, name: "Engineered Flooring" },
  { id: 3, name: "Herringbone Engineered Flooring" },
  { id: 4, name: "Chevron Engineered Flooring" }
];

const sampleProducts = [
  {
    id: 1,
    name: "Tropical Paradise Design",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
    price: "₹2,999",
    description: "A beautiful tropical-themed wallpaper perfect for creating a paradise-like atmosphere in your space."
  },
  {
    id: 2,
    name: "Floral Elegance Design",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
    price: "₹3,499",
    description: "Elegant floral patterns that bring sophistication and natural beauty to any room."
  },
  {
    id: 3,
    name: "Nature Inspired Pattern",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
    price: "₹2,799",
    description: "A nature-inspired design that creates a serene and calming environment."
  },
  {
    id: 4,
    name: "Modern Abstract Design",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
    price: "₹3,299",
    description: "Contemporary abstract patterns that add a modern touch to your interior."
  }
];

export default function CategoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = decodeURIComponent(pathname.split('/').pop());
  console.log("slug",slug)
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortBy, setSortBy] = useState('Featured');
  const { ref, inView } = useInView();

  const loadMoreProducts = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setProducts(prev => [...prev, ...sampleProducts]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (inView && !loading) {
      loadMoreProducts();
    }
  }, [inView]);

  const handleProductClick = (productId) => {
    if(slug==="wallpaper"){
      router.push(`/products/wallpapers/${productId}`);
    }else if(slug==="wooden flooring"){
      router.push(`/products/wooden-flooring/${productId}`);
    }
   
  };

  // Filter and sort products based on search query and sort option
  const filteredAndSortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      
      switch (sortBy) {
        case 'Price: Low to High':
          return priceA - priceB;
        case 'Price: High to Low':
          return priceB - priceA;
        case 'Newest First':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  // Update the products mapping in the JSX
  return (
    <div className="min-h-screen mt-15 bg-gray-50 py-8">
      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-serif capitalize mb-6">{slug.replace('-', ' ')}</h1>
        
        {/* Subcategories Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSubcategory === null
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            {subcategories.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => setSelectedSubcategory(subcat.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedSubcategory === subcat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {subcat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>

              
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List View */}
      <div className="max-w-7xl mx-auto px-4">
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        }`}>
          {filteredAndSortedProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className={`group relative cursor-pointer ${
                viewMode === 'list' ? 'flex gap-6 bg-white p-4 rounded-lg' : ''
              }`}
              onClick={() => handleProductClick(product.id)}
            >
              <div className={`relative ${
                viewMode === 'list' ? 'w-48 aspect-[3/4]' : 'aspect-[3/4]'
              } overflow-hidden rounded-lg bg-gray-100`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart size={20} className="text-gray-800" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ShoppingCart size={20} className="text-gray-800" />
                  </button>
                </div>
              </div>

              <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'} space-y-2`}>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-700">{product.price}</p>
                {viewMode === 'list' && (
                  <p className="text-gray-600 mt-2">{product.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading trigger element */}
        <div ref={ref} className="h-10 w-full flex items-center justify-center mt-8">
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          )}
        </div>
      </div>
    </div>
  );
}