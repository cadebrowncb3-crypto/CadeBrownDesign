import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useSmoothScroll } from '../lib/SmoothScroll';

const LightboxContext = createContext(() => {});

/** Full-view dialog for artwork. Images are never upscaled past native size. */
export function LightboxProvider({ children }) {
  const [image, setImage] = useState(null);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);
  const { stop, start, reduced } = useSmoothScroll();

  const open = useCallback((img) => {
    lastFocus.current = document.activeElement;
    setImage(img);
  }, []);

  const close = useCallback(() => setImage(null), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image) {
      if (!dialog.open) dialog.showModal();
      stop();
      if (!reduced) {
        gsap.fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
        gsap.fromTo(
          dialog.querySelector('img'),
          { y: 24, scale: 0.97 },
          { y: 0, scale: 1, duration: 0.6, ease: 'power4.out' }
        );
      }
    } else if (dialog.open) {
      dialog.close();
      start();
      lastFocus.current?.focus?.();
    }
  }, [image, stop, start, reduced]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="lightbox"
        data-lenis-prevent
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget || e.target.tagName === 'IMG') close();
        }}
        aria-label={image ? `Artwork: ${image.alt}` : 'Artwork viewer'}
      >
        {image && (
          <figure className="lightbox__figure">
            <img
              src={image.src}
              alt={image.alt}
              width={image.w}
              height={image.h}
              style={{ maxWidth: `min(100%, ${image.w}px)`, background: image.bg }}
            />
            <figcaption className="lightbox__caption">{image.alt}</figcaption>
          </figure>
        )}
        <button type="button" className="lightbox__close" onClick={close}>
          Close <span aria-hidden="true">×</span>
        </button>
      </dialog>
    </LightboxContext.Provider>
  );
}

export const useLightbox = () => useContext(LightboxContext);
