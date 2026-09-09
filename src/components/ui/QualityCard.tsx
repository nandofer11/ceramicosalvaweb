"use client";

import { motion } from 'framer-motion';

interface QualityCardProps {
  title: string;
  description: string;
  items: string[];
  variant: 'primera' | 'segunda';
  delay?: number;
}

const variants = {
  primera: {
    accent: 'bg-success',
    border: 'border-success/30',
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    dot: 'bg-success',
  },
  segunda: {
    accent: 'bg-primary',
    border: 'border-primary/30',
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    dot: 'bg-primary/70',
  },
};

export default function QualityCard({ title, description, items, variant, delay = 0 }: QualityCardProps) {
  const v = variants[variant];

  return (
    <motion.div
      className={`group relative border border-white/15 bg-white/5 p-4 md:p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 border-l-4 ${v.border}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden />
      <div className="flex items-center gap-2.5 mb-2">
        <span className={`w-8 h-8 ${v.accent} flex items-center justify-center flex-shrink-0`}>
          {v.icon}
        </span>
        <h3 className="font-display uppercase text-sm font-bold text-white leading-tight">{title}</h3>
      </div>
      <p className="text-white/70 text-sm mb-2.5 leading-relaxed">{description}</p>
      <ul className="space-y-1.5">
        {items.map((value) => (
          <li key={value} className="flex items-start gap-2 text-sm text-white/85">
            <span className={`mt-1 w-1.5 h-1.5 ${v.dot} flex-shrink-0`} />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}