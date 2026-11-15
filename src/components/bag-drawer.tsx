'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useBag } from '@/context/bag-context';
import { formatPriceUYU } from '@/lib/utils';
import { ProductImage } from '@/components/product-image';

export function BagDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    totalItems,
    subtotal,
    updateQuantity,
    removeItem,
    getProductForItem,
    getOrderWhatsAppUrl,
  } = useBag();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-primary/45 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Tu bolso de MARIFER"
            className="relative z-10 w-full max-w-md bg-surface h-full shadow-2xl flex flex-col border-l border-outline-variant/30"
          >
            <div className="px-5 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-[18px] leading-tight text-primary">
                    Tu Bolso
                  </h2>
                  <p className="font-label text-[12px] text-on-surface-variant tabular-price">
                    {totalItems === 0
                      ? 'Todavía no agregaste artículos'
                      : `${totalItems} ${totalItems === 1 ? 'artículo elegido' : 'artículos elegidos'}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Cerrar bolso"
                className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-secondary-fixed/60 text-secondary flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[18px] text-primary">
                    Tu bolso está vacío
                  </h3>
                  <p className="text-[14px] text-on-surface-variant mt-1.5 max-w-xs leading-relaxed">
                    Sumá buzos, calzado, perfumería o cositas de bazar y coordiná retiro sin costo en Sayago.
                  </p>
                  <Link
                    href="/catalogo"
                    onClick={closeDrawer}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-[13px] font-bold hover:bg-primary-container transition-colors"
                  >
                    <span>Explorar catálogo</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const product = getProductForItem(item.productId);
                  return (
                    <div
                      key={item.key}
                      className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/25 shadow-xs flex items-center gap-3"
                    >
                      {product ? (
                        <ProductImage
                          src={product.image}
                          alt={product.imageAlt}
                          sizes="64px"
                          className="w-16 h-16 rounded-xl shrink-0"
                        />
                      ) : null}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[15px] text-primary truncate">
                          {item.name}
                        </h3>
                        <p className="font-label text-[12px] text-on-surface-variant truncate">
                          {item.variant}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className="font-extrabold text-[15px] text-primary tabular-price">
                            {formatPriceUYU(item.price * item.quantity)}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.key, -1)}
                              aria-label={`Quitar una unidad de ${item.name}`}
                              className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-6 text-center font-label text-[13px] font-bold tabular-price">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.key, 1)}
                              aria-label={`Agregar una unidad de ${item.name}`}
                              className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              aria-label={`Eliminar ${item.name} del bolso`}
                              className="w-8 h-8 rounded-full text-on-surface-variant hover:text-error hover:bg-error-container/50 flex items-center justify-center transition-colors ml-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 ? (
              <div className="p-5 border-t border-outline-variant/30 bg-surface-container-lowest space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-on-surface-variant font-medium">
                    Subtotal estimado
                  </span>
                  <span className="text-[22px] font-extrabold text-primary tabular-price">
                    {formatPriceUYU(subtotal)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={getOrderWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[46px] px-5 py-3 rounded-full bg-whatsapp text-white font-label text-[14px] font-bold shadow-lg shadow-whatsapp/30 hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Enviar pedido por WhatsApp</span>
                  </a>
                  <Link
                    href="/arma-tu-bolso"
                    onClick={closeDrawer}
                    className="w-full min-h-[42px] px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary font-label text-[13px] font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Personalizar retiro / envío</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
