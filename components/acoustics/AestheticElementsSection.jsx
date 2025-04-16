"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const aestheticData = [
  {
    title: "Custom Printed Acoustic Panels",
    image: "https://i.ibb.co/4ZtD4g1w/image-16-2.jpg",
    description: "Functional yet visually branded or themed surfaces.",
    features: ["Custom Design", "Brand Integration", "High Performance"]
  },
  {
    title: "Illuminated Acoustic Panels",
    image: "https://i.ibb.co/xtzXhYQ8/image-16-3.jpg",
    description: "Backlit or edge-lit panels combining acoustics and ambience.",
    features: ["LED Lighting", "Mood Setting", "Dual Purpose"]
  },
  {
    title: "Sculptural Acoustic Installations",
    image: "https://i.ibb.co/n8ctKCkL/image-16-4.jpg",
    description: "Custom design elements that serve as both art and acoustic solutions.",
    features: ["Art Integration", "Custom Shape", "Acoustic Design"]
  }
];

export const AestheticElementsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/diagonal-lines.svg')] opacity-10"></div>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-purple-600 font-semibold mb-2 block">Design & Aesthetics</span>
          <h2 className="text-4xl font-bold mb-3">Acoustic Panel & Treatment Materials</h2>
          <div className="flex space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-purple-600"></div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-xl text-gray-600">6. Aesthetic Acoustic Elements</p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
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
              spaceBetween: 30,
            }
          }}
          className="solutions-swiper"
        >
          {aestheticData.map((item, index) => (
            <SwiperSlide key={item.title}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative h-[500px] w-full rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
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
      </div>
    </section>
  );
};