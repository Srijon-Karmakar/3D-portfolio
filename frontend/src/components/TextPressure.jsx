import { useEffect, useRef, useState } from "react";

const TextPressure = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#FFFFFF",
  strokeColor = "#000000",
  strokeWidth = 23,
  className = "",
  minFontSize = 24,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const cancelAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const applyNeutralState = () => {
    spansRef.current.forEach((span) => {
      if (!span) return;
      span.style.opacity = 1;
      span.style.fontVariationSettings = "'wght' 400, 'wdth' 100, 'ital' 0";
    });
  };

  const applyFrame = () => {
    if (!titleRef.current) return 0;

    const titleRect = titleRef.current.getBoundingClientRect();
    const maxDist = Math.max(titleRect.width / 2, 1);

    spansRef.current.forEach((span) => {
      if (!span) return;

      const rect = span.getBoundingClientRect();
      const charCenter = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };
      const d = dist(mouseRef.current, charCenter);

      const getAttr = (distance, minVal, maxVal) => {
        const val = maxVal - Math.abs((maxVal * distance) / maxDist);
        return Math.max(minVal, val + minVal);
      };

      const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
      const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
      const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
      const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

      span.style.opacity = alphaVal;
      span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
    });

    return Math.max(
      Math.abs(cursorRef.current.x - mouseRef.current.x),
      Math.abs(cursorRef.current.y - mouseRef.current.y)
    );
  };

  const tick = () => {
    if (!isVisibleRef.current || !isDocumentVisibleRef.current) {
      cancelAnimation();
      return;
    }

    mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
    mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

    const remaining = applyFrame();
    if (remaining < 0.12) {
      mouseRef.current.x = cursorRef.current.x;
      mouseRef.current.y = cursorRef.current.y;
      applyFrame();
      cancelAnimation();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const startAnimation = () => {
    if (rafRef.current || !isVisibleRef.current || !isDocumentVisibleRef.current) return;
    rafRef.current = requestAnimationFrame(tick);
  };

  // The effect intentionally depends on the animation options and text only.
  // Internal helpers use refs, so re-subscribing on every render is unnecessary.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!containerRef.current) return undefined;

    const {
      left,
      top,
      width: containerWidth,
      height: containerHeight,
    } = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = left + containerWidth / 2;
    mouseRef.current.y = top + containerHeight / 2;
    cursorRef.current.x = mouseRef.current.x;
    cursorRef.current.y = mouseRef.current.y;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      applyNeutralState();
      return undefined;
    }

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      cursorRef.current.x = event.clientX;
      cursorRef.current.y = event.clientY;
      startAnimation();
    };

    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === "visible";
      if (!isDocumentVisibleRef.current) {
        cancelAnimation();
        return;
      }
      startAnimation();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          cancelAnimation();
          return;
        }
        startAnimation();
      },
      { threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    applyFrame();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimation();
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [alpha, italic, text, weight, width]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    let nextFontSize = containerW / (chars.length / 2);
    nextFontSize = Math.max(nextFontSize, minFontSize);

    setFontSize(nextFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }

      applyFrame();
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimation();
    };
  }, [minFontSize, scale, text]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-transparent">
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
          font-display: swap;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          flex ? "flex justify-between" : ""
        } ${stroke ? "stroke" : ""} uppercase text-center`}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
