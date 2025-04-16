"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredSolutions = [
  {
    title: "Acoustic Panels",
    description: "High-performance sound absorption panels for optimal acoustics",
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
    features: ["Premium Materials", "Custom Designs", "Maximum Absorption"]
  },
  {
    title: "Sound Barriers",
    description: "Advanced noise reduction solutions for peaceful environments",
    image: "https://i.ibb.co/Nnyc0fSf/image-22-3.jpg",
    features: ["High STC Rating", "Durable Build", "Easy Installation"]
  },
  {
    title: "Ceiling Systems",
    description: "Integrated acoustic ceiling solutions for complete sound control",
    image: "https://i.ibb.co/SDM83vK2/image-21-2.jpg",
    features: ["Full Coverage", "Modern Design", "Superior Performance"]
  }
];

export const FeaturedAcousticSection = () => {
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
          <span className="text-blue-600 font-semibold mb-2 block">Featured Products</span>
          <h2 className="text-4xl font-bold mb-4">Featured Acoustic Solutions</h2>
          <div className="flex space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-xl text-gray-600">Innovative solutions for every acoustic challenge</p>
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
          {featuredSolutions.map((solution, index) => (
            <SwiperSlide key={solution.title}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative h-[500px] w-full group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                    {solution.title}
                  </h3>
                  <p className="text-lg text-white/90 mb-6">
                    {solution.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature, idx) => (
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