import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Section, Reveal, Tag } from "./ui";
import { projects, profile } from "../data/portfolio";

/* bento spans on a 6-col grid: 4+2, then 2+2+2 */
const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export default function Projects() {
  return (
    <Section id="projects" index="04" eyebrow="things I've built" title="Selected" accent="work.">
      <div className="grid gap-4 md:grid-cols-6">
        {projects.map((p, i) => {
          /* Only cards with a real repo are links; the arrow appears only then */
          const Card = p.href ? motion.a : motion.div;
          const linkProps = p.href
            ? { href: p.href, target: "_blank", rel: "noreferrer", "aria-label": `${p.name} (opens GitHub repository)` }
            : {};
          return (
            <Reveal key={p.name} delay={i * 0.07} className={spans[i % spans.length]}>
              <Card
                {...linkProps}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex h-full flex-col rounded-xl border border-line bg-panel p-7 transition-colors hover:border-acid"
              >
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-mono text-sm text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {p.featured && (
                      <span className="rounded-full bg-acid px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                        Featured
                      </span>
                    )}
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-mute">
                      {p.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-bone">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/80">{p.description}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{p.features}</p>

                <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  {p.href && (
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="shrink-0 text-mute transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid"
                      size={22}
                    />
                  )}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-bone transition-colors hover:border-acid hover:text-acid"
          >
            <FiGithub aria-hidden="true" /> More on GitHub
            <FiArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
