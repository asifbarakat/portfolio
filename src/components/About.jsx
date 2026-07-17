import { FiCpu, FiSmartphone, FiShare2, FiFileText } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { Section, Reveal } from "./ui";
import { education } from "../data/portfolio";

const pillars = [
  {
    icon: FiCpu,
    title: "Edge & Systems AI",
    body: "Split computing, model quantization, and CPU-only inference on constrained hardware.",
  },
  {
    icon: FiSmartphone,
    title: "Cross-Platform Apps",
    body: "Flutter/Dart applications — offline-first, real-time, production-minded.",
  },
  {
    icon: FiShare2,
    title: "Distributed Systems",
    body: "Peer-to-peer networks, device discovery, and decentralized edge architectures.",
  },
  {
    icon: FiFileText,
    title: "Published Research",
    body: "Peer-reviewed publication in IEEE Xplore on edge AI and split computing.",
  },
];

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="who I am" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: narrative + pillars */}
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-300">
              I'm a Computer Science &amp; Engineering graduate who likes hard systems
              problems — the kind where latency, bandwidth, and a Raspberry Pi's CPU
              budget all matter at once. My research asks a simple question with hard
              answers: <span className="text-white">how do you run modern AI where the cloud can't reach?</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-relaxed text-slate-400">
              That curiosity has taken me from engineering offline peer-to-peer apps and
              custom computer-vision pipelines, to authoring full CS curricula, to
              publishing research on split computing and distributed LLM inference at
              the edge.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.08}>
                <div className="glow-border h-full rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                  <p.icon className="mb-3 text-cyan-400" size={22} />
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: education card */}
        <Reveal delay={0.15}>
          <div className="glow-border sticky top-28 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/30 p-7">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300">
              <HiAcademicCap size={26} />
            </div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500">
              Education
            </h3>
            <p className="mt-2 text-xl font-bold text-white">{education.degree}</p>
            <p className="mt-1 text-slate-300">{education.institution}</p>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <span className="gradient-text text-3xl font-extrabold">3.8</span>
              <span className="text-sm text-slate-400">
                CGPA <span className="text-slate-600">/ 4.0</span>
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">{education.note}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
