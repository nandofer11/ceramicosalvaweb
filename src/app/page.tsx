'use client';

import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import StripeBar from "@/components/ui/StripeBar";
import { motion } from 'framer-motion';

const products = [
  {
    n: '01',
    name: 'Pandereta rayas',
    image: '/images/pandereta.png',
    alt: 'Ladrillo Pandereta rayas',
    description:
      'Ladrillo Pandereta acanalado, resistente, sin salitre y con excelente adherencia al tarrajeo. Ideal para muros divisorios.',
  },
  {
    n: '02',
    name: 'Techo 12',
    image: '/images/techo12.png',
    alt: 'Ladrillo Techo 12',
    description:
      'Fabricados para la construcción de techos aligerados del último piso. Ofrece alta resistencia y menor peso en la estructura.',
  },
  {
    n: '03',
    name: 'King Kong 18 huecos',
    image: '/images/kingkong.png',
    alt: 'Ladrillo King Kong 18 huecos',
    description:
      'Se utiliza para la construcción de muros portantes, que son los que soportan el peso de la estructura debido a su alta resistencia.',
  },
];

const reasons = [
  {
    title: 'Productos de calidad',
    description: 'Contamos con maquinaria semi industrial para ofrecer productos de calidad y durabilidad.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: 'Entrega puntual',
    description: 'Respetamos los plazos de contrato para que tu proyecto avance sin retrasos.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Experiencia regional',
    description: 'Más de 20 años construyendo junto a las principales ciudades de la región San Martín.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
  {
    title: 'Servicio transporte',
    description: 'Ofrecemos el servicio de transporte y descarga directamente en el lugar de tu obra.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
];

const cities = ['Rioja', 'Moyobamba', 'Nueva Cajamarca', 'Soritor', 'Tarapoto', 'Juanjuí', 'Naranjos', 'Naranjillo'];

export default function Home() {
  return (
    <MainLayout>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center bg-ink text-white overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/bg-hero.png"
            alt="Fábrica de Cerámicos Alva"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="kicker text-primary mb-6 flex items-center">
                <span className="h-px w-10 bg-primary" aria-hidden />
                Cerámicos Alva
              </span>

              <h1 className="font-display uppercase font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight mb-6">
                Fabricantes de
                <br />
                ladrillos de{' '}
                <span className="text-primary relative">
                  arcilla
                  <StripeBar className="absolute -bottom-2 left-0 right-0 h-1.5 opacity-80" />
                </span>
              </h1>

              <p className="text-white/85 text-lg max-w-md leading-relaxed mb-9">
                Empresa Riojana contribuyendo al desarrollo del Alto Mayo.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  <Link href="/productos">Ver Productos</Link>
                </Button>
                <Link
                  href="/cotizacion"
                  className="inline-flex items-center justify-center border-2 border-white px-8 py-3.5 font-display uppercase tracking-widest text-base text-white hover:bg-white hover:text-ink transition-colors duration-300"
                >
                  Cotización
                </Link>
              </div>

              
            </motion.div>

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute -inset-10 bg-primary/15 blur-3xl rounded-full" aria-hidden />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="relative w-[200px] h-[306px] md:w-[340px] md:h-[668px]">
                  <Image
                    src="/images/hero-pandereta.png"
                    alt="Ladrillo Pandereta - Cerámicos Alva"
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, 440px"
                    className="object-contain object-center drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTOS DESTACADOS ============ */}
      <section id="productos" className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <SectionHeading
              
              title={
                <>
                  Construcciones seguras
                  <br />
                  <span className="text-primary">productos de calidad!</span>
                </>
              }
            />
            <div className="md:border-l-2 md:border-primary md:pl-10">
              <h2 className="font-display uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                Principales productos
              </h2>
              <p className="text-lg text-concrete-600 leading-relaxed">
                Ofrecemos ladrillos de primera y segunda calidad.
              </p>
            </div>
          </div>

          <StripeBar className="h-2 w-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.article
                key={product.name}
                className="group relative flex flex-col bg-white border border-concrete-200 hover:border-primary/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden />
                <div className="relative overflow-hidden bg-concrete-100 p-12 h-40">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2 p-6 border-t border-concrete-200">
                  {/* <span className="font-display text-sm tracking-widest text-primary">{product.n}</span> */}
                  <h3 className="font-display uppercase text-2xl font-semibold text-ink leading-tight ">
                    {product.name}
                  </h3>
                  <p className="text-concrete-600 leading-relaxed">{product.description}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="flex justify-end mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg">
              <Link href="/productos" className="flex items-center">
                Ver todos
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============ POR QUÉ ELEGIRNOS ============ */}
      <section id="porque-elegirnos" className="relative py-20 md:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden />
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <span className="kicker text-white mb-4 flex items-center">
                <span className="h-px w-10 bg-white" aria-hidden />
                Nuestro compromiso
              </span>
              <h2 className="font-display uppercase font-bold text-4xl md:text-5xl leading-[1.2] mb-6">
                ¿Por qué elegir <span className="text-ink">Cerámicos Alva?</span>
              </h2>
              <div className="h-1 bg-ink w-24 mb-6" aria-hidden />
              <p className="text-lg text-white/95 leading-relaxed max-w-xl">
                Somos una empresa con varios años de experiencia, comprometida con entregar buenos
                productos y con la satisfacción de nuestros clientes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  className="group flex flex-col gap-4 p-6 border border-white/20 bg-white/10 backdrop-blur-[2px] hover:bg-ink/25 transition-colors duration-300"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-ink flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {reason.icon}
                    </svg>
                  </div>
                  <h3 className="font-display uppercase text-lg font-semibold leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
                <StripeBar className="absolute bottom-0 left-0 right-0 h-2" />

      </section>

      {/* ============ ZONAS DE COBERTURA ============ */}
      <section id="cobertura" className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Lista */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="kicker text-primary mb-3 flex items-center">
                <span className="h-px w-8 bg-primary" aria-hidden />
                Cobertura
              </span>
              <h2 className="font-display uppercase font-bold text-4xl md:text-5xl text-ink leading-[1.02] mb-2">
                Zonas de Cobertura
              </h2>
              <div className="h-1 bg-primary w-20 mb-6" aria-hidden />
              <p className="text-lg text-concrete-600 mb-7">
                Atendemos a las principales ciudades de la región San Martín
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 mb-7">
                {cities.map((city, index) => (
                  <motion.li
                    key={city}
                    className="flex items-center gap-3 font-display uppercase tracking-wider text-ink"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {city}
                  </motion.li>
                ))}
              </ul>

              <p className="text-sm italic text-concrete-500">
                ¿Necesitas entrega en otra ciudad? Contáctanos para verificar disponibilidad.
              </p>
            </motion.div>

            {/* Mapa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative border-2 border-concrete-200 bg-concrete-100 p-3 clip-corner">
                <div className="relative h-64 md:h-[400px] overflow-hidden">
                  <Image
                    src="/images/mapa.png"
                    alt="Mapa de cobertura - Región San Martín"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}