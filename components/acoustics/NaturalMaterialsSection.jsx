"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const naturalMaterialsData = [
  {
    title: "Hemp Panels",
    image: "https://i.ibb.co/n2srK0W/image-14-2.jpg",
    description: "Eco-friendly and effective at sound absorption",
    features: ["Sustainable", "High Absorption", "Natural Material"]
  },
  {
    title: "Sheep Wool Insulation",
    image: "https://i.ibb.co/bgTNjFST/image-14-3.jpg",
    description: "Naturally sound-absorbing and breathable",
    features: ["Breathable", "Fire Resistant", "Temperature Control"]
  },
  {
    title: "Strawboard Panels",
    image: "https://i.ibb.co/9mM311Yg/image-14-4.jpg",
    description: "Compressed straw used as acoustic and thermal insulation.",
    features: ["Eco-Friendly", "Thermal Insulation", "Cost-Effective"]
  },
  {
    title: "Recycled Cellulose Fiber",
    image: "https://i.ibb.co/7xRz7BGg/image-15-1.jpg",
    description: "Used in blow-in insulation or acoustic tiles.",
    features: ["Recycled Material", "Easy Installation", "Versatile Use"]
  },
  {
    title: "Coconut Coir Panels",
    image: "https://i.ibb.co/zV8xgPVw/image-15-2.jpg",
    description: "Natural fiber panels that offer eco-acoustic benefits",
    features: ["Natural Fiber", "Durable", "Biodegradable"]
  },
  {
    title: "Bamboo Panels",
    image: "https://i.ibb.co/qF47MvXd/image-15-3.jpg",
    description: "Sustainable wood alternative with moderate sound control.",
    features: ["Fast-Growing", "Renewable", "Aesthetic Appeal"]
  }
];

export const NaturalMaterialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/diagonal-lines.svg')] opacity-5"></div>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-green-600 font-semibold mb-2 block">Eco-Friendly Solutions</span>
          <h2 className="text-4xl font-bold mb-3">Acoustic Panel & Treatment Materials</h2>
          <div className="flex space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-green-600"></div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-xl text-gray-600">5. Natural & Sustainable Materials</p>
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
              spaceBetween: 30,
            }
          }}
          className="solutions-swiper"
        >
          {naturalMaterialsData.map((item, index) => (
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