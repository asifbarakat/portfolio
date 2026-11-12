import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Section, Reveal, Tag } from "./ui";
import { research } from "../data/portfolio";

/* Animated edge -> codec -> host pipeline */
function Pipeline() {
  const reduce = useReducedMotion();

  const Node = ({ title, sub, hot }) => (
    <div className={`rounded-lg border px-2.5 py-2.5 text-center sm:px-4 sm:py-3 ${hot ? "border-acid" : "border-line"} bg-raise`}>
      <div className="font-mono text-xs font-bold text-bone sm:text-sm">{title}</div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-mute sm:text-[11px] sm:tracking-widest">{sub}</div>
    </div>
  );
  const Wire = ({ delay, small }) => (
    <div className="relative mx-1.5 h-px flex-1 bg-line sm:mx-2">
      {!reduce &&
        [0, 0.5, 1].map((d) => (
          <motion.span
            key={d}
            className={`absolute top-1/2 -translate-y-1/2 rounded-[2px] bg-acid ${small ? "h-1 w-1" : "h-2 w-3"}`}
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: delay + d * 0.5, ease: "linear" }}
          />
        ))}
    </div>
  );
  return (
    <div
      role="img"
      aria-label="Pipeline: Raspberry Pi 5 edge head, zero-parameter codec, then host tail"
      className="flex items-center rounded-xl border border-line bg-panel p-3 sm:p-5"
    >
      <Node title="RPi 5" sub="edge head" />
      <Wire delay={0} />
      <Node title="CODEC" sub="zero-param" hot />
      <Wire delay={0.2} small />
      <Node title="HOST" sub="cloud tail" />
    </div>
  );
}

export default function Research() {
  return (
    <Section id="research" index="03" eyebrow="the deep work" title="Systems" accent="research.">
      {research.map((r) => (
        <div key={r.title} className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <span className="inline-flex rounded-full border border-acid/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-acid">
              {r.kind}
            </span>
            <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-bone">{r.title}</h3>
            <p className="mt-4 leading-relaxed text-mute">{r.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {r.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-8">
              <Pipeline />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                features are thresholded and quantized on the edge before crossing the network
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {r.metrics && (
              <dl className="mb-8 grid grid-cols-3 border-y border-line">
                {r.metrics.map((m, i) => (
                  <div key={m.value} className={`px-2.5 py-4 sm:px-4 sm:py-5 ${i > 0 ? "border-l border-line" : "pl-0"} ${i === r.metrics.length - 1 ? "pr-0" : ""}`}>
                    <dt className="text-xl font-semibold tracking-tight text-acid sm:text-3xl">{m.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-mute">{m.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ol className="divide-y divide-line border-y border-line">
              {r.contributions.map((c, i) => (
                <li key={c.head} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="font-mono text-sm text-acid">0{i + 1}</span>
                  <div>
                    <h4 className="font-semibold text-bone">{c.head}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-mute">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {r.href && (
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-bone transition-colors hover:border-acid hover:text-acid"
              >
                <FiGithub aria-hidden="true" /> Reproducibility code
                <FiArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </Reveal>
        </div>
      ))}
    </Section>
  );
}
