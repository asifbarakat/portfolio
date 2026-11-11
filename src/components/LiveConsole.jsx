import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const rows = [
  { label: "e2e_playwright", start: 0, width: 46, ms: "412ms" },
  { label: "api_postman", start: 16, width: 24, ms: "96ms" },
  { label: "appium_android", start: 30, width: 38, ms: "1.2s" },
  { label: "k6_load_500vu", start: 42, width: 58, ms: "30s" },
];

const N = 48;
const SLA = 100;

/* Live, self-running telemetry panel (illustrative demo data) */
export default function LiveConsole() {
  const [vus, setVus] = useState(0);
  const [series, setSeries] = useState(() => Array.from({ length: N }, () => 52));
  const [checks, setChecks] = useState(0);
  const t = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      t.current += 1;
      const phase = t.current % 140;
      const target =
        phase < 35 ? (phase / 35) * 500 : phase < 100 ? 500 : ((140 - phase) / 40) * 500;
      setVus(Math.round(target));
      setSeries((s) => {
        const base = 50 + (target / 500) * 20;
        return [...s.slice(1), base + (Math.random() - 0.5) * 9];
      });
      setChecks((c) => c + Math.round(2 + target / 40));
    }, 250);
    return () => clearInterval(id);
  }, []);

  const p95 = Math.round(series[series.length - 1]);
  const y = (v) => 40 - ((v - 30) / 90) * 40;
  const pts = series.map((v, i) => `${(i / (N - 1)) * 100},${y(v).toFixed(2)}`).join(" ");
  const ok = p95 < SLA;

  return (
    <div className="ticks rounded-xl border border-line bg-panel">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 font-mono text-xs text-mute">$ k6 run --vus 500 checkout.js</span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-acid">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" /> live
        </span>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <Metric label="virtual users" value={vus} />
        <Metric label="p95 latency" value={`${p95}ms`} tone={ok ? "ok" : "bad"} />
        <Metric label="checks passed" value={checks.toLocaleString()} />
      </div>

      {/* sparkline */}
      <div className="border-b border-line px-4 py-4">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-mute">
          <span>p95 over time</span>
          <span className="text-fail">sla {SLA}ms</span>
        </div>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-20 w-full">
          <line x1="0" x2="100" y1={y(SLA)} y2={y(SLA)} stroke="#ff5c5c" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" opacity="0.7" />
          <polyline points={pts} fill="none" stroke="#c8f542" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* waterfall */}
      <div className="space-y-2.5 px-4 py-4">
        {rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[110px_1fr_44px] items-center gap-3">
            <span className="truncate font-mono text-[11px] text-mute">{r.label}</span>
            <div className="relative h-2 rounded-full bg-raise">
              <motion.div
                className="absolute top-0 h-2 origin-left rounded-full bg-acid"
                style={{ left: `${r.start}%`, width: `${r.width}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1, 0] }}
                transition={{ duration: 6, times: [0, 0.3, 0.88, 1], repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
              />
            </div>
            <span className="text-right font-mono text-[11px] text-bone">{r.ms}</span>
          </div>
        ))}
      </div>
      <p className="border-t border-line px-4 py-2 font-mono text-[10px] text-mute">
        demo telemetry · illustrative values
      </p>
    </div>
  );
}

function Metric({ label, value, tone }) {
  const color = tone === "bad" ? "text-fail" : tone === "ok" ? "text-acid" : "text-bone";
  return (
    <div className="px-4 py-3">
      <div className={`font-mono text-2xl font-semibold tabular-nums ${color}`}>{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-mute">{label}</div>
    </div>
  );
}
