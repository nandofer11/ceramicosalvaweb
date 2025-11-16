import type { Metadata } from "next";
import { Oswald } from 'next/font/google';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import "./globals.css";

// Fuente robusta para títulos de construcción
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Cerámicos Alva | Fabricación y venta de ladrillos de arcilla",
  description: "Empresa Riojana dedicada a la fabricación y venta de ladrillos de arcilla. Ofrecemos pandereta rayas, techo 12, king kong 18 huecos y productos de segunda.",
  keywords: "ladrillos, arcilla, construcción, pandereta, techo 12, king kong, San Martín, Rioja, Perú, materiales de construcción",
  authors: [{ name: "Cerámicos Alva" }],
  creator: "Cerámicos Alva",
  publisher: "Cerámicos Alva",
  robots: "index, follow",
  alternates: {
    canonical: "https://ceramicosalva.com",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://ceramicosalva.com",
    title: "Cerámicos Alva | Fabricación y venta de ladrillos de arcilla",
    description: "Empresa Riojana dedicada a la fabricación y venta de ladrillos de arcilla de alta calidad para el sector construcción.",
    siteName: "Cerámicos Alva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerámicos Alva | Fabricación y venta de ladrillos de arcilla",
    description: "Empresa Riojana dedicada a la fabricación y venta de ladrillos de arcilla de alta calidad para el sector construcción.",
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${oswald.variable}`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
