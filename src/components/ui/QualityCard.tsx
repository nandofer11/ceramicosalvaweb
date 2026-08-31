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
      className={`border-l-4 ${v.border} bg-white p-5 md:p-6`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-9 h-9 ${v.accent} flex items-center justify-center`}>
          {v.icon}
        </span>
        <h3 className="font-display uppercase text-lg font-bold text-ink">{title}</h3>
      </div>
      <p className="text-concrete-500 text-sm mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {items.map((value) => (
          <li key={value} className="flex items-start gap-2.5 text-sm text-concrete-600">
            <span className={`mt-1.5 w-2 h-2 ${v.dot} flex-shrink-0`} />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}