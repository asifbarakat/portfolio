import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/* Fade-up entrance on scroll (amount: "some" guarantees tall mobile blocks reveal reliably) */
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.38, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Section frame: Gen-5 chamfer index tag + outlined backdrop numeral */
export function Section({ id, index, eyebrow, title, accent, children, className = "" }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl scroll-mt-14 px-4 py-14 sm:px-6 sm:py-24 md:py-28 ${className}`}>
      <Reveal>
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-line pb-5 sm:mb-14 sm:pb-6">
          <div>
            <div className="inline-flex items-center gap-2 border border-line bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone chamfer-sm">
              <span className="h-1.5 w-1.5 bg-acid" />
              {index} // {eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bone sm:mt-4 sm:text-5xl md:text-6xl">
              {title}
              {accent && <span className="serif text-acid"> {accent}</span>}
            </h2>
          </div>
          <span className="outline-num shrink-0 select-none font-mono text-5xl font-bold leading-none sm:text-7xl md:text-8xl">
            {index}
          </span>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

/* Inverted polarity tag chip */
export function Tag({ children }) {
  return (
    <span className="border border-line bg-raise px-2.5 py-1 font-mono text-xs text-mute transition-colors hover:border-acid hover:bg-acid hover:text-ink">
      {children}
    </span>
  );
}

/* Magnetic pointer attraction wrapper for CTAs & icon actions (Style 2) */
export function Magnet({ children, strength = 0.28, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || !ref.current || window.matchMedia?.("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
