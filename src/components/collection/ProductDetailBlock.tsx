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
  // Variante full-bleed: 100% width, due colonne senza bordo; immagine a sinistra edge-to-edge
  fullBleed?: boolean;
  // Aspetto dell'immagine principale: 'square' forza il formato quadrato (aspect-ratio 1:1)
  mainAspect?: 'auto' | 'square';
  // Allineamento verticale del contenuto testuale nella colonna destra (solo desktop)
  alignY?: 'start' | 'center';
  // Modalità "cover" con overlay: immagine a tutta larghezza, overlay scuro e contenuti sovrapposti (colonna destra)
  coverOverlay?: boolean;
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
    fullBleed = false,
    mainAspect = 'auto',
    alignY = 'start',
    coverOverlay = false,
  } = props;

  return (
    <section
      ref={ref}
      className={`sl-fade-section ${inView ? 'sl-fade-in' : ''} w-full py-10 md:py-16`}
    >
      {coverOverlay ? (
        // Modalità cover: immagine a tutta larghezza con overlay e contenuti sovrapposti (colonna destra)
        <div className="relative w-full">
          {/* Immagine full width */}
          <img
            src={mainImage}
            alt=""
            className="w-full h-[60vh] md:h-[75vh] object-cover"
          />
          {/* Overlay scuro per migliorare leggibilità del testo */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" aria-hidden="true" />
          {/* Contenuto sovrapposto – allineato alla colonna destra */}
          <div className="absolute inset-0">
            <div className="max-w-6xl mx-auto h-full px-6 md:px-10 grid grid-cols-1 md:grid-cols-2">
              <div className="md:col-start-2 flex flex-col justify-center text-white">
                {title && (
                  <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-6 md:mb-8">{title}</h2>
                )}
                {description && (
                  <p className="mb-6 md:mb-8 text-base md:text-lg">{description}</p>
                )}
                {ispirazione && (
                  <div className="mb-4">
                    <h3 className="font-serif text-lg mb-2">Ispirazione</h3>
                    <p className="text-base md:text-lg">{ispirazione}</p>
                  </div>
                )}
                {materiali && (
                  <div className="mb-4">
                    <h3 className="font-serif text-lg mb-2">Materiali</h3>
                    <p className="text-base md:text-lg">{materiali}</p>
                  </div>
                )}
                {lavorazione && (
                  <div className="mb-4">
                    <h3 className="font-serif text-lg mb-2">Lavorazione Artigianale</h3>
                    <p className="text-base md:text-lg">{lavorazione}</p>
                  </div>
                )}
                {vestibilita && (
                  <div className="mb-4">
                    <h3 className="font-serif text-lg mb-2">Vestibilità</h3>
                    <p className="text-base md:text-lg">{vestibilita}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={fullBleed ? 'w-full' : 'max-w-6xl mx-auto px-4'}>
          {!fullBleed && title && (
            <h2 className={`text-2xl md:text-3xl font-serif text-neutral-900 mb-6 md:mb-8`}>
              {title}
            </h2>
          )}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${fullBleed ? 'gap-0' : 'gap-8 md:gap-12'} items-start ${alignY === 'center' ? 'md:items-center' : ''}`}>
            {/* Immagine principale */}
            <div className={fullBleed ? '' : ''}>
              {mainAspect === 'square' ? (
                <div className="relative w-full aspect-square">
                  <img
                    src={mainImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <img
                  src={mainImage}
                  alt=""
                  className={`w-full h-auto rounded-none object-cover ${fullBleed ? '' : ''}`}
                />
              )}
              {/* Galleria (mobile: viene resa sotto; desktop: resta sotto l'immagine a sinistra) */}
              {galleryImages.length > 0 && (
                <div className={`mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3 ${fullBleed ? 'px-6 md:px-10' : ''}`}>
                  {galleryImages.slice(0, 5).map((src, i) => (
                    <img key={i} src={src} alt="" className="w-full h-24 object-cover" />
                  ))}
                </div>
              )}
            </div>

            {/* Testo descrittivo */}
            <div className={`text-neutral-800 leading-relaxed ${fullBleed ? 'px-6 md:px-10' : ''} ${alignY === 'center' ? 'md:self-center' : ''}`}>
              {fullBleed && title && (
                <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-6 md:mb-8">{title}</h2>
              )}
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
      )}
    </section>
  );
}