'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, type Product } from '@/data/catalog';
import { ProductCard } from '@/components/product-card';
import { SectionHeader } from '@/components/section-header';

interface SeasonalCarouselSectionProps {
  kicker?: string;
  title?: string;
  products?: Product[];
}

export function SeasonalCarouselSection({
  kicker = 'Catálogo destacado',
  title = 'Colección de Temporada Sayago',
  products = PRODUCTS.filter((p) => p.section === 'seasonal'),
}: SeasonalCarouselSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const distance = direction === 'prev' ? -340 : 340;
    carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-gutter lg:px-margin-desktop py-space-xl">
      <SectionHeader
        kicker={kicker}
        title={title}
        rightSlot={
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              type="button"
              onClick={() => scrollCarousel('prev')}
              aria-label="Ver productos anteriores"
              className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('next')}
              aria-label="Ver siguientes productos"
              className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        }
      />

      <div
        ref={carouselRef}
        className="flex lg:grid lg:grid-cols-4 gap-space-md overflow-x-auto pb-space-sm scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="standard"
            className="min-w-[275px] sm:min-w-[300px] lg:min-w-0 snap-start"
          />
        ))}
      </div>

      <div className="mt-space-lg flex justify-center sm:justify-end">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-space-sm px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-secondary-fixed text-primary font-label-md text-label-md transition-colors"
        >
          <span>Ver todo el catálogo ({PRODUCTS.length} artículos)</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
