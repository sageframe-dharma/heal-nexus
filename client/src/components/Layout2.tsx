import { useState } from "react";
import { Link, useLocation } from "wouter";

const ACCENT = "#C850C0";
const LAVENDER = "rgb(170, 185, 240)";

// Responsive CSS injected when inlineNav=true:
// Desktop: outer is 100vh flex column with lavender top padding, nav gets side margins, content fills remainder
// Mobile: falls back to sticky full-width nav + scrollable content (same as default Layout2)
const INLINE_NAV_CSS = `
  /* ── Desktop: cream box floats with even lavender margin; nav inside cream ── */
  @media (min-width: 768px) {
    .l2i-outer {
      height: 100vh;
      overflow: hidden;
      box-sizing: border-box;
      padding: clamp(16px, 2.5vw, 32px);
    }
    .l2i-content {
      height: 100%;
      overflow: hidden;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
    }
    .l2i-nav { flex-shrink: 0; }
  }
  /* ── Mobile: 10px lavender margin all around; nav sits inside cream ── */
  @media (max-width: 767px) {
    .l2i-outer {
      min-height: 100vh;
      box-sizing: border-box;
      padding: 10px;
    }
    .l2i-content {
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 20px);
    }
  }
`;

const HAMBURGER_CSS = `
  /* Desktop: flat link row, no hamburger */
  @media (min-width: 768px) {
    .l2i-desktop-nav { display: flex; flex: 1; justify-content: flex-end; align-items: center; gap: 24px; }
    .l2i-mobile-nav  { display: none; }
  }
  /* Mobile: hamburger only, links hidden */
  @media (max-width: 767px) {
    .l2i-desktop-nav { display: none; }
    .l2i-mobile-nav  { display: block; position: relative; margin-left: auto; }
  }
  .l2i-hamburger-btn {
    background: none; border: none; cursor: pointer;
    padding: 6px 2px; display: flex; flex-direction: column; gap: 5px;
  }
  .l2i-hamburger-btn span {
    display: block; width: 22px; height: 2px;
    background: rgba(5,26,28,0.5); border-radius: 2px; transition: background 0.2s;
  }
  .l2i-hamburger-btn:hover span { background: #051a1c; }
  .l2i-dropdown {
    position: absolute; right: 0; top: calc(100% + 8px);
    background: #f5f2ed; border-radius: 12px;
    box-shadow: 0 4px 24px rgba(5,26,28,0.13);
    padding: 6px 0; min-width: 170px; z-index: 200;
  }
  .l2i-dropdown a {
    display: block; padding: 11px 22px;
    font-family: Montserrat, sans-serif; font-size: 13px;
    font-weight: 500; letter-spacing: 0.3px; text-transform: uppercase;
    text-decoration: none; color: rgba(5,26,28,0.55);
    transition: color 0.15s, background 0.15s;
  }
  .l2i-dropdown a:hover { color: #051a1c; background: rgba(5,26,28,0.04); }
  .l2i-dropdown a.active { color: #C850C0; }
`;

const NAV_LINKS = [
  { label: "Offerings",  href: "/offerings"  },
  { label: "About",      href: "/about"      },
  { label: "Sessions",   href: "/sessions"   },
  { label: "Resources",  href: "/resources"  },
] as const;

interface Layout2Props {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
  /** Desktop: nav sits inside lavender frame with side gutters; outer is 100vh/overflow:hidden. Mobile: unchanged. */
  inlineNav?: boolean;
}

export function Layout2({ children, contentStyle, inlineNav }: Layout2Props) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Shared nav link renderer
  const navLinks = NAV_LINKS.map(({ label, href }) => {
    const isActive = location === href;
    return (
      <Link
        key={href}
        href={href}
        style={{
          color: isActive ? ACCENT : "rgba(5,26,28,0.5)",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.3px",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={e => {
          if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#051a1c";
        }}
        onMouseLeave={e => {
          if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(5,26,28,0.5)";
        }}
      >
        {label}
      </Link>
    );
  });

  const navInner = (
    <>
      <Link
        href="/"
        style={{
          color: "rgba(5,26,28,0.5)",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 13,
          fontWeight: 400,
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#051a1c"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(5,26,28,0.5)"; }}
      >
        ← Back to Home
      </Link>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}>
        <img src="/favicon.svg" alt="typemark" style={{ height: 32, width: 32, display: "block" }} />
      </div>
      {/* Desktop: inline link row */}
      <div className="l2i-desktop-nav">
        {navLinks}
      </div>
      {/* Mobile: hamburger + dropdown */}
      <div className="l2i-mobile-nav">
        <button
          className="l2i-hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
        {menuOpen && (
          <div className="l2i-dropdown">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={location === href ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (inlineNav) {
    return (
      <>
        <style>{INLINE_NAV_CSS}</style>
        <style>{HAMBURGER_CSS}</style>
        {/* Outer lavender frame — uniform padding creates even margin around cream box */}
        <div className="l2i-outer" style={{ background: LAVENDER }}>
          {/* Cream box — contains nav + page content as a single floating unit */}
          <div
            className="l2i-content"
            style={{
              background: "#f5f2ed",
              color: "#1a1a1e",
              ...contentStyle,
            }}
          >
            <nav
              className="l2i-nav"
              style={{
                background: "#f5f2ed",
                padding: "14px 32px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              {navInner}
            </nav>
            {children}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{HAMBURGER_CSS}</style>
      <div style={{ background: LAVENDER, minHeight: "100vh" }}>
      {/* Sticky nav */}
      <nav
        style={{
          background: LAVENDER,
          padding: "14px 32px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {navInner}
      </nav>

      {/* Content area — clamp margin ensures side frames always visible */}
      <div
        style={{
          background: "#f5f2ed",
          margin: "0 clamp(16px, 4vw, 64px)",
          minHeight: "calc(100vh - 49px)",
          padding: "48px 56px",
          color: "#1a1a1e",
          ...contentStyle,
        }}
      >
        {children}
      </div>
      </div>
    </>
  );
}
