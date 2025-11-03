import React, { useEffect, useState } from 'react';
import creazione04Img from '../assets/creazione-04-1024.jpg';
import creazione05Img from '../assets/creazione-05-1024.jpg';
import creazione06Img from '../assets/creazione-06-1024.jpg';
import creazione07Img from '../assets/creazione-07-1024.jpg';
import creazione08Img from '../assets/creazione-08-1024.jpg';
import creazione09Img from '../assets/creazione-09-1024.jpg';

type TitleVariant = 'visible' | 'sr-only' | 'pill';

interface GalleryProps {
  title?: string;
  titleVariant?: TitleVariant;
  subtleDivider?: boolean;
}

function Gallery({
  title = 'Le nostre creazioni',
  titleVariant = 'visible',
  subtleDivider = true,
}: GalleryProps) {
  // Disattivate le prime tre foto (creazione 01-03) dalla gallery, senza eliminare i file
  const images = [
    { src: creazione07Img, alt: 'Abito contemporaneo con taglio sartoriale' },
    { src: creazione04Img, alt: 'Abito bohémien con trasparenze' },
    { src: creazione08Img, alt: 'Abito elegante con dettagli moderni' },
    { src: creazione05Img, alt: 'Abito minimal con linee pure' },
    { src: creazione09Img, alt: 'Abito sofisticato con texture pregiate' },
    { src: creazione06Img, alt: 'Abito vintage con perline' },
  ];

  // Duplichiamo le immagini per creare un effetto di scorrimento continuo
  const track = [...images, ...images];

  // Stato per slider mobile (una foto alla volta)
  const [mobileIndex, setMobileIndex] = useState(0);
  // Stato per swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((i) => (i + 1) % images.length);
    }, 4000); // cambio immagine ogni 4s su mobile
    return () => clearInterval(interval);
  }, [images.length]);

  // Gestione swipe mobile
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };
  const onTouchEnd = () => {
    const threshold = 50; // px
    if (touchDeltaX > threshold) {
      // swipe right -> precedente
      setMobileIndex((i) => (i - 1 + images.length) % images.length);
    } else if (touchDeltaX < -threshold) {
      // swipe left -> successiva
      setMobileIndex((i) => (i + 1) % images.length);
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <section aria-label="Galleria delle creazioni" className="marquee-container bg-gradient-to-br from-pink-50 via-white to-amber-50">
      {title && (
        <div className="px-4 sm:px-6 max-w-screen-xl mx-auto pt-14 sm:pt-16">
          {titleVariant === 'visible' && (
            <>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6 text-center">
                {title}
              </h2>
              {subtleDivider && (
                <div className="w-24 h-1 bg-pink-500 mx-auto mb-8" aria-hidden="true"></div>
              )}
            </>
          )}
          {titleVariant === 'sr-only' && (
            <h2 className="sr-only">{title}</h2>
          )}
          {titleVariant === 'pill' && (
            <div className="flex">
              <h2 className="sr-only">{title}</h2>
              <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-pink-700 bg-pink-50 border border-pink-200 rounded-full px-3 py-1">
                {title}
              </span>
            </div>
          )}
        </div>
      )}
      {/* Slider mobile: una foto alla volta (transizione in dissolvenza, senza scorrimento visibile) */}
      <div
        className="block sm:hidden mt-14 relative h-[28rem] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((item, idx) => (
          <img
            key={idx}
            src={item.src}
            alt={item.alt}
            className={`absolute inset-0 w-full h-[28rem] object-cover transition-opacity duration-1000 ease-in-out ${mobileIndex === idx ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Marquee desktop/tablet */}
      <div className="marquee-track hidden sm:flex sm:mt-16">
        {track.map((item, idx) => (
          <img
            key={idx}
            src={item.src}
            alt={item.alt}
            className="block h-[32rem] w-auto object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;