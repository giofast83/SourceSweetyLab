import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

// Placeholder immagini (sostituibili in seguito)
import heroImg from '../assets/creazione-08-1024.jpg';
import essenzaImg from '../assets/creazione-01-1024.jpg';
import lunaImg from '../assets/creazione-02-1024.jpg';
import radiciImg from '../assets/creazione-03-1024.jpg';
import auroraImg from '../assets/creazione-04-1024.jpg';

export default function CollectionPage() {
  usePageMeta(
    'Collezione — SweetyLab',
    'Scopri le mini collezioni a tiratura limitata: Essenza, Luna, Radici, Aurora. Artigianalità, materiali selezionati e design minimale.'
  );

  const collections = [
    {
      title: 'Essenza',
      description: 'Linee pulite, minimalismo femminile',
      image: essenzaImg,
      href: '/collezione/essenza',
    },
    {
      title: 'Luna',
      description: 'Eleganza morbida, drappeggi e volumi',
      image: lunaImg,
      href: '/collezione/luna',
    },
    {
      title: 'Radici',
      description: 'Texture, matericità e natura',
      image: radiciImg,
      href: '/collezione/radici',
    },
    {
      title: 'Aurora',
      description: 'Colori soft e silhouette eteree',
      image: auroraImg,
      href: '/collezione/aurora',
    },
  ];

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

      {/* Intro testuale breve per SEO e chiarezza */}
      <section className="px-6 md:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
            Mini collezioni a tiratura limitata
          </h2>
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
            Capsule pensate per valorizzare materia, proporzioni ed equilibrio. Ogni collezione racconta un punto di
            vista essenziale e femminile, con tessuti selezionati e finiture artigianali.
          </p>
        </div>
      </section>

      {/* Griglia diretta 2x2: accesso immediato alle collezioni */}
      <section className="px-6 md:px-8 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {collections.map((c) => (
              <Link
                key={c.title}
                to={c.href}
                className="group block rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all"
                aria-label={`Scopri la collezione ${c.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={`Collezione ${c.title}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-xl md:text-2xl font-serif text-neutral-900 mb-2">{c.title}</h3>
                  <p className="text-neutral-700 mb-4">{c.description}</p>
                  <span className="inline-flex items-center gap-2 text-cipria-700 font-medium">
                    Scopri la collezione
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale – stile identico a CTA Aurora */}
      <section aria-label="CTA Prenota consulenza" className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-gray-800">
            Vuoi indossare un capo della nostra collezione?
          </h3>
          <div className="mt-6">
            <Link to="/contatti" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cipria-600 hover:bg-cipria-600 text-base font-medium text-white transition-colors duration-300">
              Prenota una consulenza
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD ItemList per migliorare la comprensione della pagina */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: collections.map((c, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: c.href,
              name: c.title,
              description: c.description,
            })),
          }),
        }}
      />
    </div>
  );
}