import React, { useEffect, useRef, useState } from 'react';

type EditorialIntroProps = {
  children: React.ReactNode;
};

export default function EditorialIntro({ children }: EditorialIntroProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white px-6 md:px-8 py-16 md:py-24">
      <div
        ref={ref}
        className={`max-w-[800px] mx-auto text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-neutral-900">
            Editoriale
          </h2>
          <div className="text-neutral-700 leading-relaxed tracking-wide">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}