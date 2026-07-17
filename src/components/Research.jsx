import { motion } from "framer-motion";
import { FiZap, FiArrowUpRight } from "react-icons/fi";
import { SiIeee } from "react-icons/si";
import { Section, Reveal, Tag } from "./ui";
import { research, publication } from "../data/portfolio";

export default function Research() {
  return (
    <Section id="research" index="03" eyebrow="the deep work" title="Research">
      {/* Published paper — highlighted link to IEEE Xplore */}
      <Reveal>
        <a
          href={publication.url}
          target="_blank"
          rel="noreferrer"
          className="group mb-8 flex flex-col gap-4 rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6 transition-colors hover:border-cyan-400/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950/50 text-cyan-300">
              <SiIeee size={26} />
            </span>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Published · {publication.venue}
              </p>
              <p className="mt-1 font-semibold text-white">{publication.title}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-colors group-hover:border-cyan-400/50 group-hover:text-white sm:self-auto">
            View on IEEE Xplore
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </Reveal>

      <div className="space-y-8">
        {research.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glow-border overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40"
            >
              {/* header band */}
              <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 px-6 py-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-300">
                  <FiZap size={12} /> {r.kind}
                </span>
              </div>

              <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_1.1fr]">
                {/* left: title + desc + stack */}
                <div>
                  <h3 className="text-xl font-bold leading-snug text-white">{r.title}</h3>
                  <p className="mt-4 leading-relaxed text-slate-400">{r.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.stack.map((s) => (
                      <Tag key={s} accent="violet">
                        {s}
                      </Tag>
                    ))}
                  </div>
                </div>

                {/* right: contributions */}
                <div className="space-y-4">
                  {r.contributions.map((c, ci) => (
                    <div key={c.head} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-sm font-bold text-cyan-400">
                        0{ci + 1}
                      </span>
                      <div className="border-l border-slate-800 pl-4">
                        <h4 className="font-semibold text-white">{c.head}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
