"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WallArtShowcase = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/products/explore');
  };
  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col md:flex-row items-center px-6 md:px-12 py-12">
      {/* Content Section */}
      <div className="md:w-1/2 text-gray-900 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Tailor Made <span className="text-neutral-gray">Wall Arts</span>
        </h2>
        <p className="text-lg md:text-xl mb-6 text-gray-600">
          Tell your story through art! Explore a range of embroidered wall art with the finest attention to detail.
        </p>
        <button onClick={handleShopNow} className="bg-[#4A90E2] text-white px-6 py-3 rounded-md text-lg shadow-md hover:bg-[#357ABD] transition-all cursor-pointer">
          Shop Now
        </button>
      </div>

      {/* Wall Art Gallery */}
      <div className="md:w-1/2 grid grid-cols-2 gap-6 mt-8 md:mt-0">
        {["https://cdn.pixabay.com/photo/2017/06/19/10/24/indoor-2418846_1280.jpg","https://cdn.pixabay.com/photo/2021/04/22/18/50/frames-6199828_960_720.jpg","https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_960_720.jpg","https://cdn.pixabay.com/photo/2020/10/19/11/43/home-5667529_1280.jpg"].map((src, index) => (
          <div key={index} className="relative">
            <Image
              src={src}
              alt={`Wall Art ${index + 1}`}
              width={300}
              height={400}
              className="rounded-lg shadow-md border border-gray-200 transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default WallArtShowcase;
