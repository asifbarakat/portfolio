import { useEffect, useRef, useState } from "react";
import Zdog from "zdog";
import { useReducedMotion } from "framer-motion";
import { playSfx } from "../utils/sfx";

const STAGES = [
  { id: "all", label: "ALL STACK", tag: "SPLIT PIPELINE · DRAG OR CLICK STAGE" },
  { id: "rpi5", label: "EDGE: RPI5", tag: "BCM2712 ACTIVE · EARLY LAYER EXTRACT" },
  { id: "codec", label: "CODEC: QUANT", tag: "ZERO-PARAM SPARSITY · -89% PAYLOAD" },
  { id: "host", label: "TAIL: HOST", tag: "CLOUD TAIL · 99.9% FEATURES IDENTIFIED" },
];

const CAMERA_PRESETS = {
  all: { zoom: 1.24, y: 4, rx: -0.34, ry: 0.62 },
  rpi5: { zoom: 1.72, y: -32, rx: -0.56, ry: 0.58 },
  codec: { zoom: 1.82, y: 0, rx: -0.44, ry: 0.72 },
  host: { zoom: 1.78, y: 38, rx: -0.26, ry: 0.68 },
};

const DETECT_LABELS = [
  { cls: "PERSON", conf: "0.96", color: "#c8f542" },
  { cls: "VEHICLE", conf: "0.91", color: "#ffffff" },
  { cls: "SIGNAL", conf: "0.99", color: "#c8f542" },
];

function drawCornerBox(ctx, cx, cy, size, color, label, active) {
  const half = size * 0.5;
  const leg = Math.max(4, size * 0.28);
  const x0 = cx - half;
  const y0 = cy - half;
  const x1 = cx + half;
  const y1 = cy + half;

  ctx.strokeStyle = color;
  ctx.lineWidth = active ? 1.5 : 1.05;
  ctx.beginPath();
  // Top-left
  ctx.moveTo(x0, y0 + leg);
  ctx.lineTo(x0, y0);
  ctx.lineTo(x0 + leg, y0);
  // Top-right
  ctx.moveTo(x1 - leg, y0);
  ctx.lineTo(x1, y0);
  ctx.lineTo(x1, y0 + leg);
  // Bottom-right
  ctx.moveTo(x1, y1 - leg);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x1 - leg, y1);
  // Bottom-left
  ctx.moveTo(x0 + leg, y1);
  ctx.lineTo(x0, y1);
  ctx.lineTo(x0, y1 - leg);
  ctx.stroke();

  if (label) {
    ctx.font = '600 9px "JetBrains Mono", ui-monospace, monospace';
    const textW = ctx.measureText(label).width + 8;
    const lx = Math.round(x0);
    const ly = Math.round(y0 - 13);
    ctx.fillStyle = "rgba(8, 8, 10, 0.9)";
    ctx.fillRect(lx, ly, textW, 11);
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.75;
    ctx.strokeRect(lx, ly, textW, 11);
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(label, lx + 4, ly + 5.75);
  }
}

