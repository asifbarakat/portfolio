import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal, Magnet } from "./ui";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-14 px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-24">
      <Reveal>
        <div className="inline-flex items-center gap-2 border border-line bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-chalk chamfer-sm">
          <span className="h-1.5 w-1.5 bg-acid" />
          05 // let's talk
        </div>
        <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-tight text-bone sm:mt-6 sm:text-7xl md:text-8xl">
          Let's make it <br />
          <span className="serif text-acid">unbreakable.</span>
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mute sm:mt-6 sm:text-base">
          Open to SQA, SDET and test-automation roles. The fastest way to reach me is email. I read everything.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-8 flex min-h-16 items-center justify-between gap-3 border-y border-line bg-ink px-3 py-5 transition-colors active:bg-acid/90 hover:border-acid hover:bg-acid sm:mt-10 sm:px-5 sm:py-6"
        >
          <span className="min-w-0 break-all text-[17px] font-semibold tracking-tight text-bone transition-colors group-hover:text-ink min-[390px]:text-[19px] sm:text-3xl md:text-4xl">
            {profile.email}
          </span>
          <FiArrowUpRight
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-mute transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink sm:h-8 sm:w-8"
          />
        </a>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
          {[
            [profile.socials.github, FaGithub, "GitHub"],
            [profile.socials.linkedin, FaLinkedinIn, "LinkedIn"],
          ].map(([href, Icon, label]) => (
            <Magnet key={label} className="w-full sm:w-auto">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line bg-panel px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-bone transition-colors active:scale-[0.98] hover:border-acid hover:bg-acid hover:text-ink chamfer-sm sm:w-auto sm:px-5"
              >
                <Icon aria-hidden="true" />
                {label}
                <FiArrowUpRight
                  aria-hidden="true"
                  className="text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </a>
            </Magnet>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
