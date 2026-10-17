"use client";

import { Montserrat } from "next/font/google";
import { useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-4 w-5 flex-col items-center justify-between">
      <span
        className={`h-[2px] w-full rounded-full bg-white transition-transform duration-300 ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`h-[2px] w-full rounded-full bg-white transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-[2px] w-full rounded-full bg-white transition-transform duration-300 ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </div>
  );
}

interface NavLink {
  label: string;
  href: string;
}

// Add / remove links here — each renders as its own pill, sized to its
// own text length.
const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About PVM", href: "/AboutPVM" },
  { label: "Curriculum", href: "/Curriculam" },
  { label: "Community Outreach Programmes", href: "/COP" },
  { label: "Vocational Education", href: "/VE" },
  { label: "Co Curricular Activities", href: "/CCA" },
  { label: "Career Guidance and Counselling", href: "/CGC" },
  { label: "Extra Curricular & Sports Coaching", href: "/ECS" },
  { label: "Alumni Connect", href: "/AluminiConnect" },
  { label: "Contact Us", href: "/Contact" },
];

// Per-item stagger timing (ms). Kept small since there are 10 items —
// tweak STEP if you want a slower/faster cascade.
const STEP_MS = 35;
const DURATION_MS = 320;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`${montserrat.className} fixed right-6 top-6 z-50 flex flex-col items-end gap-3`}
    >
      {/* Toggle icon */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black transition-transform duration-300 hover:scale-105"
      >
        <MenuIcon open={open} />
      </button>

      {/* Vertical stack of individual link pills — always mounted so the
          close (exit) transition has something to animate out. */}
      <div
        className="flex flex-col items-end gap-2"
        aria-hidden={!open}
      >
        {NAV_LINKS.map((link, index) => {
          // On open: item 0 leads. On close: last item leads (reverses
          // the cascade), giving a natural "unstack from the bottom" feel.
          const openDelay = index * STEP_MS;
          const closeDelay = (NAV_LINKS.length - 1 - index) * STEP_MS;

          return (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              className="flex h-11 w-max items-center whitespace-nowrap rounded-full bg-black px-6 text-sm font-medium text-white/90 transition-colors hover:text-white sm:text-base"
              style={{
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0) scale(1)"
                  : "translateY(-8px) scale(0.94)",
                transitionProperty: "opacity, transform",
                transitionDuration: `${DURATION_MS}ms`,
                transitionTimingFunction: open
                  ? "cubic-bezier(0.16, 1, 0.3, 1)"
                  : "cubic-bezier(0.4, 0, 1, 1)",
                transitionDelay: `${open ? openDelay : closeDelay}ms`,
                pointerEvents: open ? "auto" : "none",
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}