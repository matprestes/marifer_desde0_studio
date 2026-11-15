'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  Home,
  MessageCircle,
  Phone,
  Ruler,
  Sparkles,
} from 'lucide-react';
import {
  BENTO_CATEGORIES,
  type BentoCategoryCard,
} from '@/data/catalog';
import { buildWhatsAppUrl, cn } from '@/lib/utils';
import { ProductImage } from '@/components/product-image';
import { SectionHeader } from '@/components/section-header';

const BENTO_THEMES: Record<
  BentoCategoryCard['theme'],
  {
    bg: string;
    tag: string;
    title: string;
    desc: string;
    button: string;
  }
> = {
  sky: {
    bg: 'bg-bento-sky',
    tag: 'bg-white/85 text-bento-sky-tag',
    title: 'text-bento-sky-text',
    desc: 'text-bento-sky-muted',
    button: 'bg-bento-sky-text text-white hover:opacity-90',
  },
  mint: {
    bg: 'bg-bento-mint',
    tag: 'bg-white/85 text-bento-mint-tag',
    title: 'text-bento-mint-text',
    desc: 'text-bento-mint-muted',
    button: 'bg-bento-mint-text text-white hover:opacity-90',
  },
  gold: {
    bg: 'bg-bento-gold',
    tag: 'bg-white/85 text-bento-gold-tag',
    title: 'text-bento-gold-text',
    desc: 'text-bento-gold-muted',
    button: 'bg-bento-gold-text text-white hover:opacity-90',
  },
  peach: {
    bg: 'bg-secondary-fixed/60',
    tag: 'bg-white/85 text-secondary',
    title: 'text-on-secondary-fixed',
    desc: 'text-on-secondary-fixed-variant',
    button: 'bg-secondary text-white hover:bg-on-secondary-fixed-variant',
  },
  violet: {
    bg: 'bg-primary-container text-on-primary',
    tag: 'bg-white/15 text-secondary-container',
    title: 'text-on-primary',
    desc: 'text-on-primary-container',
    button: 'bg-whatsapp text-white hover:brightness-105',
  },
};

interface BentoCategoriesSectionProps {
  categories?: BentoCategoryCard[];
}

export function BentoCategoriesSection({
  categories = BENTO_CATEGORIES,
}: BentoCategoriesSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-gutter lg:px-margin-desktop py-space-xl">
      <SectionHeader
        kicker="Oportunidades únicas"
        title="Selección Barrial de Temporada"
        subtitle="Elegí el rubro que necesitás hoy y explorá opciones disponibles con precio justo."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {categories.map((card) => {
          const theme = BENTO_THEMES[card.theme];

          if (card.featuredWide) {
            return (
              <div
                key={card.id}
                className={cn(
                  'relative md:col-span-2 rounded-[2rem] p-space-lg overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between min-h-[300px] gap-space-lg',
                  theme.bg
                )}
              >
                <div className="z-10 flex flex-col space-y-space-sm max-w-xl text-left">
                  <div
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md font-label-sm text-label-sm font-bold w-fit',
                      theme.tag
                    )}
                  >
                    <Home className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{card.kicker}</span>
                  </div>
                  <h3
                    className={cn(
                      'font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg tracking-tight',
                      theme.title
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className={cn('font-body-md text-body-md leading-relaxed', theme.desc)}>
                    {card.description}{' '}
                    {card.priceHighlight ? (
                      <span className="text-secondary-container font-extrabold text-[18px] tabular-price">
                        {card.priceHighlight}
                      </span>
                    ) : null}
                    .
                  </p>
                  <div className="pt-space-xs flex flex-wrap items-center gap-space-sm">
                    <a
                      href={buildWhatsAppUrl(card.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full font-label-md text-label-md shadow-lg shadow-whatsapp/20 transition-all',
                        theme.button
                      )}
                    >
                      <Camera className="w-4 h-4" aria-hidden="true" />
                      <span>{card.ctaText}</span>
                    </a>
                    <Link
                      href={`/catalogo?rubro=${card.rubro}`}
                      className="inline-flex items-center gap-1.5 px-space-md py-space-sm rounded-full bg-white/12 hover:bg-white/20 text-on-primary font-label-md text-label-md transition-colors"
                    >
                      <span>Ver en catálogo</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="w-full md:w-64 h-56 rounded-2xl overflow-hidden relative shadow-md shrink-0">
                  <ProductImage
                    src={card.image}
                    alt={card.imageAlt}
                    sizes="(max-width: 768px) 92vw, 256px"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent flex items-end p-3">
                    <span className="font-label-sm text-label-sm text-white">
                      Nuevos ingresos de ayer
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          const IconComponent =
            card.theme === 'mint'
              ? Ruler
              : card.theme === 'gold'
                ? Sparkles
                : card.theme === 'peach'
                  ? Phone
                  : MessageCircle;

          return (
            <div
              key={card.id}
              className={cn(
                'relative rounded-[2rem] p-space-lg overflow-hidden shadow-sm flex flex-col justify-between min-h-[300px]',
                theme.bg
              )}
            >
              <div className="z-10 flex flex-col space-y-space-xs max-w-[68%]">
                <span
                  className={cn(
                    'inline-block px-3 py-1 rounded-full backdrop-blur-sm font-label-sm text-label-sm font-bold w-fit',
                    theme.tag
                  )}
                >
                  {card.kicker}
                </span>
                <h3
                  className={cn(
                    'font-headline-md text-headline-md tracking-tight',
                    theme.title
                  )}
                >
                  {card.title}
                </h3>
                <p className={cn('font-body-sm text-body-sm', theme.desc)}>
                  {card.description}
                </p>
              </div>

              <div className="z-10 pt-space-md flex flex-wrap items-center gap-space-sm">
                <Link
                  href={`/catalogo?rubro=${card.rubro}`}
                  className={cn(
                    'inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-full font-label-md text-label-md transition-all shadow-sm',
                    theme.button
                  )}
                >
                  <span>{card.ctaText}</span>
                  <IconComponent className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="absolute -right-4 -bottom-4 w-44 h-44 rounded-full overflow-hidden shadow-lg border-4 border-white/60">
                <ProductImage
                  src={card.image}
                  alt={card.imageAlt}
                  sizes="176px"
                  className="w-full h-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
