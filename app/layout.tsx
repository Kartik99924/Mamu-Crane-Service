import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

import { BUSINESS, SITE_URL } from '@/lib/constants';
import { localBusinessSchema, organizationSchema, schemaGraph, webSiteSchema } from '@/lib/schema';
import { OG_IMAGE } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { CraneLine, ScrollProgress } from '@/components/motion/CraneLine';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Crane Service in Pipli, Kurukshetra | Crane & Hydra Crane on Rent',
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    'Crane services and cranes on rent in Pipli, Kurukshetra and nearby areas of Haryana, including hydra cranes on hire, supplied with an operator.',
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: 'Crane Rental Service',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: BUSINESS.name,
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Crane Service in Pipli, Kurukshetra | Mamu Crane Service',
    description:
      'Crane services, crane rental and hydra cranes on hire in Pipli, Kurukshetra and nearby areas of Haryana.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crane Service in Pipli, Kurukshetra | Mamu Crane Service',
    description:
      'Crane services, crane rental and hydra cranes on hire in Pipli, Kurukshetra and nearby areas of Haryana.',
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: '#070809',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink">
        {/* Site-wide entities. Page-level schema (Service, FAQ, Breadcrumb) is
            emitted by each route so every node stays scoped to its page. */}
        <JsonLd data={schemaGraph(organizationSchema(), localBusinessSchema(), webSiteSchema())} />

        <ScrollProgress />
        <CraneLine />
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        {/* Clears the fixed mobile action bar so it never covers footer links. */}
        <div aria-hidden="true" className="h-[62px] lg:hidden" />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
