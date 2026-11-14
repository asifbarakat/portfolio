import { useEffect, useState } from "react";
import { FiArrowUp, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../data/portfolio";

const REPOS = [
  {
    name: "system-testing-deliverables",
    tag: "Playwright",
    href: "https://github.com/asifbarakat/system-testing-deliverables",
  },
  {
    name: "sfp-split-computing-viability",
    tag: "Edge RPC",
    href: "https://github.com/asifbarakat/sfp-split-computing-viability",
  },
];

const SPEC = [
  ["Engine", "React 19 · Vite"],
  ["Motion", "Framer · Lenis"],
  ["Measure", "@chenglou/pretext"],
  ["Focus", "SQA · SDET · Systems"],
];

function formatDhakaTime() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "UTC+6";
  }
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState(() => formatDhakaTime());

  useEffect(() => {
    const id = setInterval(() => setClock(formatDhakaTime()), 30000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer className="relative z-10 border-t border-line bg-panel dither pb-28 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="grid gap-8 border-b border-line pb-8 sm:gap-10 sm:pb-10 lg:grid-cols-12">
          {/* Colophon dossier */}
          <div className="min-w-0 lg:col-span-4">
            <div className="inline-flex items-center gap-2 border border-line bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone chamfer-sm">
              <span className="h-1.5 w-1.5 bg-acid" />
              06 // Colophon & Status
            </div>
            <p className="mt-4 max-w-md text-lg font-medium leading-snug text-bone">
              Verifying critical workflows across{" "}
              <span className="serif text-acid">web, mobile, API & edge load.</span>
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center gap-x-4 gap-y-2 border border-line bg-ink px-3.5 py-2 font-mono text-xs text-mute chamfer-sm">
              <span className="inline-flex items-center gap-1.5 text-bone">
                <span className="h-1.5 w-1.5 animate-pulse bg-acid" />
                Sylhet, BD
              </span>
              <span aria-hidden="true" className="text-ash">/</span>
              <span className="tabular-nums text-chalk">{clock} BST</span>
              <span aria-hidden="true" className="text-ash">/</span>
              <span className="text-acid">Open to roles</span>
            </div>
          </div>

          {/* Direct channels & verified public repos (no top-nav duplication) */}
          <nav aria-label="Footer" className="min-w-0 lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              Direct Channels & Code
            </div>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 border border-line bg-ink px-3.5 py-2.5 text-left font-mono text-xs transition-colors active:border-acid hover:border-acid chamfer-sm"
                >
                  <span className="min-w-0 truncate text-bone group-hover:text-acid">
                    {copied ? "Copied email to clipboard" : profile.email}
                  </span>
                  <span className="shrink-0 text-acid">
                    {copied ? <FiCheck size={14} /> : <FiCopy size={13} />}
                  </span>
                </button>
              </li>
              {REPOS.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-11 items-center justify-between gap-2 border border-line bg-ink px-3.5 py-2.5 font-mono text-xs transition-colors hover:border-acid chamfer-sm"
                  >
                    <span className="min-w-0 truncate text-bone group-hover:text-acid">
                      {repo.name}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-mute group-hover:text-acid">
                      {repo.tag}
                      <FiArrowUpRight size={13} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cartridge telemetry card */}
          <div className="min-w-0 lg:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              Build Spec
            </div>
            <div className="mt-4 border border-line bg-ink p-4 chamfer-sm">
              <dl className="space-y-2.5 font-mono text-xs">
                {SPEC.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-2 border-b border-line/60 pb-1.5 last:border-b-0 last:pb-0">
                    <dt className="text-[11px] uppercase tracking-wider text-mute">{k}</dt>
                    <dd className="text-right text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#top"
                className="mt-4 flex min-h-11 w-full items-center justify-center gap-1.5 bg-chalk px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink transition-colors active:scale-[0.98] hover:bg-acid chamfer-sm"
              >
                <FiArrowUp size={13} aria-hidden="true" />
                Back to Top
              </a>
            </div>
          </div>
        </div>

        {/* Oversized Closing Wordmark & Baseline */}
        <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="grid h-8 w-8 shrink-0 place-items-center bg-acid font-mono text-xs font-black text-ink chamfer-sm">
              AB
            </span>
            <span className="text-2xl font-bold tracking-tight text-chalk sm:text-3xl">
              ASIF BARAKAT
            </span>
            <span className="serif text-2xl text-acid sm:text-3xl">
              Chowdhury.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-mute">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-acid"
            >
              <FaGithub size={14} /> GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-acid"
            >
              <FaLinkedinIn size={14} /> LinkedIn
            </a>
            <span aria-hidden="true" className="text-ash">/</span>
            <span>© {new Date().getFullYear()} {profile.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
