import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { key } = useLocation();

  useLayoutEffect(() => {
    // Keep Back/Forward navigation from restoring an old scroll position.
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    // Reset before the new page is painted, without a scrolling animation.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [key]);

  return null;
}
