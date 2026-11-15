'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig, motion } from 'motion/react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const handleExtensionError = (event: ErrorEvent) => {
      const source = event.filename || event.error?.stack || '';
      if (
        typeof source === 'string' &&
        (source.includes('chrome-extension://') ||
          source.includes('moz-extension://'))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('error', handleExtensionError, true);
    return () => {
      window.removeEventListener('error', handleExtensionError, true);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
