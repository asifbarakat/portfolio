import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Section, Reveal, Tag, Magnet } from "./ui";
import { research } from "../data/portfolio";

/* Monochrome Unova-styled split architecture diagram */
function Pipeline() {
  const reduce = useReducedMotion();
  const Node = ({ title, sub, hot }) => (
    <div
      className={`shrink-0 px-2 py-2 text-center sm:px-4 sm:py-3 chamfer-sm ${
        hot ? "bg-acid text-ink" : "border border-line bg-raise text-bone"
      }`}
    >
      <div className="whitespace-nowrap font-mono text-[11px] font-bold sm:text-sm">{title}</div>
      <div
        className={`whitespace-nowrap font-mono text-[9.5px] uppercase tracking-wider sm:text-[11px] sm:tracking-widest ${
          hot ? "text-ink/70" : "text-mute"
        }`}
      >
        {sub}
      </div>
    </div>
  );
  const Wire = ({ delay, small }) => (
    <div className="relative mx-1.5 h-px min-w-[24px] flex-1 bg-line sm:mx-2">
      {!reduce &&
        [0, 0.5, 1].map((d) => (
          <motion.span
            key={d}
            className={`absolute top-1/2 -translate-y-1/2 bg-acid ${small ? "h-1 w-1" : "h-2 w-2.5 sm:w-3"}`}
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
      className="flex items-center border border-line bg-panel p-2.5 sm:p-5 chamfer"
    >
      <Node title="RPi 5" sub="edge head" />
      <Wire delay={0} />
      <Node title="CODEC" sub="zero-param" hot />
      <Wire delay={0.2} small />
      <Node title="HOST" sub="cloud tail" />
    </div>
  );
}

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
            <div className="mt-7 sm:mt-8">
              <Pipeline />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-mute sm:tracking-widest">
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
