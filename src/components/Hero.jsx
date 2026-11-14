import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { profile } from "../data/portfolio";
import LiveConsole from "./LiveConsole";
import { Magnet } from "./ui";

const marqueeItems = [
  "Playwright", "Appium", "Postman", "Grafana k6", "Chrome DevTools", "GitHub Actions",
  "TypeScript", "Python", "Flutter", "Docker", "Linux", "Raspberry Pi 5",
];

function useTypewriter(words, { typeSpeed = 60, deleteSpeed = 30, pause = 1500, still = false } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (still) return;
    const word = words[i % words.length];
    let timeout;
    if (!deleting && text === word) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      timeout = setTimeout(
        () => setText((p) => (deleting ? word.slice(0, p.length - 1) : word.slice(0, p.length + 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause, still]);

  return still ? words[0] : text;
}

/* Style 2: Hooke's-law spring character repulsion on pointer proximity (GPU translate3d only) */
function KineticHeadline() {
  const boxRef = useRef(null);
  const charRefs = useRef([]);
  const centersRef = useRef([]);
  const reduce = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const ok = !reduce && !window.matchMedia?.("(pointer: coarse)").matches;
    setInteractive(Boolean(ok));
  }, [reduce]);

  useEffect(() => {
    if (!interactive || !boxRef.current) return;
    const container = boxRef.current;
    const states = [];
    let rafId = 0;
    let pointer = { x: -9999, y: -9999, active: false };

    const measureCenters = () => {
      centersRef.current = charRefs.current.map((el, idx) => {
        if (!el) return null;
        if (!states[idx]) states[idx] = { x: 0, y: 0, vx: 0, vy: 0 };
        const prev = el.style.transform;
        el.style.transform = "translate3d(0,0,0)";
        const r = el.getBoundingClientRect();
        el.style.transform = prev;
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    };

    const tick = () => {
      const radius = 125;
      const strength = 0.42;
      const stiffness = 0.16;
      const damping = 0.74;
      let moving = false;

      charRefs.current.forEach((el, idx) => {
        const base = centersRef.current[idx];
        const st = states[idx];
        if (!el || !base || !st) return;

        let destX = 0;
        let destY = 0;
        if (pointer.active) {
          const dx = base.cx - pointer.x;
          const dy = base.cy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.01) {
            const p = Math.pow(1 - dist / radius, 1.25) * radius * strength;
            destX = (dx / dist) * p;
            destY = (dy / dist) * p;
          }
        }

        st.vx = (st.vx + (destX - st.x) * stiffness) * damping;
        st.vy = (st.vy + (destY - st.y) * stiffness) * damping;
        st.x += st.vx;
        st.y += st.vy;

        if (Math.abs(st.x) > 0.05 || Math.abs(st.y) > 0.05 || Math.abs(st.vx) > 0.05 || Math.abs(st.vy) > 0.05) {
          moving = true;
          const rot = Math.max(-8, Math.min(8, st.vx * 1.1));
          el.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        } else if (st.x !== 0 || st.y !== 0) {
          st.x = 0;
          st.y = 0;
          el.style.transform = "translate3d(0,0,0)";
        }
      });

      if (moving || pointer.active) rafId = requestAnimationFrame(tick);
      else rafId = 0;
    };

    const kick = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!centersRef.current.length) measureCenters();
      pointer = { x: e.clientX, y: e.clientY, active: true };
      kick();
    };
    const onLeave = () => {
      pointer = { x: -9999, y: -9999, active: false };
      kick();
    };
    const onScrollOrResize = () => {
      measureCenters();
    };

    const initTimer = setTimeout(measureCenters, 450);
    document.fonts?.ready?.then(measureCenters);

    container.addEventListener("mousemove", onMove, { passive: true });
    container.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });

    return () => {
      clearTimeout(initTimer);
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize);
    };
  }, [interactive]);

  if (!interactive) {
    return (
      <h1 className="text-[42px] min-[390px]:text-5xl font-bold leading-[0.98] tracking-tighter text-bone sm:text-7xl lg:text-8xl">
        Asif Barakat
        <br />
        <span className="serif text-acid">Chowdhury</span>
      </h1>
    );
  }

  const line1 = [..."Asif Barakat"];
  const line2 = [..."Chowdhury"];
  let refIdx = 0;

  return (
    <h1
      ref={boxRef}
      aria-label="Asif Barakat Chowdhury"
      className="cursor-default select-none text-[42px] min-[390px]:text-5xl font-bold leading-[0.98] tracking-tighter text-bone sm:text-7xl lg:text-8xl"
    >
      <span aria-hidden="true" className="block">
        {line1.map((ch, i) => {
          const idx = refIdx++;
          return (
            <span
              key={`1-${i}`}
              ref={(el) => {
                charRefs.current[idx] = el;
              }}
              className="inline-block will-change-transform"
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </span>
      <span aria-hidden="true" className="serif block text-acid">
        {line2.map((ch, i) => {
          const idx = refIdx++;
          return (
            <span
              key={`2-${i}`}
              ref={(el) => {
                charRefs.current[idx] = el;
              }}
              className="inline-block will-change-transform"
            >
              {ch}
            </span>
          );
        })}
      </span>
    </h1>
  );
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay },
});

export default function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(profile.roles, { still: reduce });

  return (
    <section id="top" className="relative px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <motion.div
            {...fade(0)}
            className="mb-4 inline-flex items-center gap-2 border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mute chamfer-sm sm:mb-5 sm:px-4 sm:text-xs"
          >
            <span className="h-2 w-2 animate-pulse bg-acid" />
            Open to SQA / SDET roles
          </motion.div>

          <motion.div {...fade(0.03)}>
            <KineticHeadline />
          </motion.div>

          <motion.div {...fade(0.06)} className="mt-5 min-h-12 font-mono text-sm leading-snug text-bone sm:mt-7 sm:min-h-8 sm:text-lg">
            <span className="text-acid">&gt;</span> {typed}
            <span className="ml-0.5 inline-block h-4 w-[8px] translate-y-0.5 animate-blink bg-acid sm:h-5 sm:w-[9px] sm:translate-y-1" />
          </motion.div>

          <motion.p {...fade(0.1)} className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute sm:mt-6 sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div {...fade(0.14)} className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <Magnet className="w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex min-h-11 w-full items-center justify-center gap-1.5 bg-chalk px-3.5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-[transform,background-color] active:scale-[0.98] hover:scale-[1.03] hover:bg-acid chamfer-sm sm:w-auto sm:gap-2 sm:px-6 sm:text-sm"
              >
                View my work
                <FiArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnet>
            <Magnet className="w-full sm:w-auto">
              <a
                href="#contact"
                className="inline-flex min-h-11 w-full items-center justify-center border border-line bg-panel px-3.5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-bone transition-colors active:scale-[0.98] hover:border-acid hover:text-acid chamfer-sm sm:w-auto sm:px-6 sm:text-sm"
              >
                Get in touch
              </a>
            </Magnet>
            <div className="col-span-2 flex items-center gap-2.5 pt-0.5 sm:contents sm:pt-0">
              <Magnet strength={0.35}>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 shrink-0 place-items-center border border-line bg-panel text-mute transition-colors hover:border-acid hover:bg-acid hover:text-ink chamfer-sm"
                >
                  <FaGithub size={18} />
                </a>
              </Magnet>
              <Magnet strength={0.35}>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 shrink-0 place-items-center border border-line bg-panel text-mute transition-colors hover:border-acid hover:bg-acid hover:text-ink chamfer-sm"
                >
                  <FaLinkedinIn size={17} />
                </a>
              </Magnet>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-mute sm:hidden">
                <FiMapPin aria-hidden="true" /> {profile.location}
              </span>
            </div>
          </motion.div>

          <motion.div {...fade(0.18)} className="mt-7 hidden items-center gap-2 font-mono text-xs text-mute sm:flex">
            <FiMapPin aria-hidden="true" /> {profile.location}
          </motion.div>
        </div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <LiveConsole />
        </motion.div>
      </div>

      {/* Monochrome Gen-5 scoreboard stat strip with NumberFlow */}
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 border-y border-line sm:mt-9 md:grid-cols-4">
        <div className="px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="font-mono text-3xl font-semibold tracking-tight text-acid tabular-nums sm:text-4xl">
            <NumberFlow value={3.8} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} />
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">CGPA · BSc CSE</div>
        </div>
        <div className="border-l border-line px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="font-mono text-3xl font-semibold tracking-tight text-chalk tabular-nums sm:text-4xl">
            <NumberFlow value={6} />
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">QA tools in daily use</div>
        </div>
        <div className="border-t border-line px-4 py-3.5 sm:px-6 sm:py-4 md:border-t-0 md:border-l">
          <div className="font-mono text-3xl font-semibold tracking-tight text-chalk tabular-nums sm:text-4xl">
            <NumberFlow value={4} suffix="+" />
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">Shipped projects</div>
        </div>
        <div className="border-l border-t border-line px-4 py-3.5 sm:px-6 sm:py-4 md:border-t-0">
          <div className="font-mono text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">SQA</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">Intern @ AppifyLab</div>
        </div>
      </div>

      {/* Monochrome tool marquee */}
      <div aria-hidden="true" className="mx-auto mt-0 max-w-6xl overflow-hidden border-b border-line py-5">
        <div className="flex w-max animate-marquee gap-10">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-sm uppercase tracking-widest text-mute">
              {m} <span className="text-acid">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
