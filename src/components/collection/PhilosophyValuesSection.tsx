import React from 'react';
import { useInView } from '../../utils/useInView';

export type PhilosophyValuesSectionProps = {
  image: string;
  values: string[]; // inclusività, sostenibilità, Made in Italy, artigianalità
  quotes?: string[]; // citazioni brevi delle fondatrici
  layout?: 'split' | 'vertical';
};

// Sezione "Filosofia e Valori della Collezione" – split screen su desktop, verticale su mobile
export default function PhilosophyValuesSection({ image, values, quotes = [], layout = 'split' }: PhilosophyValuesSectionProps) {
  const { ref, inView } = useInView();
  const isSplit = layout === 'split';
  return (
    <section
      ref={ref}
      className={`sl-fade-section ${inView ? 'sl-fade-in' : ''} w-full py-12 md:py-18`}
    >
      <div className={`max-w-6xl mx-auto px-4 ${isSplit ? 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center' : ''}`}>
        {/* Immagine */}
        <div className={`${isSplit ? '' : 'mb-8 md:mb-10'}`}>
          <img src={image} alt="" className="w-full h-auto object-cover" />
        </div>

        {/* Testo e valori */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-6">Filosofia e Valori</h2>
          <ul className="space-y-2 md:space-y-3 text-neutral-800">
            {values.map((v, i) => (
              <li key={i} className="text-base md:text-lg">• {v}</li>
            ))}
          </ul>
          {quotes.length > 0 && (
            <div className="mt-6 md:mt-8 space-y-4">
              {quotes.map((q, i) => (
                <blockquote key={i} className="font-serif text-neutral-900 text-lg md:text-xl">
                  “{q}”
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}