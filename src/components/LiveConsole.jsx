import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";

const rows = [
  { label: "e2e_playwright", start: 0, width: 46, ms: "412ms" },
  { label: "api_postman", start: 16, width: 24, ms: "96ms" },
  { label: "appium_android", start: 30, width: 38, ms: "1.2s" },
  { label: "k6_load_500vu", start: 42, width: 58, ms: "30s" },
];

const N = 48;
const SLA = 100;

/* Monochrome Unova-styled live telemetry panel with NumberFlow metrics */
export default function LiveConsole() {
  const [vus, setVus] = useState(320);
  const [series, setSeries] = useState(() => Array.from({ length: N }, (_, i) => 58 + Math.sin(i / 4) * 5));
  const [checks, setChecks] = useState(2480);
  const t = useRef(22);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVus(500);
      setSeries(Array.from({ length: N }, (_, i) => 66 + Math.sin(i / 3) * 4));
      setChecks(12840);
      return;
    }
    const id = setInterval(() => {
      if (document.hidden) return;
      t.current += 1;
      const phase = t.current % 140;
      const target =
        phase < 35 ? (phase / 35) * 500 : phase < 100 ? 500 : ((140 - phase) / 40) * 500;
      setVus(Math.round(target));
      setSeries((s) => {
        const base = 50 + (target / 500) * 20;
        return [...s.slice(1), base + (Math.random() - 0.5) * 9];
      });
      setChecks((c) => c + Math.round(6 + target / 20));
    }, 750);
    return () => clearInterval(id);
  }, [reduce]);

  const p95 = Math.round(series[series.length - 1]);
  const y = (v) => 40 - ((v - 30) / 90) * 40;
  const pts = series.map((v, i) => `${(i / (N - 1)) * 100},${y(v).toFixed(2)}`).join(" ");
  const ok = p95 < SLA;

  return (
    <div
      role="img"
      aria-label="Illustrative load-test dashboard: virtual users, P95 latency against a 100 millisecond SLA, and a test waterfall"
      className="ticks border border-line bg-panel chamfer"
    >
      {/* Dithered Unova terminal bar */}
      <div className="dither flex items-center justify-between gap-2 border-b border-line px-3.5 py-2.5 sm:px-4 sm:py-3">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <span className="h-2.5 w-2.5 shrink-0 bg-line" />
          <span className="h-2.5 w-2.5 shrink-0 bg-ash" />
          <span className="h-2.5 w-2.5 shrink-0 bg-chalk" />
          <span className="ml-1 min-w-0 truncate font-mono text-[10.5px] text-mute sm:ml-3 sm:text-xs">
            $ k6 run --vus 500 checkout.js
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 bg-acid px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink chamfer-sm">
          <span className="h-1.5 w-1.5 animate-pulse bg-ink" /> live
        </span>
      </div>

      {/* Metrics via NumberFlow (plain static snapshot when reduced motion is enabled) */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <div className="px-2.5 py-2.5 sm:px-4 sm:py-3">
          <div className="font-mono text-lg font-semibold tabular-nums text-bone sm:text-2xl">
            {reduce ? vus : <NumberFlow value={vus} />}
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:text-[11px]">virtual users</div>
        </div>
        <div className="px-2.5 py-2.5 sm:px-4 sm:py-3">
          <div className={`font-mono text-lg font-semibold tabular-nums sm:text-2xl ${ok ? "text-acid" : "text-mute"}`}>
            {reduce ? `${p95}ms` : <NumberFlow value={p95} suffix="ms" />}
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:text-[11px]">p95 latency</div>
        </div>
        <div className="px-2.5 py-2.5 sm:px-4 sm:py-3">
          <div className="font-mono text-lg font-semibold tabular-nums text-bone sm:text-2xl">
            {reduce ? checks.toLocaleString() : <NumberFlow value={checks} />}
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:text-[11px]">checks passed</div>
        </div>
      </div>

      {/* Monochrome sparkline */}
      <div className="border-b border-line px-3.5 py-3 sm:px-4 sm:py-4">
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-mute">
          <span>p95 over time</span>
          <span className="text-ash">sla {SLA}ms</span>
        </div>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-16 w-full sm:h-20">
          <line
            x1="0"
            x2="100"
            y1={y(SLA)}
            y2={y(SLA)}
            stroke="#71717a"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            opacity="0.8"
          />
          <polyline
            points={pts}
            fill="none"
            stroke="#c8f542"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Waterfall bars */}
      <div className="space-y-2.5 px-3.5 py-3.5 sm:px-4 sm:py-4">
        {rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[96px_1fr_38px] items-center gap-2 sm:grid-cols-[110px_1fr_44px] sm:gap-3">
            <span className="truncate font-mono text-[11px] text-mute">{r.label}</span>
            <div className="relative h-2 bg-raise">
              <motion.div
                className="absolute top-0 h-2 origin-left bg-chalk"
                style={{ left: `${r.start}%`, width: `${r.width}%` }}
                initial={{ scaleX: reduce ? 1 : 0 }}
                animate={reduce ? { scaleX: 1 } : { scaleX: [0, 1, 1, 0] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 6, times: [0, 0.3, 0.88, 1], repeat: Infinity, delay: i * 0.45, ease: "easeOut" }
                }
              />
            </div>
            <span className="text-right font-mono text-[11px] text-bone">{r.ms}</span>
          </div>
        ))}
      </div>
      <p className="border-t border-line px-4 py-2 font-mono text-[11px] text-mute">
        demo telemetry · illustrative values
      </p>
    </div>
  );
}
