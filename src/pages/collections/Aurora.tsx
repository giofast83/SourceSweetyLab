import React, { useEffect, useRef, useState } from 'react';
import './aurora.css';

// Immagini placeholder per la collezione Aurora (sostituibili in seguito)
import img1 from '../../assets/creazione-01-1024.jpg';
import img2 from '../../assets/creazione-02-1024.jpg';
import img3 from '../../assets/creazione-03-1024.jpg';
import img4 from '../../assets/creazione-04-1024.jpg';
import img5 from '../../assets/creazione-05-1024.jpg';
import img6 from '../../assets/creazione-06-1024.jpg';

export default function Aurora() {
  const images = [img1, img2, img3, img4, img5, img6];
  // Slideshow fullscreen: la prima foto è al 100%; durante lo scorrimento le due foto sono al 50% ciascuna
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const startTransition = (toIdx: number) => {
    if (transitioning || toIdx === currentIdx) return;
    setNextIdx(toIdx);
    setTransitioning(true);
    // Modalità 50/50: dalla seconda foto in poi le due foto occupano 50% ciascuna; la nuova entra da destra nel pannello destro
    const duration = 800; // ms (sincronizzato con CSS)
    setTimeout(() => {
      // Alla fine della transizione, la foto di destra diventa la nuova foto di sinistra
      setPrevIdx(currentIdx);
      setCurrentIdx(toIdx);
      setNextIdx(null);
      setTransitioning(false);
      // Mantieni prevIdx come immagine di sinistra (quella precedente)
    }, duration + 50);
  };

  // Navigazione semplice: avanti/indietro
  const next = () => startTransition((currentIdx + 1) % images.length);
  const prev = () => startTransition((currentIdx - 1 + images.length) % images.length);

  // Permetti frecce tastiera
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, transitioning]);

  // Rileva mobile per usare lo slideshow fullscreen (slide da destra a sinistra, ogni foto a schermo intero)
  useEffect(() => {
    const detect = () => setIsMobile(window.innerWidth < 768); // breakpoint md
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);

  // Gesture swipe su mobile: trascina a sinistra/destra per cambiare slide
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const dx = endX - touchStartXRef.current;
    const threshold = 40; // px
    if (Math.abs(dx) > threshold && !transitioning) {
      if (dx < 0) next(); // swipe left -> next
      else prev(); // swipe right -> prev
    }
    touchStartXRef.current = null;
  };

  return (
    <>
      <div
        className="relative w-full h-screen bg-black overflow-hidden"
        {...(isMobile ? { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd } : {})}
      >
        {isMobile ? (
          // Mobile: ogni foto a schermo intero, slide da destra verso sinistra
          <>
            {!transitioning && (
              <img
                src={images[currentIdx]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {transitioning && nextIdx !== null && (
              <>
                <div className="aurora-mobile-pane aurora-mobile-out" style={{ left: '0' }}>
                  <img src={images[currentIdx]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aurora-mobile-pane aurora-mobile-in" style={{ left: '0' }}>
                  <img src={images[nextIdx]} alt="" className="w-full h-full object-cover" />
                </div>
              </>
            )}
          </>
        ) : (
          // Desktop: comportamento 50/50 con primo scorrimento speciale
          <>
            {/* Stato: vista singola fullscreen solo per la primissima foto; dalla seconda in poi 50/50 */}
            {!transitioning && prevIdx === null && (
              <img
                src={images[currentIdx]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Stato: non in transizione dopo la prima foto -> 50/50 fisso */}
            {!transitioning && prevIdx !== null && (
              <>
                <div className="absolute top-0 left-0 z-0 pointer-events-none h-screen" style={{ width: '50vw' }}>
                  <img src={images[prevIdx]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 z-10 pointer-events-none h-screen" style={{ width: '50vw', left: '50vw' }}>
                  <img src={images[currentIdx]} alt="" className="w-full h-full object-cover" />
                </div>
              </>
            )}

            {/* Stato: durante scorrimento in modalità 50/50: entrambe le foto scorrono verso sinistra */}
            {transitioning && prevIdx !== null && nextIdx !== null && (
              <>
                {/* Pannello sinistro (prev): parte da sinistra e scorre fuori */}
                <div
                  className="aurora-pane aurora-shift-left"
                  style={{ left: '0vw', width: '50vw' }}
                >
                  <img src={images[prevIdx]} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Pannello centrale (current): parte a destra e scorre in posizione sinistra */}
                <div
                  className="aurora-pane aurora-shift-left"
                  style={{ left: '50vw', width: '50vw' }}
                >
                  <img src={images[currentIdx]} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Pannello destro (next): parte fuori a destra e scorre in posizione destra */}
                <div
                  className="aurora-pane aurora-shift-left"
                  style={{ left: '100vw', width: '50vw' }}
                >
                  <img src={images[nextIdx]} alt="" className="w-full h-full object-cover" />
                </div>
              </>
            )}

            {/* Primo scorrimento (prevIdx === null): la prima foto si riduce al 50% a sinistra, la seconda scorre e si ferma a destra */}
            {transitioning && prevIdx === null && nextIdx !== null && (
              <>
                {/* Sinistra: current si riduce da 100vw a 50vw */}
                <div className="aurora-pane aurora-first-left-shrink" style={{ left: '0vw', width: '100vw' }}>
                  <img
                    src={images[currentIdx]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Destra: next entra da destra e si ferma a 50vw */}
                <div className="aurora-pane aurora-shift-left" style={{ left: '100vw', width: '50vw' }}>
                  <img
                    src={images[nextIdx]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Controlli: su desktop miniature, su mobile frecce dx/sx */}
        {!isMobile && (
          <div className="aurora-thumbs z-30">
            {Array.from({ length: Math.min(4, images.length - 1) }).map((_, i) => {
              const idx = (currentIdx + 1 + i) % images.length;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => startTransition(idx)}
                  disabled={transitioning || idx === currentIdx}
                  className="aurora-thumb"
                >
                  <img src={images[idx]} alt="" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        )}

        {isMobile && (
          <div className="aurora-mobile-indicators z-30" aria-hidden={false}>
            {images.map((_, idx) => (
              <span
                key={idx}
                className={
                  'aurora-indicator-segment' + (idx === currentIdx ? ' aurora-indicator-active' : '')
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Sezione info collezione sotto l'hero, centrata – usa font e stili del sito */}
      <section className="section-sep w-full bg-paper text-neutral-900 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="h1-responsive font-semibold">Collezione Aurora</h1>
          <p className="mt-4 text-base md:text-lg text-neutral-700">
            Una selezione di scatti che raccontano la raffinatezza e i dettagli artigianali della collezione Aurora.
            Ogni immagine cattura texture, luce e movimento per valorizzare la qualità dei materiali e il design.
          </p>
        </div>
      </section>
    </>
  );
}