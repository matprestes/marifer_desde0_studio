'use client';

import React, { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center bg-gradient-to-br from-surface-container-low via-secondary-fixed/30 to-primary-fixed/30 text-primary p-4 text-center',
          className
        )}
      >
        <ShoppingBag className="w-7 h-7 text-secondary mb-1.5" aria-hidden="true" />
        <span className="font-label text-[11px] font-semibold text-on-surface-variant line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-surface-container-low', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
