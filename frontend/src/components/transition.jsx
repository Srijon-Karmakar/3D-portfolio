import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

import { getDeviceProfile } from "../utils/performanceProfile";

export default function Transition() {
  const location = useLocation();

  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const profile = getDeviceProfile();
    if (!profile.canUseSmoothScroll) return undefined;

    let cancelled = false;
    let idleId = null;

    const startLenis = () => {
      if (cancelled) return;

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
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startLenis, { timeout: 1200 });
    } else {
      idleId = window.setTimeout(startLenis, 250);
    }

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else if (idleId !== null) {
        window.clearTimeout(idleId);
      }
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  return null;
}
