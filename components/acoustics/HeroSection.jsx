"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter();

  const handleExplore = () => {
    // Scroll to JourneySection
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleContact = () => {
    // Find the last section (ContactSection)
    const sections = document.querySelectorAll('section');
    const lastSection = sections[sections.length - 1];
    
    if (lastSection) {
      window.scrollTo({
        top: lastSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/diagonal-lines.svg')] opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[600px] w-full group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl opacity-75 blur-xl group-hover:opacity-100 transition duration-500"></div>
            <Image
              src="https://i.ibb.co/1JqGhdQF/image-2-2.jpg"
              alt="Elegant Acoustic Interior"
              fill
              priority
              className="object-cover rounded-xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="text-blue-600 font-semibold text-lg">Premium Acoustics Solutions</span>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              WELCOME TO ZENDOR's{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                ACOUSTICS
              </span>
            </h1>
            <div className="flex space-x-4">
              <div className="w-12 h-0.5 bg-blue-600"></div>
              <div className="w-12 h-0.5 bg-purple-600"></div>
            </div>
            <h2 className="text-3xl font-medium text-gray-800">where style meets sound.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore our innovative products designed to enhance interiors with superior 
              acoustic performance and contemporary flair. Perfect for commercial 
              projects seeking both functionality and elegance. Transform your space with 
              acoustics today.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={()=>{handleExplore()}}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300"
              >
                Explore Solutions
              </button>
              <button
                onClick={handleContact}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition duration-300"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};