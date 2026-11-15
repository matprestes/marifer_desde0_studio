'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type BrandLogoVariant =
  | 'header-violet'
  | 'footer-violet'
  | 'white-wordmark'
  | 'white-full'
  | 'badge';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

const LOGO_ASSETS: Record<
  BrandLogoVariant,
  {
    src: string;
    alt: string;
    width: number;
    height: number;
    defaultClass: string;
  }
> = {
  'header-violet': {
    src: '/logos/marifer_horizontal_violeta_solo_marifer.png',
    alt: 'MARIFER — Tienda de Barrio en Sayago',
    width: 1200,
    height: 600,
    defaultClass: 'h-9 sm:h-10 w-auto object-contain',
  },
  'footer-violet': {
    src: '/logos/marifer_horizontal_transparente.png',
    alt: 'MARIFER — Moda para ti',
    width: 1200,
    height: 800,
    defaultClass: 'h-12 w-auto object-contain',
  },
  'white-wordmark': {
    src: '/logos/marifer_horizontal_blanco_solo_marifer.png',
    alt: 'MARIFER',
    width: 1200,
    height: 800,
    defaultClass: 'h-8 sm:h-9 w-auto object-contain',
  },
  'white-full': {
    src: '/logos/marifer_horizontal_blanco_transparente.png',
    alt: 'MARIFER — Moda para ti',
    width: 1200,
    height: 800,
    defaultClass: 'h-12 w-auto object-contain',
  },
  badge: {
    src: '/logos/logo_marifer.jpg',
    alt: 'Emblema oficial MARIFER Sayago',
    width: 1024,
    height: 1024,
    defaultClass: 'w-14 h-14 rounded-full object-cover',
  },
};

export function BrandLogo({
  variant = 'header-violet',
  className,
  priority = false,
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const asset = LOGO_ASSETS[variant];

  if (hasError) {
    return (
      <span
        className={cn(
          'font-headline-sm text-headline-sm tracking-tight leading-none whitespace-nowrap',
          variant.startsWith('white') ? 'text-on-primary' : 'text-primary',
          className
        )}
      >
        MARIFER
      </span>
    );
  }

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={cn(asset.defaultClass, className)}
    />
  );
}
