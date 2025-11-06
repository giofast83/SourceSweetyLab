import { useEffect, useState } from 'react';
import imgCollezione from '../assets/creazione-08-1024.jpg';
import imgSuMisura from '../assets/atelier-in-azione-1024.jpg';
import imgUpcycling from '../assets/tessuti-pregiati-1024.jpg';
import LogoSweetyLab from '../assets/Logo_SweetyLab.png';

type PanelKey = 'collezione' | 'suMisura' | 'upcycling';

export default function Landing() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [showLogo, setShowLogo] = useState<boolean>(false);
  // Layout statico: nessuna animazione, dimensioni fisse

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

  // Logo sempre nero, monocromatico
  const logoFilter = 'saturate(0) brightness(0)';

  // Navigazione CTA rimossa su richiesta

  const Panel = ({
    panel,
    title,
    img,
  }: {
    panel: PanelKey;
    title: string;
    img: string;
  }) => {
    const isActive = panel === 'collezione'; // layout statico: primo pannello attivo
    return (
      <section
        className={`group relative h-screen overflow-hidden flex-shrink-0`}
        style={{
          // Dimensioni fisse (nessuna animazione)
          width: isDesktop ? (panel === 'collezione' ? '70%' : '15%') : undefined,
          height: !isDesktop ? (panel === 'collezione' ? '70vh' : '15vh') : undefined,
        }}
      >
        {/* Image */}
        <img
          src={img}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover`}
        />

        {/* Overlay statico per leggibilità */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/35 to-transparent pointer-events-none`}
        />

        {/* Testo: se attivo, orizzontale con titolo + sottotitolo; se chiuso su desktop, titolo verticale */}
        {isActive ? (
          <div className={`pointer-events-none absolute inset-0 flex items-center justify-end text-right text-[#fffaf0]`}>
            <div className="px-6 md:px-10">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-wide opacity-100 drop-shadow-lg">{title}</h2>
              <p className="mt-3 text-sm md:text-base max-w-xl opacity-100 drop-shadow">
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
      >
        <Panel panel="collezione" title="Collezione" img={imgCollezione} />
        <Panel panel="suMisura" title="Su Misura" img={imgSuMisura} />
        <Panel panel="upcycling" title="Upcycling" img={imgUpcycling} />
      </div>
    </div>
  );
}