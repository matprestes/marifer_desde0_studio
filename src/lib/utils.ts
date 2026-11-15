import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MARIFER_WHATSAPP_NUMBER = '59893374496';
export const MARIFER_PHONE_DISPLAY = '093 374 496';

export function formatPriceUYU(amount: number): string {
  return `$${amount.toLocaleString('es-UY')}`;
}

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${MARIFER_WHATSAPP_NUMBER}`;
  if (!message || !message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
