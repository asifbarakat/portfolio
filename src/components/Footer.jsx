import { navLinks, profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-sm text-mute">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-acid text-[10px] font-black text-ink">AB</span>
          {profile.name}
        </div>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wider text-mute">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-acid">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-mute">© {new Date().getFullYear()} · React · Vite · Tailwind</p>
      </div>
    </footer>
  );
}
