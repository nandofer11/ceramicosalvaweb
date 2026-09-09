"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import StripeBar from '@/components/ui/StripeBar';
import Button from '@/components/ui/Button';
import QualitySection from '@/components/ui/CalidadSeccion';
import TransportBanner from '@/components/ui/TransportBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById } from '@/lib/products';

function getSpecIcon(spec: string) {
  const lower = spec.toLowerCase();
  if (lower.includes(' x ') && lower.includes('cm')) {
    return (
      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      </svg>
    );
  }
  if (lower.includes('kg')) {
    return (
      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    );
  }
  if (lower.includes('piezas por m') || lower.includes('unidades por m') || lower.includes('rendimiento')) {
    return (
      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slugParam = params?.slug && Array.isArray(params.slug) ? params.slug[0] : params?.slug;
  const product = useMemo(() => (typeof slugParam === 'string' ? getProductById(slugParam) : null), [slugParam]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  const openImageModal = () => setIsModalOpen(true);
  const closeImageModal = () => setIsModalOpen(false);

  if (!product) {
    return (
      <MainLayout>
        <section className="min-h-[60vh] flex items-center bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="kicker text-primary mb-4 block">404</span>
            <h1 className="font-display uppercase text-4xl md:text-5xl font-bold text-ink mb-4">
              Producto no encontrado
            </h1>
            <p className="text-concrete-500 mb-8">El producto que buscas no existe o fue movido.</p>
            <Button size="lg" color="primary">
              <Link href="/productos" className="inline-flex items-center">
                Volver a Productos
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>
          </div>
        </section>
      </MainLayout>
    );
  }

  const gallery = product.gallery;
  const currentSlide = gallery[activeIndex];

  return (
    <MainLayout>
      {/* Encabezado */}
      <section className="relative bg-ink text-white overflow-hidden">
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="kicker text-primary flex items-center mb-3">
              <span className="h-px w-8 bg-primary" aria-hidden />
              Productos · {product.category}
            </span>
            <h1 className="font-display uppercase font-bold text-4xl md:text-5xl leading-[0.98] tracking-tight">
              {product.name}
            </h1>
            <div className="h-1 bg-primary w-24 mt-6" aria-hidden />
            <Link
              href="/productos"
              className="mt-8 inline-flex items-center gap-2 border-2 border-white/30 px-6 py-2.5 font-display uppercase tracking-widest text-sm text-white transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Productos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            {/* Columna principal — Galería */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Imagen/video principal con flechas overlay */}
              <div className="relative border-2 border-concrete-200 bg-concrete-100 group overflow-hidden clip-corner h-full flex items-center justify-center p-2">
                <div className="relative w-full h-full">
                  {currentSlide.type === 'image' ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={openImageModal}
                      onKeyDown={(event) => event.key === 'Enter' && openImageModal()}
                      className="relative w-full h-full cursor-zoom-in"
                      title="Ver imagen en pantalla completa"
                    >
                      <Image
                        src={currentSlide.src}
                        alt={currentSlide.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                        loading="eager"
                      />
                      <span className="absolute left-4 top-4 z-20 bg-primary px-3 py-1 text-white text-sm font-display uppercase tracking-widest">
                        {currentSlide.alt}
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={currentSlide.videoUrl}
                        poster={currentSlide.poster}
                        controls
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                      <span className="absolute left-4 top-4 z-20 bg-primary px-3 py-1 text-white text-sm font-display uppercase tracking-widest">
                        {currentSlide.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Flechas */}
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + gallery.length - 1) % gallery.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-ink/70 text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-ink/70 text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="Imagen siguiente"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Botón ampliar + contador */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openImageModal}
                    className="bg-ink/70 hover:bg-primary px-2.5 py-1 text-white text-xs font-display uppercase tracking-widest transition-colors cursor-pointer"
                    aria-label="Ampliar"
                  >
                    Ampliar
                  </button>
                  <span className="bg-ink/70 px-2 py-1 text-white text-xs font-display tracking-widest">
                    {activeIndex + 1} / {gallery.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Aside — Card unificado compacto */}
            <motion.aside
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="border-2 border-concrete-200 bg-white p-5 md:p-6 clip-corner space-y-5 h-full">
                {/* Descripción */}
                <div>
                  <h2 className="font-display uppercase text-base font-bold text-ink mb-1">Descripción</h2>
                  <p className="text-concrete-500 text-sm leading-relaxed">{product.description}</p>
                </div>

                {/* Especificaciones */}
                <div className="border-t border-concrete-200 pt-4">
                  <h2 className="font-display uppercase text-base font-bold text-ink mb-2">Especificaciones</h2>
                  <ul className="space-y-2">
                    {product.specs.map((spec) => {
                      const dimensionMatch = spec.match(/^([\d.]+)\s*x\s*([\d.]+)\s*x\s*([\d.]+)\s*(cm|mm|m)?$/i);
                      if (dimensionMatch) {
                        const [, alto, ancho, largo, unit = 'cm'] = dimensionMatch;
                        const dims = [
                          { label: 'Alto', value: alto },
                          { label: 'Ancho', value: ancho },
                          { label: 'Largo', value: largo },
                        ];
                        return (
                          <li key={spec} className="flex items-start gap-2.5 text-sm text-concrete-600">
                            {getSpecIcon(spec)}
                            <div className="grid grid-cols-3 gap-2">
                              {dims.map((dim) => (
                                <div key={dim.label} className="border border-concrete-200 bg-concrete-50 px-2 py-1.5 text-center">
                                  <p className="text-[10px] uppercase tracking-widest text-concrete-400">{dim.label}</p>
                                  <p className="text-sm font-semibold text-ink">
                                    {dim.value} <span className="text-concrete-400 text-xs font-normal">{unit}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={spec} className="flex items-center gap-2.5 text-sm text-concrete-600">
                          {getSpecIcon(spec)}
                          <span>{spec}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Aplicaciones */}
                <div className="border-t border-concrete-200 pt-4">
                  <h2 className="font-display uppercase text-base font-bold text-ink mb-2">Aplicaciones</h2>
                  <ul className="space-y-1.5 text-sm text-concrete-600">
                    {product.applications.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 w-2 h-2 bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detalle rápido */}
                <div className="border-t border-concrete-200 pt-4">
                  <h2 className="font-display uppercase text-base font-bold text-ink mb-2">Detalle rápido</h2>
                  <div className="space-y-1.5 text-sm text-concrete-500">
                    <p><span className="font-semibold text-ink">Categoría:</span> {product.category}</p>
                    <p><span className="font-semibold text-ink">Producto:</span> {product.name}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Calidades */}
          <QualitySection
            className="mt-12"
            kicker="Calidad"
            title="Primera y Segunda calidad"
            description="Ofrecemos ladrillos de primera y segunda calidad. Conoce las características de cada uno para elegir el que mejor se adapte a tu obra."
            primera={{
              title: 'Calidad Primera',
              description: 'Para obras visibles y de alta exigencia estructural, con acabado parejo y resistencia uniforme.',
              items: product.qualities.primera,
            }}
            segunda={{
              title: 'Calidad Segunda',
              description: 'Funcionalidad estructural con precio competitivo, ideal para rellenos y zonas no expuestas.',
              items: product.qualities.segunda,
            }}
          />

          {/* CTA + Banner transporte */}
          <TransportBanner className="mt-12" />
        </div>
      </section>

      {/* Modal imagen ampliada */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeImageModal}
          >
            <motion.button
              type="button"
              onClick={(e) => { e.stopPropagation(); closeImageModal(); }}
              className="absolute top-4 right-4 w-10 h-10 bg-ink/80 text-white flex items-center justify-center hover:bg-primary transition-colors z-10 cursor-pointer"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            {currentSlide.type === 'image' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl max-h-[80vh]"
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                />
              </motion.div>
            ) : (
              <motion.video
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={currentSlide.videoUrl}
                poster={currentSlide.poster}
                controls
                autoPlay
                className="w-full max-w-4xl max-h-[80vh] object-contain"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}