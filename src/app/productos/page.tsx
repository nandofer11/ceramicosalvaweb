"use client";

import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import StripeBar from '@/components/ui/StripeBar';
import { motion } from 'framer-motion';
import { productCategories, products } from '@/lib/products';
import QualityCard from '@/components/ui/QualityCard';

const beneficios = [
  {
    title: 'Resistencia',
    description:
      'Nuestros ladrillos son resistentes a la compresión, garantizando la seguridad estructural de su construcción.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: 'Durabilidad',
    description:
      'Son resistentes al paso del tiempo, manteniendo sus propiedades estructurales durante décadas sin deterioro significativo.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Económicamente eficientes',
    description:
      'Ofrecen una excelente relación calidad-precio, reduciendo los costos de construcción a largo plazo y minimizando gastos.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
];

const galeria = [
  { src: '/images/hero-background.png', alt: 'Envío de King Kong', big: true },
  { src: '/images/hero-background2.JPG', alt: 'Fábrica', big: false },
  { src: '/images/slider2.png', alt: 'Trailer con King Kong', big: false },
  { src: '/images/fachada.jpg', alt: 'Fachada de fábrica', big: false },
  { src: '/images/trailer.png', alt: 'Trailer', big: false },
  { src: '/images/bg-hero.png', alt: 'Horno Pandereta', big: true },
];

export default function ProductosPage() {
  return (
    <MainLayout>
      <PageHero
        kicker="Construcciones económicas"
        title={
          <>
            Ladrillos de <span className="text-primary">Primera</span> y{' '}
            <span className="text-white/60">Segunda</span>
          </>
        }
        description="Nos adaptamos a tu obra. Producimos ladrillos de primera, segunda."
        image="/images/slider2.png"
        
      />

      {/* ============ CATÁLOGO ============ */}
      <section id="catalogo" className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:gap-20">
            {productCategories.map((category, catIndex) => (
              <section key={category.id} id={category.id}>
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-display text-4xl font-bold text-primary/30">
                    0{catIndex + 1}
                  </span>
                  <div>
                    <h2 className="font-display uppercase text-3xl md:text-4xl font-bold text-ink leading-none">
                      {category.label}
                    </h2>
                    <div className="h-1 bg-primary w-16 mt-3" aria-hidden />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {category.productIds.map((productId, index) => {
                    const product = products.find((item) => item.id === productId);
                    if (!product) return null;

                    return (
                      <motion.article
                        key={product.id}
                        id={product.id}
                        className="group relative flex flex-col bg-white border border-concrete-200 hover:border-primary/70 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <span className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden />
                        <div className="relative bg-concrete-100 p-8 h-56 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col gap-4 p-6 border-t border-concrete-200">
                          <h3 className="font-display uppercase text-2xl font-semibold text-ink leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-concrete-600 leading-relaxed">{product.description}</p>
                          <Link
                            href={`/productos/${product.id}`}
                            className="inline-flex items-center justify-center bg-ink text-white font-display uppercase tracking-widest text-sm px-5 py-3 hover:bg-primary transition-colors duration-300 w-full sm:w-auto"
                          >
                            Ver detalle
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Calidades */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <QualityCard
              title="Calidad Primera"
              description="Los productos de primera están hechos para obras visibles y de alta exigencia estructural, con acabado parejo y resistencia uniforme."
              items={products[0].qualities.primera}
              variant="primera"
            />
            <QualityCard
              title="Calidad Segunda"
              description="La calidad segunda mantiene la funcionalidad estructural con un precio más competitivo, pensada para trabajos de relleno y zonas no expuestas."
              items={products[0].qualities.segunda}
              variant="segunda"
              delay={0.1}
            />
          </div>

          {/* Banner transporte y descarga */}
          <motion.div
            className="mt-16 relative border-2 border-concrete-200 bg-concrete-100 p-7 md:p-9"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <StripeBar className="absolute top-0 left-0 right-0 h-1.5" />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-display uppercase text-2xl font-semibold text-ink mb-2">
                  Transporte y Descarga
                </h3>
                <p className="text-concrete-600 leading-relaxed text-justify">
                  Entregamos el ladrillo <strong>cargado a su movilidad sin costo adicional</strong>. Si requiere entrega a domicilio, contamos con <strong>servicio adicional de transporte y descarga</strong>.
                </p>
              </div>
            </div>
            
                        <StripeBar className="absolute bottom-0 left-0 right-0 h-1.5" />

          </motion.div>
        </div>
      </section>

      {/* ============ BENEFICIOS ============ */}
      <section id="beneficios" className="relative py-20 md:py-24 bg-ink text-white overflow-hidden">
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Ventajas"
            title="Beneficios de nuestros productos"
            description="Nuestros ladrillos de arcilla ofrecen los siguientes beneficios para su proyecto de construcción."
            align="center"
            dark
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <motion.article
                key={beneficio.title}
                className="group relative flex flex-col gap-5 border border-white/15 bg-white/5 p-8 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden />
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <svg className="w-6 h-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {beneficio.icon}
                  </svg>
                </div>
                <h3 className="font-display uppercase text-2xl font-semibold leading-tight">
                  {beneficio.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{beneficio.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALERÍA ============ */}
      <section id="galeria" className="py-20 md:py-24 bg-paper overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading kicker="Videos y fotos" title="Galería" align="center" />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {galeria.map((item, index) => (
              <motion.div
                key={item.alt}
                className={`group relative overflow-hidden bg-concrete-100 ${item.big ? 'col-span-2' : ''} h-48 md:h-64`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="p-5 font-display uppercase tracking-wide text-white text-lg">
                    {item.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}