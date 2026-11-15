'use client';

import React, { useState } from 'react';
import { Check, MessageCircle, Plus, Star } from 'lucide-react';
import type { Product } from '@/data/catalog';
import { useBag } from '@/context/bag-context';
import { buildWhatsAppUrl, cn, formatPriceUYU } from '@/lib/utils';
import { ProductImage } from '@/components/product-image';

interface ProductCardProps {
  product: Product;
  variant?: 'compact' | 'standard';
  className?: string;
}

export function ProductCard({
  product,
  variant = 'standard',
  className,
}: ProductCardProps) {
  const { addItem } = useBag();
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0] || 'Estándar'
  );
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedVariant);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const whatsappHref = buildWhatsAppUrl(
    `${product.whatsappPrompt} (${product.variantLabel}: ${selectedVariant})`
  );

  if (variant === 'compact') {
    return (
      <article
        className={cn(
          'bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-outline-variant/20',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            sizes="80px"
            className="w-20 h-20 rounded-xl shrink-0"
            imageClassName="group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-label text-[11px] text-secondary font-bold uppercase tracking-wide truncate">
              {product.categoryLabel}
            </span>
            <h3 className="font-bold text-[16px] leading-tight text-primary truncate mt-0.5">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Star
                className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800] shrink-0"
                aria-hidden="true"
              />
              <span className="font-label text-[11px] text-on-surface-variant font-bold tabular-price truncate">
                {product.rating.toFixed(1)} ({product.purchasesCount} compras)
              </span>
            </div>
            <div className="font-extrabold text-[20px] leading-tight text-primary mt-1 tabular-price">
              {formatPriceUYU(product.price)}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              'flex-1 min-h-[40px] py-2 px-3 rounded-full font-label text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer',
              justAdded
                ? 'bg-tertiary-container text-tertiary-fixed'
                : 'bg-surface-container-low hover:bg-secondary-fixed text-primary'
            )}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>En tu bolso</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Sumar al bolso</span>
              </>
            )}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por WhatsApp sobre ${product.name}`}
            title={product.ctaLabel || 'Consultar por WhatsApp'}
            className="w-10 h-10 rounded-full bg-whatsapp/12 text-[#128C7E] hover:bg-whatsapp hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </article>
    );
  }

  const badgeToneClass =
    product.badgeTone === 'mint'
      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
      : product.badgeTone === 'violet'
        ? 'bg-primary-container text-on-primary'
        : product.badgeTone === 'peach'
          ? 'bg-secondary-fixed text-on-secondary-fixed'
          : 'bg-secondary-container text-on-secondary-fixed';

  return (
    <article
      className={cn(
        'bg-surface-container-lowest rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group border border-outline-variant/20',
        className
      )}
    >
      <div>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-low mb-3.5">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
            className="w-full h-full"
            imageClassName="group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge ? (
            <span
              className={cn(
                'absolute top-3 left-3 px-3 py-1 rounded-full font-label text-[11px] font-bold shadow-sm',
                badgeToneClass
              )}
            >
              {product.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center justify-between gap-2 text-[11px] text-on-surface-variant font-label">
            <span className="uppercase tracking-wider font-semibold truncate">
              {product.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 font-bold tabular-price shrink-0">
              <Star
                className="w-3 h-3 text-[#FFB800] fill-[#FFB800]"
                aria-hidden="true"
              />
              {product.rating.toFixed(1)}
            </span>
          </div>

          <h3 className="font-bold text-[19px] leading-snug text-primary group-hover:text-secondary transition-colors mt-1 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[13px] leading-[18px] text-on-surface-variant mt-1.5 line-clamp-2 min-h-[36px]">
            {product.description}
          </p>

          {product.variants.length > 0 ? (
            <div className="mt-3">
              <label
                htmlFor={`variant-${product.id}`}
                className="sr-only"
              >
                {product.variantLabel}
              </label>
              <select
                id={`variant-${product.id}`}
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full rounded-xl bg-surface-container-low border border-outline-variant/40 px-3 py-2 text-[12px] font-label font-semibold text-primary outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {product.variants.map((opt) => (
                  <option key={opt} value={opt}>
                    {product.variantLabel}: {opt}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-outline-variant/20 flex items-center justify-between gap-2.5">
        <div className="flex flex-col">
          {product.oldPrice ? (
            <span className="font-label text-[11px] text-on-surface-variant line-through tabular-price">
              {formatPriceUYU(product.oldPrice)}
            </span>
          ) : product.priceLabel ? (
            <span className="font-label text-[11px] text-on-surface-variant">
              {product.priceLabel}
            </span>
          ) : (
            <span className="font-label text-[11px] text-on-surface-variant">
              Precio Sayago
            </span>
          )}
          <span className="text-[23px] leading-none text-primary font-extrabold tabular-price">
            {formatPriceUYU(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              'min-h-[42px] px-3.5 py-2 rounded-full font-label text-[12px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm',
              justAdded
                ? 'bg-tertiary-container text-tertiary-fixed'
                : 'bg-primary text-on-primary hover:bg-primary-container active:scale-95'
            )}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Al bolso</span>
              </>
            )}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pedir ${product.name} por WhatsApp`}
            title="Consultar directo por WhatsApp"
            className="w-10 h-10 rounded-full bg-whatsapp text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-md shadow-whatsapp/30 transition-all shrink-0"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
