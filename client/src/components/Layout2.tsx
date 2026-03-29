import { Link, useLocation } from "wouter";

const ACCENT = "#C850C0";

const NAV_LINKS = [
  { label: "Practice", href: "/practice" },
  { label: "About",    href: "/about"    },
  { label: "Sessions", href: "/sessions" },
] as const;

interface Layout2Props {
  children: React.ReactNode;
}

export function Layout2({ children }: Layout2Props) {
  const [location] = useLocation();

  return (
    <div style={{ background: "#051a1c", minHeight: "100vh" }}>
      {/* Sticky nav */}
      <nav
        style={{
          background: "#051a1c",
          padding: "14px 32px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: 24,
          borderBottom: "1px solid rgba(232,230,227,0.06)",
        }}
      >
        {/* Back link — pushes nav items right */}
        <Link
          href="/"
          style={{
            color: "rgba(232,230,227,0.6)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            textDecoration: "none",
            marginRight: "auto",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#e8e6e3"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(232,230,227,0.6)"; }}
        >
          ← Back to Home
        </Link>

        {/* Nav items */}
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = location === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                color: isActive ? ACCENT : "rgba(232,230,227,0.6)",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#e8e6e3";
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(232,230,227,0.6)";
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Content area */}
      <div
        style={{
          background: "#f5f2ed",
          maxWidth: 1200,
          margin: "0 auto",
          minHeight: "calc(100vh - 49px)",
          padding: "48px 56px",
          color: "#1a1a1e",
        }}
      >
        {children}
      </div>
    </div>
  );
}
