"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const Hero = () => {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const slides = [
    {
      image: "https://d3o59fu9acgbkr.cloudfront.net/jrc2021/home/master/2025/2/28/jrc-desktop-banner-2-28-2025-12-17-04-PM.jpg",
      label: "Luxury Home Textiles",
      description: "Transform your space with our premium collection",
      buttonText: "Explore Collection"
    },
    {
      image: "https://images.jaipurrugs.com/blog/2025/2/PO-361/ramadan-home-decor-tips-tricks.jpg",
      label: "Artisan Crafted Fabrics",
      description: "Handwoven excellence for your home",
      buttonText: "Shop Fabrics"
    },
    {
      image: "https://images.jaipurrugs.com/blog/2025/2/PO-361/rugs-and-carpets-for-ramadan.jpg",
      label: "Designer Wallpapers",
      description: "Elevate your walls with timeless designs",
      buttonText: "View Wallpapers"
    },
  ];

  return (
    <section className="w-full h-[800px] relative overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full group"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>

            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.label}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              className="transition-transform duration-1000 scale-105 group-hover:scale-100"
            />

            {/* Content Section */}
            <div className="absolute inset-0 flex items-center z-20 ml-5">
              <div className="container mx-auto px-4">
                <div className="max-w-xl space-y-8">
                  <div className="space-y-2">
                    <span className="inline-block text-amber-400 font-medium tracking-wider text-lg uppercase">Premium Collection</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
                      {slide.label}
                    </h2>
                  </div>
                  <p className="text-xl text-white/90 drop-shadow-md max-w-md">
                    {slide.description}
                  </p>
                  <div className="pt-4 flex gap-4">
                    <Button 
                      onClick={()=>navigate(`/category/${slide.label}`)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {slide.buttonText}
                    </Button>
                    <Button 
                      onClick={()=>navigate('/visit-store')} 
                      className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-md transition-all duration-300"
                    >
                      Visit Store
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
    
      {/* Decorative Bottom Border */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-600/20 to-amber-500/20 backdrop-blur-sm z-20" /> */}
    </section>
  );
};

export default Hero;