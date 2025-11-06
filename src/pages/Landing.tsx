import { useEffect, useState } from 'react';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

// Immagini rappresentative dai contenuti del progetto
import imgCollezione from '../assets/creazione-08-1024.jpg';
import imgSuMisura from '../assets/atelier-in-azione-1024.jpg';
import imgUpcycling from '../assets/tessuti-pregiati-1024.jpg';

type PanelKey = 'collezione' | 'suMisura' | 'upcycling';

const panels: { key: PanelKey; title: string; image: string; description: string }[] = [
  {
    key: 'collezione',
    title: 'Collezione',
    image: imgCollezione,
    description: 'Mini collezioni a tiratura limitata',
  },
  {
    key: 'suMisura',
    title: 'Su Misura',
    image: imgSuMisura,
    description: 'Il tuo abito, creato solo per te',
  },
  {
    key: 'upcycling',
    title: 'Upcycling',
    image: imgUpcycling,
    description: 'Trasforma e rinnova i tuoi capi',
  },
];

export default function Landing() {
  const [active, setActive] = useState<PanelKey>('collezione');
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  // Rileva se il device supporta hover (desktop con puntatore fine)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsHoverDevice(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const basisFor = (key: PanelKey) => {
    // Attivo 70%, laterali 15% come richiesto
    return active === key ? 'basis-[70%]' : 'basis-[15%]';
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {/* Logo con riga semitrasparente, poco staccata dall'alto e posizionata in alto a sinistra.
          La riga è leggermente più larga del logo (grazie al padding) e resta sovrapposta alle foto. */}
      <div className="pointer-events-none fixed top-4 md:top-6 left-4 md:left-0 md:right-0 z-20">
        <div className="relative">
          <div className="inline-flex md:flex items-center justify-center md:justify-start bg-white/75 rounded-full md:rounded-none h-16 md:h-20 px-4 md:px-8 w-auto md:w-full">
            <img
              src={logoSweetyLab}
              alt="SweetyLab"
              className="h-12 md:h-16"
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row h-full w-full"
        onMouseLeave={isHoverDevice ? () => setActive('collezione') : undefined}
      >
        {panels.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-label={`Apri ${p.title}`}
            aria-expanded={active === p.key}
            onMouseEnter={
              isHoverDevice ? () => setActive(p.key) : undefined
            }
            onClick={!isHoverDevice ? () => setActive(p.key) : undefined}
            className={`group relative h-auto md:h-full ${basisFor(p.key)} overflow-hidden transition-all duration-1000 ease-in-out transform-gpu focus:outline-none hover:brightness-105 hover:scale-[1.01]`}
            style={{
              backgroundImage: `url(${p.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'flex-basis, opacity, transform, filter',
            }}
          >
            {/* Velo per contrasto testo: rimosso sul pannello attivo */}
            <div className={`absolute inset-0 ${active === p.key ? 'bg-black/0' : 'bg-black/50'} transition-colors duration-1000`} />

            {/* Etichetta/Contenuto */}
            <div className="absolute inset-0 p-6 md:p-8">
              {active === p.key ? (
                // Pannello attivo: contenuto allineato in basso a destra
                <div className="absolute bottom-0 right-0 w-full flex justify-end text-right pb-6 md:pb-12">
                  <div className="flex flex-col gap-3 md:gap-4 text-white items-end transition-opacity duration-900 ease-in-out opacity-100 pr-6 md:pr-12">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-wide" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.9)' }}>
                      {p.title}
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-white/90" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.7)' }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              ) : (
                // Pannello ridotto: titolo ruotato (90°) sul bordo destro, allineato in basso
                <div className="absolute right-4 md:right-8 bottom-4 md:bottom-6 z-10">
                  <h2
                    className="text-white text-3xl md:text-4xl lg:text-4xl font-medium leading-none tracking-tight transition-all duration-900 ease-in-out rotate-0 md:rotate-90 origin-bottom-right md:origin-right whitespace-nowrap"
                    style={{ textShadow: '0 4px 18px rgba(0,0,0,0.85)' }}
                  >
                    {p.title}
                  </h2>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}