/* Interactive 3D split-computing diorama: realistic Raspberry Pi 5 active extraction + Host feature identification */
export default function EdgeNode3D() {
  const canvasRef = useRef(null);
  const focusRef = useRef("all");
  const manualSpinRef = useRef(false);
  const snapReducedRef = useRef(null);
  const reduce = useReducedMotion();
  const [focus, setFocus] = useState("all");
  const [interacting, setInteracting] = useState(false);

  const selectStage = (next) => {
    const resolved = next === focusRef.current && next !== "all" ? "all" : next;
    focusRef.current = resolved;
    manualSpinRef.current = false;
    setFocus(resolved);
    snapReducedRef.current?.();
    playSfx(resolved === "host" ? "open" : resolved === "all" ? "close" : "chip");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const illo = new Zdog.Illustration({
      element: canvas,
      zoom: CAMERA_PRESETS.all.zoom,
      resize: true,
      dragRotate: false, // custom pointer handler preserves phone pan-y scroll
      rotate: { x: CAMERA_PRESETS.all.rx, y: CAMERA_PRESETS.all.ry, z: 0 },
    });

    const rig = new Zdog.Anchor({ addTo: illo, translate: { y: CAMERA_PRESETS.all.y } });

    /* =====================================================================
     * 1. LOWER DECK: ACTUAL RASPBERRY PI 5 PCB + ACTIVE EXTRACTION SLICE
     * ===================================================================== */
    const piGroup = new Zdog.Group({
      addTo: rig,
      translate: { y: 36 },
    });

    // Main rounded PCB substrate (84x56 Pi-5 proportions)
    const pcbDeck = new Zdog.Anchor({
      addTo: piGroup,
      rotate: { x: Math.PI / 2 },
    });

    new Zdog.RoundedRect({
      addTo: pcbDeck,
      width: 82,
      height: 54,
      cornerRadius: 4,
      stroke: 4,
      fill: true,
      color: "#15151a",
    });

    // Subtle monochrome silkscreen perimeter trace
    new Zdog.RoundedRect({
      addTo: piGroup,
      width: 78,
      height: 50,
      cornerRadius: 3,
      rotate: { x: Math.PI / 2 },
      translate: { y: -2.4 },
      stroke: 0.85,
      color: "#3f3f46",
    });

    // 4 Corner M2.5 Mounting Holes
    [
      [-35, -21],
      [21, -21],
      [-35, 21],
      [21, 21],
    ].forEach(([mx, mz]) => {
      new Zdog.Ellipse({
        addTo: piGroup,
        diameter: 3.4,
        rotate: { x: Math.PI / 2 },
        translate: { x: mx, y: -2.6, z: mz },
        stroke: 1.2,
        color: "#a1a1aa",
      });
    });

    // 40-Pin (2x20) GPIO Header Array along back edge
    new Zdog.Box({
      addTo: piGroup,
      width: 48,
      height: 3.5,
      depth: 5.5,
      translate: { x: -7, y: -4.2, z: -18.5 },
      stroke: false,
      color: "#27272e",
      topFace: "#3f3f46",
    });
    const gpioPins = [];
    for (let px = -29; px <= 15; px += 3.2) {
      [-1.3, 1.3].forEach((zPin) => {
        const pin = new Zdog.Shape({
          addTo: piGroup,
          path: [{ x: px, y: -5.5, z: -18.5 + zPin }, { x: px, y: -8.5, z: -18.5 + zPin }],
          stroke: 1.5,
          color: "#d4d4d8",
        });
        gpioPins.push(pin);
      });
    }

    // Authentic Pi-5 Right Edge I/O Stack: GbE RJ45 + 2x USB3 + 2x USB2
    // Pi 5 places Ethernet on bottom-right and twin USB stacks above/adjacent
    [
      { z: 16, w: 17, d: 14, h: 11.5, top: "#e4e4e7", front: "#a1a1aa", label: "GbE" },
      { z: -0.5, w: 15.5, d: 12.5, h: 12.5, top: "#d4d4d8", front: "#c8f542" }, // USB 3.0 accent seam
      { z: -15.5, w: 15.5, d: 12.5, h: 12.5, top: "#a1a1aa", front: "#71717a" }, // USB 2.0
    ].forEach((port) => {
      new Zdog.Box({
        addTo: piGroup,
        width: port.w,
        height: port.h,
        depth: port.d,
        translate: { x: 34.5, y: -8.2, z: port.z },
        stroke: 0.9,
        color: "#52525b",
        topFace: port.top,
        frontFace: port.front,
        rightFace: "#d4d4d8",
        leftFace: "#3f3f46",
        rearFace: "#27272e",
      });
    });

    // Bottom edge ports: USB-C PD Power + Dual Micro-HDMI + PoE / RP1 details
    [-27, -14, -3].forEach((px, i) => {
      new Zdog.Box({
        addTo: piGroup,
        width: i === 0 ? 8 : 6.5,
        height: 4,
        depth: 6,
        translate: { x: px, y: -4, z: 24.5 },
        stroke: 0.7,
        color: "#71717a",
        topFace: i === 0 ? "#ffffff" : "#a1a1aa",
      });
    });

    // PCIe / MIPI CSI Ribbon Connector + RP1 Southbridge Chip
    new Zdog.Box({
      addTo: piGroup,
      width: 5,
      height: 4.5,
      depth: 16,
      translate: { x: -34, y: -4.2, z: 2 },
      stroke: 0.7,
      color: "#d4d4d8",
      topFace: "#ffffff",
    });
    new Zdog.Box({
      addTo: piGroup,
      width: 11,
      height: 2.5,
      depth: 11,
      translate: { x: 11, y: -3.2, z: 7 },
      stroke: 0.6,
      color: "#27272e",
      topFace: "#52525b",
    });

    // Broadcom BCM2712 Quad-Core SoC Die & Active Extraction Portion
    const socMarker = new Zdog.Anchor({
      addTo: piGroup,
      translate: { x: -11, y: -6.5, z: -1 },
    });

    new Zdog.Box({
      addTo: socMarker,
      width: 21,
      height: 4.5,
      depth: 21,
      stroke: 0.9,
      color: "#3f3f46",
      topFace: "#27272e",
      frontFace: "#52525b",
      rightFace: "#52525b",
      leftFace: "#27272e",
      rearFace: "#18181d",
    });

    // Heatspreader fins on BCM2712 die
    [-6, -2, 2, 6].forEach((fz) => {
      new Zdog.Shape({
        addTo: socMarker,
        path: [{ x: -8.5, y: -2.8, z: fz }, { x: 8.5, y: -2.8, z: fz }],
        stroke: 1.2,
        color: "#71717a",
      });
    });

    // Sweeping active extraction bar gliding over BCM2712 SoC
    const scanSlice = new Zdog.Shape({
      addTo: socMarker,
      path: [{ x: -9.5, y: -3.6, z: 0 }, { x: 9.5, y: -3.6, z: 0 }],
      stroke: 2.8,
      color: "#c8f542",
    });

    // Floating holographic feature-extraction frame above active SoC portion
    const piActiveAura = new Zdog.RoundedRect({
      addTo: socMarker,
      width: 24,
      height: 24,
      cornerRadius: 2,
      rotate: { x: Math.PI / 2 },
      translate: { y: -7.5 },
      stroke: 1.5,
      color: "#c8f542",
    });

    // Status Activity LED on PCB edge
    const piLed = new Zdog.Shape({
      addTo: piGroup,
      translate: { x: -36, y: -3.8, z: 18 },
      stroke: 4,
      color: "#c8f542",
    });

    /* =====================================================================
     * 2. VERTICAL TELEMETRY STREAM & ZERO-PARAM CODEC QUANTIZER
     * ===================================================================== */
    const codecGroup = new Zdog.Anchor({
      addTo: rig,
      translate: { y: 0 },
    });

    const outerCodec = new Zdog.Ellipse({
      addTo: codecGroup,
      diameter: 44,
      quarters: 3,
      rotate: { x: Math.PI / 2 },
      stroke: 2.5,
      color: "#c8f542",
    });

    const innerCodec = new Zdog.Ellipse({
      addTo: codecGroup,
      diameter: 28,
      quarters: 2,
      rotate: { x: Math.PI / 2 },
      stroke: 1.6,
      color: "#e4e4e7",
    });

    const codecMarker = new Zdog.Anchor({
      addTo: codecGroup,
      translate: { x: 24, y: -2, z: 0 },
    });

    // Vertical guide shaft rising from BCM2712 SoC core -> Codec -> Host Core
    new Zdog.Shape({
      addTo: rig,
      path: [{ x: -4, y: 26, z: 0 }, { x: 0, y: -28, z: 0 }],
      stroke: 1.1,
      color: "#3f3f46",
    });

    // 5 Animated rising feature packets climbing from RPi 5 -> Codec -> Host
    const packets = Array.from({ length: 5 }, (_, idx) => {
      const p = new Zdog.Shape({
        addTo: rig,
        stroke: 4,
        color: "#a1a1aa",
      });
      return { shape: p, phase: idx / 5 };
    });

    /* =====================================================================
     * 3. UPPER DECK: CLOUD HOST TAIL + EXTRACTED FEATURE IDENTIFICATION
     * ===================================================================== */
    const hostGroup = new Zdog.Group({
      addTo: rig,
      translate: { y: -42 },
    });

    // Open architectural wireframe tensor chamber (12 crisp edges)
    const hw = 18;
    const hh = 13;
    const hd = 18;
    const boxEdges = [
      // top face
      [[-hw, -hh, -hd], [hw, -hh, -hd]],
      [[hw, -hh, -hd], [hw, -hh, hd]],
      [[hw, -hh, hd], [-hw, -hh, hd]],
      [[-hw, -hh, hd], [-hw, -hh, -hd]],
      // bottom face
      [[-hw, hh, -hd], [hw, hh, -hd]],
      [[hw, hh, -hd], [hw, hh, hd]],
      [[hw, hh, hd], [-hw, hh, hd]],
      [[-hw, hh, hd], [-hw, hh, -hd]],
      // verticals
      [[-hw, -hh, -hd], [-hw, hh, -hd]],
      [[hw, -hh, -hd], [hw, hh, -hd]],
      [[hw, -hh, hd], [hw, hh, hd]],
      [[-hw, -hh, hd], [-hw, hh, hd]],
    ];
    boxEdges.forEach(([a, b], i) => {
      new Zdog.Shape({
        addTo: hostGroup,
        path: [
          { x: a[0], y: a[1], z: a[2] },
          { x: b[0], y: b[1], z: b[2] },
        ],
        stroke: i < 4 ? 1.5 : 1,
        color: i < 4 ? "#e4e4e7" : "#52525b",
      });
    });

    // Central spinning Host Neural Decoder Core
    const hostCore = new Zdog.Anchor({ addTo: hostGroup });
    new Zdog.Polygon({
      addTo: hostCore,
      sides: 6,
      radius: 7,
      stroke: 1.8,
      fill: true,
      color: "#27272e",
    });
    new Zdog.Polygon({
      addTo: hostCore,
      sides: 6,
      radius: 7,
      rotate: { y: Math.PI / 2 },
      stroke: 1.4,
      color: "#c8f542",
    });

    // 3 Orbiting Identified Targets + Feature Rays inside Host tail space
    const targetConfigs = [
      { radius: 26, speed: 0.7, yBase: -4, phase: 0, meta: DETECT_LABELS[0] },
      { radius: 24, speed: -0.55, yBase: 6, phase: 2.1, meta: DETECT_LABELS[1] },
      { radius: 28, speed: 0.45, yBase: -10, phase: 4.2, meta: DETECT_LABELS[2] },
    ];

    const hostTargets = targetConfigs.map((cfg) => {
      const anchor = new Zdog.Anchor({ addTo: hostGroup });
      const node = new Zdog.Shape({
        addTo: anchor,
        stroke: 5.5,
        color: cfg.meta.color,
      });
      const ray = new Zdog.Shape({
        addTo: hostGroup,
        path: [{ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }],
        stroke: 0.9,
        color: "#52525b",
      });
      return { anchor, node, ray, cfg };
    });

    const ctx = canvas.getContext("2d");
    let rafId = 0;
    let dragging = false;
    let movedDist = 0;
    let startX = 0;
    let startY = 0;
    let startRotX = illo.rotate.x;
    let startRotY = illo.rotate.y;
    let velY = 0;
    const isCoarse = window.matchMedia?.("(pointer: coarse)").matches;
    const startClock = performance.now();

    const drawHudOverlays = (sec) => {
      if (!ctx) return;
      const mode = focusRef.current;
      const dpr = illo.pixelRatio || 1;
      const cx = illo.width / 2;
      const cy = illo.height / 2;
      const z = illo.zoom;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Tracked HOST detection bounding boxes around orbiting extracted feature targets
      hostTargets.forEach((ht, idx) => {
        const sx = cx + ht.anchor.renderOrigin.x * z;
        const sy = cy + ht.anchor.renderOrigin.y * z;
        const lockWave = reduce ? 1 : (Math.sin(sec * 2.8 + idx * 2.1) + 1) * 0.5;
        const isLocked = mode === "host" || lockWave > 0.45;
        if (mode === "rpi5") return; // keep attention cleanly on Pi 5 when zoomed into Pi 5

        const boxSize = (mode === "host" ? 26 : 19) - lockWave * 3;
        const showLabel = mode === "host" || (mode === "all" && idx === 0 && lockWave > 0.55);
        const tagText = showLabel ? `${ht.cfg.meta.cls} ${ht.cfg.meta.conf}` : null;
        if (isLocked || mode === "host") {
          drawCornerBox(ctx, sx, sy, boxSize, ht.cfg.meta.color, tagText, mode === "host");
        }
      });

      // 2. Tracked RPi 5 BCM2712 active slice bracket when Pi 5 stage is focused
      if (mode === "rpi5") {
        const rx = cx + socMarker.renderOrigin.x * z;
        const ry = cy + socMarker.renderOrigin.y * z;
        drawCornerBox(ctx, rx, ry, 34, "#c8f542", "BCM2712 · EARLY CONV", true);
      }

      // 3. Tracked CODEC sparsity reticle when Codec is focused
      if (mode === "codec") {
        const kx = cx + codecMarker.renderOrigin.x * z;
        const ky = cy + codecMarker.renderOrigin.y * z;
        drawCornerBox(ctx, kx, ky, 22, "#c8f542", "THRESH · 89% CUT", true);
      }

      ctx.restore();
    };

    const animate = (now) => {
      const sec = (now - startClock) * 0.001;
      const mode = focusRef.current;
      const target = CAMERA_PRESETS[mode] || CAMERA_PRESETS.all;

      // Smooth camera transition toward selected hardware stage
      illo.zoom += (target.zoom - illo.zoom) * 0.09;
      rig.translate.y += (target.y - rig.translate.y) * 0.09;

      if (!dragging) {
        if (!manualSpinRef.current) {
          illo.rotate.x += (target.rx - illo.rotate.x) * 0.07;
        }
        illo.rotate.y += (mode === "all" ? 0.0055 : 0.0035) + velY;
        velY *= 0.92;
      }

      // RPi 5 BCM2712 active slice sweep + floating aura pulse
      const rpiHot = mode === "rpi5";
      const sweepZ = Math.sin(sec * (rpiHot ? 4.2 : 2.1)) * 7.5;
      scanSlice.path[0].z = sweepZ;
      scanSlice.path[1].z = sweepZ;
      scanSlice.updatePath();
      scanSlice.stroke = rpiHot ? 3.4 : 2.2;

      const auraPulse = 0.88 + Math.sin(sec * (rpiHot ? 5 : 2.6)) * 0.14;
      piActiveAura.scale.set({ x: auraPulse, y: auraPulse, z: 1 });
      piActiveAura.translate.y = -7.5 - (Math.sin(sec * 3) + 1) * (rpiHot ? 2.5 : 1.0);
      piLed.color = Math.sin(sec * 6) > 0 ? "#c8f542" : "#52525b";

      // Flash alternating GPIO telemetry pins when RPi 5 is focused
      gpioPins.forEach((pin, idx) => {
        const wave = rpiHot && Math.floor(sec * 12) % 7 === idx % 7;
        pin.color = wave ? "#c8f542" : "#a1a1aa";
      });

      // Codec rings counter-rotate cleanly
      outerCodec.rotate.z += mode === "codec" ? 0.036 : 0.015;
      innerCodec.rotate.z -= mode === "codec" ? 0.045 : 0.02;

      // Rising packets: Pi-5 raw grey tensors below Codec -> sharp #c8f542 quantized features above
      packets.forEach((pkt) => {
        const u = (sec * (mode === "codec" ? 0.45 : 0.32) + pkt.phase) % 1;
        const yPos = 25 - u * 58; // 25 (RPi5) -> 0 (Codec) -> -33 (Host)
        pkt.shape.translate.y = yPos;
        pkt.shape.translate.x = (1 - u) * -4;
        pkt.shape.color = yPos > 0 ? "#a1a1aa" : "#c8f542";
        pkt.shape.stroke = yPos > 0 ? 5.2 : 3.2;
      });

      // Cloud Host neural core & identified target orbits
      hostCore.rotate.y += mode === "host" ? 0.04 : 0.018;
      hostCore.rotate.x = Math.sin(sec * 1.1) * 0.3;

      hostTargets.forEach(({ anchor, ray, cfg }) => {
        const angle = sec * cfg.speed * (mode === "host" ? 1.35 : 0.9) + cfg.phase;
        const tx = Math.cos(angle) * cfg.radius;
        const tz = Math.sin(angle) * cfg.radius;
        const ty = cfg.yBase + Math.sin(sec * 1.8 + cfg.phase) * 3;
        anchor.translate.set({ x: tx, y: ty, z: tz });
        ray.path[1] = { x: tx, y: ty, z: tz };
        ray.updatePath();
        ray.color = mode === "host" ? cfg.meta.color : "#3f3f46";
      });

      illo.updateRenderGraph();
      drawHudOverlays(sec);

      if (!reduce) rafId = requestAnimationFrame(animate);
    };

    const onDown = (e) => {
      dragging = true;
      movedDist = 0;
      startX = e.clientX;
      startY = e.clientY;
      startRotX = illo.rotate.x;
      startRotY = illo.rotate.y;
      velY = 0;
      setInteracting(true);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("pointercancel", onUp, { passive: true });
    };

    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      movedDist = Math.max(movedDist, Math.hypot(dx, dy));
      if (movedDist > 4) manualSpinRef.current = true;
      const prevY = illo.rotate.y;
      illo.rotate.y = startRotY - (dx / 140) * Math.PI;
      if (!isCoarse) {
        illo.rotate.x = Math.max(-1.05, Math.min(0.2, startRotX - (dy / 160) * Math.PI));
      }
      velY = (illo.rotate.y - prevY) * 0.35;
      if (reduce) {
        illo.updateRenderGraph();
        drawHudOverlays(0);
      }
    };

    const onUp = (e) => {
      const wasTap = dragging && movedDist < 5;
      dragging = false;
      setInteracting(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);

      // Direct click on top / middle / bottom section of 3D stage focuses that layer cleanly
      if (wasTap && e?.clientY !== undefined) {
        const rect = canvas.getBoundingClientRect();
        const ry = (e.clientY - rect.top) / Math.max(1, rect.height);
        if (ry < 0.38) selectStage("host");
        else if (ry < 0.58) selectStage("codec");
        else selectStage("rpi5");
      }
    };

    const ro = new ResizeObserver(() => {
      illo.setMeasuredSize();
      illo.updateRenderGraph();
      drawHudOverlays((performance.now() - startClock) * 0.001);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const applyReducedSnap = () => {
      if (!reduce) return;
      const target = CAMERA_PRESETS[focusRef.current] || CAMERA_PRESETS.all;
      illo.zoom = target.zoom;
      rig.translate.y = target.y;
      illo.rotate.x = target.rx;
      illo.updateRenderGraph();
      drawHudOverlays(0);
    };
    snapReducedRef.current = applyReducedSnap;

    illo.setMeasuredSize();
    if (reduce) {
      applyReducedSnap();
    } else {
      rafId = requestAnimationFrame(animate);
    }

    canvas.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      snapReducedRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      illo.setResize(false);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [reduce]);

  // Snap immediately when stage button changes while prefers-reduced-motion is active
  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  const activeStage = STAGES.find((s) => s.id === focus) || STAGES[0];

  return (
    <div className="border border-line bg-panel chamfer">
      <div className="dither flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:px-4">
        <span className="text-bone">3D NODE // {activeStage.id === "all" ? "ZDOG VECTOR" : activeStage.label}</span>
        <span className={interacting || focus !== "all" ? "text-acid" : "text-ash"}>
          {interacting ? "ORBITING..." : activeStage.tag}
        </span>
      </div>

      <div className="relative h-56 w-full sm:h-64">
        <canvas
          ref={canvasRef}
          aria-label="Interactive 3D Raspberry Pi 5 edge board, codec quantizer ring, and host inference identification chamber"
          style={{ touchAction: "pan-y" }}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />

        {/* Interactive layer selector pills */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2.5 flex flex-wrap items-center justify-between gap-1.5 px-3 sm:px-4">
          <div className="pointer-events-auto flex flex-wrap gap-1.5">
            {STAGES.slice(1).map((s) => {
              const active = focus === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectStage(s.id)}
                  aria-pressed={active}
                  className={`cursor-pointer border px-2 py-1 font-mono text-[9.5px] uppercase tracking-wider transition-colors active:scale-95 chamfer-sm ${
                    active
                      ? "border-acid bg-acid font-bold text-ink"
                      : "border-line bg-ink/90 text-mute hover:border-ash hover:text-chalk"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
          {focus !== "all" && (
            <button
              type="button"
              onClick={() => selectStage("all")}
              className="pointer-events-auto cursor-pointer border border-line bg-ink/90 px-2 py-1 font-mono text-[9.5px] uppercase tracking-wider text-bone transition-colors hover:border-acid hover:text-acid chamfer-sm"
            >
              RESET VIEW
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
