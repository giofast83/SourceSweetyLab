import React from 'react';
import { useInView } from '../../utils/useInView';

export type ProductDetailBlockProps = {
  title?: string;
  mainImage: string;
  // Testo descrittivo – puoi passare un unico testo oppure suddividere in campi
  ispirazione?: string;
  materiali?: string;
  lavorazione?: string;
  vestibilita?: string;
  description?: string;
  galleryImages?: string[]; // 3–5 immagini
};

// Blocco riutilizzabile per "Dettaglio Capi e Storia del Prodotto"
// Desktop: immagine grande a sinistra, testo a destra; galleria sotto l'immagine
// Mobile: tutto impilato verticalmente (immagine, testo, galleria)
export default function ProductDetailBlock(props: ProductDetailBlockProps) {
  const { ref, inView } = useInView();
  const {
    title,
    mainImage,
    ispirazione,
    materiali,
    lavorazione,
    vestibilita,
    description,
    galleryImages = [],
  } = props;

  return (
    <section
      ref={ref}
      className={`sl-fade-section ${inView ? 'sl-fade-in' : ''} w-full py-10 md:py-16`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-6 md:mb-8">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Immagine principale */}
          <div>
            <img
              src={mainImage}
              alt=""
              className="w-full h-auto rounded-none object-cover"
            />
            {/* Galleria (mobile: viene resa sotto; desktop: resta sotto l'immagine a sinistra) */}
            {galleryImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {galleryImages.slice(0, 5).map((src, i) => (
                  <img key={i} src={src} alt="" className="w-full h-24 object-cover" />
                ))}
              </div>
            )}
          </div>

          {/* Testo descrittivo */}
          <div className="text-neutral-800 leading-relaxed">
            {description && (
              <p className="mb-6 md:mb-8 text-base md:text-lg">{description}</p>
            )}
            {/* Campi opzionali singoli */}
            {ispirazione && (
              <div className="mb-4">
                <h3 className="font-serif text-lg text-neutral-900 mb-2">Ispirazione</h3>
                <p className="text-base md:text-lg">{ispirazione}</p>
              </div>
            )}
            {materiali && (
              <div className="mb-4">
                <h3 className="font-serif text-lg text-neutral-900 mb-2">Materiali</h3>
                <p className="text-base md:text-lg">{materiali}</p>
              </div>
            )}
            {lavorazione && (
              <div className="mb-4">
                <h3 className="font-serif text-lg text-neutral-900 mb-2">Lavorazione Artigianale</h3>
                <p className="text-base md:text-lg">{lavorazione}</p>
              </div>
            )}
            {vestibilita && (
              <div className="mb-4">
                <h3 className="font-serif text-lg text-neutral-900 mb-2">Vestibilità</h3>
                <p className="text-base md:text-lg">{vestibilita}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}