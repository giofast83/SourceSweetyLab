import React, { useEffect, useState } from 'react';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  image: string; // URL import
};

export default function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Immagine fullscreen con ken burns lento (scala leggera on mount) */}
      <img
        src={image}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] ease-out ${
          animate ? 'scale-[1.03]' : 'scale-[1.00]'
        }`}
      />
      {/* Overlay leggero: più forte su mobile */}
      <div className="absolute inset-0 bg-black/35 md:bg-black/20 transition-opacity" />

      {/* Titolo e sottotitolo centrati */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        {/* Compensa la navbar fissa */}
        <div className="pt-20 md:pt-24">
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl font-serif tracking-wide mb-4"
            style={{ textShadow: '0 4px 16px rgba(0,0,0,0.75)' }}
          >
            {title}
          </h1>
          <p
            className="text-white/90 text-base md:text-lg"
            style={{ textShadow: '0 3px 12px rgba(0,0,0,0.7)' }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}