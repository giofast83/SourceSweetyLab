import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import imgCollezione from '../assets/creazione-08-1024.jpg';
import imgSuMisura from '../assets/atelier-in-azione-1024.jpg';
import imgUpcycling from '../assets/tessuti-pregiati-1024.jpg';
import LogoSweetyLab from '../assets/Logo_SweetyLab.png';

type PanelKey = 'collezione' | 'suMisura' | 'upcycling';

export default function Landing() {
  // Active panel: default to 'collezione'
  const [active, setActive] = useState<PanelKey>('collezione');
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [showLogo, setShowLogo] = useState<boolean>(false);

  const collezioneRef = useRef<HTMLElement | null>(null);
  const suMisuraRef = useRef<HTMLElement | null>(null);
  const upcyclingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    const t = setTimeout(() => setShowLogo(true), 50);
    return () => {
      mql.removeEventListener('change', update);
      clearTimeout(t);
    };
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

  // Mobile heights to replicate desktop effect in vertical layout
  const heightFor = (panel: PanelKey): string => {
    // Mobile: layout verticale con overlay della barra sopra le immagini
    // Stato iniziale: Collezione 70vh, altre 15vh
    if (active === 'collezione') {
      if (panel === 'collezione') return '70vh';
      return '15vh';
    }
    // Stato attivo (Su Misura o Upcycling):
    // sezione attiva 70vh, Collezione chiusa ma più alta in alto (20vh), altra chiusa 10vh
    if (active === panel) return '70vh';
    if (panel === 'collezione') return '20vh';
    return '10vh';
  };

  // Logo sempre nero, monocromatico
  const logoFilter = 'saturate(0) brightness(0)';

  const handleClick = (panel: PanelKey) => {
    setActive(panel);
    // On mobile, we now expand in place using height, without scrolling
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
        className={`group relative h-screen overflow-hidden cursor-pointer flex-shrink-0`}
        style={{
          // Desktop: usiamo anche width per garantire compatibilità con Safari/iOS
          flexBasis: isDesktop ? basisFor(panel) : undefined,
          width: isDesktop ? basisFor(panel) : undefined,
          height: !isDesktop ? heightFor(panel) : undefined,
          transition: isDesktop
            ? 'width 2200ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'height 2200ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: isDesktop ? ('width' as any) : ('height' as any),
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
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-in-out will-change-transform hover:scale-105 hover:brightness-110`}
        />

        {/* Overlay: leggermente scuro anche sulla sezione attiva per migliorare la leggibilità */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            isActive
              ? 'bg-gradient-to-t from-black/25 via-black/15 to-transparent'
              : 'bg-gradient-to-t from-black/70 via-black/50 to-transparent group-hover:from-black/40 group-hover:via-black/25 group-hover:to-transparent'
          }`}
        />

        {/* Testo: se attivo, orizzontale con titolo + sottotitolo; se chiuso su desktop, titolo verticale */}
        {isActive ? (
          <div className={`pointer-events-none absolute inset-0 flex items-center justify-end text-right text-[#fffaf0]`}>
            <div className="px-6 md:px-10 transition-opacity duration-[1800ms] ease-in-out">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-wide opacity-100 drop-shadow-lg">{title}</h2>
              <p className="mt-3 text-sm md:text-base max-w-xl transition-opacity duration-[1800ms] ease-in-out opacity-100 drop-shadow">
                {panel === 'collezione' && 'Mini collezioni a tiratura limitata'}
                {panel === 'suMisura' && 'Il tuo abito, creato solo per te'}
                {panel === 'upcycling' && 'Trasforma e rinnova i tuoi capi'}
              </p>
            </div>
          </div>
        ) : (
          isDesktop ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4 md:pr-6">
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-wide text-[#fffaf0] drop-shadow-md"
                style={{ writingMode: 'vertical-rl' }}
              >
                {title}
              </h2>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4">
              <h2 className="text-lg font-semibold tracking-wide text-[#fffaf0] drop-shadow-md">{title}</h2>
            </div>
          )
        )}

        {/* CTA rimossa su richiesta */}
      </section>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Logo top-center fisso, minimale, con fade-in */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Barra full-width per massima leggibilità del logo */}
        <div className={`w-full bg-gradient-to-r from-white/60 via-white/40 to-white/60 backdrop-blur-sm shadow-sm transition-opacity duration-700 ease-out ${showLogo ? 'opacity-100 logo-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center h-20 md:h-24 px-4">
            <img
              src={LogoSweetyLab}
              alt="Sweety Lab — Sartoria artigianale"
              className={`${isDesktop ? 'w-40' : 'w-32'} select-none`}
              style={{ filter: logoFilter }}
            />
          </div>
        </div>
        {/* Heading SEO coerente, non invasivo */}
        <h1 className="sr-only">Sweety Lab – Sartoria artigianale: Collezione, Su Misura, Upcycling</h1>
      </header>
      {/* Pulsante di reset rimosso su richiesta */}

      {/* Panels container */}
      <div
        className="flex w-full h-full md:flex-row flex-col md:snap-none overflow-y-hidden overflow-x-hidden"
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