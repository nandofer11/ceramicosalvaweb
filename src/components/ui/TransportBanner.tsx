"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './Button';
import StripeBar from './StripeBar';

interface TransportBannerProps {
  className?: string;
}

export default function TransportBanner({ className = '' }: TransportBannerProps) {
  return (
    <motion.div
      className={`relative border-2 border-concrete-200 bg-concrete-100 overflow-hidden clip-corner ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <StripeBar className="absolute top-0 left-0 right-0 h-1.5" />
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {/* Imagen */}
        <div className="relative h-[200px] sm:h-[260px] md:h-full min-h-[180px]">
          <Image
            src="/images/hero-background.png"
            alt="Transporte y descarga"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-ink/20" aria-hidden />
        </div>

        {/* Contenido */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          <h3 className="font-display uppercase text-xl md:text-2xl font-bold text-ink mb-2">
            Transporte y Descarga
          </h3>
          <p className="text-concrete-600 text-sm leading-relaxed mb-5">
            Entregamos el ladrillo <strong className="text-ink">cargado a su movilidad sin costo adicional</strong>.
            Servicio adicional de transporte y descarga disponible.
          </p>
          <div className="flex-shrink-0">
            <Button size="md" color="primary">
              <Link href="/cotizacion" className="inline-flex items-center">
                Solicitar cotización
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <StripeBar className="absolute bottom-0 left-0 right-0 h-1.5" />
    </motion.div>
  );
}