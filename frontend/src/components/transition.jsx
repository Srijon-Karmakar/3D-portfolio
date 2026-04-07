import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export default function Transition() {
  const location = useLocation();

  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  // ---- INIT LENIS ----
  useEffect(() => {
    // Skip smooth scroll on mobile — native scroll is faster on touch devices
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  return null;
}
