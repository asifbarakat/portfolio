import { Section, Reveal, Tag } from "./ui";
import { skillGroups } from "../data/portfolio";

export default function Skills() {
  return (
    <Section id="skills" index="02" eyebrow="what I work with" title="The" accent="toolchain.">
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06} className="bg-ink">
            <div className="h-full bg-panel p-7 transition-colors hover:bg-raise">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-bone">{group.title}</h3>
                <span className="font-mono text-xs text-acid">
                  {String(group.items.length).padStart(2, "0")} items
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
