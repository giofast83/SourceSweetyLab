import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

type SliderItem = {
  title: string;
  description: string;
  image: string;
  href: string;
};

type Props = {
  title?: string; // Titolo della sezione (es. "Altre collezioni")
  items: SliderItem[]; // Collezioni da mostrare
  align?: 'left' | 'center'; // Allineamento del titolo
};

// Slider orizzontale minimal per mostrare altre collezioni
// - Card con immagine, overlay morbido e titolo+descrizione
// - Scroll orizzontale con snap e frecce (desktop)
export default function OtherCollectionsSlider({ title = 'Altre collezioni', items, align = 'left' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  return (
    <section ref={ref} className={`w-full py-12 md:py-18 sl-fade-section ${inView ? 'sl-fade-in' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Titolo sezione */}
        {title && (
          <div className={`${align === 'center' ? 'text-center' : 'text-left'} mb-6 md:mb-8`}>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 tracking-tight">{title}</h2>
          </div>
        )}

        {/* Controlli frecce (desktop) */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          >
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className="group relative snap-start flex-shrink-0 w-[80%] sm:w-[60%] md:w-[420px] lg:w-[460px] aspect-[4/3] overflow-hidden rounded-md border border-neutral-200 bg-white focus:outline-none"
                aria-label={`Apri collezione: ${item.title}`}
              >
                {/* Immagine */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Overlay gradiente per leggibilità */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent group-hover:from-black/40 group-hover:via-black/20 transition-colors duration-300" />
                {/* Testo bottom-left */}
                <div className="absolute inset-0 flex items-end justify-start p-4 md:p-6">
                  <div className="max-w-[85%]">
                    <h3 className="text-white text-xl md:text-2xl font-serif mb-2" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.7)' }}>
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottoni freccia visibili su md+ */}
          <div className="hidden md:flex absolute -top-12 right-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-480)}
              className="inline-flex items-center justify-center w-9 h-9 border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 rounded-full shadow-sm"
              aria-label="Scorri indietro"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(480)}
              className="inline-flex items-center justify-center w-9 h-9 border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 rounded-full shadow-sm"
              aria-label="Scorri avanti"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

