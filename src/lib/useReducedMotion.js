import { useEffect, useState } from 'react';
import { REDUCED } from './gsap';

const query = () => (typeof window !== 'undefined' ? window.matchMedia(REDUCED) : null);

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() => query()?.matches ?? false);
  useEffect(() => {
    const mq = query();
    if (!mq) return undefined;
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
