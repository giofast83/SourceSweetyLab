import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import imgCollezione from '../assets/creazione-08-1024.jpg';
import imgSuMisura from '../assets/atelier-in-azione-1024.jpg';
import imgUpcycling from '../assets/tessuti-pregiati-1024.jpg';
import LogoSweetyLab from '../assets/Logo_SweetyLab.png';

type PanelKey = 'collezione' | 'suMisura' | 'upcycling';

export default function Landing() {
  const [active, setActive] = useState<PanelKey>('collezione');
  const [isRowLayout, setIsRowLayout] = useState<boolean>(true);
  const [hasHover, setHasHover] = useState<boolean>(false);
  const [showLogo, setShowLogo] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const collezioneRef = useRef<HTMLElement | null>(null);
  const suMisuraRef = useRef<HTMLElement | null>(null);
  const upcyclingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mqRow = window.matchMedia('(min-width: 768px)');
    const mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateLayout = () => setIsRowLayout(mqRow.matches);
    const updateHover = () => setHasHover(mqHover.matches);

    updateLayout();
    updateHover();

    mqRow.addEventListener('change', updateLayout);
    mqHover.addEventListener('change', updateHover);

    const updateSize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      setContainerSize({
        width: rect?.width ?? window.innerWidth,
        height: rect?.height ?? window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const t = setTimeout(() => setShowLogo(true), 50);

    return () => {
      mqRow.removeEventListener('change', updateLayout);
      mqHover.removeEventListener('change', updateHover);
      window.removeEventListener('resize', updateSize);
      clearTimeout(t);
    };
  }, []);

  const basisFor = (panel: PanelKey): string => {
    if (active === 'collezione') {
      if (panel === 'collezione') return '70%';
      return '15%';
    }
    if (active === panel) return '80%';
    return '10%';
  };

  const widthPxFor = (panel: PanelKey): string => {
    const w = containerSize.width;
    if (!w) return basisFor(panel);
    if (active === 'collezione') {
      if (panel === 'collezione') return `${Math.round(w * 0.7)}px`;
      return `${Math.round(w * 0.15)}px`;
    }
    if (active === panel) return `${Math.round(w * 0.8)}px`;
    return `${Math.round(w * 0.1)}px`;
  };

  const heightPxFor = (panel: PanelKey): string => {
    const h = containerSize.height;
    if (!h) return heightFor(panel);

    if (active === 'collezione') {
      if (panel === 'collezione') return `${Math.round(h * 0.7)}px`;
      return `${Math.round(h * 0.15)}px`;
    }
    if (active === panel) return `${Math.round(h * 0.7)}px`;
    if (panel === 'collezione') return `${Math.round(h * 0.2)}px`;
    return `${Math.round(h * 0.1)}px`;
  };

  const heightFor = (panel: PanelKey): string => {
    if (active === 'collezione') {
      if (panel === 'collezione') return '70vh';
      return '15vh';
    }
    if (active === panel) return '70vh';
    if (panel === 'collezione') return '20vh';
    return '10vh';
  };

  const logoFilter = 'saturate(0) brightness(0)';

  const handleClick = (panel: PanelKey) => {
    setActive(panel);
  };

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
        className="group panel relative h-screen overflow-hidden cursor-pointer"
        data-panel={panel}
        style={{
          height: !isRowLayout ? heightPxFor(panel) : undefined,
          transition: !isRowLayout ? 'height 800ms cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
          flex: isRowLayout && !hasHover ? ('1 0 auto' as any) : undefined,
          flexBasis: isRowLayout && !hasHover ? widthPxFor(panel) : undefined,
          transitionProperty: isRowLayout && !hasHover ? ('flex-basis' as any) : undefined,
          transitionDuration: isRowLayout && !hasHover ? '2200ms' : undefined,
          transitionTimingFunction: isRowLayout && !hasHover ? 'cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
        }}
        onClick={() => {
          // Consenti sempre la selezione via click/touch, anche su dispositivi che riportano hover
          handleClick(panel);
        }}
        onTouchStart={() => {
          handleClick(panel);
        }}
      >
        {/* Immagine */}
        <img
          src={img}
          alt={title}
          className={`absolute -inset-[2px] w-full h-full object-cover transition-all duration-[1800ms] ease-in-out will-change-transform z-0 ${
            isActive ? 'animate-ken-burns-slow' : ''
          }`}
        />

        {/* Overlay */}
        <div
          className={`pointer-events-none absolute -inset-[2px] bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-opacity duration-500 ease-out will-change-opacity z-10 ${
            hasHover
              ? isActive
                ? 'opacity-0'
                : 'opacity-100 group-hover:opacity-0'
              : isActive
              ? 'opacity-0'
              : 'opacity-100'
          }`}
        />

        {/* ✅ ✅ TESTI DESKTOP */}
        {isRowLayout && (
          <>
            {/* Titolo + sottotitolo desktop (solo quando attivo) */}
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-end text-right text-white transition-opacity duration-500 ease-out z-20 ${
                hasHover
                  ? isActive
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                  : isActive
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              <div className="px-6 md:px-10">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-shadow-strong">{title}</h2>
                <p className="mt-3 text-sm md:text-base max-w-xl text-shadow-strong-sm">
                  {panel === 'collezione' && 'Mini collezioni a tiratura limitata'}
                  {panel === 'suMisura' && 'Il tuo abito, creato solo per te'}
                  {panel === 'upcycling' && 'Trasforma e rinnova i tuoi capi'}
                </p>
              </div>
            </div>

            {/* ✅ Titolo verticale ridotto SOLO su desktop */}
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-end pr-4 md:pr-6 transition-opacity duration-500 ease-out z-20 ${
                hasHover
                  ? isActive
                    ? 'opacity-0'
                    : 'opacity-100 group-hover:opacity-0'
                  : isActive
                  ? 'opacity-0'
                  : 'opacity-100'
              }`}
            >
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-wide text-[#fffaf0] drop-shadow-md"
                style={{ writingMode: 'vertical-rl' }}
              >
                {title}
              </h2>
            </div>
          </>
        )}

        {/* ✅ ✅ TESTI MOBILE */}
        {!isRowLayout && (
          <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-end text-right text-white transition-opacity transition-transform duration-500 ease-out z-50 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-2'
            }`}
          >
            <div className="px-6 py-4">
              <h2 className="text-2xl font-semibold tracking-wide text-shadow-strong">{title}</h2>

              {/* ✅ Sottotitolo mobile appare SOLO quando attivo */}
              <p
                className={`mt-2 text-sm leading-snug max-w-xs transition-opacity duration-300 text-shadow-strong-sm ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {panel === 'collezione' && 'Mini collezioni a tiratura limitata'}
                {panel === 'suMisura' && 'Il tuo abito, creato solo per te'}
                {panel === 'upcycling' && 'Trasforma e rinnova i tuoi capi'}
              </p>
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div
          className={`w-full bg-gradient-to-r from-white/60 via-white/40 to-white/60 backdrop-blur-sm shadow-sm transition-opacity duration-700 ease-out ${
            showLogo ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center h-20 md:h-24 px-4">
            <img
              src={LogoSweetyLab}
              alt="Sweety Lab — Sartoria artigianale"
              className={`${isRowLayout ? 'w-40' : 'w-32'} select-none`}
              style={{ filter: logoFilter }}
            />
          </div>
        </div>
        <h1 className="sr-only">
          Sweety Lab – Sartoria artigianale: Collezione, Su Misura, Upcycling
        </h1>
      </header>

      <div
        ref={containerRef}
        className="panels flex w-full h-full md:flex-row flex-col overflow-y-hidden overflow-x-hidden"
        onMouseLeave={() => {
          if (hasHover) setActive('collezione');
        }}
      >
        <Panel panel="collezione" title="Collezione" img={imgCollezione} sectionRef={collezioneRef} />
        <Panel panel="suMisura" title="Su Misura" img={imgSuMisura} sectionRef={suMisuraRef} />
        <Panel panel="upcycling" title="Upcycling" img={imgUpcycling} sectionRef={upcyclingRef} />
      </div>
    </div>
  );
}