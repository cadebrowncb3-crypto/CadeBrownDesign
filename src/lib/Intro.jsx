import { createContext, useContext, useState } from 'react';

/**
 * Tracks whether the first-visit counter (Preloader) is still on screen, so
 * page-entrance animations start only once the page is actually visible.
 */
const IntroContext = createContext({ ready: true, setReady: () => {} });

const KEY = 'cb-intro-seen';

export const shouldShowIntro = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
};

export const markIntroSeen = () => {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage unavailable: intro simply shows again next time */
  }
};

export function IntroProvider({ children }) {
  const [ready, setReady] = useState(() => !shouldShowIntro());
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
