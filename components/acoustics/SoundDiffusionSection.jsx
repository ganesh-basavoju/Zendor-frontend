"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const diffusionData = [
  {
    title: "Wooden Diffusers",
    image: "https://i.ibb.co/PGdcFvs0/image-11-1.jpg",
    description: "Geometric wooden structures that scatter sound waves.",
    features: ["Natural Materials", "Aesthetic Design", "Superior Diffusion"]
  },
  {
    title: "Plastic & Composite Diffusers",
    image: "https://i.ibb.co/0ytHXJ53/image-11-2.jpg",
    description: "Lightweight diffusers for balanced acoustics.",
    features: ["Lightweight Construction", "Cost-Effective", "Easy Installation"]
  },
  {
    title: "QRD Diffusers",
    image: "https://i.ibb.co/7thkXTKS/image-11-3.jpg",
    description: "Scientifically designed for optimal sound scattering.",
    features: ["Scientific Design", "Maximum Efficiency", "Professional Grade"]
  }
];

export const SoundDiffusionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/diagonal-lines.svg')] opacity-5"></div>
      </div>
      <div className="container px-4 mx-auto">
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
          <p className="text-xl text-gray-600">3. Space & Room Sound Diffusion</p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
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
              spaceBetween: 30,
            }
          }}
          className="solutions-swiper"
        >
          {diffusionData.map((item, index) => (
            <SwiperSlide key={item.title}>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative h-[500px] w-full overflow-hidden rounded-xl group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-lg text-white/90 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white"
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