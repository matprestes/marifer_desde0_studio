import type { Metadata } from 'next';
import { Nunito_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { BagProvider } from '@/context/bag-context';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BagDrawer } from '@/components/bag-drawer';
import { PageTransition } from '@/components/page-transition';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MARIFER — Tienda de Barrio | Sayago',
  description:
    'Almacén, indumentaria, calzado, perfumería y bazar vecinal en Sayago, Montevideo. Armá tu bolso y coordiná tu pedido directo por WhatsApp.',
  openGraph: {
    title: 'MARIFER — Tienda de Barrio | Sayago',
    description:
      'Almacén, indumentaria, calzado, perfumería y bazar vecinal en Sayago, Montevideo. Armá tu bolso y coordiná tu pedido directo por WhatsApp.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MARIFER — Tienda de Barrio | Sayago',
    description:
      'Almacén, indumentaria, calzado, perfumería y bazar vecinal en Sayago, Montevideo. Armá tu bolso y coordiná tu pedido directo por WhatsApp.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${nunitoSans.variable} ${plusJakartaSans.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-background text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-fixed"
      >
        <BagProvider>
          <SiteHeader />
          <main className="w-full pt-16 md:pt-28 bg-background min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
