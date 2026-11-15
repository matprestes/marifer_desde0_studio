'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { PRODUCTS, type Product } from '@/data/catalog';
import { SectionHeader } from '@/components/section-header';
import { ProductCard } from '@/components/product-card';

interface MostOrderedSectionProps {
  products?: Product[];
}

export function MostOrderedSection({
  products = PRODUCTS.filter((p) => p.section === 'most-ordered'),
}: MostOrderedSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-gutter lg:px-margin-desktop py-space-xl">
      <SectionHeader
        kicker="Récord de consultas"
        title="Los más pedidos de la semana en Sayago"
        icon={<Flame className="w-4 h-4 shrink-0" aria-hidden="true" />}
        rightSlot={
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Llegaron hace días y vuelan rápido
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="compact" />
        ))}
      </div>
    </section>
  );
}
