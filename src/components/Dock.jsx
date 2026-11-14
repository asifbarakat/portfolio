import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FiArrowUp, FiCpu, FiFolder, FiLayers, FiMail, FiUser } from "react-icons/fi";
import { navLinks } from "../data/portfolio";

const dockItems = [
  { id: "top", label: "Top", Icon: FiArrowUp },
  { id: "about", label: "About", Icon: FiUser },
  { id: "skills", label: "Skills", Icon: FiCpu },
  { id: "research", label: "Systems", Icon: FiLayers },
  { id: "projects", label: "Work", Icon: FiFolder },
  { id: "contact", label: "Contact", Icon: FiMail },
];

function DockIcon({ item, active, mouseX, reduce }) {
  const ref = useRef(null);
  const { id, label, Icon } = item;

  const distance = useTransform(mouseX, (val) => {
    if (!ref.current || val === Infinity) return 999;
    const rect = ref.current.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const targetScale = useTransform(distance, [0, 75, 150], [1.32, 1.12, 1]);
  const scale = useSpring(targetScale, { stiffness: 360, damping: 24, mass: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={`#${id}`}
      aria-label={label}
      aria-current={active ? "location" : undefined}
      style={reduce ? undefined : { scale }}
      className={`group relative flex h-11 items-center justify-center transition-colors active:scale-95 chamfer-sm ${
        active
          ? "gap-1.5 bg-acid px-2.5 text-ink sm:w-11 sm:px-0"
          : "w-10 border border-transparent bg-raise text-mute hover:border-line hover:text-chalk sm:w-11"
      }`}
    >
      <Icon size={17} aria-hidden="true" className="shrink-0" />
      {active && (
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider sm:hidden">
          {label}
        </span>
      )}
      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap border border-line bg-ink px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-acid opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        {label}
      </span>
    </motion.a>
  );
}

/* Tactile floating dock: icon+label active pill on phones, magnetic zoom dock on desktop */
export default function Dock() {
  const [active, setActive] = useState("top");
  const mouseX = useMotionValue(Infinity);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ids = ["top", ...navLinks.map((l) => l.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    sections.forEach((s) => obs.observe(s));

    const onScroll = () => {
      if (window.scrollY < 140) {
        setActive("top");
      } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 72) {
        setActive("contact");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3.5 z-50 flex justify-center px-2.5 sm:bottom-4 sm:px-4">
      <nav
        aria-label="Primary dock"
        onMouseMove={(e) => {
          if (!reduce && !window.matchMedia?.("(pointer: coarse)").matches) mouseX.set(e.clientX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-center gap-1 border border-ash/40 bg-ink/95 p-1.5 shadow-2xl backdrop-blur-xl sm:gap-2 sm:border-line sm:p-2 chamfer"
      >
        {dockItems.map((item) => (
          <DockIcon key={item.id} item={item} active={active === item.id} mouseX={mouseX} reduce={reduce} />
        ))}
      </nav>
    </div>
  );
}
