import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { playSfx } from "../utils/sfx";

const SEGMENTS = 10; // 11 vertices per cable span

function makeSpan(x0, y0, x1, y1, sag = 7) {
  const pts = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * sag;
    pts.push({ x, y, ox: x, oy: y });
  }
  return { pts, x0, y0, x1, y1, sag };
}

function sampleSpan(pts, u) {
  const clamped = Math.max(0, Math.min(1, u));
  const scaled = clamped * SEGMENTS;
  const idx = Math.min(SEGMENTS - 1, Math.floor(scaled));
  const frac = scaled - idx;
  const a = pts[idx];
  const b = pts[idx + 1];
  return {
    x: a.x + (b.x - a.x) * frac,
    y: a.y + (b.y - a.y) * frac,
  };
}

function integrateSpan(span, pointer, reduce) {
  const { pts, x0, y0, x1, y1 } = span;
  const chord = Math.max(12, Math.hypot(x1 - x0, y1 - y0));
  const segLen = (chord * 1.035) / SEGMENTS;

  if (!reduce) {
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i];
      const vx = (p.x - p.ox) * 0.962;
      const vy = (p.y - p.oy) * 0.962;
      p.ox = p.x;
      p.oy = p.y;
      p.x += vx;
      p.y += vy + 0.14;

      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 28) {
          const w = 1 - dist / 28;
          p.x += Math.max(-9, Math.min(9, pointer.vx * w * 0.55));
          p.y += Math.max(-11, Math.min(11, pointer.vy * w * 0.65));
          if (Math.hypot(pointer.vx, pointer.vy) > 3.5) {
            pointer.onStrike();
          }
        }
      }
    }

    for (let iter = 0; iter < 5; iter++) {
      pts[0].x = x0;
      pts[0].y = y0;
      pts[pts.length - 1].x = x1;
      pts[pts.length - 1].y = y1;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.0001;
        const diff = (segLen - d) / d;
        const ox = dx * diff * 0.5;
        const oy = dy * diff * 0.5;
        if (i !== 0) {
          a.x -= ox;
          a.y -= oy;
        }
        if (i + 1 !== pts.length - 1) {
          b.x += ox;
          b.y += oy;
        }
      }
    }
  }
}

