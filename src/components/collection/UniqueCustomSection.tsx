import React from 'react';
import { useInView } from '../../utils/useInView';

export type UniqueCustomSectionProps = {
  images: string[]; // laboratorio, prototipi, tessuti, cartamodelli
  claim?: string; // "Dal figurino al capo finito"
};

// Sezione "Pezzi Unici e Su Misura" – look editoriale, aria bianca, nessuna cornice
export default function UniqueCustomSection({ images, claim }: UniqueCustomSectionProps) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={`sl-fade-section ${inView ? 'sl-fade-in' : ''} w-full py-12 md:py-18`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {claim && (
          <p className="text-center font-serif text-xl md:text-2xl text-neutral-900 mb-8 md:mb-12">
            {claim}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {images.map((src, i) => (
            <img key={i} src={src} alt="" className="w-full h-auto object-cover" />
          ))}
        </div>
      </div>
    </section>
  );
}