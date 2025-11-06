import React, { useEffect, useRef, useState } from 'react';

type EditorialImageBlockProps = {
  image: string;
  title?: string;
  text?: string;
  align?: 'left' | 'right' | 'full';
};

export default function EditorialImageBlock({ image, title, text, align = 'left' }: EditorialImageBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      // progress da -vh a +vh -> normalizza a [-1,1]
      const progress = Math.max(-1, Math.min(1, (rect.top - vh / 2) / (vh / 2)));
      setOffset(progress * 10); // parallax leggero: max 10px
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={ref} className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden">
      <img
        src={image}
        alt={title || 'Editorial Block'}
        className="absolute inset-x-0 -inset-y-4 w-full h-full object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.06)` }}
      />
      <div className="absolute inset-0 bg-black/20" />
      {align !== 'full' && (
        <div
          className={`absolute inset-0 flex items-end ${align === 'left' ? 'justify-start text-left' : 'justify-end text-right'} px-6 md:px-12 pb-16 md:pb-20`}
        >
          <div className="max-w-3xl">
            {title && (
              <h3
                className="text-white text-2xl md:text-4xl font-serif mb-3 md:mb-4 tracking-wide"
                style={{ textShadow: '0 3px 12px rgba(0,0,0,0.7)' }}
              >
                {title}
              </h3>
            )}
            {text && (
              <p className="text-white/90 text-sm md:text-base" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>
                {text}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}