import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

// Layout generale per le pagine collezione: fondo bianco, tipografia neutra
export default function CollectionPageLayout({ children, className = '' }: Props) {
  return (
    <div className={`min-h-screen w-full bg-white text-neutral-800 ${className}`}>
      {children}
    </div>
  );
}

