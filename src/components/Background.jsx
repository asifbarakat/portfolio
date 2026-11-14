import { useEffect, useRef } from "react";
import { Delaunay } from "d3-delaunay";
import { useReducedMotion } from "framer-motion";

const TOKENS = [
  "TLS 1.3", "DNSSEC", "OAUTH2", "ZERO-TRUST", "PACKET", "RBAC",
  "HTTP/3", "CSRF", "SOCKET", "PLAYWRIGHT", "CONCURRENCY", "QUIC",
  "JWT-SIG", "XSS-GUARD", "HANDOFF", "FIREWALL", "APPIUM", "MTLS",
  "CIPHER", "GRPC", "SANDBOX", "REGRESSION", "LATENCY", "CSP-HDR",
  "TCP/IP", "PAYLOAD", "PROXY", "SHA-256", "ASSERT", "AUDIT",
];

const COMPACT_TOKENS = [
  "TLS", "MTLS", "JWT", "DNS", "QUIC", "RBAC",
  "CSRF", "GRPC", "CSP", "SYN", "SSH", "PKI",
  "HMAC", "OIDC", "SOCK", "AUDIT",
];

function buildTapFacetEdges() {
  const pts = [[0, 0]];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
    const r = 18 + Math.random() * 22;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  const del = Delaunay.from(pts);
  const { triangles } = del;
  const seen = new Set();
  const edges = [];
  for (let i = 0; i < triangles.length; i += 3) {
    const tri = [triangles[i], triangles[i + 1], triangles[i + 2]];
    for (let e = 0; e < 3; e++) {
      const a = tri[e];
      const b = tri[(e + 1) % 3];
      const key = a < b ? a * 16 + b : b * 16 + a;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([pts[a][0], pts[a][1], pts[b][0], pts[b][1]]);
    }
  }
  return edges;
}

