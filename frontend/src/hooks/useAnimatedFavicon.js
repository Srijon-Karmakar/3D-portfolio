import { useEffect } from "react";

import { getDeviceProfile } from "../utils/performanceProfile";

export function useAnimatedFavicon(
  path = "/favicon/favicon.json",
  size = 64,
  enabled = true
) {
  useEffect(() => {
    const profile = getDeviceProfile();
    if (!enabled || profile.prefersReducedMotion || profile.isConstrained) {
      return undefined;
    }

    let disposed = false;
    let anim = null;

    // Hidden off-screen container lottie will render a canvas into
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      width: `${size}px`,
      height: `${size}px`,
      top: "-9999px",
      left: "-9999px",
      opacity: "0",
      pointerEvents: "none",
    });
    document.body.appendChild(container);

    // Get or create the favicon <link> element
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    let lastIconUpdate = 0;

    const onFrame = () => {
      if (document.visibilityState !== "visible") return;

      const now = performance.now();
      if (now - lastIconUpdate < 250) return;

      const canvas = container.querySelector("canvas");
      if (canvas) {
        lastIconUpdate = now;
        link.href = canvas.toDataURL("image/png");
      }
    };

    import("lottie-web").then(({ default: lottie }) => {
      if (disposed) return;

      anim = lottie.loadAnimation({
        container,
        renderer: "canvas",
        loop: true,
        autoplay: true,
        path,
        rendererSettings: {
          clearCanvas: true,
        },
      });

      anim.addEventListener("enterFrame", onFrame);
    });

    return () => {
      disposed = true;
      anim?.removeEventListener("enterFrame", onFrame);
      anim?.destroy();
      document.body.removeChild(container);
    };
  }, [enabled, path, size]);
}
