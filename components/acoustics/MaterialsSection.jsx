"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const materials = [
  {
    title: "Natural Fibers",
    description: "Sustainable acoustic materials from natural sources",
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
    features: ["Eco-friendly", "High absorption", "Aesthetically pleasing"]
  },
  {
    title: "Recycled Materials",
    description: "Innovative solutions using recycled content",
    image: "https://i.ibb.co/Nnyc0fSf/image-22-3.jpg",
    features: ["Sustainable", "Cost-effective", "Versatile application"]
  },
  {
    title: "Technical Fabrics",
    description: "Advanced textile solutions for superior acoustics",
    image: "https://i.ibb.co/SDM83vK2/image-21-2.jpg",
    features: ["High performance", "Customizable", "Durable"]
  }
];

export const MaterialsSection = () => {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/diagonal-lines.svg')] opacity-5"></div>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Acoustic Materials</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-gray-900"></div>
            <div className="w-12 h-0.5 bg-gray-900"></div>
          </div>
          <p className="text-xl text-gray-600">Premium materials for superior sound control</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {materials.map((material, index) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={material.image}
                  alt={material.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{material.title}</h3>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <ul className="space-y-2">
                  {material.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-gray-900 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};