import React from 'react';
// Usa la stessa immagine della landing per il banner Collezione
import heroTopImg from '../assets/creazione-08-1024.jpg';
// Mantieni l'immagine dei dettagli per la sezione finale
import dettagliImg from '../assets/dettagli-artigianali-1024.jpg';
import atelierImg from '../assets/atelier-in-azione-1024.jpg';
import tessutiImg from '../assets/tessuti-pregiati-1024.jpg';

export default function Collezione() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-800 pt-0">
      {/* HERO 70vh */}
      <section
        className="relative h-[70vh] w-full"
        style={{
          backgroundImage: `url(${heroTopImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Hero Collezione"
      >
        {/* Overlay nero leggero (40%) */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Titolo posizionato bottom-right nel banner per un look elegante */}
        <div className="absolute inset-0 flex items-end justify-end px-6 md:px-12 pb-16 md:pb-20 text-right">
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl font-serif tracking-wide"
            style={{ textShadow: '0 3px 10px rgba(0,0,0,0.7)' }}
          >
            Collezione
          </h1>
        </div>
      </section>

      {/* SEZIONE INTRODUTTIVA */}
      <section className="px-6 md:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
            Mini collezioni a tiratura limitata
          </h2>
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
            Capi sartoriali creati con cura e attenzione ai dettagli, in tirature limitate per garantire unicità e
            qualità. Ogni mini collezione celebra l’artigianalità, la selezione di tessuti pregiati e un design
            essenziale, pensato per valorizzare chi li indossa.
          </p>
        </div>
      </section>
      {/* SEZIONI FULL-BLEED in stile Landing */}
      <section
        className="relative h-[60vh] md:h-[70vh] w-full"
        style={{
          backgroundImage: `url(${atelierImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Atelier in azione"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end justify-start px-6 md:px-12 pb-16">
          <div className="max-w-3xl text-left">
            <h3 className="text-white text-3xl md:text-4xl font-serif mb-4" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.7)' }}>
              Sartorialità in azione
            </h3>
            <p className="text-white/90 text-base md:text-lg" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>
              Dettagli curati, lavorazioni a mano e un approccio essenziale che mette al centro la qualità.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative h-[60vh] md:h-[70vh] w-full"
        style={{
          backgroundImage: `url(${tessutiImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Tessuti pregiati"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end justify-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl text-right">
            <h3 className="text-white text-3xl md:text-4xl font-serif mb-4" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.7)' }}>
              Tessuti selezionati
            </h3>
            <p className="text-white/90 text-base md:text-lg" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>
              Materiali scelti con cura per garantire comfort, estetica e durabilità, in capsule limitate.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative h-[60vh] md:h-[70vh] w-full"
        style={{
          backgroundImage: `url(${dettagliImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Dettagli artigianali"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end justify-start px-6 md:px-12 pb-16">
          <div className="max-w-3xl text-left">
            <h3 className="text-white text-3xl md:text-4xl font-serif mb-4" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.7)' }}>
              Dettagli artigianali
            </h3>
            <p className="text-white/90 text-base md:text-lg" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>
              Finiture minuziose e un’estetica minimale che valorizza silhouette e proporzioni.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINALE (più ampia e meglio allineata) */}
      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 text-center md:text-left leading-snug">
              Vuoi provare i capi in atelier?
            </h3>
            <a
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cipria-600 hover:bg-cipria-700 text-white text-base md:text-lg px-7 md:px-8 py-3.5 md:py-4 shadow-sm hover:shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cipria-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Prenota un appuntamento
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}