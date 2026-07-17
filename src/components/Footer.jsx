import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile, navLinks } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-slate-400">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-[#05070d]">
            A
          </span>
          Asif Barakat Chowdhury
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-cyan-400">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 transition-colors hover:text-white">
            <FaGithub size={18} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 transition-colors hover:text-white">
            <FaLinkedinIn size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-slate-400 transition-colors hover:text-white">
            <HiOutlineMail size={18} />
          </a>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Asif Barakat Chowdhury · Built with React, Vite &amp; Tailwind CSS
      </p>
    </footer>
  );
}
