import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Section, Reveal, Tag, Magnet } from "./ui";
import VerletPipeline from "./VerletPipeline";
import EdgeNode3D from "./EdgeNode3D";
import { research } from "../data/portfolio";

function MetricNum({ raw, active }) {
  const num = parseFloat(raw);
  const suffix = raw.endsWith("ms") ? "ms" : raw.endsWith("%") ? "%" : "";
  const decimals = raw.includes(".") ? 1 : 0;
  return (
    <NumberFlow
      value={active ? num : 0}
      suffix={suffix}
      format={{ minimumFractionDigits: decimals, maximumFractionDigits: decimals }}
    />
  );
}

export default function Research() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(Boolean(reduce));

  return (
    <Section id="research" index="03" eyebrow="the deep work" title="Systems" accent="research.">
      {research.map((r) => (
        <div key={r.title} className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal className="min-w-0">
            <span className="inline-flex bg-acid px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-ink chamfer-sm">
              {r.kind}
            </span>
            <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-bone sm:mt-5 sm:text-3xl">
              {r.title}
            </h3>
            <p className="mt-3.5 text-[15px] leading-relaxed text-mute sm:mt-4 sm:text-base">
              {r.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              {r.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-7 space-y-4 sm:mt-8">
              <VerletPipeline />
              <EdgeNode3D />
              <p className="font-mono text-[11px] uppercase tracking-wider text-mute sm:tracking-widest">
                features are thresholded and quantized on the edge before crossing the network
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            {r.metrics && (
              <motion.dl
                onViewportEnter={() => setShown(true)}
                viewport={{ once: true, amount: 0.25 }}
                className="mb-6 grid grid-cols-1 divide-y divide-line border-y border-line sm:mb-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              >
                {r.metrics.map((m, i) => (
                  <div
                    key={m.value}
                    className={`flex items-baseline gap-4 py-3.5 sm:block sm:px-4 sm:py-5 ${
                      i === 0 ? "sm:pl-0" : ""
                    } ${i === r.metrics.length - 1 ? "sm:pr-0" : ""}`}
                  >
                    <dt className="w-24 shrink-0 font-mono text-2xl font-semibold tracking-tight text-acid tabular-nums sm:w-auto sm:text-3xl">
                      <MetricNum raw={m.value} active={shown || Boolean(reduce)} />
                    </dt>
                    <dd className="text-xs leading-snug text-mute sm:mt-1">{m.label}</dd>
                  </div>
                ))}
              </motion.dl>
            )}

            <div className="divide-y divide-line border-t border-line">
              {r.contributions.map((c, i) => (
                <div key={c.head} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4 sm:grid-cols-[2.5rem_1fr] sm:gap-4 sm:py-6">
                  <span className="font-mono text-xs text-acid">0{i + 1}</span>
                  <div>
                    <h4 className="font-semibold text-bone">{c.head}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-mute">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {r.href && (
              <div className="mt-6 border-t border-line pt-6">
                <Magnet className="w-full sm:w-auto">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line bg-panel px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-bone transition-colors hover:border-acid hover:bg-acid hover:text-ink chamfer-sm sm:w-auto"
                  >
                    Reproducibility code
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnet>
              </div>
            )}
          </Reveal>
        </div>
      ))}
    </Section>
  );
}
