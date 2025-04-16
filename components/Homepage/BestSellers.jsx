"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const bestsellers = [
  {
    title: 'Moonlight Collection',
    description: 'Elegant patterns inspired by nocturnal beauty',
    price: '₹12,999',
    image: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg',
    category: 'Premium Collection'
  },
  {
    title: 'Kids Fantasy',
    description: 'Playful designs for cheerful spaces',
    price: '₹9,999',
    image: 'https://images.pexels.com/photos/6207757/pexels-photo-6207757.jpeg',
    category: 'Children\'s Collection'
  },
  {
    title: 'Lakeside Serenity',
    description: 'Nature-inspired peaceful patterns',
    price: '₹14,999',
    image: 'https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg',
    category: 'Luxury Series'
  }
];

export default function Bestsellers() {
  const router = useRouter();

  const handleProductClick = (index) => {
    // Using index + 1 as a simple product ID for demonstration
    router.push(`/products/${index + 1}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Bestsellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved collections that transform spaces into works of art
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((item, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onClick={() => handleProductClick(index)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={700}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-white/80 text-sm font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white mt-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm mt-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-white font-semibold">
                        {item.price}
                      </span>
                      <button 
                        className="px-4 py-2 bg-white/90 text-gray-900 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(index);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
