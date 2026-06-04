import React, { lazy, Suspense, useEffect, useState } from "react";
import Hero from "../components/Hero";
import { getDeviceProfile } from "../utils/performanceProfile";

const ChatBot = lazy(() => import("../components/ChatBot"));
const LandingSections = lazy(() => import("../sections/LandingSections"));

export default function Home() {
  const [profile] = useState(() => getDeviceProfile());
  const [showSections, setShowSections] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    let idleId = null;
    let timeoutId = null;

    const revealSections = () => setShowSections(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(revealSections, {
        timeout: profile.isConstrained ? 2400 : 1200,
      });
    } else {
      timeoutId = window.setTimeout(
        revealSections,
        profile.isConstrained ? 800 : 250
      );
    }

    return () => {
      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [profile.isConstrained]);

  useEffect(() => {
    let idleId = null;
    let timeoutId = null;

    const revealChatBot = () => setShowChatBot(true);

    if (profile.canAutoLoadChat) {
      timeoutId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(revealChatBot, {
            timeout: 2200,
          });
          return;
        }

        revealChatBot();
      }, 1400);
    } else {
      const activateOnIntent = () => {
        window.removeEventListener("pointerdown", activateOnIntent);
        window.removeEventListener("keydown", activateOnIntent);
        window.removeEventListener("scroll", activateOnIntent);
        revealChatBot();
      };

      window.addEventListener("pointerdown", activateOnIntent, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", activateOnIntent, { once: true });
      window.addEventListener("scroll", activateOnIntent, {
        once: true,
        passive: true,
      });

      return () => {
        window.removeEventListener("pointerdown", activateOnIntent);
        window.removeEventListener("keydown", activateOnIntent);
        window.removeEventListener("scroll", activateOnIntent);
      };
    }

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [profile.canAutoLoadChat]);

  return (
    <>
      <Hero />
      {showSections ? (
        <Suspense fallback={null}>
          <LandingSections />
        </Suspense>
      ) : null}
      {showChatBot ? (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      ) : null}
    </>
  );
}
