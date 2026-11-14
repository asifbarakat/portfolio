import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Section, Reveal } from "./ui";
import { skillGroups } from "../data/portfolio";
import { playSfx } from "../utils/sfx";

/* Body 3: Desktop pointer proximity interpolates font weight 400 -> 850; phone tap inspects individual chips */
function ProximityGroup({ group, index, interactive, tappedItem, onTapItem }) {
  const chipRefs = useRef([]);
  const centersRef = useRef([]);
  const [hovered, setHovered] = useState(false);

  const cacheCenters = () => {
    centersRef.current = chipRefs.current.map((el) => {
      if (!el) return null;
      const prev = el.style.transform;
      el.style.transform = "translate3d(0,0,0)";
      const r = el.getBoundingClientRect();
      el.style.transform = prev;
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    });
  };

  const updateWeights = (clientX, clientY) => {
    if (!interactive) return;
    if (!centersRef.current.length) cacheCenters();
    chipRefs.current.forEach((el, j) => {
      const c = centersRef.current[j];
      if (!el || !c) return;
      const dist = Math.hypot(clientX - c.cx, clientY - c.cy);
      const radius = 140;
      const proximity = Math.max(0, 1 - dist / radius);
      const weight = Math.round(420 + proximity * 430);
      el.style.fontVariationSettings = `'wght' ${weight}`;
      el.style.color = proximity > 0.5 ? "#c8f542" : proximity > 0.2 ? "#ffffff" : "#a1a1aa";
      el.style.borderColor = proximity > 0.55 ? "#c8f542" : proximity > 0.3 ? "#ffffff" : "#27272e";
      el.style.transform = `translate3d(0, ${(-proximity * 3).toFixed(1)}px, 0)`;
    });
  };

  const resetWeights = () => {
    setHovered(false);
    centersRef.current = [];
    chipRefs.current.forEach((el) => {
      if (!el) return;
      el.style.fontVariationSettings = "'wght' 450";
      el.style.color = "";
      el.style.borderColor = "";
      el.style.transform = "translate3d(0,0,0)";
    });
  };

  return (
    <Reveal delay={index * 0.05} className="bg-ink">
      <div
        onMouseEnter={() => {
          setHovered(true);
          cacheCenters();
        }}
        onMouseMove={(e) => updateWeights(e.clientX, e.clientY)}
        onMouseLeave={resetWeights}
        className={`h-full border border-line bg-panel p-5 transition-colors chamfer sm:p-7 ${
          hovered ? "bg-raise border-ash" : ""
        }`}
      >
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
          {group.items.map((item, j) => {
            const active = tappedItem === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onTapItem(item)}
                ref={(el) => {
                  chipRefs.current[j] = el;
                }}
                className={`border px-3 py-1.5 font-sans text-xs transition-[color,border-color,background-color,transform] duration-150 will-change-transform ${
                  interactive ? "cursor-default" : "cursor-pointer active:scale-95"
                } ${
                  active && !interactive
                    ? "border-acid bg-raise font-semibold text-acid"
                    : "border-line bg-ink text-mute"
                }`}
                style={{ fontVariationSettings: active && !interactive ? "'wght' 760" : "'wght' 450" }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const reduce = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const [tappedItem, setTappedItem] = useState("Playwright");

  useEffect(() => {
    setInteractive(!reduce && Boolean(window.matchMedia?.("(hover: hover) and (pointer: fine)").matches));
  }, [reduce]);

  return (
    <Section id="skills" index="02" eyebrow="what I work with" title="The" accent="toolchain.">
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <ProximityGroup
            key={group.title}
            group={group}
            index={i}
            interactive={interactive}
            tappedItem={tappedItem}
            onTapItem={(item) => {
              playSfx("chip");
              setTappedItem((cur) => (cur === item ? "" : item));
            }}
          />
        ))}
      </div>
    </Section>
  );
}
