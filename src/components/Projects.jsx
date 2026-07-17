import { motion } from "framer-motion";
import { FiStar, FiFolder, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Section, Reveal, Tag } from "./ui";
import { projects, profile } from "../data/portfolio";

export default function Projects() {
  return (
    <Section id="projects" index="04" eyebrow="things I've built" title="Featured Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`glow-border group flex h-full flex-col rounded-2xl border bg-slate-900/40 p-6 ${
                p.featured
                  ? "border-cyan-400/25 bg-gradient-to-b from-cyan-500/[0.06] to-transparent"
                  : "border-slate-800"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-800/70 text-cyan-400 transition-colors group-hover:bg-cyan-400/15">
                  <FiFolder size={20} />
                </span>
                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300">
                      <FiStar size={11} /> Featured
                    </span>
                  )}
                  <span className="rounded-full border border-slate-700 px-2.5 py-1 font-mono text-xs text-slate-400">
                    {p.badge}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.features}</p>

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-white"
          >
            <FiGithub /> More on GitHub
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
