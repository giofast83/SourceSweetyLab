import React from 'react';

type CollectionPanelProps = {
  title: string;
  subtitle: string;
  image: string; // URL import
  href: string;
};

export default function CollectionPanel({ title, subtitle, image, href }: CollectionPanelProps) {
  return (
    <a
      href={href}
      className="group relative block w-full h-screen overflow-hidden focus:outline-none"
      aria-label={`Apri collezione: ${title}`}
    >
      {/* Immagine fullscreen con slight zoom on hover */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {/* Overlay: leggerissimo, più forte su mobile; su hover si alleggerisce ma non sparisce */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/20 transition-colors duration-700 group-hover:bg-black/20 md:group-hover:bg-black/10" />

      {/* Testi bottom-left */}
      <div className="absolute inset-0 flex items-end justify-start px-6 md:px-12 pb-16 md:pb-20 text-left">
        <div className="max-w-3xl">
          <h3
            className="text-white text-3xl md:text-5xl font-serif mb-3 md:mb-4 tracking-wide"
            style={{ textShadow: '0 3px 12px rgba(0,0,0,0.7)' }}
          >
            {title}
          </h3>
          <p
            className="text-white/90 text-base md:text-lg"
            style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </a>
  );
}