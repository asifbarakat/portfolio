import { motion } from "framer-motion";
import { Section, Reveal, Tag } from "./ui";
import { research } from "../data/portfolio";

/* Animated edge -> codec -> host pipeline */
function Pipeline() {
  const Node = ({ title, sub, hot }) => (
    <div className={`rounded-lg border px-4 py-3 text-center ${hot ? "border-acid" : "border-line"} bg-raise`}>
      <div className="font-mono text-sm font-bold text-bone">{title}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-mute">{sub}</div>
    </div>
  );
  const Wire = ({ delay, small }) => (
    <div className="relative mx-2 h-px flex-1 bg-line">
      {[0, 0.5, 1].map((d) => (
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
    <div className="flex items-center rounded-xl border border-line bg-panel p-5">
      <Node title="RPi 5" sub="edge head" />
      <Wire delay={0} />
      <Node title="CODEC" sub="zero-param" hot />
      <Wire delay={0.2} small />
      <Node title="HOST" sub="rpc tail" />
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
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-mute">
                features shrink after the codec before crossing the network
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
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
          </Reveal>
        </div>
      ))}
    </Section>
  );
}
