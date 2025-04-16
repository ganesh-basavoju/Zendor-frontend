"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  return (
    <section id='contact' className="w-full h-[700px] flex flex-row place-content-center relative bg-emerald-900/90">
      <div className="absolute inset-0">
        <Image
          src="https://i.ibb.co/ynX7yJkk/image-28-1.jpg"
          alt="Geometric Pattern Background"
          fill
          className="object-cover mix-blend-overlay"
        />
      </div>
      
      <div className="w-full  relative mx-auto container  px-4 py-24 flex ">
        <div className="w-full flex flex-col place-items-end  h-full p-16 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div className="mb-2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl font-bold text-white mb-2"
              >
                CONTACT
              </motion.h2>
              <div className="flex space-x-6">
                <div className="w-16 h-0.5 bg-white"></div>
                <div className="w-16 h-0.5 bg-white/50"></div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">MAILING ADDRESS</h3>
                <p className="text-white/80 text-md leading-relaxed font-light">
                  5th floor - A wing, Orchidbusiness park,<br />
                  Military road, Marol, Andheri East,<br />
                  Mumbai 400072
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">EMAIL ADDRESS</h3>
                <a 
                  href="mailto:bohoprocure@gmail.com" 
                  className="text-white/80 text-md font-light hover:text-white transition-all duration-300 hover:tracking-wide"
                >
                  bohoprocure@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">PHONE NUMBER</h3>
                <a 
                  href="tel:+918433900692" 
                  className="text-white/80 text-md font-light hover:text-white transition-all duration-300 hover:tracking-wide"
                >
                  +91 8433900692
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};