
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import TextPressure from "./TextPressure";
import "./Hero.css";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function Home() {

  const navigate = useNavigate();
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".hero-text-block > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    let idleId;
    let timeoutId;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(
        () => setShowSpline(true),
        { timeout: 1200 }
      );
    } else {
      timeoutId = window.setTimeout(() => setShowSpline(true), 200);
    }

    return () => {
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <main className="hero-root">
      <div className="hero-canvas">
        <div className="hero-canvas-inner">
          <div className="hero-canvas-float">
            {showSpline ? (
              <Suspense fallback={null}>
                <Spline scene="https://prod.spline.design/cuTaHyOw46Tss6Zr/scene.splinecode" />
              </Suspense>
            ) : null}
          </div>
        </div>
      </div>

      {/* <div className="hero-bg-text">SRIJON</div> */}

      <div className="hero-overlay">
        <div className="hero-text-block">
          {/* Name with TextPressure */}
          <div className="hero-name-pressure">
            <TextPressure
              text="Srijon"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              minFontSize={11}
              className="hero-name-line"
            />
            <TextPressure
              text="Karmakar"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              minFontSize={11}
              className="hero-name-line"
            />
          </div>

          <p className="hero-role">Full Stack Developer</p>

          <p className="hero-subtitle">
            Creating dynamic interfaces and immersive visuals through code,
            creativity, and precision.
          </p>

          <p className="hero-body">
            With a passion for both code and art, I build interfaces that are
            clean, functional, and emotionally expressive. Whether it’s UI
            design, animations, 3D elements, or backend logic — I bring ideas to
            life end-to-end.
          </p>

          {/* <div className="hero-buttons">
            <button className="hero-btn">View Stats</button>
            <button className="hero-btn">View CV</button>
          </div> */}

          <div className="hero-buttons">
            <button
              className="hero-btn"
              onClick={() => navigate("/Stats")}
            >
              View Stats
            </button>

            <button
              className="hero-btn"
              onClick={() => window.open("/Srijon_Karmakar_resume.pdf", "_blank")}
            >
              View CV
            </button>
          </div>


        </div>
      </div>
    </main>
  );
}

