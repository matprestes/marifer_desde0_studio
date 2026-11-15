'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Store,
  X,
} from 'lucide-react';
import { useBag } from '@/context/bag-context';
import {
  MARIFER_PHONE_DISPLAY,
  buildWhatsAppUrl,
  cn,
} from '@/lib/utils';
import { BrandLogo } from '@/components/brand-logo';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/arma-tu-bolso', label: 'Armá tu Bolso' },
  { href: '/como-comprar', label: '¿Cómo Comprar?' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openDrawer, lastAddedName } = useBag();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setMobileMenuOpen(false);
    if (trimmed) {
      router.push(`/catalogo?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/catalogo');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/92 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      {/* Franja superior informativa (desktop/tablet) */}
      <div className="hidden md:block w-full bg-primary text-on-primary py-space-xs px-gutter">
        <div className="max-w-7xl mx-auto px-0 lg:px-space-lg flex items-center justify-between font-label-sm text-label-sm">
          <div className="flex items-center gap-space-xs">
            <Store className="w-3.5 h-3.5 text-tertiary-fixed shrink-0" aria-hidden="true" />
            <span>Sayago, Montevideo · Retiro en puerta sin costo</span>
          </div>
          <a
            href={buildWhatsAppUrl('Hola MARIFER! Tengo una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-space-xs hover:text-tertiary-fixed transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-tertiary-fixed shrink-0" aria-hidden="true" />
            <span>Consultas al {MARIFER_PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-gutter lg:px-margin-desktop flex items-center justify-between gap-space-md">
        <Link
          href="/"
          aria-label="MARIFER Inicio"
          className="flex items-center shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <BrandLogo
            variant="header-violet"
            priority
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </Link>

        {/* Buscador en escritorio */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex flex-1 max-w-sm xl:max-w-md mx-space-sm"
        >
          <div className="relative w-full">
            <Search
              className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar bazar, buzos, calzado..."
              aria-label="Buscar productos en MARIFER"
              className="w-full pl-10 pr-4 py-space-xs rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
            />
          </div>
        </form>

        {/* Navegación principal */}
        <nav
          aria-label="Navegación principal"
          className="hidden xl:flex items-center gap-space-xs"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'px-space-md py-space-xs rounded-full font-label-md text-label-md transition-colors whitespace-nowrap shrink-0',
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Acciones: WhatsApp + Bolso + Menú móvil */}
        <div className="flex items-center gap-space-xs shrink-0">
          <a
            href={buildWhatsAppUrl('Hola MARIFER! Quisiera hacer una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-xs min-h-[40px] rounded-full bg-whatsapp text-white shadow-[0_6px_20px_0_rgba(37,211,102,0.3)] hover:brightness-105 transition-all font-label-md text-label-md whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Pedir por WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Abrir tu bolso (${totalItems} artículos)`}
            className="relative min-h-[40px] px-3 py-space-xs rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center gap-1.5 font-label-md text-label-md cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Bolso</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[11px] font-extrabold tabular-price">
              {totalItems}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Confirmación sutil al sumar al bolso */}
      <AnimatePresence>
        {lastAddedName ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="bg-tertiary-container text-tertiary-fixed px-gutter py-1.5 text-center font-label-md text-label-md"
          >
            Agregaste &ldquo;{lastAddedName}&rdquo; a tu bolso ·{' '}
            <button
              type="button"
              onClick={openDrawer}
              className="underline underline-offset-2 text-white cursor-pointer"
            >
              Ver bolso ({totalItems})
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Menú móvil / tablet */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="xl:hidden border-t border-outline-variant/30 bg-surface-container-lowest shadow-xl px-gutter py-space-md space-y-space-sm"
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search
                className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md outline-none"
              />
            </form>

            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
              {NAV_LINKS.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'px-space-md py-3 rounded-2xl font-label-md text-label-md transition-colors',
                      isActive
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-secondary-fixed/50'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={buildWhatsAppUrl('Hola MARIFER! Quisiera hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden w-full py-3 px-space-md rounded-full bg-whatsapp text-white font-label-md text-label-md flex items-center justify-center gap-space-xs"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Escribir por WhatsApp ({MARIFER_PHONE_DISPLAY})</span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
