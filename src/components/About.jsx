import { FiCpu, FiSmartphone, FiCheckCircle, FiFileText, FiBriefcase } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { Section, Reveal } from "./ui";
import { education, experience } from "../data/portfolio";

const pillars = [
  {
    icon: FiCheckCircle,
    title: "SQA & SDET",
    body: "Manual testing, Playwright automation, Postman API validation, and k6+Grafana load testing.",
  },
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
              I'm an SQA Engineer Intern at <span className="text-cyan-400 font-medium">AppifyLab</span> and an
              aspiring SDET with a strong Computer Science &amp; Engineering background.
              I focus on engineering high-reliability software through rigorous manual testing,
              end-to-end automation with <span className="text-white">Playwright</span>, API test suites in{" "}
              <span className="text-white">Postman</span>, and high-concurrency performance benchmarking with{" "}
              <span className="text-white">k6 + Grafana</span>.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-relaxed text-slate-400">
              My engineering approach is backed by deep systems roots — from publishing IEEE research
              on zero-parameter split computing and edge AI, to building offline peer-to-peer mobile apps.
              I approach quality assurance with an architectural mindset, ensuring systems are both functional
              and resilient under load.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.08}>
                <div className="h-full rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 transition-colors">
                  <p.icon className="mb-3 text-cyan-400" size={22} />
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: experience & education cards */}
        <div className="space-y-6">
          {experience && (
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-slate-800 hover:border-emerald-500/40 bg-slate-900/70 p-6 shadow-lg transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <FiBriefcase size={22} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {experience.period}
                  </span>
                </div>
                <p className="mt-3 text-lg font-bold text-white">{experience.role}</p>
                <p className="text-sm font-semibold text-cyan-400">{experience.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{experience.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {experience.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.18}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/80 text-cyan-400">
                <HiAcademicCap size={24} />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Education
              </h3>
              <p className="mt-1 text-lg font-bold text-white">{education.degree}</p>
              <p className="text-sm text-slate-300">{education.institution}</p>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2.5">
                <span className="text-2xl font-extrabold text-cyan-400">3.8</span>
                <span className="text-xs text-slate-400">
                  CGPA <span className="text-slate-600">/ 4.0</span>
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-400">{education.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
