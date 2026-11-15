import React from 'react';
import Link from 'next/link';
import { MapPin, Smartphone } from 'lucide-react';
import { MARIFER_PHONE_DISPLAY, buildWhatsAppUrl } from '@/lib/utils';
import { BrandLogo } from '@/components/brand-logo';

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg border-t border-outline-variant/25">
      <div className="max-w-7xl mx-auto px-gutter lg:px-margin-desktop grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg text-on-surface-variant font-body-sm text-body-sm">
        <div className="space-y-space-sm">
          <Link href="/" className="inline-block" aria-label="MARIFER Inicio">
            <BrandLogo
              variant="footer-violet"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
            Tu tienda de confianza en Sayago. Atendida con orgullo, variedad para el hogar, regalos prácticos y la calidez de siempre.
          </p>
          <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface pt-space-xs">
            <MapPin className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
            <span>Sayago, Montevideo - Uruguay</span>
          </div>
        </div>

        <div className="space-y-space-sm">
          <h4 className="font-headline-sm text-[16px] leading-[22px] text-on-surface">
            Rubros Disponibles
          </h4>
          <ul className="space-y-space-xs">
            <li>
              <Link
                href="/catalogo?rubro=bazar"
                className="hover:text-primary transition-colors"
              >
                Bazar y Artículos para el Hogar
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo?rubro=indumentaria"
                className="hover:text-primary transition-colors"
              >
                Ropa &amp; Abrigo de Temporada
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo?rubro=calzado"
                className="hover:text-primary transition-colors"
              >
                Calzado Urbano &amp; Pantuflas
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo?rubro=perfumeria"
                className="hover:text-primary transition-colors"
              >
                Perfumería y Cuidado Personal
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo?rubro=infantil"
                className="hover:text-primary transition-colors"
              >
                Infantil y Papelería Escolar
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-space-sm">
          <h4 className="font-headline-sm text-[16px] leading-[22px] text-on-surface">
            Atención y Retiros
          </h4>
          <ul className="space-y-space-xs">
            <li>
              <span className="font-bold text-on-surface">Lunes a Viernes:</span>{' '}
              09:00 a 19:30 hs
            </li>
            <li>
              <span className="font-bold text-on-surface">Sábados:</span>{' '}
              09:30 a 14:00 hs
            </li>
            <li>
              <span className="font-bold text-on-surface">Retiros:</span>{' '}
              Sin costo por nuestro local
            </li>
            <li>
              <span className="font-bold text-on-surface">Envíos en el día:</span>{' '}
              Sayago y zonas vecinas
            </li>
            <li className="pt-space-xs">
              <Link
                href="/como-comprar"
                className="font-label-md text-label-md text-secondary hover:text-primary underline underline-offset-4 transition-colors"
              >
                Ver guía paso a paso
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-space-sm">
          <h4 className="font-headline-sm text-[16px] leading-[22px] text-on-surface">
            Contacto Directo
          </h4>
          <p className="font-body-sm text-body-sm">
            Coordiná tu pedido o consultanos disponibilidad por WhatsApp directo con el mostrador.
          </p>
          <div className="flex flex-col gap-space-xs pt-space-xs">
            <a
              href={buildWhatsAppUrl('Hola MARIFER! Quiero consultar por un pedido.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary hover:text-secondary transition-colors"
            >
              <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>+598 {MARIFER_PHONE_DISPLAY.replace(/^0/, '')}</span>
            </a>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Atención vecinal en mano propia
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-gutter lg:px-margin-desktop mt-space-lg pt-space-md border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
        <span>© 2026 MARIFER Tienda de Barrio. Todos los derechos reservados.</span>
        <span>Sayago, Montevideo · Hecho con orgullo vecinal</span>
      </div>
    </footer>
  );
}
