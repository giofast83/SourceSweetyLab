import React, { useEffect, useMemo, useRef, useState } from 'react';

export type CarouselItem = {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
};

type OtherCollectionsCarouselProps = {
  title?: string;
  subtitle?: string;
  items: CarouselItem[];
  autoPlay?: boolean;
  intervalMs?: number;
};

// Slideshow rettangolare per "Altre collezioni"
// - Bordo stondato, centrato in pagina
// - Gradiente cipria che sfuma verso l'alto, immagine ben visibile
// - Etichetta (titolo + eventuale sottotitolo) in basso a sinistra con animazione fade + upward ad ogni cambio slide
export default function OtherCollectionsCarousel({ title = 'Altre collezioni', subtitle = 'Scopri le altre collezioni e lasciati ispirare.', items, autoPlay = true, intervalMs = 4500 }: OtherCollectionsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0); // forza ri-render dell'animazione del label
  const [progressKey, setProgressKey] = useState(0); // forza reset animazione barra di progresso
  const timerRef = useRef<number | null>(null);

  const goTo = (i: number) => {
    const next = (i + items.length) % items.length;
    setIndex(next);
    // Cambia key per riattivare animazione del label
    setAnimKey((k) => k + 1);
    // Cambia key per riavviare la barra di progresso
    setProgressKey((k) => k + 1);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      next();
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlay, intervalMs, items.length]);

  const current = useMemo(() => items[index], [items, index]);

  return (
    <section aria-label={title} className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-800 tracking-tight">{title}</h3>
        <p className="font-sans text-sm md:text-base text-gray-600 mb-6 md:mb-8">{subtitle}</p>

        <div className="oc-carousel">
          {/* Slide attiva */}
          <a href={current.href} className="block oc-slide" aria-label={`Apri ${current.title}`}>
            <img src={current.image} alt={current.title} className="oc-slide-img" />
            {/* Gradiente cipria verso l'alto */}
            <div className="oc-gradient-blush" aria-hidden />
            {/* Etichetta bottom-left con animazione */}
            <div key={animKey} className="oc-label">
              <div className="oc-label-inner">
                <span className="oc-label-title block font-sans text-white/95 text-2xl md:text-3xl lg:text-4xl fade-up-blur-title">{current.title}</span>
                {current.subtitle && (
                  <span className="oc-label-sub block font-sans text-white/85 text-sm md:text-base lg:text-lg mt-0.5 fade-up-blur-subtitle">{current.subtitle}</span>
                )}
              </div>
            </div>
          </a>

          {/* Controlli minimal */}
          {items.length > 1 && (
            <div className="oc-controls">
              <button type="button" className="oc-arrow" aria-label="Slide precedente" onClick={prev}>
                ‹
              </button>
              <button type="button" className="oc-arrow" aria-label="Slide successiva" onClick={next}>
                ›
              </button>
            </div>
          )}

          {/* Indicatori a barre con progresso della durata della diapositiva */}
          {items.length > 1 && (
            <div className="oc-bars" aria-hidden>
              {items.map((_, i) => (
                <div key={i} className="oc-bar">
                  {i === index && (
                    <div
                      key={progressKey}
                      className="oc-bar-fill"
                      style={{ animationDuration: `${intervalMs}ms` }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}