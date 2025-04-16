"use client";
import { HeroSection } from '@/components/acoustics/HeroSection';
import { JourneySection } from '@/components/acoustics/JourneySection';
import { CommercialSolutionsSection } from '@/components/acoustics/CommercialSolutionsSection';
import { FeaturedAcousticSection } from '@/components/acoustics/FeaturedAcousticSection';
import { MaterialsSection } from '@/components/acoustics/MaterialsSection';
import { ModularTilesSection } from '@/components/acoustics/ModularTilesSection';
import { FlooringSection } from '@/components/acoustics/FlooringSection';
import { SoundDiffusionSection } from '@/components/acoustics/SoundDiffusionSection';
import { SoundproofingSection } from '@/components/acoustics/SoundproofingSection';
import { NaturalMaterialsSection } from '@/components/acoustics/NaturalMaterialsSection';
import { AestheticElementsSection } from '@/components/acoustics/AestheticElementsSection';
import { ClientsSection } from '@/components/acoustics/ClientsSection';
import { ContactSection } from '@/components/acoustics/ContactSection';

const AcousticsPage = () => {
  return (
    <div className="-mt-12 bg-white overflow-x-hidden">
      <HeroSection />
      <JourneySection />
      <CommercialSolutionsSection />
      <FeaturedAcousticSection />
      <MaterialsSection />
      <ModularTilesSection />
      <div className="overflow-hidden">
        <FlooringSection />
        <SoundDiffusionSection />
        <SoundproofingSection />
        <NaturalMaterialsSection />
        <AestheticElementsSection />
        <ClientsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default AcousticsPage;