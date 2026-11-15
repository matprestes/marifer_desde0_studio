'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Heart,
  MessageCircle,
  Search,
  Star,
} from 'lucide-react';
import { HERO_STORE_IMAGE } from '@/data/catalog';
import { buildWhatsAppUrl } from '@/lib/utils';
import { ProductImage } from '@/components/product-image';
import { BrandLogo } from '@/components/brand-logo';

interface HeroSectionProps {
  kicker?: string;
  headlineStart?: string;
  headlineAccent?: string;
  headlineEnd?: string;
  subtitle?: string;
}

export function HeroSection({
  kicker = 'Comercio 100% de Sayago · Montevideo',
  headlineStart = 'Todo lo que necesitás,',
  headlineAccent = 'directo a tu casa',
  headlineEnd = 'y a buen precio.',
  subtitle = 'Ropa cómoda, calzado urbano, perfumería y cositas lindas de bazar para el hogar. Todo junto y a buen precio, para todos, sin vueltas ni demoras.',
}: HeroSectionProps) {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = heroSearch.trim();
    if (trimmed) {
      router.push(`/catalogo?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/catalogo');
    }
  };

  return (
    <section className="relative w-full bg-primary-container text-on-primary rounded-b-[2rem] lg:rounded-b-[3.5rem] overflow-hidden shadow-xl">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-primary-fixed/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-gutter lg:px-margin-desktop pt-space-xl pb-space-xl lg:pt-14 lg:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Bloque de Texto Principal y Buscador */}
          <div className="lg:col-span-7 flex flex-col space-y-space-md text-left">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="inline-flex items-center px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 backdrop-blur-md font-label-sm text-label-sm tracking-wide uppercase text-secondary-fixed">
                {kicker}
              </span>
            </div>

            <h1 className="font-display-hero-mobile lg:font-display-hero text-display-hero-mobile lg:text-display-hero tracking-tight text-on-primary">
              {headlineStart}{' '}
              <span className="text-secondary-container">{headlineAccent}</span>{' '}
              {headlineEnd}
            </h1>

            <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* Buscador interactivo en píldora */}
            <div className="pt-space-xs w-full max-w-xl">
              <form
                onSubmit={handleHeroSearch}
                className="relative flex items-center bg-surface-container-lowest rounded-full p-1.5 shadow-lg shadow-primary/25"
              >
                <Search
                  className="w-5 h-5 text-on-surface-variant ml-3 shrink-0"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="¿Qué buscás hoy? Ej. buzo frizado, pantuflas, termo..."
                  aria-label="Buscar productos en la tienda"
                  className="w-full bg-transparent px-3 py-space-xs text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/75 outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:brightness-105 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <span>Buscar</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Prueba Social y WhatsApp */}
            <div className="pt-space-sm flex flex-wrap items-center gap-space-md text-on-primary-container font-label-sm text-label-sm">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold text-label-sm shadow ring-2 ring-primary-container">
                  AC
                </div>
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-label-sm shadow ring-2 ring-primary-container">
                  ML
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-label-sm shadow ring-2 ring-primary-container">
                  VR
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-bold text-label-sm shadow ring-2 ring-primary-container tabular-price">
                  +40
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-on-primary text-[13px] tabular-price">
                    5.0
                  </span>
                  <div className="flex items-center gap-0.5 text-[#FFD700]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-[#FFD700]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <span>Vecinas felices en Sayago y alrededores</span>
              </div>

              <span
                aria-hidden="true"
                className="hidden sm:inline-block w-1 h-1 rounded-full bg-on-primary-container/50"
              />

              <a
                href={buildWhatsAppUrl('Hola MARIFER! Quiero hacer una consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-tertiary-fixed hover:text-white transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" aria-hidden="true" />
                <span className="underline decoration-tertiary-fixed underline-offset-4 group-hover:decoration-white font-label-md text-label-md">
                  Respondemos al toque por WhatsApp
                </span>
              </a>
            </div>
          </div>

          {/* Columna Visual Derecha */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-container-high/20 backdrop-blur-sm p-2.5">
              <ProductImage
                src={HERO_STORE_IMAGE.src}
                alt={HERO_STORE_IMAGE.alt}
                priority
                sizes="(max-width: 1024px) 92vw, 420px"
                className="w-full h-full rounded-[2rem]"
              />

              {/* Sello de marca oficial en esquina superior */}
              <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md rounded-full p-1 shadow-lg border border-secondary-container/40">
                <BrandLogo
                  variant="badge"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Tarjeta flotante inferior */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-space-sm shadow-xl flex items-center justify-between gap-2 text-on-surface">
                <div className="flex items-center gap-space-xs min-w-0">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-[15px] leading-tight text-primary truncate">
                      Atención cálida
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary truncate">
                      Precios accesibles siempre
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shrink-0">
                  Sayago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
