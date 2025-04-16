"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const clientLogos = [
  {
    name: "ZZ Architects",
    image: "https://i.ibb.co/8DgMtbJ6/image-27-3.png",
    category: "Architecture"
  },
  {
    name: "Sanjay Puri Architects",
    image: "https://i.ibb.co/FkYL7Bjv/image-27-7.jpg",
    category: "Architecture"
  },
  {
    name: "Radisson Hotels & Resorts",
    image: "https://i.ibb.co/N6wvhXrx/image.png",
    category: "Hospitality"
  },
  {
    name: "JW Marriott",
    image: "https://i.ibb.co/Gvthxbbn/image-27-5.png",
    category: "Hospitality"
  },
  {
    name: "Guri Khan Designs",
    image: "https://i.ibb.co/6J0gGnXL/image-27-8.jpg",
    category: "Design"
  },
  {
    name: "Pyrinox Pictures",
    image: "https://i.ibb.co/LdKzrxJw/image-27-6.jpg",
    category: "Entertainment"
  }
];

export const ClientsSection = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/patterns/circles.svg')] opacity-5"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 max-w-3xl"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 relative">
                <Image
                  src="https://i.ibb.co/v64m9Fgb/image-14-1.jpg"
                  alt="Zendorr Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Transform your spaces,
              <br />
              <span className="text-gray-600">just like we have done it for...</span>
            </h2>
            <div className="flex space-x-6">
              <div className="w-16 h-0.5 bg-gray-900"></div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-16">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative w-full aspect-[3/2] filter grayscale hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-sm text-gray-500 uppercase tracking-wider">{client.name}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};