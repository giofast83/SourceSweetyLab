import { useEffect } from 'react';

/**
 * Hook to set document title and meta description consistently across pages.
 * Falls back to creating the meta description tag if it does not exist.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (meta) {
        meta.setAttribute('content', description);
      } else {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        m.setAttribute('content', description);
        document.head.appendChild(m);
      }
    }
  }, [title, description]);
}