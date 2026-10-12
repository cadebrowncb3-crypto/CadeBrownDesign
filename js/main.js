document.getElementById("year").textContent = new Date().getFullYear();

// If the CDN fails to load, leave the page static rather than throwing.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Only animate when the visitor hasn't asked for reduced motion.
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Hero intro: title lines slide up from behind their masks.
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .from(".hero-word", { yPercent: 110, duration: 1.2, stagger: 0.12 })
      .from(".hero-reveal", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.7");

    // Fade elements up as they scroll into view.
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // Subtle parallax on project thumbnails.
    gsap.utils.toArray(".thumb").forEach((thumb) => {
      gsap.fromTo(thumb, { yPercent: 6 }, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: thumb, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Infinite marquee; the track holds two copies so -50% loops seamlessly.
    gsap.to(".marquee-track", { xPercent: -50, duration: 20, ease: "none", repeat: -1 });

    // Hero title drifts and fades as you scroll away.
    gsap.to(".hero-title", {
      yPercent: -30,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  });
}
