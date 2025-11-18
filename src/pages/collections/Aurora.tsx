import React, { useEffect, useRef, useState } from 'react';
import './aurora.css';
// Sezione introduttiva titolo + descrizione
import CollectionIntro from '../../components/collection/CollectionIntro';
import OtherCollectionsCarousel from '../../components/collection/OtherCollectionsCarousel';
// Rimosse le sezioni sottostanti l'hero: lasciamo solo titolo e descrizione della collezione

// Immagini placeholder per la collezione Aurora (sostituibili in seguito)
import img1 from '../../assets/creazione-01-1024.jpg';
import img2 from '../../assets/creazione-02-1024.jpg';
import img3 from '../../assets/creazione-03-1024.jpg';
import img4 from '../../assets/creazione-04-1024.jpg';
import img5 from '../../assets/creazione-05-1024.jpg';
import img6 from '../../assets/creazione-06-1024.jpg';
// Asset aggiuntivi per sezioni editoriali
// (Nessun asset aggiuntivo necessario sotto l'hero)

export default function Aurora() {
  const images = [img1, img2, img3, img4, img5, img6];
  // Slideshow fullscreen: la prima foto è al 100%; durante lo scorrimento le due foto sono al 50% ciascuna
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const [mobileDir, setMobileDir] = useState<'forward' | 'backward'>('forward');

  const startTransition = (toIdx: number, dir: 'forward' | 'backward' = 'forward') => {
    if (transitioning || toIdx === currentIdx) return;
    setMobileDir(dir);
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
  const next = () => startTransition((currentIdx + 1) % images.length, 'forward');
  const prev = () => startTransition((currentIdx - 1 + images.length) % images.length, 'backward');

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
    <main className="min-h-screen bg-paper">
      <div
        className="relative w-full h-screen overflow-hidden"
        style={isMobile ? { height: '100dvh' as any } : undefined}
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
                <div
                  className={
                    `aurora-mobile-pane ${mobileDir === 'forward' ? 'aurora-mobile-out' : 'aurora-mobile-out-right'}`
                  }
                  style={{ left: '0' }}
                >
                  <img src={images[currentIdx]} alt="" className="w-full h-full object-cover" />
                </div>
                <div
                  className={
                    `aurora-mobile-pane ${mobileDir === 'forward' ? 'aurora-mobile-in' : 'aurora-mobile-in-left'}`
                  }
                  style={{ left: '0' }}
                >
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

      {/* Intro collezione – titolo e descrizione, subito sotto l'hero */}
      <div className="pt-6 md:pt-8 bg-gradient-to-br from-pink-50 to-amber-50">
      <CollectionIntro
        title="Aurora"
        paragraphs={[
          'Aurora nasce dall’incontro tra luce e materia: tonalità morbide e riflessi che esaltano la silhouette.',
          'Materiali selezionati e fibre pregiate, lavorati con cura nel nostro atelier.',
          'Un’eleganza quieta, artigianale, interamente Made in Italy.'
        ]}
        theme="contact"
        align="left"
        background="contactCard"
        paragraphWeight="light"
        paragraphFont="work"
        titleDivider="contact"
        sideImageSrc={img6}
        sideImageAlt="Bozza del disegno dell’abito – collezione Aurora"
        sideImageCaption="Bozza del disegno realizzata durante la fase di creazione in atelier"
        fadeIn
        maxWidth="md"
      />
      </div>


      {/* Altre collezioni – slideshow rettangolare centrato con gradiente cipria e label animata */}
      <OtherCollectionsCarousel
        title="Altre collezioni"
        items={[
          { title: 'Essenza', subtitle: 'Linee pulite, minimalismo femminile', image: img1, href: '/collezione/essenza' },
          { title: 'Luna', subtitle: 'Eleganza morbida, drappeggi e volumi', image: img2, href: '/collezione/luna' },
          { title: 'Radici', subtitle: 'Texture, matericità e natura', image: img3, href: '/collezione/radici' },
        ]}
        autoPlay
        intervalMs={5000}
      />

      {/* CTA – spostato sotto lo slideshow "Altre collezioni" */}
      <section aria-label="CTA Prenota consulenza" className="pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-gray-800">
            Vuoi indossare un capo della collezione Aurora?
          </h3>
          <div className="mt-6">
            <a href="/contatti" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cipria-600 hover:bg-cipria-600 text-base font-medium text-white transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cipria-600 focus-visible:ring-offset-2">
              Prenota una consulenza
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}