"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHero from '@/components/ui/PageHero';
import StripeBar from '@/components/ui/StripeBar';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const brickTypes = [
  { id: 'pandereta', name: 'Pandereta rayas', piecesPerM2: 32, category: 'Muros' },
  { id: 'king-kong', name: 'King Kong 18 huecos', piecesPerM2: 36, category: 'Muros' },
  { id: 'techo-12', name: 'Techo 12', piecesPerM2: 9, category: 'Techos' },
  { id: 'techo-15', name: 'Techo 15', piecesPerM2: 7, category: 'Techos' },
];

const inputClass =
  'w-full px-4 py-3 border border-concrete-200 bg-concrete-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all duration-300 text-ink placeholder:text-concrete-400';

export default function CalculadoraPage() {
  const [inputMode, setInputMode] = useState<'dimensions' | 'area'>('dimensions');
  const [selectedBrick, setSelectedBrick] = useState(brickTypes[0].id);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [directArea, setDirectArea] = useState('');
  const [results, setResults] = useState<null | { area: number; total: number; brickName: string; piecesPerM2: number }>(null);

  const calculate = () => {
    const brick = brickTypes.find((b) => b.id === selectedBrick);
    if (!brick) return;

    let area = 0;
    if (inputMode === 'dimensions') {
      const w = parseFloat(width);
      const h = parseFloat(height);
      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
      area = w * h;
    } else {
      area = parseFloat(directArea);
      if (isNaN(area) || area <= 0) return;
    }

    const total = Math.ceil(area * brick.piecesPerM2);
    setResults({ area, total, brickName: brick.name, piecesPerM2: brick.piecesPerM2 });
  };

  const sendWhatsApp = () => {
    if (!results) return;
    const msg = `Hola, necesito una cotización.\n\nProducto: ${results.brickName}\nÁrea: ${results.area.toFixed(2)} m²\nLadrillos calculados: ${results.total} unidades (${results.piecesPerM2} piezas/m²)\n\n¿Podrían enviarme una cotización?`;
    window.open(`https://wa.me/51970584592?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <MainLayout>
      <PageHero
        kicker="Herramientas"
        title={<>Calculadora de <span className="text-primary">Ladrillos</span></>}
        description="Estima cuántos ladrillos necesitas para tu proyecto según las medidas del área a construir."
        image="/images/hero-background.png"
      />

      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative border-2 border-concrete-200 bg-white p-6 md:p-8 clip-corner">
                <StripeBar className="absolute top-0 left-0 right-0 h-1.5" />
                <h2 className="font-display uppercase text-xl font-bold text-ink mb-1">Datos del proyecto</h2>
                <p className="text-concrete-500 text-sm mb-6">Selecciona el tipo de ladrillo e ingresa las medidas.</p>

                {/* Tipo de ladrillo */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-ink mb-2">Tipo de ladrillo</label>
                  <select
                    value={selectedBrick}
                    onChange={(e) => setSelectedBrick(e.target.value)}
                    className={inputClass}
                  >
                    {brickTypes.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.piecesPerM2} piezas/m² ({b.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modo de entrada */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-ink mb-2">¿Cómo quieres ingresar el área?</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setInputMode('dimensions')}
                      className={`flex-1 py-2.5 px-4 border-2 text-sm font-display uppercase tracking-widest transition-colors ${
                        inputMode === 'dimensions'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-concrete-200 text-concrete-500 hover:border-concrete-300'
                      }`}
                    >
                      Alto × Ancho
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('area')}
                      className={`flex-1 py-2.5 px-4 border-2 text-sm font-display uppercase tracking-widest transition-colors ${
                        inputMode === 'area'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-concrete-200 text-concrete-500 hover:border-concrete-300'
                      }`}
                    >
                      m² directo
                    </button>
                  </div>
                </div>

                {/* Inputs */}
                {inputMode === 'dimensions' ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Ancho (m)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Ej. 4"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Alto (m)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Ej. 3"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-ink mb-2">Área total (m²)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Ej. 12"
                      value={directArea}
                      onChange={(e) => setDirectArea(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                <Button fullWidth size="lg" color="primary" onClick={calculate}>
                  Calcular cantidad
                </Button>
              </div>
            </motion.div>

            {/* Resultado */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {results ? (
                <div className="relative border-2 border-concrete-200 bg-white p-6 md:p-8 clip-corner">
                  <StripeBar className="absolute top-0 left-0 right-0 h-1.5" />
                  <h2 className="font-display uppercase text-xl font-bold text-ink mb-1">Resultado</h2>
                  <p className="text-concrete-500 text-sm mb-6">Estimación para tu proyecto.</p>

                  <div className="space-y-4">
                    <div className="bg-concrete-50 p-5 border-l-4 border-primary">
                      <p className="text-sm text-concrete-500 mb-1">Producto seleccionado</p>
                      <p className="font-display text-lg font-bold text-ink">{results.brickName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-concrete-50 p-4">
                        <p className="text-sm text-concrete-500 mb-1">Área</p>
                        <p className="font-display text-2xl font-bold text-ink">{results.area.toFixed(2)} <span className="text-sm font-normal text-concrete-500">m²</span></p>
                      </div>
                      <div className="bg-concrete-50 p-4">
                        <p className="text-sm text-concrete-500 mb-1">Rendimiento</p>
                        <p className="font-display text-2xl font-bold text-ink">{results.piecesPerM2} <span className="text-sm font-normal text-concrete-500">piezas/m²</span></p>
                      </div>
                    </div>
                    <div className="bg-ink text-white p-6 text-center">
                      <p className="text-sm text-white/70 mb-2 font-display uppercase tracking-widest">Ladrillos necesarios</p>
                      <p className="font-display text-5xl font-bold">{results.total}</p>
                      <p className="text-white/60 text-sm mt-1">unidades</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button fullWidth size="lg" color="primary" onClick={sendWhatsApp}>
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Cotizar por WhatsApp
                      </span>
                    </Button>
                    <p className="text-center text-xs text-concrete-400">
                      Se enviarán los datos calculados para darte una cotización personalizada.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-concrete-200 bg-concrete-50 p-8 md:p-12 clip-corner flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-concrete-200 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-concrete-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                    </svg>
                  </div>
                  <h3 className="font-display uppercase text-lg font-bold text-ink mb-2">Ingresa los datos</h3>
                  <p className="text-concrete-500 text-sm max-w-xs">
                    Completa el formulario con las medidas de tu proyecto y haz clic en &quot;Calcular cantidad&quot; para ver el resultado.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}