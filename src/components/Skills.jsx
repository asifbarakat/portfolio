import { Section, Reveal, Tag, accentText } from "./ui";
import { skillGroups } from "../data/portfolio";

export default function Skills() {
  return (
    <Section id="skills" index="02" eyebrow="what I work with" title="Skills & Stack">
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <div className="glow-border h-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${accentDot[group.accent]}`} />
                <h3 className={`font-semibold ${accentText[group.accent]}`}>
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item} accent={group.accent}>
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const accentDot = {
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
};
