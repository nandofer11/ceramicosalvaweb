"use client";

import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import StripeBar from '@/components/ui/StripeBar';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const valores = [
  {
    title: 'Calidad',
    description:
      'Nos esforzamos por ofrecer productos bien cocidos, controlando cada etapa de nuestro proceso productivo.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    ),
  },
  {
    title: 'Responsabilidad',
    description:
      'Asumimos nuestros compromisos con seriedad, cumpliendo con los plazos de entrega acordadas con nuestros clientes.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Integridad',
    description:
      'Actuamos con honestidad, transparencia y ética en todas nuestras operaciones y relaciones comerciales.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: 'Compromiso ambiental',
    description:
      'Buscamos implementar prácticas sostenibles en nuestros procesos para minimizar el impacto ambiental y contribuir a la conservación de los recursos naturales.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    ),
  },
];

export default function EmpresaPage() {
  return (
    <MainLayout>
      
      {/* ============ HISTORIA ============ */}
      <section id="historia" className="py-16 md:py-18 bg-paper overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Quiénes somos"
            title="Nuestra empresa"
            description="Más de una década construyendo confianza con nuestros productos"
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-concrete-600 mb-6 leading-relaxed text-justify">
                  <span className="font-display font-semibold text-primary text-sm uppercase tracking-wide">
                    Cerámicos Alva EIRL
                  </span>
                  , fue constituida formalmente en el año 2010, pero su historia se remonta a mucho antes. Desde 1993, nuestro fundador, Julio Alva, inició esta actividad con dedicación artesanal y visión emprendedora, sentando las bases de lo que hoy es una empresa sólida y reconocida en la región San Martín.
                </p>
                <p className="text-concrete-600 mb-6 leading-relaxed text-justify">
                  Nuestra planta de producción, está ubicada en el Caserío &quot;Las Delicias&quot;, en el kilómetro 8 de la Carretera Fernando Belaunde Terry, en Rioja.
                </p>
                <p className="text-concrete-600 mb-6 leading-relaxed text-justify">
                  A lo largo de estos años, hemos ido perfeccionado nuestros procesos, incorporado maquinaria y formando un buen equipo para ofrecer ladrillos que cumplen con la industria de la construcción.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-5 border-l-4 border-primary bg-concrete-100 p-5">
                <div className="font-display text-4xl font-bold text-primary">1993</div>
                <div>
                  <p className="font-display uppercase tracking-wide font-semibold text-ink">Año de fundación</p>
                  <p className="text-concrete-600">Iniciamos operaciones en Rioja en el rubro de la construcción.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 hidden lg:block w-24 h-24 bg-primary/10" aria-hidden />
              <div className="relative border-2 border-concrete-200 bg-concrete-100 p-2 clip-corner group">
                <div className="relative aspect-[700/440] overflow-hidden">
                  <Image
                    src="/images/foto_historia.jpg"
                    alt="Cerámicos Alva - Historia"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6">
                      <h3 className="font-display uppercase tracking-wide text-white text-xl mb-1">
                        Ladrillera antiguamente
                      </h3>
                      <p className="text-white/80">Julio Alva - Rioja, San Martín</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ MISIÓN Y VISIÓN ============ */}
      <section id="mision-vision" className="relative py-20 md:py-24 bg-ink text-white overflow-hidden">
        {/* <div className="absolute inset-0 bg-grid-dark" aria-hidden /> */}
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Rumbo"
            title="Propósito y Dirección"
            description="Guiando nuestro camino"
            align="center"
            dark
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Mision',
                heading: 'Nuestra Misión',
                text: 'Fabricar y comercializar productos de arcilla de calidad que satisfagan las necesidades del sector construcción en la región San Martín, brindando soluciones confiables, sostenibles y económicas a nuestros clientes, y contribuyendo al desarrollo de nuestra comunidad.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
              },
              {
                label: 'Vision',
                heading: 'Nuestra Visión',
                text: 'Ser reconocidos como una empresa líder en la fabricación y comercialización de ladrillos de arcilla en la región San Martín, distinguiéndonos por la calidad de nuestros productos y nuestro compromiso con el desarrollo sostenible y el medio ambiente.',
                icon: (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </>
                ),
              },
            ].map((item, index) => (
              <motion.article
                key={item.heading}
                className="group relative flex flex-col gap-5 border border-white/15 bg-white/5 p-8 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden />
                <span className="font-display text-xs tracking-[0.3em] uppercase text-primary">
                  {item.label}
                </span>
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <svg className="w-6 h-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-display uppercase text-2xl font-semibold leading-tight">{item.heading}</h3>
                <p className="text-white/80 leading-relaxed text-justify">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALORES ============ */}
      <section id="valores" className="py-20 md:py-24 bg-paper overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Principios"
            title="Nuestros Valores"
            description="Principios que guían cada ladrillo que fabricamos"
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valores.map((valor, index) => (
              <motion.article
                key={valor.title}
                className="group flex flex-col items-center gap-5 border border-concrete-200 bg-white p-7 text-center hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <svg className="w-7 h-7 text-primary group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {valor.icon}
                  </svg>
                </div>
                <h4 className="font-display uppercase text-lg font-semibold text-ink leading-tight">
                  {valor.title}
                </h4>
                <p className="text-concrete-600 leading-relaxed">{valor.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden />
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl leading-[1.02] mb-4">
              ¿Listo para <span className="text-ink">construir?</span>
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-9">
              Contáctanos hoy para conocer más sobre nuestros productos y servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" color="secondary">
                <Link href="/productos" className="flex items-center">
                  Ver Productos
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Button>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center border-2 border-white px-8 py-3.5 font-display uppercase tracking-widest text-base text-white hover:bg-white hover:text-ink transition-colors duration-300"
              >
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}