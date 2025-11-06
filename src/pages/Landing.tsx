import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import imgCollezione from '../assets/chi-siamo-1024.jpg';
import imgSuMisura from '../assets/tessuti-pregiati-1024.jpg';
import imgUpcycling from '../assets/atelier-in-azione-1024.jpg';

type PanelKey = 'collezione' | 'suMisura' | 'upcycling';

export default function Landing() {
  // Active panel: default to 'collezione'
  const [active, setActive] = useState<PanelKey>('collezione');
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  const collezioneRef = useRef<HTMLElement | null>(null);
  const suMisuraRef = useRef<HTMLElement | null>(null);
  const upcyclingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const basisFor = (panel: PanelKey): string => {
    // Initial layout when 'collezione' is active: 70% / 15% / 15%
    if (active === 'collezione') {
      if (panel === 'collezione') return '70%';
      return '15%';
    }
    // When a side panel is active: quasi fullscreen 80%, others as side panels 10% each
    if (active === panel) return '80%';
    return '10%';
  };

  const handleClick = (panel: PanelKey) => {
    setActive(panel);
    // On mobile, scroll to the tapped panel to show it fullscreen
    if (!isDesktop) {
      const target =
        panel === 'collezione'
          ? collezioneRef.current
          : panel === 'suMisura'
          ? suMisuraRef.current
          : upcyclingRef.current;
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Navigazione CTA rimossa su richiesta

  const Panel = ({
    panel,
    title,
    img,
    sectionRef,
  }: {
    panel: PanelKey;
    title: string;
    img: string;
    sectionRef: MutableRefObject<HTMLElement | null>;
  }) => {
    const isActive = active === panel;
    return (
      <section
        ref={(el) => (sectionRef.current = el)}
        className={`group relative h-screen overflow-hidden cursor-pointer transition-all duration-1000 ease-in-out flex-shrink-0 snap-start`}
        style={{
          flexBasis: isDesktop ? basisFor(panel) : undefined,
          transition: isDesktop ? 'flex-basis 1000ms ease-in-out' : undefined,
        }}
        onMouseEnter={() => {
          if (isDesktop) setActive(panel);
        }}
        onClick={(e) => {
          // Su desktop non è richiesto il click per espandere
          if (!isDesktop) handleClick(panel);
        }}
        aria-label={title}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick(panel);
        }}
      >
        {/* Image */}
        <img
          src={img}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out will-change-transform hover:scale-105 hover:brightness-110`}
        />

        {/* Overlay: leggermente scuro anche sulla sezione attiva per migliorare la leggibilità */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isActive
              ? 'bg-gradient-to-t from-black/25 via-black/15 to-transparent'
              : 'bg-gradient-to-t from-black/70 via-black/50 to-transparent group-hover:from-black/40 group-hover:via-black/25 group-hover:to-transparent'
          }`}
        />

        {/* Testo: se attivo, orizzontale con titolo + sottotitolo; se chiuso su desktop, titolo verticale */}
        {isActive ? (
          <div className={`pointer-events-none absolute inset-0 flex items-center justify-end text-right text-[#fffaf0]`}>
            <div className="px-6 md:px-10 transition-opacity duration-1000 ease-in-out">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-wide opacity-100 drop-shadow-lg">{title}</h2>
              <p className="mt-3 text-sm md:text-base max-w-xl transition-opacity duration-1000 ease-in-out opacity-100 drop-shadow">
                {panel === 'collezione' && 'Mini collezioni a tiratura limitata'}
                {panel === 'suMisura' && 'Il tuo abito, creato solo per te'}
                {panel === 'upcycling' && 'Trasforma e rinnova i tuoi capi'}
              </p>
            </div>
          </div>
        ) : (
          isDesktop && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4 md:pr-6">
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-wide text-[#fffaf0] drop-shadow-md"
                style={{ writingMode: 'vertical-rl' }}
              >
                {title}
              </h2>
            </div>
          )
        )}

        {/* CTA rimossa su richiesta */}
      </section>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Pulsante di reset rimosso su richiesta */}

      {/* Panels container */}
      <div
        className="flex w-full h-full md:flex-row flex-col snap-y md:snap-none snap-mandatory overflow-y-auto md:overflow-y-hidden overflow-x-hidden"
        onMouseLeave={() => {
          // Su desktop, al termine dell'hover, torna alla vista iniziale
          if (isDesktop) setActive('collezione');
        }}
      >
        <Panel panel="collezione" title="Collezione" img={imgCollezione} sectionRef={collezioneRef} />
        <Panel panel="suMisura" title="Su Misura" img={imgSuMisura} sectionRef={suMisuraRef} />
        <Panel panel="upcycling" title="Upcycling" img={imgUpcycling} sectionRef={upcyclingRef} />
      </div>
    </div>
  );
}