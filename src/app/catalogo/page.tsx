'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowUpDown,
  MessageCircle,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { PRODUCTS, RUBROS, type RubroId } from '@/data/catalog';
import { buildWhatsAppUrl, cn } from '@/lib/utils';
import { ProductCard } from '@/components/product-card';

type SortOption = 'featured' | 'price-asc' | 'price-desc';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawRubro = searchParams.get('rubro') as RubroId | null;
  const activeRubro: RubroId =
    rawRubro && RUBROS.some((r) => r.id === rawRubro) ? rawRubro : 'todos';
  const searchText = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const updateUrlParams = (nextRubro: RubroId, nextQuery: string) => {
    const params = new URLSearchParams();
    if (nextRubro !== 'todos') params.set('rubro', nextRubro);
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    const qs = params.toString();
    router.replace(qs ? `/catalogo?${qs}` : '/catalogo', { scroll: false });
  };

  const handleSelectRubro = (rubro: RubroId) => {
    updateUrlParams(rubro, searchText);
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams();
    if (activeRubro !== 'todos') params.set('rubro', activeRubro);
    if (value) params.set('q', value);
    const qs = params.toString();
    router.replace(qs ? `/catalogo?${qs}` : '/catalogo', { scroll: false });
  };

  const handleClearFilters = () => {
    setSortBy('featured');
    router.replace('/catalogo', { scroll: false });
  };

  const query = searchText.trim().toLowerCase();
  const matchedProducts = PRODUCTS.filter((product) => {
    const matchesRubro =
      activeRubro === 'todos' || product.category === activeRubro;
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query);

    return matchesRubro && matchesQuery;
  });

  const filteredProducts =
    sortBy === 'price-asc'
      ? [...matchedProducts].sort((a, b) => a.price - b.price)
      : sortBy === 'price-desc'
        ? [...matchedProducts].sort((a, b) => b.price - a.price)
        : matchedProducts;

  return (
    <div className="flex flex-col w-full">
      {/* Encabezado compacto del catálogo */}
      <section className="bg-primary-container text-on-primary rounded-b-[2rem] lg:rounded-b-[3rem] px-4 lg:px-10 py-10 lg:py-12 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-label text-[12px] uppercase tracking-widest font-bold text-secondary-container">
              Catálogo completo · Sayago
            </span>
            <h1 className="font-extrabold text-[30px] lg:text-[40px] leading-tight tracking-tight text-on-primary">
              Todo lo que tenemos hoy en el local
            </h1>
            <p className="text-[15px] lg:text-[16px] text-on-primary-container">
              Filtrá por rubro, elegí tu talle o variante y sumalo directo a tu bolso para coordinar retiro sin costo o envío en el día.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl('Hola MARIFER! Estoy viendo el catálogo web y tengo una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-whatsapp text-white font-label text-[13px] font-bold shadow-lg shadow-whatsapp/30 hover:brightness-105 transition-all self-start md:self-auto shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>¿No encontrás algo? Preguntanos</span>
          </a>
        </div>
      </section>

      {/* Controles de filtro y búsqueda */}
      <section className="max-w-7xl w-full mx-auto px-4 lg:px-10 pt-8 pb-4">
        <div className="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 shadow-sm border border-outline-variant/25 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Buscador en catálogo */}
            <div className="relative flex-1 max-w-xl">
              <Search
                className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Filtrar por nombre, termo, calza, pantuflas..."
                aria-label="Filtrar catálogo por texto"
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant text-[14px] outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchText ? (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            {/* Orden y contador */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
              <span className="font-label text-[12px] text-on-surface-variant font-semibold tabular-price">
                Mostrando {filteredProducts.length} de {PRODUCTS.length} artículos
              </span>

              <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-3 py-1.5 border border-outline-variant/30">
                <ArrowUpDown className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <label htmlFor="sort-catalog" className="sr-only">
                  Ordenar productos
                </label>
                <select
                  id="sort-catalog"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-[12px] font-label font-bold text-primary outline-none cursor-pointer"
                >
                  <option value="featured">Destacados primero</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones de rubro */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="inline-flex items-center gap-1 font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              Rubros:
            </span>
            {RUBROS.map((rubro) => {
              const isActive = activeRubro === rubro.id;
              return (
                <button
                  key={rubro.id}
                  type="button"
                  onClick={() => handleSelectRubro(rubro.id)}
                  className={cn(
                    'px-4 py-2 rounded-full font-label text-[12px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-secondary-fixed hover:text-primary'
                  )}
                >
                  {rubro.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grilla de productos */}
      <section className="max-w-7xl w-full mx-auto px-4 lg:px-10 py-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-3xl p-10 text-center border border-outline-variant/25 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed/60 text-secondary flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="font-bold text-[22px] text-primary">
              No encontramos artículos con esa búsqueda
            </h2>
            <p className="text-[15px] text-on-surface-variant mt-1.5 max-w-md">
              Muchas veces tenemos stock recién llegado en el mostrador de Sayago antes de subirlo a la web.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-[13px] font-bold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Ver todo el catálogo
              </button>
              <a
                href={buildWhatsAppUrl(
                  `Hola MARIFER! Estoy buscando "${searchText || 'un artículo'}" y no lo vi en la web. ¿Tienen disponible?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp text-white font-label text-[13px] font-bold hover:brightness-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="standard"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 text-center text-on-surface-variant font-label text-[14px]">
          Cargando catálogo de MARIFER...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
