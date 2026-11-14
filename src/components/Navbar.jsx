import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiVolume2, FiVolumeX } from "react-icons/fi";
import { navLinks } from "../data/portfolio";
import { playSfx, useSfx } from "../utils/sfx";
import { getBgmAnalyser, useBgm } from "../utils/bgm";

function EqBars({ active, waiting, reduce }) {
  const barRefs = useRef([]);

  useEffect(() => {
    if (!active || waiting || reduce) {
      barRefs.current.forEach((el, i) => {
        if (el) {
          el.style.height = active
            ? waiting
              ? "4px"
              : `${6 + ((i * 3) % 5)}px`
            : "3px";
        }
      });
      return;
    }

    let rafId = 0;
    const bins = new Uint8Array(16);
    const tick = () => {
      const an = getBgmAnalyser();
      if (an) {
        an.getByteFrequencyData(bins);
        [1, 3, 6].forEach((binIdx, i) => {
          const el = barRefs.current[i];
          if (el) {
            const v = bins[binIdx] || 0;
            const h = 3 + Math.round((v / 255) * 9);
            el.style.height = `${h}px`;
          }
        });
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active, waiting, reduce]);

  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className={`w-[2px] transition-[background-color] ${
            active ? (waiting ? "bg-acid/70 animate-pulse" : "bg-acid") : "bg-ash"
          }`}
          style={{ height: active ? (waiting ? "4px" : "7px") : "3px" }}
        />
      ))}
    </span>
  );
}

/* Minimal Gen-5 inspired top status strip; full nav lives in the floating Dock */
export default function Navbar() {
  const reduce = useReducedMotion();
  const [sfxOn, toggleSfx] = useSfx();
  const [bgmOn, toggleBgm, bgmWaiting] = useBgm();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#top" aria-label="Home" className="flex min-w-0 items-center gap-2 font-mono text-xs font-bold tracking-wider text-bone sm:gap-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center bg-acid text-[11px] font-black text-ink chamfer-sm">
            AB
          </span>
          <span className="truncate uppercase">asif.barakat</span>
          <span className="hidden text-ash xl:inline">// SQA_SDET</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-wider text-mute lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => playSfx("dock")}
              className="transition-colors hover:text-acid"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            data-bgm-toggle="true"
            onClick={toggleBgm}
            aria-pressed={bgmOn && !bgmWaiting}
            aria-label={
              !bgmOn
                ? "Play procedural futuristic soundtrack"
                : bgmWaiting
                  ? "Start procedural synth soundtrack (armed for first interaction)"
                  : "Stop procedural synth soundtrack"
            }
            title={
              !bgmOn
                ? "BGM off — click to play synth"
                : bgmWaiting
                  ? "BGM armed — click anywhere or tap BGM to start audio"
                  : "BGM playing — click to mute"
            }
            className={`inline-flex h-8 cursor-pointer items-center gap-1.5 border px-2 font-mono text-[10px] uppercase tracking-wider transition-colors active:scale-95 chamfer-sm sm:px-2.5 sm:text-[10.5px] ${
              bgmOn
                ? bgmWaiting
                  ? "border-acid/55 bg-panel text-acid/85 hover:border-acid hover:text-acid"
                  : "border-acid bg-panel text-acid"
                : "border-line bg-panel text-mute hover:border-ash hover:text-chalk"
            }`}
          >
            <EqBars active={bgmOn} waiting={bgmWaiting} reduce={Boolean(reduce)} />
            <span>BGM</span>
          </button>
          <button
            type="button"
            onClick={toggleSfx}
            aria-pressed={sfxOn}
            aria-label={sfxOn ? "Mute procedural interface sound effects" : "Enable procedural interface sound effects"}
            className={`inline-flex h-8 cursor-pointer items-center gap-1 border px-2 font-mono text-[10px] uppercase tracking-wider transition-colors active:scale-95 chamfer-sm sm:gap-1.5 sm:px-2.5 sm:text-[10.5px] ${
              sfxOn
                ? "border-acid bg-panel text-acid"
                : "border-line bg-panel text-mute hover:border-ash hover:text-chalk"
            }`}
          >
            {sfxOn ? <FiVolume2 size={13} aria-hidden="true" /> : <FiVolumeX size={13} aria-hidden="true" />}
            <span>SFX</span>
          </button>
          <span className="hidden items-center gap-2 border border-line bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-mute xl:inline-flex chamfer-sm">
            <span className="h-1.5 w-1.5 animate-pulse bg-acid" />
            Open to roles
          </span>
          <a
            href="#contact"
            className="inline-flex h-8 items-center gap-1 bg-chalk px-2.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-acid chamfer-sm sm:gap-1.5 sm:px-3.5 sm:text-[11px]"
          >
            Ping <FiArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
