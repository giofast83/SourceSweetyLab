import React from 'react';
import { useInView } from '../../utils/useInView';

type Theme = 'neutral' | 'cipria' | 'contact';
type Align = 'left' | 'center';

export type CollectionIntroProps = {
  title: string;
  paragraphs: string[]; // 2–4 righe max
  theme?: Theme; // 'neutral' o 'cipria'
  align?: Align; // desktop: left/center
  fadeIn?: boolean; // micro-interazione opzionale
  maxWidth?: 'sm' | 'md' | 'lg'; // controlla la larghezza del testo
  background?: 'none' | 'cipria' | 'contactCard'; // consente di impostare un colore di fondo (es. uguale al footer o come la card contatti)
  paragraphWeight?: 'normal' | 'light'; // peso del testo descrittivo (più fino)
  paragraphFont?: 'sans' | 'serif' | 'work'; // famiglia tipografica del paragrafo
  titleDivider?: 'none' | 'soft' | 'contact'; // riga divisoria sotto il titolo
  sideImageSrc?: string; // immagine laterale (a destra) opzionale
  sideImageAlt?: string; // descrizione per accessibilità
  sideImageCaption?: string; // didascalia sotto l'immagine (opzionale)
};

// Sezione introduttiva per pagina collezione: titolo + descrizione
// - Tipografia elegante e minimal
// - Layout responsive (desktop e mobile)
// - Opzione di micro-interazione fade-in
export default function CollectionIntro(props: CollectionIntroProps) {
  const {
    title,
    paragraphs,
    theme = 'neutral',
    align = 'left',
    fadeIn = true,
    maxWidth = 'md',
    background = 'none',
    paragraphWeight = 'normal',
    paragraphFont = 'sans',
    titleDivider = 'none',
    sideImageSrc,
    sideImageAlt,
    sideImageCaption,
  } = props;

  const { ref, inView } = useInView();

  // Mappa colori coerente con brand
  const titleColor =
    theme === 'cipria' ? 'text-rose-700' : theme === 'contact' ? 'text-gray-800' : 'text-neutral-900';
  const textColor =
    theme === 'cipria' ? 'text-rose-700' : theme === 'contact' ? 'text-gray-600' : 'text-neutral-700';
  const textAlign = align === 'center' ? 'text-center' : 'text-left';
  const widthClass = maxWidth === 'sm' ? 'max-w-xl' : maxWidth === 'md' ? 'max-w-2xl' : 'max-w-4xl';
  const bgClass = background === 'cipria'
    ? 'bg-cipria-50'
    : background === 'contactCard'
      ? 'bg-gradient-to-br from-pink-50 to-amber-50'
      : '';
  const weightClass = paragraphWeight === 'light' ? 'font-light' : 'font-normal';
  const fontClass = paragraphFont === 'serif' ? 'font-serif' : paragraphFont === 'work' ? 'font-work' : 'font-sans';
  const dividerColor = theme === 'cipria' || theme === 'contact' ? 'bg-[#E8BFC7]' : 'bg-neutral-300';
  const dividerAlign = align === 'center' ? 'mx-auto' : '';

  return (
    <section
      ref={ref}
      className={`w-full py-10 md:py-14 ${bgClass} ${fadeIn ? `sl-fade-section ${inView ? 'sl-fade-in' : ''}` : ''}`}
    >
      <div className={`max-w-6xl mx-auto px-4`}>
        <div className={`grid md:grid-cols-2 gap-8 items-start ${textAlign}`}>
          <div>
            {/* Titolo collezione */}
            <h1 className={`font-serif ${titleColor} text-3xl md:text-4xl tracking-tight`}>{title}</h1>
            {titleDivider === 'soft' && (
              <div className={`mt-3 mb-2 h-[1px] w-20 md:w-24 ${dividerColor} ${dividerAlign}`} aria-hidden="true"></div>
            )}
      {titleDivider === 'contact' && (
        <div className={`mt-3 h-px w-24 bg-cipria-600 ${dividerAlign} mb-8`} aria-hidden="true"></div>
      )}

            {/* Descrizione – suddivisa in brevi paragrafi leggibili */}
            <div className={`mt-4 ${widthClass} ${textColor}`}>
              {paragraphs.map((p, idx) => (
                <p key={idx} className={`text-[18px] leading-relaxed ${fontClass} ${weightClass} ${idx > 0 ? 'mt-3' : ''}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {sideImageSrc && (
            <div className="mt-6 md:mt-0">
              {/* Angoli arrotondati come lo slideshow: 20px su base, 22px su desktop */}
              <div className="w-full overflow-hidden rounded-[20px] md:rounded-[22px] shadow-sm border border-neutral-200/40">
                <img
                  src={sideImageSrc}
                  alt={sideImageAlt || ''}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {sideImageCaption && (
                <p className="mt-3 text-base text-neutral-600">{sideImageCaption}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/*
Come personalizzare:
- title: string – imposta il nome della collezione (es. "Aurora").
- paragraphs: string[] – 2–4 righe con ispirazione, materiali, artigianalità, Made in Italy.
- theme: 'neutral' | 'cipria' – colori tipografici coerenti con il brand.
- align: 'left' | 'center' – allineamento del testo su desktop.
- fadeIn: boolean – abilita/disable il fade-in all’entrata nello viewport.
- maxWidth: 'sm' | 'md' | 'lg' – larghezza massima del blocco descrizione.

Esempio d’uso:
<CollectionIntro
  title="Aurora"
  paragraphs={[
    "Aurora nasce dall’incontro tra luce e materia: tonalità morbide e riflessi che esaltano la silhouette.",
    "Materiali selezionati e fibre pregiate, lavorati con cura nel nostro atelier.",
    "Un’eleganza quieta, artigianale, interamente Made in Italy."
  ]}
  theme="neutral"
  align="left"
  fadeIn
  maxWidth="md"
/>
*/