"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
// Update imports to include EffectFade
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const solutions = [
  {
    title: "Acoustic Textile Wallcoverings",
    description: "Premium acoustic solutions for walls that combine style with functionality",
    image: "https://i.ibb.co/QFQL74S8/image-23-3.jpg",
    features: ["Sound Absorption", "Aesthetic Design", "Easy Maintenance"]
  },
  {
    title: "Wall-to-wall Carpets",
    description: "Luxurious carpeting solutions for complete floor coverage",
    image: "https://i.ibb.co/gM01B2TM/image-22-2.jpg",
    features: ["Premium Quality", "Noise Reduction", "Comfort Enhanced"]
  },
  {
    title: "Acoustic Solutions",
    description: "Comprehensive acoustic treatments for optimal sound control",
    image: "https://i.ibb.co/SDM83vK2/image-21-2.jpg",
    features: ["Professional Grade", "Custom Design", "Full Coverage"]
  }
];

export const CommercialSolutionsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-0 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-blue-600 font-semibold mb-2 block">Premium Solutions</span>
          <h2 className="text-5xl font-bold mb-4">Zendorr's Commercial Solutions</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-xl text-gray-600">Elevating Elegance, Defining Spaces</p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
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
          className="solutions-swiper"
        >
          {solutions.map((solution, index) => (
            <SwiperSlide key={solution.title}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative h-[600px] w-full group"
              >
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <h4 className="text-4xl font-bold text-white mb-4 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                    {solution.title}
                  </h4>
                  <p className="text-xl text-white/90 mb-6 max-w-2xl">
                    {solution.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {solution.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white font-medium transform transition-transform duration-300 hover:scale-105"
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