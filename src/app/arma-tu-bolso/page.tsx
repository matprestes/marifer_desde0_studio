'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
} from 'lucide-react';
import { PRODUCTS } from '@/data/catalog';
import {
  useBag,
  type DeliveryMode,
  type PaymentMethod,
} from '@/context/bag-context';
import { cn, formatPriceUYU } from '@/lib/utils';
import { ProductImage } from '@/components/product-image';

export default function ArmaTuBolsoPage() {
  const {
    items,
    preferences,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    updateItemVariant,
    updateItemNote,
    removeItem,
    clearBag,
    setPreferences,
    getProductForItem,
    buildOrderMessage,
    getOrderWhatsAppUrl,
  } = useBag();

  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderMessage());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const suggestedProducts = PRODUCTS.filter(
    (p) => !items.some((i) => i.productId === p.id)
  ).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Encabezado */}
      <section className="bg-primary-container text-on-primary rounded-b-[2rem] lg:rounded-b-[3rem] px-4 lg:px-10 py-10 lg:py-12 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-label text-[12px] uppercase tracking-widest font-bold text-secondary-container">
              Pedido directo · Sin comisiones
            </span>
            <h1 className="font-extrabold text-[30px] lg:text-[40px] leading-tight tracking-tight text-on-primary">
              Armá tu Bolso y coordinalo al toque
            </h1>
            <p className="text-[15px] lg:text-[16px] text-on-primary-container">
              Revisá tus artículos, elegí retiro sin costo en Sayago o envío en el día y mandanos tu pedido armado directo por WhatsApp.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/12 hover:bg-white/20 text-on-primary font-label text-[13px] font-bold transition-colors self-start md:self-auto"
          >
            <span>Seguir viendo productos</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Contenido principal en 2 columnas */}
      <section className="max-w-7xl w-full mx-auto px-4 lg:px-10 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Ítems del bolso + Sugeridos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-sm border border-outline-variant/25">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-outline-variant/25">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h2 className="font-bold text-[20px] text-primary">
                    Artículos en tu bolso ({totalItems})
                  </h2>
                </div>

                {items.length > 0 ? (
                  <button
                    type="button"
                    onClick={clearBag}
                    className="font-label text-[12px] font-bold text-error hover:underline cursor-pointer"
                  >
                    Vaciar bolso
                  </button>
                ) : null}
              </div>

              {items.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-secondary-fixed/60 text-secondary flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[19px] text-primary">
                    Todavía no sumaste artículos
                  </h3>
                  <p className="text-[14px] text-on-surface-variant max-w-md mx-auto">
                    Podés elegir cualquiera de los recomendados acá abajo o recorrer todo el catálogo de MARIFER.
                  </p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-[13px] font-bold hover:bg-primary-container transition-colors mt-2"
                  >
                    <span>Ir al catálogo</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-outline-variant/20">
                  {items.map((item) => {
                    const product = getProductForItem(item.productId);
                    return (
                      <div
                        key={item.key}
                        className="py-4 first:pt-4 last:pb-1 flex flex-col sm:flex-row gap-4"
                      >
                        {product ? (
                          <ProductImage
                            src={product.image}
                            alt={product.imageAlt}
                            sizes="96px"
                            className="w-24 h-24 rounded-2xl shrink-0"
                          />
                        ) : null}

                        <div className="flex-1 min-w-0 space-y-2.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span className="font-label text-[11px] text-secondary font-bold uppercase tracking-wide">
                                {item.categoryLabel}
                              </span>
                              <h3 className="font-bold text-[17px] text-primary leading-snug">
                                {item.name}
                              </h3>
                            </div>
                            <span className="font-extrabold text-[18px] text-primary tabular-price shrink-0">
                              {formatPriceUYU(item.price * item.quantity)}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {product && product.variants.length > 0 ? (
                              <div>
                                <label
                                  htmlFor={`bag-var-${item.key}`}
                                  className="sr-only"
                                >
                                  Cambiar {product.variantLabel}
                                </label>
                                <select
                                  id={`bag-var-${item.key}`}
                                  value={item.variant}
                                  onChange={(e) =>
                                    updateItemVariant(item.key, e.target.value)
                                  }
                                  className="w-full rounded-xl bg-surface-container-low border border-outline-variant/40 px-3 py-2 text-[12px] font-label font-semibold text-primary outline-none focus:border-primary cursor-pointer"
                                >
                                  {product.variants.map((v) => (
                                    <option key={v} value={v}>
                                      {product.variantLabel}: {v}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}

                            <input
                              type="text"
                              value={item.note || ''}
                              onChange={(e) =>
                                updateItemNote(item.key, e.target.value)
                              }
                              placeholder="Nota opcional (ej. color preferido)"
                              aria-label={`Nota para ${item.name}`}
                              className="w-full rounded-xl bg-surface-container-low border border-outline-variant/40 px-3 py-2 text-[12px] text-on-surface placeholder:text-on-surface-variant/70 outline-none focus:border-primary"
                            />
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, -1)}
                                aria-label={`Restar unidad de ${item.name}`}
                                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-7 text-center font-label text-[14px] font-bold tabular-price">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, 1)}
                                aria-label={`Sumar unidad de ${item.name}`}
                                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                              <span className="font-label text-[11px] text-on-surface-variant ml-1 tabular-price">
                                ({formatPriceUYU(item.price)} c/u)
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              className="inline-flex items-center gap-1 font-label text-[12px] font-semibold text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Quitar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sugeridos para sumar rápido */}
            {suggestedProducts.length > 0 ? (
              <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-sm border border-outline-variant/25 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-[18px] text-primary">
                    Sumá algo más para aprovechar
                  </h2>
                  <Link
                    href="/catalogo"
                    className="font-label text-[12px] font-bold text-secondary hover:text-primary"
                  >
                    Ver todos
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20"
                    >
                      <ProductImage
                        src={product.image}
                        alt={product.imageAlt}
                        sizes="56px"
                        className="w-14 h-14 rounded-xl shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[14px] text-primary truncate">
                          {product.name}
                        </h3>
                        <span className="font-extrabold text-[15px] text-secondary tabular-price">
                          {formatPriceUYU(product.price)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItem(product)}
                        aria-label={`Agregar ${product.name} al bolso`}
                        className="w-9 h-9 rounded-full bg-primary text-on-primary hover:bg-primary-container flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Columna Derecha: Datos de entrega y envío WhatsApp */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-sm border border-outline-variant/25 space-y-5">
              <h2 className="font-bold text-[20px] text-primary">
                Coordiná tu entrega
              </h2>

              {/* Modalidad */}
              <div className="space-y-2">
                <span className="block font-label text-[12px] font-bold text-on-surface-variant uppercase tracking-wide">
                  ¿Cómo lo querés recibir?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(
                    [
                      {
                        id: 'retiro' as DeliveryMode,
                        title: 'Retiro en puerta',
                        sub: 'Sayago · Sin costo',
                        icon: Store,
                      },
                      {
                        id: 'envio' as DeliveryMode,
                        title: 'Envío en el día',
                        sub: 'Sayago y alrededores',
                        icon: Truck,
                      },
                    ] as const
                  ).map((option) => {
                    const Icon = option.icon;
                    const active = preferences.mode === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setPreferences((prev) => ({ ...prev, mode: option.id }))
                        }
                        className={cn(
                          'p-3.5 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer',
                          active
                            ? 'bg-primary-container text-on-primary border-primary-container shadow-sm'
                            : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:border-primary/40'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-4 h-4 mt-0.5 shrink-0',
                            active ? 'text-secondary-container' : 'text-secondary'
                          )}
                          aria-hidden="true"
                        />
                        <div>
                          <div className="font-label text-[13px] font-bold leading-tight">
                            {option.title}
                          </div>
                          <div
                            className={cn(
                              'font-label text-[11px] mt-0.5',
                              active
                                ? 'text-on-primary-container'
                                : 'text-on-surface-variant'
                            )}
                          >
                            {option.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Datos del cliente */}
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block font-label text-[12px] font-bold text-primary mb-1"
                  >
                    Tu nombre
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={preferences.customerName}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    placeholder="Ej. Andrea, Laura..."
                    className="w-full rounded-xl bg-surface-container-low border border-outline-variant/40 px-3.5 py-2.5 text-[14px] text-on-surface placeholder:text-on-surface-variant/70 outline-none focus:border-primary"
                  />
                </div>

                {preferences.mode === 'envio' ? (
                  <div>
                    <label
                      htmlFor="customer-address"
                      className="block font-label text-[12px] font-bold text-primary mb-1"
                    >
                      Dirección o esquina en Sayago / zona
                    </label>
                    <div className="relative">
                      <MapPin
                        className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="customer-address"
                        type="text"
                        value={preferences.address}
                        onChange={(e) =>
                          setPreferences((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Ej. Ariel esq. Camino Sayago"
                        className="w-full rounded-xl bg-surface-container-low border border-outline-variant/40 pl-10 pr-3.5 py-2.5 text-[14px] text-on-surface placeholder:text-on-surface-variant/70 outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <span className="block font-label text-[12px] font-bold text-primary mb-1.5">
                    ¿Cómo preferís abonar?
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'efectivo' as PaymentMethod, label: 'Efectivo' },
                        { id: 'transferencia' as PaymentMethod, label: 'Transferencia' },
                        { id: 'mercadopago' as PaymentMethod, label: 'Mercado Pago' },
                      ] as const
                    ).map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() =>
                          setPreferences((prev) => ({ ...prev, payment: pm.id }))
                        }
                        className={cn(
                          'py-2 px-2 rounded-xl font-label text-[11px] font-bold border transition-colors cursor-pointer text-center',
                          preferences.payment === pm.id
                            ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary/40'
                            : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:text-primary'
                        )}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="extra-notes"
                    className="block font-label text-[12px] font-bold text-primary mb-1"
                  >
                    Horario o aclaración (opcional)
                  </label>
                  <textarea
                    id="extra-notes"
                    rows={2}
                    value={preferences.extraNotes}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        extraNotes: e.target.value,
                      }))
                    }
                    placeholder="Ej. Paso después de las 17 hs / Si tenés en otro color avisame..."
                    className="w-full rounded-xl bg-surface-container-low border border-outline-variant/40 px-3.5 py-2.5 text-[14px] text-on-surface placeholder:text-on-surface-variant/70 outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Resumen de totales y acciones */}
              <div className="pt-4 border-t border-outline-variant/25 space-y-3">
                <div className="flex items-center justify-between text-[14px] text-on-surface-variant">
                  <span>Cantidad de artículos</span>
                  <span className="font-bold text-primary tabular-price">
                    {totalItems}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[16px] text-primary">
                    Total estimado
                  </span>
                  <span className="font-extrabold text-[26px] text-primary tabular-price">
                    {formatPriceUYU(subtotal)}
                  </span>
                </div>

                <a
                  href={getOrderWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] px-6 py-3.5 rounded-full bg-whatsapp text-white font-bold text-[15px] shadow-lg shadow-whatsapp/30 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Enviar pedido por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full min-h-[42px] px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary font-label text-[13px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#006D38]" aria-hidden="true" />
                      <span>Resumen copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Copiar texto del pedido</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
