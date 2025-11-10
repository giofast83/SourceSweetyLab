import React from 'react';
import CollectionPanel from '../components/CollectionPanel';

// Placeholder immagini (sostituibili in seguito)
import heroImg from '../assets/creazione-08-1024.jpg';
import essenzaImg from '../assets/creazione-01-1024.jpg';
import lunaImg from '../assets/creazione-02-1024.jpg';
import radiciImg from '../assets/creazione-03-1024.jpg';

export default function CollectionPage() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-800">
      {/* HERO fullscreen, atmosfera morbida, nessun bottone */}
      <section className="relative w-full h-screen">
        {/* Immagine */}
        <img
          src={heroImg}
          alt="Collezione – Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay leggero: più forte su mobile */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

        {/* Titolo grande centrato + sottotitolo */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="pt-20 md:pt-24">
            <h1
              className="text-white text-4xl sm:text-5xl md:text-6xl font-serif tracking-wide mb-4"
              style={{ textShadow: '0 4px 16px rgba(0,0,0,0.75)' }}
            >
              Collezione
            </h1>
            <p
              className="text-white/90 text-base md:text-lg"
              style={{ textShadow: '0 3px 12px rgba(0,0,0,0.7)' }}
            >
              Mini collezioni a tiratura limitata
            </p>
          </div>
        </div>
      </section>

      {/* 4 pannelli verticali fullscreen */}
      <CollectionPanel
        title="Essenza"
        subtitle="Linee pulite, minimalismo femminile"
        image={essenzaImg}
        href="/collezione/essenza"
      />
      <CollectionPanel
        title="Luna"
        subtitle="Eleganza morbida, drappeggi e volumi"
        image={lunaImg}
        href="/collezione/luna"
      />
      <CollectionPanel
        title="Radici"
        subtitle="Texture, matericità e natura"
        image={radiciImg}
        href="/collezione/radici"
      />
      {/* Pannello Aurora rimosso */}
    </div>
  );
}

