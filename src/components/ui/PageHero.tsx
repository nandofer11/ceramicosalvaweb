import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import StripeBar from './StripeBar';

type PageHeroProps = {
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  align?: 'left' | 'center';
};

const PageHero = ({ kicker, title, description, image, align = 'left' }: PageHeroProps) => {
  return (
    <section className="relative min-h-[320px] md:min-h-[380px] flex items-center bg-ink text-white overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : null}
        <div
          className={`absolute inset-0 ${
            align === 'left'
              ? 'bg-gradient-to-r from-ink via-ink/80 to-ink/40'
              : 'bg-gradient-to-b from-ink/85 via-ink/75 to-ink/70'
          }`}
        />
        <div className="absolute inset-0 bg-grid-dark" />
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />
      </div>

      <div className={`relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 ${align === 'center' ? 'text-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={align === 'center' ? 'flex flex-col items-center' : ''}
        >
          <span className="kicker text-primary mb-4">
            {align === 'left' && <span className="h-px w-10 bg-primary" aria-hidden />}
            {kicker}
          </span>
          <h1 className="font-display uppercase font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-tight">
            {title}
          </h1>
          <div className="h-1 bg-primary w-24 mt-6" aria-hidden />
          {description && (
            <p className={`text-white/85 text-lg mt-5 leading-relaxed ${align === 'center' ? 'max-w-2xl' : 'max-w-xl'}`}>
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;