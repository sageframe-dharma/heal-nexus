import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "@/styles/site.css";

/**
 * SiteShell — navigation, page transition, and footer for the clean site.
 * The earlier site is kept under /archive and is not linked from here.
 * The shell stays mounted while pages change, so only the page area fades.
 */

export const PATHS = {
  home: "/",
  about: "/about",
  vitality: "/vitality",
  sessions: "/sessions",
  resources: "/resources",
  contact: "/contact",
} as const;

// Approach is the home page: its text is the first thing under the opening block.
const NAV: { label: string; href: string }[] = [
  { label: "Approach", href: PATHS.home },
  { label: "About", href: PATHS.about },
  { label: "Sessions", href: PATHS.sessions },
  { label: "Relational Vitality", href: PATHS.vitality },
  { label: "Resources", href: PATHS.resources },
];

export function Arrow({ external = false }: { external?: boolean }) {
  return (
    <svg className="ns-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {external ? <path d="M5 11 11 5M6 5h5v5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}

export function emailNancy() {
  const user = "nancyturnquist";
  const domain = "gmail.com";
  window.location.href = `mailto:${user}@${domain}`;
}

/** The dark block that closes a page: one clear way to reach Nancy. */
export function ContactBand() {
  return (
    <section className="ns-band" aria-labelledby="ns-band-title">
      <div>
        <h2 id="ns-band-title">Start a conversation</h2>
        <p>Our first conversation is a chance to talk about what brings you here and whether this is the support you are looking for.</p>
      </div>
      <div>
        <Link className="ns-action" href={PATHS.contact}>Contact Nancy</Link>
        <ul className="ns-ways">
          <li><span>Call</span><a href="tel:6179020849">(617) 902-0849</a></li>
          <li><span>Email</span><button type="button" onClick={emailNancy}>Email Nancy</button></li>
          <li><span>Where</span><span>Cambridge, MA and online</span></li>
        </ul>
      </div>
    </section>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [rawLocation] = useLocation();
  // "/vitality/" and "/vitality" are the same page.
  const location = rawLocation.length > 1 ? rawLocation.replace(/\/+$/, "") : rawLocation;
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="ns">
      <nav className="ns-nav" aria-label="Main">
        <Link className="ns-home" href={PATHS.home} aria-label="Nancy Turnquist — home">
          <img src="/favicon.svg" alt="" width={44} height={44} />
          <span className="ns-name">Nancy Turnquist</span>
        </Link>
        <button
          type="button"
          className="ns-menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="ns-navlinks"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ns-burger" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <div className="ns-navlinks" id="ns-navlinks" data-open={open}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={location === item.href ? "page" : undefined}
              onClick={() => {
                // Already on the home page: bring the Approach text into view.
                if (item.href === PATHS.home && location === PATHS.home) {
                  setOpen(false);
                  document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.16, ease: "easeOut" } }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="ns-footer">
        <span>Nancy Turnquist</span>
        <a href="https://alonetogethercommunity.org/" target="_blank" rel="noopener noreferrer">
          Alone Together — care for families, in community
          <Arrow external />
        </a>
        <span>
          <span className="ns-human">human.being.</span>
          <i>Being human can be hard, being together doesn't have to be.</i>
        </span>
      </footer>
    </div>
  );
}
