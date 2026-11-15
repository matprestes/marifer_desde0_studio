import React from 'react';
import { CheckCircle2, Headset, MessageCircle } from 'lucide-react';
import { MARIFER_PHONE_DISPLAY, buildWhatsAppUrl } from '@/lib/utils';
import { BrandLogo } from '@/components/brand-logo';

interface NeighborhoodCtaBannerProps {
  title?: string;
  description?: string;
  whatsappPrompt?: string;
}

export function NeighborhoodCtaBanner({
  title = '¿Buscás un talle específico o un artículo para tu casa?',
  description = 'Mandanos una foto o contanos lo que necesitás. Te mandamos fotos reales de lo disponible al instante sin compromiso.',
  whatsappPrompt = 'Hola MARIFER! Quiero consultar disponibilidad.',
}: NeighborhoodCtaBannerProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-gutter lg:px-margin-desktop py-space-xl">
      <div className="relative bg-primary-container text-on-primary rounded-[2.5rem] p-space-lg lg:p-space-xl overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div className="lg:col-span-8 flex flex-col space-y-space-sm text-left">
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-white/10 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm font-bold">
                <Headset className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Atención Personalizada en Mano Propia</span>
              </div>
              <BrandLogo
                variant="white-wordmark"
                className="h-6 sm:h-7 w-auto object-contain opacity-90"
              />
            </div>

            <h2 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-primary tracking-tight">
              {title}
            </h2>

            <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="pt-space-xs flex flex-wrap items-center gap-space-md text-on-primary-container font-label-md text-label-md">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed shrink-0" aria-hidden="true" />
                <span>Sin esperas de correo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed shrink-0" aria-hidden="true" />
                <span>Retiro en puerta sin costo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed shrink-0" aria-hidden="true" />
                <span>Envío en el día en Sayago</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <a
              href={buildWhatsAppUrl(whatsappPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-space-sm px-space-xl py-4 rounded-full bg-whatsapp text-white font-headline-sm text-[18px] leading-tight shadow-xl shadow-whatsapp/35 hover:brightness-105 active:scale-95 transition-all text-center"
            >
              <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>Escribinos al {MARIFER_PHONE_DISPLAY}</span>
            </a>
            <span className="text-on-primary-container font-label-sm text-label-sm mt-3 self-start lg:self-end">
              Atendido por Marifer · Sayago, Montevideo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
