import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { MostOrderedSection } from '@/components/most-ordered-section';
import { BentoCategoriesSection } from '@/components/bento-categories-section';
import { SeasonalCarouselSection } from '@/components/seasonal-carousel-section';
import { NeighborhoodCtaBanner } from '@/components/neighborhood-cta-banner';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <MostOrderedSection />
      <BentoCategoriesSection />
      <SeasonalCarouselSection />
      <NeighborhoodCtaBanner />
    </div>
  );
}
