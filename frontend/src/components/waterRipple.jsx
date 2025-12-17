import React, { useEffect, useMemo, useRef } from "react";

/**
 * WaterRipple
 * - Canvas water distortion on a background image (cover).
 * - Mouse/touch creates drops.
 *
 * Props:
 *  src (required): image url
 *  intensity: distortion strength
 *  damping: ripple decay
 *  dropRadius: size of drops
 *  dropStrength: power of drops
 *  autoDrop: subtle random drops
 *  className/style: wrapper styling
 *  children: overlay content (your Hero UI)
 */
export default function WaterRipple({
  src,
  className = "",
  intensity = 20,
  damping = 0.985,
  dropRadius = 18,
  dropStrength = 380,
  autoDrop = true,
  style,
  children,
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const state = useMemo(
    () => ({
      w: 0,
      h: 0,
      dpr: 1,
      buf1: null,
      buf2: null,
      img: null,
      imgLoaded: false,
      raf: 0,
      lastAuto: 0,
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      state.w = Math.max(1, Math.floor(rect.width));
      state.h = Math.max(1, Math.floor(rect.height));
      state.dpr = dpr;

      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size = state.w * state.h;
      state.buf1 = new Float32Array(size);
      state.buf2 = new Float32Array(size);
    };

    const loadImage = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        state.img = img;
        state.imgLoaded = true;
      };
      img.onerror = () => console.warn("WaterRipple: image failed to load:", src);
    };

    const drawCover = () => {
      if (!state.imgLoaded || !state.img) return;

      const img = state.img;
      const cw = state.w;
      const ch = state.h;

      const ir = img.width / img.height;
      const cr = cw / ch;

      let dw, dh, dx, dy;
      if (ir > cr) {
        dh = ch;
        dw = dh * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = dw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const drop = (x, y, strength = dropStrength, radius = dropRadius) => {
      const w = state.w;
      const h = state.h;
      if (!state.buf1) return;

      const cx = Math.floor(x);
      const cy = Math.floor(y);

      const r = Math.max(2, Math.floor(radius));
      const r2 = r * r;

      const x0 = Math.max(1, cx - r);
      const x1 = Math.min(w - 2, cx + r);
      const y0 = Math.max(1, cy - r);
      const y1 = Math.min(h - 2, cy + r);

      for (let yy = y0; yy <= y1; yy++) {
        const dy = yy - cy;
        for (let xx = x0; xx <= x1; xx++) {
          const dx = xx - cx;
          const d2 = dx * dx + dy * dy;
          if (d2 <= r2) {
            const falloff = 1 - d2 / r2;
            state.buf1[yy * w + xx] += falloff * strength;
          }
        }
      }
    };

    const stepSim = () => {
      const w = state.w;
      const h = state.h;
      const a = state.buf1;
      const b = state.buf2;
      if (!a || !b) return;

      for (let y = 1; y < h - 1; y++) {
        const yw = y * w;
        for (let x = 1; x < w - 1; x++) {
          const i = yw + x;
          const val =
            (a[i - 1] + a[i + 1] + a[i - w] + a[i + w]) * 0.5 - b[i];
          b[i] = val * damping;
        }
      }
      state.buf1 = b;
      state.buf2 = a;
    };

    const render = () => {
      if (!state.imgLoaded) {
        ctx.fillStyle = "#0b0b0b";
        ctx.fillRect(0, 0, state.w, state.h);
        return;
      }

      drawCover();

      const w = state.w;
      const h = state.h;
      const buf = state.buf1;
      if (!buf) return;

      const imgData = ctx.getImageData(0, 0, w, h);
      const srcData = imgData.data;
      const out = new Uint8ClampedArray(srcData.length);

      const amp = intensity;

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;

          const dx = buf[i - 1] - buf[i + 1];
          const dy = buf[i - w] - buf[i + w];

          const sx = Math.max(0, Math.min(w - 1, (x + dx * 0.01 * amp) | 0));
          const sy = Math.max(0, Math.min(h - 1, (y + dy * 0.01 * amp) | 0));

          const si = (sy * w + sx) * 4;
          const di = i * 4;

          out[di] = srcData[si];
          out[di + 1] = srcData[si + 1];
          out[di + 2] = srcData[si + 2];
          out[di + 3] = 255;
        }
      }

      imgData.data.set(out);
      ctx.putImageData(imgData, 0, 0);
    };

    const tick = (t) => {
      state.raf = requestAnimationFrame(tick);

      if (autoDrop) {
        if (!state.lastAuto) state.lastAuto = t;
        if (t - state.lastAuto > 700) {
          state.lastAuto = t;
          drop(Math.random() * state.w, Math.random() * state.h, dropStrength * 0.12, dropRadius * 0.9);
        }
      }

      stepSim();
      render();
    };

    const getPos = (e) => {
      const rect = wrap.getBoundingClientRect();
      if ("touches" in e && e.touches?.[0]) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    let lastMove = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastMove < 16) return;
      lastMove = now;
      const p = getPos(e);
      drop(p.x, p.y, dropStrength * 0.15, dropRadius * 0.9);
    };

    const onDown = (e) => {
      const p = getPos(e);
      drop(p.x, p.y, dropStrength, dropRadius * 1.1);
    };

    resize();
    loadImage();
    state.raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mousedown", onDown);
    wrap.addEventListener("touchmove", onMove, { passive: true });
    wrap.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mousedown", onDown);
      wrap.removeEventListener("touchmove", onMove);
      wrap.removeEventListener("touchstart", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, intensity, damping, dropRadius, dropStrength, autoDrop]);

  return (
    <div ref={wrapRef} className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
