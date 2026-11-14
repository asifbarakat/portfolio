import { useEffect, useRef, useState } from "react";
import { clearCache, layout, prepare } from "@chenglou/pretext";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiMinus, FiPlus } from "react-icons/fi";
import { Section, Reveal, Tag, Magnet } from "./ui";
import { projects, profile } from "../data/portfolio";

/* Calculate drawer height via @chenglou/pretext and verify live inner scrollHeight so phone wraps never clip */
function usePretextDrawerHeight(description, features, isOpen) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(180);

  useEffect(() => {
    if (!outerRef.current) return;
    let cancelled = false;

    const measure = () => {
      if (cancelled || !outerRef.current) return;
      const containerW = outerRef.current.clientWidth;
      const isSm = window.innerWidth >= 640;
      const padX = isSm ? 48 + 56 : 32;
      const textWidth = Math.max(200, containerW - padX);
      const fontDesc = '400 15px "Inter", ui-sans-serif, system-ui, sans-serif';
      const fontFeat = '400 14px "Inter", ui-sans-serif, system-ui, sans-serif';
      const r1 = layout(prepare(description, fontDesc), textWidth, 24);
      const r2 = layout(prepare(features, fontFeat), textWidth, 22);
      const pretextFloor = r1.height + r2.height + (isSm ? 108 : 136);
      const actual = innerRef.current ? innerRef.current.scrollHeight : 0;
      setContentHeight(Math.max(pretextFloor, actual));
    };

    measure();
    const raf = requestAnimationFrame(measure);
    document.fonts?.ready?.then(() => {
      if (cancelled) return;
      clearCache();
      measure();
    });

    const ro = new ResizeObserver(measure);
    ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [description, features, isOpen]);

  return { outerRef, innerRef, contentHeight };
}

/* Style 3 interactive horizontal filmstrip row with Gen-5 B/W polarity inversion */
function ProjectStrip({ project, index, isOpen, onToggle }) {
  const reduce = useReducedMotion();
  const { outerRef, innerRef, contentHeight } = usePretextDrawerHeight(
    project.description,
    project.features,
    isOpen
  );
  const idxLabel = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={index * 0.04}>
      <div
        className={`group border-b border-line transition-colors ${
          isOpen ? "bg-panel" : "bg-ink hover:bg-panel/70"
        }`}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-5 sm:items-center sm:px-6 sm:py-6">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left sm:items-center sm:gap-6"
          >
            <span
              className={`mt-0.5 shrink-0 px-2.5 py-1 font-mono text-xs font-bold transition-colors chamfer-sm sm:mt-0 ${
                isOpen
                  ? "bg-acid text-ink"
                  : "border border-line bg-raise text-mute group-hover:border-acid group-hover:text-acid"
              }`}
            >
              {idxLabel}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-bone transition-colors group-hover:text-chalk sm:text-2xl">
                  {project.name}
                </h3>
                {project.featured && (
                  <span className="bg-acid px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    Featured
                  </span>
                )}
                <span className="border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-mute">
                  {project.badge}
                </span>
              </div>
              {!isOpen && (
                <p className="mt-1.5 line-clamp-2 text-sm text-mute sm:line-clamp-1">{project.description}</p>
              )}
            </div>
          </button>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1 border border-line bg-ink px-2.5 font-mono text-[11px] uppercase tracking-wider text-chalk transition-colors hover:border-acid hover:bg-acid hover:text-ink chamfer-sm sm:h-auto sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-xs"
              >
                Repo <FiArrowUpRight aria-hidden="true" size={14} />
              </a>
            )}
            <button
              type="button"
              onClick={onToggle}
              aria-label={isOpen ? `Collapse ${project.name}` : `Expand ${project.name}`}
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center border border-line bg-raise text-bone transition-colors active:scale-95 hover:border-acid hover:bg-acid hover:text-ink chamfer-sm sm:h-9 sm:w-9"
            >
              {isOpen ? <FiMinus aria-hidden="true" size={15} /> : <FiPlus aria-hidden="true" size={15} />}
            </button>
          </div>
        </div>

        <div ref={outerRef} className="overflow-hidden px-4 sm:px-6">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { opacity: 1, height: "auto" }
                    : { height: contentHeight, opacity: 1 }
                }
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div ref={innerRef} className="border-t border-line/70 pb-6 pt-4 sm:pb-7 sm:pl-14 sm:pt-5">
                  <p className="max-w-3xl text-[15px] leading-relaxed text-bone/90">{project.description}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mute">{project.features}</p>
                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  /* First two SQA items start open so key production & public Playwright work is visible immediately */
  const [openMap, setOpenMap] = useState({ 0: true, 1: true });

  const toggle = (idx) => {
    setOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <Section id="projects" index="04" eyebrow="things I've built" title="Selected" accent="work.">
      <div className="border-t border-line">
        {projects.map((p, i) => (
          <ProjectStrip
            key={p.name}
            project={p}
            index={i}
            isOpen={Boolean(openMap[i])}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center sm:mt-12">
          <Magnet className="w-full sm:w-auto">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line bg-panel px-6 py-3 font-mono text-xs uppercase tracking-wider text-bone transition-colors hover:border-acid hover:bg-acid hover:text-ink chamfer-sm sm:w-auto"
            >
              <FiGithub aria-hidden="true" /> More on GitHub
              <FiArrowUpRight
                aria-hidden="true"
                className="text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </a>
          </Magnet>
        </div>
      </Reveal>
    </Section>
  );
}
