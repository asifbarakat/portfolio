import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "./ui";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-acid">05 / let's talk</span>
        <h2 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-tighter text-bone sm:text-7xl lg:text-8xl">
          Let's make it
          <br />
          <span className="serif text-acid">unbreakable.</span>
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-mute">
          Open to SQA, SDET and test-automation roles. The fastest way to reach me is email. I read everything.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 flex items-center justify-between gap-4 border-y border-line py-6 transition-colors hover:border-acid"
        >
          <span className="break-all text-2xl font-semibold tracking-tight text-bone transition-colors group-hover:text-acid sm:text-4xl">
            {profile.email}
          </span>
          <FiArrowUpRight className="shrink-0 text-mute transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid" size={36} />
        </a>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            [profile.socials.github, FaGithub, "GitHub"],
            [profile.socials.linkedin, FaLinkedinIn, "LinkedIn"],
          ].map(([href, Icon, label]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-medium text-bone transition-colors hover:border-acid hover:text-acid"
            >
              <Icon size={16} /> {label}
              <FiArrowUpRight className="text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
