import { motion } from "framer-motion";

export const accentText = {
  cyan: "text-bone",
  violet: "text-bone",
  emerald: "text-acid",
};

/* Fade-up on scroll into view */
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Section shell: big outlined numeral + mono eyebrow + serif-accent title */
export function Section({ id, index, eyebrow, title, accent, children, className = "" }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      <Reveal>
        <div className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-acid">
              {index} / {eyebrow}
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-bone sm:text-5xl md:text-6xl">
              {title}
              {accent && <span className="serif text-acid"> {accent}</span>}
            </h2>
          </div>
          <span className="outline-num hidden select-none text-8xl font-bold leading-none md:block">
            {index}
          </span>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

/* Small mono chip; hover turns acid */
export function Tag({ children }) {
  return (
    <span className="rounded-md border border-line bg-raise px-2.5 py-1 font-mono text-xs text-mute transition-colors hover:border-acid hover:bg-acid hover:text-ink">
      {children}
    </span>
  );
}
