import { useEffect, useState } from 'react';
import { useInView } from '../../utils/useInView';

type HeroMinimalProps = {
  image: string;
  title?: string;
  subtitle?: string;
  microcopy?: string;
};

export default function HeroMinimal({ image, title = 'Collezioni', subtitle = 'Storie sartoriali in tiratura limitata', microcopy = 'Capi artigianali creati nel nostro laboratorio.' }: HeroMinimalProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Parallax leggero: massimo 12px
      setOffset(window.scrollY * 0.06);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center bg-white"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset}px)`,
          transition: 'transform 200ms ease-out',
          willChange: 'transform',
        }}
      />
      <div className="absolute inset-0 bg-white/75" />
      <div className={`relative z-10 text-center max-w-3xl mx-auto px-6 py-20 md:py-28 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-[#6B4A4E]">
          {title}
        </h1>
        <p className="mt-4 font-serif text-lg md:text-xl text-[#6B4A4E]/80">
          {subtitle}
        </p>
        <p className="mt-3 font-sans text-sm md:text-base text-[#4a3b3d]">
          {microcopy}
        </p>
      </div>
    </section>
  );
}