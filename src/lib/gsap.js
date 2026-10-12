import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Shared motion vocabulary so every reveal on the site feels related.
export const EASE = 'power4.out';
export const REDUCED = '(prefers-reduced-motion: reduce)';
export const FULL_MOTION = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
