// src/components/transition.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import "./transition.css"

const RIPPLE_DURATION = 800; // slightly shorter feels snappier

export default function Transition() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ripple, setRipple] = useState(null); // { x, y, radius, key }
  const [isActive, setIsActive] = useState(false);
  const pendingPathRef = useRef(null);

  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  // ---- INIT LENIS ----
  useEffect(() => {
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

  // ---- START RIPPLE ----
  const startRipple = (x, y, targetPath = null) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxX = Math.max(x, vw - x);
    const maxY = Math.max(y, vh - y);
    const radius = Math.sqrt(maxX * maxX + maxY * maxY);

    setIsActive(true);
    setRipple({
      x,
      y,
      radius,
      key: Date.now(),
    });
    pendingPathRef.current = targetPath;

    setTimeout(() => {
      if (pendingPathRef.current) {
        navigate(pendingPathRef.current);
        pendingPathRef.current = null;
      }

      setTimeout(() => {
        setIsActive(false);
        setRipple(null);
      }, 80);
    }, RIPPLE_DURATION);
  };

  // ---- GLOBAL CLICK HANDLER ----
  useEffect(() => {
    const handleClick = (e) => {
      if (e.button !== 0 || e.defaultPrevented) return;

      const x = e.clientX;
      const y = e.clientY;

      const anchor = e.target.closest("a");
      const href = anchor ? anchor.getAttribute("href") : null;

      if (
        anchor &&
        href &&
        href.startsWith("/") &&
        href !== location.pathname &&
        !anchor.hasAttribute("data-no-transition")
      ) {
        e.preventDefault();
        startRipple(x, y, href);
        return;
      }

      startRipple(x, y, null);
    };

    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, [location.pathname]);

  // ---- RENDER OVERLAY ----
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {isActive && ripple && (
        <div
          key={ripple.key}
          className="page-ripple-wrapper"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: `${ripple.radius * 2}px`,
            height: `${ripple.radius * 2}px`,
            "--ripple-duration": `${RIPPLE_DURATION}ms`,
          }}
        >
          <div className="page-ripple-main" />
          <div className="page-ripple-ring ring-1" />
          <div className="page-ripple-ring ring-2" />
          <div className="page-ripple-ring ring-3" />
          <div className="page-ripple-core" />
        </div>
      )}
    </div>
  );
}
