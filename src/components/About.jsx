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
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="text-2xl leading-snug tracking-tight text-bone sm:text-3xl">
              I'm an <span className="text-acid">SQA Engineer Intern at AppifyLab</span> and an aspiring SDET.
              I build the safety net that lets teams ship fast: automated, measurable and honest about where the
              system breaks.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl leading-relaxed text-mute">
              Coming from a Computer Science &amp; Engineering background, I approach testing architecturally:
              understanding not just <em>what</em> broke, but <em>why</em> the system behaved that way under load.
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {pillars.map(([title, body], i) => (
              <Reveal key={title} delay={0.05 * i}>
                <li className="group grid grid-cols-[3rem_1fr] gap-4 py-5 transition-colors hover:bg-panel sm:px-3">
                  <span className="font-mono text-sm text-acid">0{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-bone">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mute">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="ticks rounded-xl border border-line bg-panel p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-raise text-acid">
                  <FiBriefcase size={18} />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-acid">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
                  {experience.period}
                </span>
              </div>
              <p className="mt-5 text-xl font-semibold text-bone">{experience.role}</p>
              <p className="font-mono text-sm text-acid">{experience.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{experience.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {experience.highlights.map((h) => (
                  <span key={h} className="rounded-md border border-line bg-raise px-2.5 py-1 font-mono text-[11px] text-mute">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="rounded-xl border border-line bg-panel p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-raise text-acid">
                <HiAcademicCap size={20} />
              </span>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-mute">Education</p>
              <p className="mt-1 text-lg font-semibold text-bone">{education.degree}</p>
              <p className="text-sm text-mute">{education.institution}</p>
              <div className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
                <span className="text-4xl font-semibold tracking-tight text-acid">3.8</span>
                <span className="font-mono text-xs text-mute">/ 4.0 CGPA</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
