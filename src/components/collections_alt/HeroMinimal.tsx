import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

type HeroMinimalProps = {
  image: string;
  title?: string;
  subtitle?: string;
  microcopy?: string;
  ctaHref?: string;
  ctaLabel?: string;
  align?: 'center' | 'left';
  showCta?: boolean;
};

export default function HeroMinimal({ image, title = 'Collezioni', subtitle = 'Storie sartoriali in tiratura limitata', microcopy = 'Capi artigianali creati nel nostro laboratorio.', ctaHref = '/collezione', ctaLabel = 'Esplora la Collezione', align = 'left', showCta = true }: HeroMinimalProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Parallax leggerissimo e contenuto nel box: massimo 10px verso l'alto
      const v = Math.min(window.scrollY * 0.05, 10);
      setOffset(-v);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Wrapper esterno: gestisce solo il parallax verticale */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 200ms ease-out',
          willChange: 'transform',
        }}
      >
        {/* Layer interno: gestisce il Ken Burns (zoom dolce) */}
        <div
          className="absolute inset-0 animate-kenburns-soft"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      {/* Overlay gradient nero trasparente in basso per leggibilità */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />

      <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`${align === 'left' ? 'text-left md:max-w-2xl' : 'text-center md:max-w-3xl mx-auto'} text-white drop-shadow`}> 
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-shadow-strong">
            {title}
          </h1>
          <p className="mt-4 font-serif text-lg md:text-xl text-white/90 text-shadow-strong-sm">
            {subtitle}
          </p>
          {microcopy && (
            <p className="mt-3 font-sans text-sm md:text-base text-white/80">
              {microcopy}
            </p>
          )}
          {showCta && (
            <div className={`mt-7 ${align === 'left' ? '' : 'flex justify-center'}`}>
              <Link
                to={ctaHref}
                className="inline-flex items-center gap-2 justify-center px-5 py-2.5 border border-white/70 text-white bg-transparent hover:bg-[#F3C9CF]/15 hover:border-white rounded-none text-sm tracking-wide transition-colors duration-200"
                aria-label={ctaLabel}
              >
                {ctaLabel}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M5 12h12" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}