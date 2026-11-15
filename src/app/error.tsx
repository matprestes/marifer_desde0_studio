'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-gutter py-space-xl text-center space-y-space-md">
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
        Algo salió mal al cargar esta sección
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant">
        Podés intentar recargar la vista o volver al inicio de MARIFER.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>Reintentar</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-space-lg py-space-sm rounded-full bg-surface-container-low hover:bg-secondary-fixed text-primary font-label-md text-label-md transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
