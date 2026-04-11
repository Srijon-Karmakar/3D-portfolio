import { useEffect } from "react";
import lottie from "lottie-web";

export function useAnimatedFavicon(path = "/favicon/favicon.json", size = 64) {
  useEffect(() => {
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

    const anim = lottie.loadAnimation({
      container,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      path,
      rendererSettings: {
        clearCanvas: true,
      },
    });

    // Get or create the favicon <link> element
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    const onFrame = () => {
      const canvas = container.querySelector("canvas");
      if (canvas) {
        link.href = canvas.toDataURL("image/png");
      }
    };

    anim.addEventListener("enterFrame", onFrame);

    return () => {
      anim.removeEventListener("enterFrame", onFrame);
      anim.destroy();
      document.body.removeChild(container);
    };
  }, [path, size]);
}
