
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextPressure from "./TextPressure";
import { getDeviceProfile } from "../utils/performanceProfile";
import "./Hero.css";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function Home() {
  const navigate = useNavigate();
  const [profile] = useState(() => getDeviceProfile());
  const [showSpline, setShowSpline] = useState(false);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: profile.canUseSmoothScroll ? "smooth" : "auto",
      block: "start",
    });
  };

  useEffect(() => {
    if (!profile.canUseSpline) {
      return undefined;
    }

    let idleId;

    const timeoutId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          () => setShowSpline(true),
          { timeout: 1800 }
        );
        return;
      }

      setShowSpline(true);
    }, 600);

    return () => {
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timeoutId);
    };
  }, [profile.canUseSpline]);

  return (
    <main
      className="hero-root"
      data-lite-mode={profile.isConstrained ? "true" : "false"}
    >
      <div className="hero-canvas">
        <div className="hero-canvas-inner">
          <div className="hero-canvas-float">
            {profile.canUseSpline && showSpline ? (
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
          {profile.canUseInteractiveText ? (
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
          ) : (
            <div className="hero-name-static" aria-label="Srijon Karmakar">
              <h1 className="hero-name-static-line">Srijon</h1>
              <h1 className="hero-name-static-line">Karmakar</h1>
            </div>
          )}

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

            <button
              className="hero-btn"
              onClick={scrollToContact}
            >
              Contact
            </button>
          </div>


        </div>
      </div>
    </main>
  );
}
