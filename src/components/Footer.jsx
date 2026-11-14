import { useEffect, useState } from "react";
import { FiArrowUp, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { playSfx } from "../utils/sfx";
import { profile } from "../data/portfolio";

const REPOS = [
  {
    name: "system-testing-deliverables",
    href: "https://github.com/asifbarakat/system-testing-deliverables",
  },
  {
    name: "sfp-split-computing-viability",
    href: "https://github.com/asifbarakat/sfp-split-computing-viability",
  },
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

/* Edge-to-edge low-profile horizontal footer anchored cleanly across the full viewport width */
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
      playSfx("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer className="relative z-10 w-full border-t border-line bg-panel py-5 sm:py-6">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        {/* Single wide edge-to-edge navigation & brand bar */}
        <div className="flex flex-col gap-3 border-b border-line/80 pb-3.5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex shrink-0 items-baseline gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center bg-acid font-mono text-[10px] font-black text-ink chamfer-sm">
              AB
            </span>
            <span className="text-base font-bold tracking-tight text-chalk sm:text-lg">
              ASIF BARAKAT
            </span>
            <span className="serif text-base text-acid sm:text-lg">
              Chowdhury.
            </span>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex cursor-pointer items-center gap-1.5 text-bone transition-colors hover:text-acid"
            >
              <span>{copied ? "Copied email" : profile.email}</span>
              <span className="text-acid">
                {copied ? <FiCheck size={12} /> : <FiCopy size={11} />}
              </span>
            </button>

            {REPOS.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-mute transition-colors hover:text-acid"
              >
                <span>{repo.name}</span>
                <FiArrowUpRight size={12} />
              </a>
            ))}

            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-1.5 text-mute transition-colors hover:text-acid"
            >
              <FaGithub size={13} /> GitHub
            </a>

            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-1.5 text-mute transition-colors hover:text-acid"
            >
              <FaLinkedinIn size={13} /> LinkedIn
            </a>
          </nav>
        </div>

        {/* Hairline status & top-jump baseline split cleanly around centered desktop Dock */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 font-mono text-[11px] uppercase tracking-wider text-mute">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-bone">
              <span className="h-1.5 w-1.5 animate-pulse bg-acid" />
              Sylhet, BD
            </span>
            <span aria-hidden="true" className="text-ash">/</span>
            <span className="tabular-nums text-chalk">{clock} BST</span>
            <span aria-hidden="true" className="text-ash">/</span>
            <span className="text-acid">Open to SQA · SDET</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-ash">© {new Date().getFullYear()}</span>
            <a
              href="#top"
              className="inline-flex items-center gap-1 text-bone transition-colors hover:text-acid"
            >
              <FiArrowUp size={12} aria-hidden="true" />
              Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
