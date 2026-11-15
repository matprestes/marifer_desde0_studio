'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  CreditCard,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NeighborhoodCtaBanner } from '@/components/neighborhood-cta-banner';

const STEPS = [
  {
    number: '01',
    title: 'Elegí lo que necesitás',
    description:
      'Recorré el catálogo por rubro o usá el buscador. Podés sumar varios productos al bolso o consultar un talle puntual directo.',
    icon: ShoppingBag,
  },
  {
    number: '02',
    title: 'Mandanos tu bolso por WhatsApp',
    description:
      'Con un clic se arma el mensaje con tus artículos, variantes y modalidad elegida. Sin formularios largos ni tarjetas obligatorias.',
    icon: MessageCircle,
  },
  {
    number: '03',
    title: 'Retirás en puerta o te lo llevamos',
    description:
      'Te confirmamos disponibilidad al instante con fotos reales. Retirás sin costo por Sayago o coordinamos envío en el día.',
    icon: Truck,
  },
];

const FAQS = [
  {
    q: '¿Puedo probarme talles o ver fotos reales antes de confirmar?',
    a: '¡Sí, claro! Al escribirnos por WhatsApp te pasamos medidas exactas en centímetros y fotos reales del color o talle que tenemos en el mostrador.',
  },
  {
    q: '¿Tiene costo retirar en el local de Sayago?',
    a: 'No, el retiro en puerta es totalmente gratuito. Una vez que te confirmamos que tu bolso está pronto, pasás en el horario que te quede más cómodo.',
  },
  {
    q: '¿Hasta qué barrios llegan los envíos en el día?',
    a: 'Hacemos entregas rápidas en Sayago, Peñarol, Colón, Prado Norte, Lavalleja y zonas cercanas a Camino Ariel y Millán. Consultanos tu esquina para coordinar.',
  },
  {
    q: '¿Qué medios de pago aceptan?',
    a: 'Podés abonar en efectivo al retirar o recibir, por transferencia bancaria (BROU, Santander, Itaú, Prex / MiDinero) o mediante link / QR de Mercado Pago.',
  },
];

export default function ComoComprarPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col w-full">
      {/* Hero de guía */}
      <section className="bg-primary-container text-on-primary rounded-b-[2rem] lg:rounded-b-[3rem] px-gutter lg:px-margin-desktop py-space-xl shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-2xl">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary-container">
              Atención vecinal simple
            </span>
            <h1 className="font-display-hero-mobile lg:font-display-hero text-display-hero-mobile lg:text-[42px] leading-tight tracking-tight text-on-primary">
              ¿Cómo comprar en MARIFER?
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container">
              Pensamos una compra rápida y de confianza, como hablar directo con el mostrador de tu barrio pero desde el celular.
            </p>
          </div>

          <div className="flex flex-wrap gap-space-sm">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:brightness-105 transition-all"
            >
              <span>Explorar catálogo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pasos */}
      <section className="max-w-7xl w-full mx-auto px-gutter lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm border border-outline-variant/25 flex flex-col justify-between space-y-space-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-extrabold text-[28px] text-outline-variant tabular-price">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary">
                    {step.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-space-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Horarios, Zonas y Medios de Pago */}
      <section className="max-w-7xl w-full mx-auto px-gutter lg:px-margin-desktop py-space-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          <div className="bg-bento-sky rounded-3xl p-space-lg space-y-space-sm">
            <div className="w-10 h-10 rounded-full bg-white/85 text-bento-sky-tag flex items-center justify-center">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-bento-sky-text">
              Horarios de Atención
            </h3>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-bento-sky-muted">
              <li>
                <span className="font-bold">Lunes a Viernes:</span> 09:00 a 19:30 hs
              </li>
              <li>
                <span className="font-bold">Sábados:</span> 09:30 a 14:00 hs
              </li>
              <li>Consultas por WhatsApp respondidas durante toda la jornada.</li>
            </ul>
          </div>

          <div className="bg-bento-mint rounded-3xl p-space-lg space-y-space-sm">
            <div className="w-10 h-10 rounded-full bg-white/85 text-bento-mint-tag flex items-center justify-center">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-bento-mint-text">
              Retiros y Zonas de Envío
            </h3>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-bento-mint-muted">
              <li>
                <span className="font-bold">Retiro en Sayago:</span> Sin costo, coordinando horario.
              </li>
              <li>
                <span className="font-bold">Envíos en el día:</span> Sayago, Peñarol, Colón, Prado Norte y alrededores.
              </li>
            </ul>
          </div>

          <div className="bg-bento-gold rounded-3xl p-space-lg space-y-space-sm">
            <div className="w-10 h-10 rounded-full bg-white/85 text-bento-gold-tag flex items-center justify-center">
              <CreditCard className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-bento-gold-text">
              Medios de Pago
            </h3>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-bento-gold-muted">
              <li>Efectivo al retirar o recibir tu pedido.</li>
              <li>Transferencia bancaria (BROU, Prex, bancos locales).</li>
              <li>Mercado Pago / QR en el local.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="max-w-4xl w-full mx-auto px-gutter lg:px-margin-desktop py-space-xl">
        <div className="text-center mb-space-lg">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">
            Dudas comunes
          </span>
          <h2 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mt-1">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-space-sm">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full px-space-lg py-space-md flex items-center justify-between gap-space-md text-left font-bold text-[16px] text-primary hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-secondary shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-180' : ''
                    )}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <div className="px-space-lg pb-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed border-t border-outline-variant/15 pt-space-sm">
                    {faq.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <NeighborhoodCtaBanner
        title="¿Te quedó alguna consulta sobre cómo comprar?"
        description="Escribinos directo por WhatsApp y te ayudamos a armar tu bolso o confirmar talles disponibles."
        whatsappPrompt="Hola MARIFER! Estuve leyendo cómo comprar y quiero hacer una consulta."
      />
    </div>
  );
}
