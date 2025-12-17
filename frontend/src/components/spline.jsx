"use client";

import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline"; 
// If you're using Next app router: 
// import Spline from "@splinetool/react-spline/next";
import gsap from "gsap";

const Home = () => {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    tl.from(headingRef.current, { y: 60, opacity: 0 })
      .from(subRef.current, { y: 30, opacity: 0 }, "-=0.5")
      .from(buttonRef.current, { y: 20, opacity: 0, scale: 0.9 }, "-=0.4");
  }, []);

  return (
    <main className="hero-root">
      {/* INTERACTIVE 3D BACKGROUND */}
      <div className="hero-spline">
        {/* <Spline scene="https://prod.spline.design/mRbyW3ufj6ArFhTK/scene.splinecode" /> */}
        <Spline scene="https://prod.spline.design/cuTaHyOw46Tss6Zr/scene.splinecode" />
      </div>

      {/* OVERLAY (NO POINTER EVENTS BY DEFAULT) */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 ref={headingRef} className="hero-heading gradient-text">
            Immersive 3D Experience
          </h1>

          <p ref={subRef} className="hero-sub">
            Drag, rotate, and explore the live 3D scene while your hero text
            smoothly animates in with GSAP.
          </p>

          <button ref={buttonRef} className="hero-btn">
            Explore the Scene
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
