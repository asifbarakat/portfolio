import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";
import { FiTerminal } from "react-icons/fi";
import { Reveal } from "./ui";
import { competitiveProgramming } from "../data/portfolio";

const iconFor = {
  Codeforces: SiCodeforces,
  CodeChef: SiCodechef,
  LeetCode: SiLeetcode,
  CSES: FiTerminal,
};

export default function Achievements() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <Reveal>
        <div className="glow-border overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="font-mono text-sm text-cyan-400">
                05 <span className="text-slate-500">//</span> beyond the code
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Competitive Programming
              </h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                {competitiveProgramming.blurb}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {competitiveProgramming.platforms.map((name) => {
                const Icon = iconFor[name] ?? FiTerminal;
                return (
                  <div
                    key={name}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-5 transition-colors hover:border-cyan-400/40"
                  >
                    <Icon
                      size={28}
                      className="text-slate-400 transition-colors group-hover:text-cyan-400"
                    />
                    <span className="text-center text-xs font-medium text-slate-400">
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
