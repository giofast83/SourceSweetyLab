import React from 'react';

type LookbookGridProps = {
  images: string[];
};

export default function LookbookGrid({ images }: LookbookGridProps) {
  return (
    <section className="bg-white px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {images.map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img
                src={src}
                alt={`Lookbook ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

