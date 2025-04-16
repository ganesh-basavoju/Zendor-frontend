"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const journeySteps = [
  {
    step: "Step 1",
    title: "Design & Planning",
    description: [
      "Discuss your ideas.",
      "Plan the design.",
      "Choose colors & materials. Visual Brainstorming session or mood board."
    ],
    image: "https://i.ibb.co/Nnyc0fSf/image-22-3.jpg"
  },
  {
    step: "Step 2",
    title: "Production",
    description: [
      "Approve a sample.",
      "Gather materials. Visual Sample materials,",
      "sketches, or a workshop setting."
    ],
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg"
  },
  {
    step: "Step 3",
    title: "Implementation",
    description: [
      "Implementation",
      "Installation",
      "Post-Installation Support"
    ],
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg"
  }
];

export const JourneySection = () => {
  return (
    <section id='journey' className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-r from-gray-50 to-gray-100 bg-[url('/patterns/grid.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Your Journey with Zendorr
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-700 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line with gradient */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-gray-900 to-gray-200"></div>
          
          {/* Steps container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                {/* Step dot with animation */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full group-hover:scale-75 transition-transform duration-300"></div>
                  </div>
                </div>
                
                {/* Step content with enhanced styling */}
                <div className="pt-16 text-center">
                  <div className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full transform transition-transform duration-300 group-hover:scale-105">
                    <span className="font-medium">{step.step}: {step.title}</span>
                  </div>
                  
                  {/* Hover-reveal description with animation */}
                  <div className="opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-2 transition-all duration-300 mt-6">
                    <ul className="text-left space-y-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                      {step.description.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};