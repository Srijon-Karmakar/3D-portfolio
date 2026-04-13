import React, { lazy, Suspense, useEffect, useState } from "react";
import Hero from "../components/Hero";
import LandingSections from "../sections/LandingSections";

const ChatBot = lazy(() => import("../components/ChatBot"));

export default function Home() {
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    let idleId;
    const timeoutId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setShowChatBot(true), {
          timeout: 1800,
        });
        return;
      }

      setShowChatBot(true);
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <LandingSections />
      {showChatBot ? (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      ) : null}
    </>
  );
}
