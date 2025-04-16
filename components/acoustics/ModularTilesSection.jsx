"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const modularTiles = [
  {
    title: "Geometric Tiles",
    description: "Contemporary geometric patterns for modern spaces",
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
    applications: "Office spaces, Conference rooms, Modern interiors"
  },
  {
    title: "3D Relief Tiles",
    description: "Three-dimensional acoustic tiles for enhanced performance",
    image: "https://i.ibb.co/Nnyc0fSf/image-22-3.jpg",
    applications: "Auditoriums, Studios, Performance venues"
  },
  {
    title: "Customizable Panels",
    description: "Bespoke modular solutions for unique requirements",
    image: "https://i.ibb.co/SDM83vK2/image-21-2.jpg",
    applications: "Hotels, Restaurants, Corporate offices"
  }
];

export const ModularTilesSection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/diagonal-lines.svg')] opacity-10"></div>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Modular Acoustic Tiles</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-gray-900"></div>
            <div className="w-12 h-0.5 bg-gray-900"></div>
          </div>
          <p className="text-xl text-gray-600">Versatile solutions for every space</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {modularTiles.map((tile, index) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm uppercase tracking-wider mb-2">Ideal for</p>
                    <p className="text-gray-200">{tile.applications}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">{tile.title}</h3>
                <p className="text-gray-600">{tile.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};