"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Update the data arrays to include features
const soundproofingData = [
  {
    title: "Mass Loaded Vinyl (MLV)",
    image: "https://i.ibb.co/gZWvpn05/image-12-1.jpg",
    description: "Dense sheets to block sound transmission.",
    features: ["High Density", "Flexible Material", "Easy Installation"]
  },
  {
    title: "Acoustic Drywall",
    image: "https://i.ibb.co/zhLkhNWF/image-12-2.jpg",
    description: "Specialized drywall for noise control.",
    subtitle: "(Soundproof Gypsum Board)",
    features: ["Sound Blocking", "Fire Resistant", "Professional Grade"]
  },
  {
    title: "Resilient Channels & Green Glue",
    image: "https://i.ibb.co/ymQSFtZY/image-12-3.jpg",
    description: "Used in construction to minimize vibrations.",
    features: ["Vibration Control", "Easy Application", "Proven Results"]
  }
];

const isolationData = [
  {
    title: "Sound Isolation Clips",
    image: "https://i.ibb.co/XrCmSytV/image.png",
    description: "Mounting hardware that decouples surfaces to reduce sound transfer.",
    features: ["Decoupling System", "Professional Grade", "High STC Rating"]
  },
  {
    title: "Double-Stud Walls with Air Gap",
    image: "https://i.ibb.co/QF8cRq1J/image.png",
    description: "Walls designed to break sound pathways.",
    features: ["Maximum Isolation", "Customizable Gap", "Superior Performance"]
  }
];

export const SoundproofingSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-blue-600 font-semibold mb-2 block">Sound Solutions</span>
          <h2 className="text-4xl font-bold mb-3">Acoustic Panel & Treatment Materials</h2>
          <div className="flex space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-xl text-gray-600">4. Soundproofing & Noise Isolation</p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          speed={1000}
          navigation={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            }
          }}
          className="solutions-swiper mb-20"
        >
          {soundproofingData.map((item, index) => (
            <SwiperSlide key={item.title}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative h-[500px] w-full rounded-xl overflow-hidden group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                    {item.title}
                  </h3>
                  <p className="text-lg text-white/90 mb-6">{item.description}</p>
                  {item.subtitle && (
                    <p className="text-white/80 text-sm mb-4 italic">{item.subtitle}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white font-medium transform transition-all duration-300 hover:bg-white/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-semibold mb-2 block">Advanced Technology</span>
            <h3 className="text-3xl font-bold mb-4">Advanced Isolation Methods</h3>
            <div className="w-24 h-0.5 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {isolationData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-[300px] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-center mb-6">{item.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {item.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};