/* Desktop: left/right security & network kinetic lanes + live d3-delaunay mesh; Phone: perimeter rail + Delaunay tap burst */
export default function Background() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let footerEl = document.querySelector("footer");
    let W = 0;
    let H = 0;
    let dpr = 1;
    let wrapH = 1044;
    let nodes = [];
    let railTicks = [];
    let rafId = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];

    const buildNodes = () => {
      nodes = [];
      railTicks = [];
      const rowStep = 58;
      const rows = Math.max(1, Math.ceil((H + rowStep) / rowStep));
      wrapH = rows * rowStep;

      const contentHalf = Math.min(576, W * 0.46);
      const leftEnd = Math.max(0, W / 2 - contentHalf);
      const rightStart = Math.min(W, W / 2 + contentHalf);

      const populateSide = (xStart, xEnd, isRight) => {
        const laneW = xEnd - xStart;
        if (laneW < 64) return;

        const useFull = laneW >= 104;
        const pool = useFull ? TOKENS : COMPACT_TOKENS;
        const colCount = laneW >= 220 ? 2 : 1;
        const colStep = laneW / colCount;
        const edgePad = useFull ? 36 : 22;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < colCount; c++) {
            const idx = r * colCount + c + (isRight ? 11 : 0);
            const label = pool[idx % pool.length];
            const stagger = (r % 2 === 0 ? 0.36 : 0.64) * colStep;
            const rawX = xStart + c * colStep + stagger;
            const minX = xStart + edgePad;
            const maxX = Math.max(minX, xEnd - edgePad);
            const bx = Math.max(minX, Math.min(maxX, rawX));
            const by = r * rowStep + ((c * 26) % rowStep);
            nodes.push({
              label,
              side: isRight ? 1 : 0,
              bx,
              by,
              minX,
              maxX,
              x: 0,
              y: 0,
              vx: 0,
              vy: 0,
              phase: idx * 0.63,
              speed: 0.14 + (c % 2) * 0.05,
              highlight: idx % 5 === 0,
            });
          }
        }
      };

      populateSide(16, leftEnd - 12, false);
      populateSide(rightStart + 12, W - 16, true);

      // Compact screens without wide side gutters get parallax perimeter tick rails along outer 8px edges
      if (nodes.length === 0) {
        const step = 36;
        const railRows = Math.max(1, Math.ceil((H + step) / step));
        wrapH = railRows * step;
        for (let r = 0; r < railRows; r++) {
          railTicks.push({ by: r * step, major: r % 5 === 0, phase: r * 0.55 });
        }
      }
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const drawLaneMesh = (pts, cutBottom) => {
      if (pts.length < 3) return;
      const del = Delaunay.from(pts, (d) => d.px, (d) => d.py);
      const { triangles } = del;
      const seen = new Set();
      const stride = pts.length + 1;
      const maxEdge = 190;
      const linkRadius = 185;

      for (let i = 0; i < triangles.length; i += 3) {
        const tri = [triangles[i], triangles[i + 1], triangles[i + 2]];
        for (let e = 0; e < 3; e++) {
          const a = tri[e];
          const b = tri[(e + 1) % 3];
          const key = a < b ? a * stride + b : b * stride + a;
          if (seen.has(key)) continue;
          seen.add(key);

          const p0 = pts[a];
          const p1 = pts[b];
          const len = Math.hypot(p1.px - p0.px, p1.py - p0.py);
          if (len > maxEdge) continue;

          const midY = (p0.py + p1.py) * 0.5;
          const bottomFade = Math.min(1, Math.max(0, (cutBottom - midY) / 48));
          const lenFade = 1 - len / maxEdge;
          let near = 0;
          if (!reduce && pointer.active && pointer.y < cutBottom) {
            const md = Math.hypot((p0.px + p1.px) * 0.5 - pointer.x, midY - pointer.y);
            if (md < linkRadius) near = 1 - md / linkRadius;
          }

          ctx.beginPath();
          ctx.moveTo(p0.px, p0.py);
          ctx.lineTo(p1.px, p1.py);
          if (near > 0.12) {
            ctx.strokeStyle = `rgba(200, 245, 66, ${((0.08 + near * 0.36) * bottomFade).toFixed(3)})`;
            ctx.lineWidth = 0.65 + near * 0.55;
          } else {
            ctx.strokeStyle = `rgba(82, 82, 91, ${(0.18 * lenFade * bottomFade).toFixed(3)})`;
            ctx.lineWidth = 0.6;
          }
          ctx.stroke();
        }
      }
    };

    const draw = (now) => {
      const t = now * 0.001;
      const scrollY = window.scrollY || 0;
      const radius = 155;
      const navTop = 58;
      if (!footerEl) footerEl = document.querySelector("footer");
      const cutBottom = footerEl ? Math.min(H, Math.max(navTop, footerEl.getBoundingClientRect().top - 8)) : H;

      ctx.clearRect(0, 0, W, H);

      if (nodes.length > 0) {
        const leftVis = [];
        const rightVis = [];
        const renderQueue = [];

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const baseY = (((n.by - scrollY * n.speed) % wrapH) + wrapH) % wrapH - 40;
          const driftX = reduce ? 0 : Math.cos(t * 0.7 + n.phase) * 3;
          const driftY = reduce ? 0 : Math.sin(t * 0.9 + n.phase) * 3;

          let destX = 0;
          let destY = 0;
          let proximity = 0;

          if (!reduce && pointer.active && pointer.y < cutBottom) {
            const dx = n.bx + n.x - pointer.x;
            const dy = baseY + n.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < radius && dist > 0.01) {
              proximity = 1 - dist / radius;
              const push = Math.pow(proximity, 1.2) * 38;
              destX = (dx / dist) * push;
              destY = (dy / dist) * push;
            }
          }

          if (!reduce) {
            n.vx = (n.vx + (destX - n.x) * 0.14) * 0.78;
            n.vy = (n.vy + (destY - n.y) * 0.14) * 0.78;
            n.x = Math.max(n.minX - n.bx, Math.min(n.maxX - n.bx, n.x + n.vx));
            n.y += n.vy;
          }

          const px = n.bx + driftX + n.x;
          const py = baseY + driftY + n.y;
          if (py < navTop || py > cutBottom) continue;

          const pt = { px, py, n, proximity };
          if (n.side === 0) leftVis.push(pt);
          else rightVis.push(pt);
          renderQueue.push(pt);
        }

        // Draw Delaunay security mesh cleanly behind tokens in each lane
        drawLaneMesh(leftVis, cutBottom);
        drawLaneMesh(rightVis, cutBottom);

        ctx.font = '600 10.5px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < renderQueue.length; i++) {
          const { px, py, n, proximity } = renderQueue[i];
          const topFade = Math.min(1, (py - navTop) / 28);
          const bottomFade = Math.min(1, (cutBottom - py) / 36);
          const pulse = reduce ? 0 : (Math.sin(t * 1.35 + n.phase) + 1) * 0.5;
          const alpha = (0.16 + pulse * 0.13 + proximity * 0.68) * topFade * bottomFade;
          if (alpha <= 0.02) continue;

          if (proximity > 0.28) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(200, 245, 66, ${(proximity * 0.22 * bottomFade).toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }

          ctx.save();
          ctx.globalAlpha = Math.min(0.95, alpha);
          const hot = proximity > 0.35 || (n.highlight && pulse > 0.78);
          ctx.fillStyle = hot ? "#c8f542" : proximity > 0.12 ? "#ffffff" : "#a1a1aa";
          ctx.fillText(n.label, px, py);
          ctx.restore();
        }
      } else {
        // Mobile / compact viewport perimeter telemetry rail & Delaunay facet tap pulse
        for (let i = 0; i < railTicks.length; i++) {
          const rt = railTicks[i];
          const py = (((rt.by - scrollY * 0.22) % wrapH) + wrapH) % wrapH - 20;
          if (py < navTop || py > cutBottom) continue;

          const topFade = Math.min(1, (py - navTop) / 24);
          const bottomFade = Math.min(1, (cutBottom - py) / 32);
          const pulse = reduce ? 0 : (Math.sin(t * 1.5 + rt.phase) + 1) * 0.5;
          let boost = 0;
          for (let r = ripples.length - 1; r >= 0; r--) {
            const age = t - ripples[r].t;
            if (age > 0.9) {
              ripples.splice(r, 1);
              continue;
            }
            const ringY = Math.abs(py - ripples[r].y);
            const ringDist = Math.abs(ringY - age * 260);
            if (ringDist < 36) boost = Math.max(boost, (1 - ringDist / 36) * (1 - age / 0.9));
          }

          const len = (rt.major ? 6 : 3) + boost * 3;
          const alpha = ((rt.major ? 0.24 : 0.12) + pulse * 0.14 + boost * 0.55) * topFade * bottomFade;
          if (alpha <= 0.02) continue;

          ctx.fillStyle = rt.major || boost > 0.2 ? `rgba(200, 245, 66, ${alpha.toFixed(3)})` : `rgba(161, 161, 170, ${alpha.toFixed(3)})`;
          ctx.fillRect(0, py, len, 1);
          ctx.fillRect(W - len, py, len, 1);
        }

        for (let r = ripples.length - 1; r >= 0; r--) {
          const rp = ripples[r];
          const age = t - rp.t;
          if (age > 0.7 || rp.y < navTop || rp.y > cutBottom) continue;
          const scale = 0.45 + age * 2.2;
          const alpha = (1 - age / 0.7) * 0.28;
          ctx.beginPath();
          for (let k = 0; k < rp.edges.length; k++) {
            const [x0, y0, x1, y1] = rp.edges[k];
            ctx.moveTo(rp.x + x0 * scale, rp.y + y0 * scale);
            ctx.lineTo(rp.x + x1 * scale, rp.y + y1 * scale);
          }
          ctx.strokeStyle = `rgba(200, 245, 66, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      if (!reduce) rafId = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onTouchStart = (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      ripples.push({
        x: touch.clientX,
        y: touch.clientY,
        t: performance.now() * 0.001,
        edges: buildTapFacetEdges(),
      });
      if (ripples.length > 4) ripples.shift();
    };

    resize();
    if (reduce) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(draw);
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
    }
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-ink" />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />
      <div className="grain" />
    </>
  );
}
