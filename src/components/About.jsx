import NumberFlow from "@number-flow/react";
import { FiBriefcase } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { Section, Reveal } from "./ui";
import { education, experience } from "../data/portfolio";

const pillars = [
  ["Web & mobile automation", "Playwright (TypeScript) and Appium suites that guard real user journeys."],
  ["API validation", "Postman collections with schema, status and latency assertions."],
  ["Performance engineering", "Grafana k6 load, stress and spike scenarios with P95 against SLAs."],
  ["Engineering foundation", "Flutter apps, edge systems and a CS degree behind every test I write."],
];

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="who I am" title="Quality is" accent="engineered.">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <Reveal>
            <p className="text-xl leading-snug tracking-tight text-bone sm:text-3xl">
              I'm an <span className="text-acid">SQA Engineer Intern at AppifyLab</span> and an aspiring SDET.
              I build the safety net that lets teams ship fast: automated, measurable and honest about where the
              system breaks.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mute sm:mt-6 sm:text-base">
              Coming from a Computer Science &amp; Engineering background, I approach testing architecturally:
              understanding not just <em>what</em> broke, but <em>why</em> the system behaved that way under load.
            </p>
          </Reveal>

          <ul className="mt-8 divide-y divide-line border-y border-line sm:mt-10">
            {pillars.map(([title, body], i) => (
              <Reveal key={title} delay={0.04 * i}>
                <li className="group grid grid-cols-[2.25rem_1fr] gap-3 py-4 transition-colors hover:bg-panel sm:grid-cols-[3rem_1fr] sm:gap-4 sm:px-3 sm:py-5">
                  <span className="font-mono text-sm text-acid transition-transform group-hover:translate-x-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-bone">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mute">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="min-w-0 space-y-5 sm:space-y-6">
          <Reveal delay={0.1}>
            <div className="ticks border border-line bg-panel p-5 chamfer sm:p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center border border-line bg-raise text-acid chamfer-sm">
                  <FiBriefcase size={18} />
                </span>
                <span className="inline-flex items-center gap-1.5 border border-acid/40 bg-ink px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-acid chamfer-sm">
                  <span className="h-1.5 w-1.5 animate-pulse bg-acid" />
                  {experience.period}
                </span>
              </div>
              <p className="mt-5 text-xl font-semibold text-bone">{experience.role}</p>
              <p className="font-mono text-sm text-acid">{experience.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{experience.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {experience.highlights.map((h) => (
                  <span key={h} className="border border-line bg-raise px-2.5 py-1 font-mono text-[11px] text-mute">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="dither border border-line bg-panel p-5 chamfer sm:p-6">
              <span className="grid h-10 w-10 place-items-center border border-line bg-raise text-chalk chamfer-sm">
                <HiAcademicCap size={20} />
              </span>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-mute">Education</p>
              <p className="mt-1 text-lg font-semibold text-bone">{education.degree}</p>
              <p className="text-sm text-mute">{education.institution}</p>
              <div className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
                <span className="font-mono text-4xl font-semibold tracking-tight text-acid tabular-nums">
                  <NumberFlow value={3.8} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} />
                </span>
                <span className="font-mono text-xs text-mute">/ 4.0 CGPA</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
