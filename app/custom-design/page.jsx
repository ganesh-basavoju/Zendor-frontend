"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CustomDesign() {
  const images = [
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // Replace with your actual number
    const message = encodeURIComponent("Hi! I'm interested in custom design services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []); // Remove images.length from dependency array

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt="Custom Design"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm">
          <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl text-white font-serif mb-6"
            >
              Let our design narrate your story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl"
            >
              Creating unique and personalized designs that tell your story
            </motion.p>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative h-[400px] overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={image}
                alt={`Design ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {/* Introduction with image background */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative p-12 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={images[0]}
              alt="Background"
              fill
              className="object-cover opacity-10"
            />
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif mb-6">Using design as a medium of collaborative story telling</h2>
            <p className="text-gray-600 leading-relaxed">
              We value design and creativity at its core. We have always believed that design should be for everyone. 
              We love creating simple stories that connect with people. A large part of inspiration comes from nature, 
              which is easily relatable to almost everyone.
            </p>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          whileInView={{ opacity: 1 }} 
          initial={{ opacity: 0 }} 
          className="relative text-center py-24 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={images[2]}
              alt="CTA Background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-serif mb-8">Ready to start your design journey?</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="bg-[#0a2d44] text-white px-8 py-4 rounded-lg hover:bg-[#0a2d44]/90 transition-colors text-lg flex items-center gap-2 mx-auto"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}