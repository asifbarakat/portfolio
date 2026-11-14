import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

/* Minimal Gen-5 inspired top status strip; full nav lives in the floating Dock */
export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Home" className="flex items-center gap-3 font-mono text-xs font-bold tracking-wider text-bone">
          <span className="grid h-7 w-7 place-items-center bg-acid text-[11px] font-black text-ink chamfer-sm">
            AB
          </span>
          <span className="uppercase">asif.barakat</span>
          <span className="hidden text-ash sm:inline">// SQA_SDET</span>
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 border border-line bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-mute sm:inline-flex chamfer-sm">
            <span className="h-1.5 w-1.5 animate-pulse bg-acid" />
            Open to roles
          </span>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-chalk px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-acid chamfer-sm"
          >
            Ping <FiArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
