"use client";
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { FaGem } from 'react-icons/fa';  // Add this import

const VisitStore = () => {
  const materials = [
    { name: 'Wallpaper Collection', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg' },
    { name: 'Designer Panels', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg' },
    { name: 'Modern Wallpapers', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg' },
    { name: 'Premium Collection', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg' },
    // Repeating the same images for more items
    { name: 'Luxury Wallpapers', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg' },
    { name: 'Textured Panels', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg' },
    { name: 'Classic Collection', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg' },
    { name: 'Designer Series', image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg' },
  ];

  const testimonials = [
    {
      name: 'Arun Pushpa',
      role: 'Interior Designer',
      image: '/testimonials/arun.jpg',
      comment: 'I wholeheartedly recommend Zendorr to all architects and designers. Found a brand, got quotes, ordered hassle-free, and smooth delivery. Impressive!',
      rating: 4.5
    },
    {
      name: 'Sriprem Ravishankar',
      role: 'Interior Designer',
      image: '/testimonials/sriprem.jpg',
      comment: 'Zendorr revolutionized my design projects. Their diverse product range let my creativity soar. Picking ideal laminates to distinctive wall panels was effortless.',
      rating: 4
    },
    {
      name: 'Anser M.',
      role: 'Architect',
      image: '/testimonials/anser.jpg',
      comment: 'Zendorr simplifies everything. One platform, countless materials - from plywood to laminates. Finally, a place that understands convenience and quality.',
      rating: 4.5
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Enhanced Hero Section */}
      <section className="relative h-[90vh] min-h-[600px]">
        <Image
          src="https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg"
          alt="Experience Center"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Transform Your Space With <span className="text-amber-500">Premium Materials</span>
            </h1>
            <p className="mb-10 text-white text-lg md:text-xl max-w-2xl leading-relaxed">
              Experience our curated collection at our Bengaluru showroom. Book a private consultation today.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">+91</span>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full pl-14 pr-4 py-3.5 bg-white/95 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder-gray-400"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg text-base font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Book Private Tour
              </button>
            </div>
            <a href="tel:8121523945" className="mt-8 flex items-center gap-3 text-white group">
              <Phone className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
              <span className="text-lg group-hover:text-amber-500 transition-colors">+91 8121523945</span>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-20 px-6 md:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-medium">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Exceptional Experience, Every Time</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                { 
                  icon: <FaGem className="w-6 h-6" />,
                  title: "Premium Selection",
                  desc: "Carefully curated materials from top global brands"
                },
                { icon: '🎯', text: 'Expert Consultation', desc: 'Personalized guidance from industry professionals' },
                { icon: '🚚', text: 'Seamless Delivery', desc: 'Hassle-free delivery to your doorstep' },
                { icon: '💰', text: 'Competitive Pricing', desc: 'Save up to 10% on all orders' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {materials.slice(0, 4).map((material, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-medium">{material.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Materials Section */}
      <section className="py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-medium">OUR COLLECTION</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Premium Materials For Every Style</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => (
              <div key={index} className="group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-gray-900">{material.name}</h3>
                  <button className="mt-2 text-sm text-amber-600 hover:text-amber-800 font-medium transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-gray-900">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-semibold text-blue-600">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{testimonial.name}</h3>
                    <p className="text-amber-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{testimonial.comment}</p>
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl ${i < testimonial.rating ? "text-amber-500" : "text-gray-200"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Similar updates to the hero section */}
      <section className="relative h-screen">
        <Image
          src="https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg"
          alt="Interior"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black/30 via-black/20 to-black/30">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-xl">
            Get <span className="text-amber-400">stylish yet functional</span> materials<br />
            for your interiors in JP Nagar.
          </h2>
          <p className="max-w-2xl mb-8 text-gray-100 text-lg md:text-xl leading-relaxed drop-shadow-md">
            Find top-quality materials for your home at affordable prices, with expert advice to help you make the right choice.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md w-full">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">+91</span>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-2.5 bg-white text-black rounded-md"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Book Appointment
            </button>
          </div>
          <a href="tel:8121523945" className="mt-8 flex items-center gap-2 text-white">
            <Phone />
            <span>8121523945</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default VisitStore;