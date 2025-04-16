"use client";
import { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const sampleProducts = {
  wallpaper: ["Floral Wallpaper", "Abstract Design", "Nature Theme"],
  cushions: ["Velvet Cushion", "Printed Cushion", "Embroidered Cushion"],
  curtains: ["Blackout Curtain", "Sheer Curtain", "Printed Curtain"],
  covers: ["Sofa Cover", "Bed Cover",   "Table Cover"]
};

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  // Add handleTagClick function
  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      setTimeout(() => {
        const searchTerm = query.toLowerCase();
        const searchResults = Object.entries(sampleProducts)
          .flatMap(([category, items]) => items)
          .filter(item => item.toLowerCase().includes(searchTerm));
        setResults(searchResults);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (result) => {
    // Convert result name to URL-friendly format and use as ID
    const productId = result.toLowerCase().replace(/\s+/g, '-');
    router.push(`/products/${productId}`);
    onClose(); // Close search bar after navigation
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-lg z-[100] flex flex-col items-center gap-6 pt-16 px-6 overflow-y-auto">
      {/* Solid white background layer */}
      <div className="fixed inset-0 bg-white/95 backdrop-blur-lg -z-10"></div>
      
      {/* Gradient overlay - positioned absolutely */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-white to-gray-50 opacity-95 -z-10"></div>

      <div className="relative">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
          Zendor
        </h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black rounded-full"></div>
      </div>

      <button 
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" 
        onClick={onClose}
      >
        <X size={24} className="text-gray-700" />
      </button>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 items-center mt-8">
        <div className="w-full relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full border-b-2 border-gray-300 outline-none text-xl py-3 pl-10 pr-4 transition-all duration-300 focus:border-black group-hover:border-gray-400 bg-transparent text-gray-900"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="min-w-[180px] border border-gray-300 px-4 py-3 rounded-lg cursor-pointer hover:border-black transition-all duration-300 outline-none bg-transparent text-gray-700 appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option>All Categories</option>
          <option>Services</option>
          <option>Wall Art</option>
          <option>Decal</option>
          <option>Home Textile</option>
        </select>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">Popular Searches:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {['wallpaper', 'cushions', 'curtains', 'covers'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200 active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Section */}
      {query.trim() && (
        <div className="w-full max-w-4xl">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-gray-600" size={32} />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No products found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-gray-700 font-medium">Search Results ({results.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-3 shadow-sm hover:shadow-md"
                  >
                    <Search size={18} className="text-gray-400" />
                    <p className="text-gray-900">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Popular Searches section remains the same */}
    </div>
  );
};

export default SearchBar;