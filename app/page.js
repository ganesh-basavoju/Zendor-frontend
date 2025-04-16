import WallArtShowcase from "@/components/Homepage/ WallArtShowcase";
import AllTypesSection from "@/components/Homepage/AllTypesSection";
import Bestsellers from "@/components/Homepage/BestSellers";
import CategorySection from "@/components/Homepage/CategorySection";
import Handcrafted from "@/components/Homepage/HandCrafted";
import Hero from "@/components/Homepage/Hero";
import ImageSlider from "@/components/Homepage/ImageSlider";
import ExploreAll from "@/components/Homepage/ExploreAll";
import { Montserrat, Playfair_Display, Poppins, Lora } from 'next/font/google';

export const mont = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-montserrat' });
export const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' });
export const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-poppins' });
export const lora = Lora({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lora' });


export default function Home() {
  return (
    <div className="flex w-full flex-col ">
      <Hero/>
      <CategorySection/>
      <ImageSlider/>
      <AllTypesSection/>
      <WallArtShowcase/>
      <Bestsellers/>
      {/* <ExploreAll/> */}
      <Handcrafted/>
    </div>
  );
}
