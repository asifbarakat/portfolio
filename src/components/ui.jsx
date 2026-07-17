import { motion } from "framer-motion";

/* Accent color → tailwind class maps (so data can just say "cyan") */
export const accentText = {
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
};
export const accentRing = {
  cyan: "hover:border-cyan-400/40 hover:text-cyan-300",
  violet: "hover:border-violet-400/40 hover:text-violet-300",
  emerald: "hover:border-emerald-400/40 hover:text-emerald-300",
};

/* Fade-up on scroll into view */
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Consistent section shell: id anchor + eyebrow + heading */
export function Section({ id, index, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      <Reveal>
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-sm text-cyan-400">
            {index} <span className="text-slate-500">//</span> {eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-violet-400" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}

/* Small pill / tag */
export function Tag({ children, accent = "cyan" }) {
  return (
    <span
      className={`rounded-full border border-slate-700/70 bg-slate-800/40 px-3 py-1 font-mono text-xs text-slate-300 transition-colors ${accentRing[accent]}`}
    >
      {children}
    </span>
  );
}
