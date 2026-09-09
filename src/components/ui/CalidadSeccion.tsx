"use client";

import StripeBar from './StripeBar';
import SectionHeading from './SectionHeading';
import QualityCard from './QualityCard';

interface QualityData {
  title: string;
  description: string;
  items: string[];
}

interface QualitySectionProps {
  kicker?: string;
  title?: string;
  description?: string;
  className?: string;
  primera: QualityData;
  segunda: QualityData;
}

export default function CalidadSeccion({
  kicker = 'Informativo',
  title = 'Calidad de nuestros ladrillos',
  description = 'Ofrecemos ladrillos de primera y segunda calidad. Conoce las características de cada uno para elegir el que mejor se adapte a tu obra.',
  className = '',
  primera,
  segunda,
}: QualitySectionProps) {
  return (
    <section className={`relative bg-ink text-white overflow-hidden ${className}`}>
      <StripeBar className="absolute top-0 left-0 right-0 h-2" />
      <div className="relative px-5 sm:px-6 lg:px-8 py-10 md:py-12">
        <SectionHeading kicker={kicker} title={title} description={description} align="left" dark />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <QualityCard
            title={primera.title}
            description={primera.description}
            items={primera.items}
            variant="primera"
          />
          <QualityCard
            title={segunda.title}
            description={segunda.description}
            items={segunda.items}
            variant="segunda"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}