/* Pluckable dual-span Verlet cable rig between RPi 5, zero-param CODEC, and Cloud HOST */
export default function VerletPipeline() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const nodeRefs = useRef([null, null, null]);
  const reduce = useReducedMotion();
  const [plucked, setPlucked] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let spans = [];
    let rafId = 0;
    let lastSound = 0;

    const triggerSound = () => {
      const now = performance.now();
      if (now - lastSound > 160) {
        lastSound = now;
        playSfx("pluck");
      }
    };

    const pointer = {
      x: -999,
      y: -999,
      vx: 0,
      vy: 0,
      active: false,
      onStrike: triggerSound,
    };

    const computeAnchors = () => {
      const sr = stage.getBoundingClientRect();
      W = sr.width;
      H = sr.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rects = nodeRefs.current.map((el) => el?.getBoundingClientRect());
      if (rects.some((r) => !r)) return;

      const [r0, r1, r2] = rects;
      const a0 = { x: r0.right - sr.left - 2, y: r0.top - sr.top + r0.height / 2 };
      const a1L = { x: r1.left - sr.left + 2, y: r1.top - sr.top + r1.height / 2 };
      const a1R = { x: r1.right - sr.left - 2, y: r1.top - sr.top + r1.height / 2 };
      const a2 = { x: r2.left - sr.left + 2, y: r2.top - sr.top + r2.height / 2 };

      spans = [
        makeSpan(a0.x, a0.y, a1L.x, a1L.y, 8),
        makeSpan(a1R.x, a1R.y, a2.x, a2.y, 5),
      ];
    };

    const drawCurve = (pts, stroke, width) => {
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) * 0.5;
        const my = (pts[i].y + pts[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    const frame = (now) => {
      const t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      if (spans.length === 2) {
        integrateSpan(spans[0], pointer, reduce);
        integrateSpan(spans[1], pointer, reduce);

        // Span 0: heavy edge tensor feed (6.2 MB raw)
        drawCurve(spans[0].pts, "#3f3f46", 2.2);
        // Span 1: compressed quantized stream (700 KB · 89% smaller)
        drawCurve(spans[1].pts, "#c8f542", 1.75);

        if (!reduce) {
          // Chunky grey raw feature tensors on left cable
          for (let k = 0; k < 3; k++) {
            const u = (t * 0.34 + k / 3) % 1;
            const pt = sampleSpan(spans[0].pts, u);
            ctx.fillStyle = u > 0.78 ? "#ffffff" : "#a1a1aa";
            ctx.fillRect(pt.x - 3, pt.y - 2.5, 6, 5);
          }
          // Sleek #c8f542 quantized sparse packets on right cable
          for (let k = 0; k < 3; k++) {
            const u = (t * 0.52 + k / 3) % 1;
            const pt = sampleSpan(spans[1].pts, u);
            ctx.fillStyle = "#c8f542";
            ctx.fillRect(pt.x - 2.2, pt.y - 2.2, 4.4, 4.4);
          }
        }
      }

      // Decay pointer impulse cleanly when idle
      pointer.vx *= 0.8;
      pointer.vy *= 0.8;

      if (!reduce) rafId = requestAnimationFrame(frame);
    };

    const injectPluck = (clientX, clientY, forceY = -12) => {
      const sr = stage.getBoundingClientRect();
      const lx = clientX - sr.left;
      const ly = clientY - sr.top;
      let hit = false;
      spans.forEach((sp, si) => {
        const minX = sp.x0 - 12;
        const maxX = sp.x1 + 12;
        if (lx >= minX && lx <= maxX) {
          hit = true;
          sp.pts.forEach((p, idx) => {
            if (idx === 0 || idx === sp.pts.length - 1) return;
            const d = Math.hypot(p.x - lx, p.y - ly);
            const falloff = Math.max(0.25, 1 - d / 120);
            p.oy = p.y - forceY * falloff * (si === 1 ? 1.15 : 0.9);
          });
        }
      });
      // Fallback for center tap near node: pluck both spans gently
      if (!hit) {
        spans.forEach((sp) => {
          sp.pts.forEach((p, idx) => {
            if (idx === 0 || idx === sp.pts.length - 1) return;
            const env = Math.sin((idx / SEGMENTS) * Math.PI);
            p.oy = p.y - forceY * 0.7 * env;
          });
        });
      }
      setPlucked(true);
      triggerSound();
    };

    const onPointerMove = (e) => {
      const sr = stage.getBoundingClientRect();
      const nx = e.clientX - sr.left;
      const ny = e.clientY - sr.top;
      if (pointer.active) {
        pointer.vx = nx - pointer.x;
        pointer.vy = ny - pointer.y;
      }
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onPointerDown = (e) => {
      injectPluck(e.clientX, e.clientY, e.pointerType === "touch" ? -11 : -13);
    };

    computeAnchors();
    const ro = new ResizeObserver(computeAnchors);
    ro.observe(stage);

    if (reduce) {
      frame(0);
    } else {
      rafId = requestAnimationFrame(frame);
      stage.addEventListener("pointermove", onPointerMove, { passive: true });
      stage.addEventListener("pointerleave", onPointerLeave, { passive: true });
      stage.addEventListener("pointerdown", onPointerDown, { passive: true });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointerdown", onPointerDown);
    };
  }, [reduce]);

  const NodeBox = ({ idx, title, sub, hot }) => (
    <div
      ref={(el) => {
        nodeRefs.current[idx] = el;
      }}
      className={`pointer-events-none relative z-10 shrink-0 px-2.5 py-2 text-center sm:px-4 sm:py-3 chamfer-sm ${
        hot ? "bg-acid text-ink" : "border border-line bg-raise text-bone"
      }`}
    >
      <div className="whitespace-nowrap font-mono text-[11px] font-bold sm:text-sm">{title}</div>
      <div
        className={`whitespace-nowrap font-mono text-[9.5px] uppercase tracking-wider sm:text-[11px] sm:tracking-widest ${
          hot ? "text-ink/75" : "text-mute"
        }`}
      >
        {sub}
      </div>
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Interactive Verlet physics pipeline connecting Raspberry Pi 5 edge head, zero-parameter codec, and host tail"
      className="border border-line bg-panel chamfer"
    >
      <div className="dither flex items-center justify-between gap-2 border-b border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:px-4">
        <span>SPLIT LINK // VERLET RIG</span>
        <span className={plucked ? "text-acid" : "text-ash"}>
          {plucked ? "RESONANCE ACTIVE" : "DRAG OR TAP WIRES"}
        </span>
      </div>

      <div
        ref={stageRef}
        style={{ touchAction: "pan-y" }}
        className="relative flex cursor-grab items-center justify-between gap-2 px-3 py-5 active:cursor-grabbing sm:px-5 sm:py-7"
      >
        <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
        <NodeBox idx={0} title="RPi 5" sub="6.2 MB raw" />
        <NodeBox idx={1} title="CODEC" sub="zero-param" hot />
        <NodeBox idx={2} title="HOST" sub="700 KB rpc" />
      </div>
    </div>
  );
}
