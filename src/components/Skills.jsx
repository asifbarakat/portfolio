import { Section, Reveal } from "./ui";
import { skillGroups } from "../data/portfolio";
import { playSfx } from "../utils/sfx";

/* Clean per-chip hover highlight on the exact skill under the pointer */
export default function Skills() {
  return (
    <Section id="skills" index="02" eyebrow="what I work with" title="The" accent="toolchain.">
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.05} className="bg-ink">
            <div className="h-full border border-line bg-panel p-5 transition-colors duration-150 hover:border-ash chamfer sm:p-7">
              <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-line pb-3 sm:mb-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 bg-acid px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink">
                    0{index + 1}
                  </span>
                  <h3 className="font-semibold leading-snug tracking-tight text-bone">{group.title}</h3>
                </div>
                <span className="shrink-0 whitespace-nowrap font-mono text-xs text-mute">
                  {String(group.items.length).padStart(2, "0")} items
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => playSfx("chip")}
                    className="cursor-pointer border border-line bg-ink px-3 py-1.5 font-sans text-xs font-medium text-mute transition-colors duration-150 hover:border-acid hover:bg-raise hover:text-acid focus-visible:border-acid focus-visible:text-acid focus-visible:outline-none active:scale-95"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
