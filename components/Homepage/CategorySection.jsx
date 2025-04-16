"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Luxury Cushions",
    description: "Handcrafted comfort for your home",
    image: "https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg",
  },
  {
    name: "Premium Sheers",
    description: "Elegant drapes that transform spaces",
    image: "https://images.pexels.com/photos/1339194/pexels-photo-1339194.jpeg",
  },
  {
    name: "Designer Wallpapers",
    description: "Artisan patterns for your walls",
    image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
  },
  {
    name: "Wall Decals",
    description: "Statement pieces that inspire",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
  },
];

const CategorySection = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryName) => {
    // Convert category name to URL-friendly slug
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium home decor essentials
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative mb-6">
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {category.description}
                </p>
                <div className="w-12 h-[2px] bg-gray-400 mx-auto transform transition-all duration-300 group-hover:w-20 group-hover:bg-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
