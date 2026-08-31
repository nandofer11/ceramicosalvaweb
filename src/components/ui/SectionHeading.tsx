import React from 'react';
import { motion } from 'framer-motion';

type SectionHeadingProps = {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  underline?: boolean;
  className?: string;
};

const SectionHeading = ({
  kicker,
  title,
  description,
  align = 'left',
  dark = false,
  underline = true,
  className = '',
}: SectionHeadingProps) => {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="kicker text-primary mb-3"
        >
          <span className="h-px w-8 bg-primary" aria-hidden />
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`font-display uppercase tracking-wide text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.05] font-bold ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${dark ? 'text-white/80' : 'text-concrete-600'}`}
        >
          {description}
        </motion.p>
      )}
      {underline && (
        <motion.div
          className="mt-5 h-1 bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: align === 'center' ? '4rem' : '5rem' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      )}
    </div>
  );
};

export default SectionHeading;