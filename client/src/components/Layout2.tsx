import { Link, useLocation } from "wouter";

const ACCENT = "#C850C0";
const LAVENDER = "rgb(170, 185, 240)";

const NAV_LINKS = [
  { label: "Offerings", href: "/offerings" },
  { label: "About",     href: "/about"    },
  { label: "Sessions",  href: "/sessions" },
] as const;

interface Layout2Props {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
}

export function Layout2({ children, contentStyle }: Layout2Props) {
  const [location] = useLocation();

  return (
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
        {/* Back link */}
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

        {/* Typemark — absolutely centered in the nav */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}>
          <img src="/favicon.svg" alt="typemark" style={{ height: 32, width: 32, display: "block" }} />
        </div>

        {/* Spacer pushes nav items to the right, matching the back link width */}
        <div style={{ flex: 1 }} />

        {/* Nav items */}
        {NAV_LINKS.map(({ label, href }) => {
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
        })}
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
  );
}
