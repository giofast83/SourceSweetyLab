import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to top on every route change.
 * Useful in SPA to avoid keeping previous scroll position when navigating.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use smooth for a nicer UX; can be changed to 'auto' if preferred
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;