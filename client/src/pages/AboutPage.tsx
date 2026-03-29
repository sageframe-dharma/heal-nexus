import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div style={{ background: "#051a1c", minHeight: "100vh" }}>
      <nav style={{ background: "#051a1c", padding: "14px 32px", position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", gap: "24px" }}>
        <Link href="/" style={{ color: "rgba(232,230,227,0.6)", fontFamily: "Montserrat, sans-serif", fontSize: 13, textDecoration: "none", marginRight: "auto" }}>
          ← Back to Home
        </Link>
      </nav>
      <div style={{ background: "#f5f2ed", maxWidth: 1200, margin: "0 auto", minHeight: "100vh", padding: "48px 56px", color: "#1a1a1e" }}>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 15, color: "#5a5a60" }}>About page — coming in Phase 3.</p>
      </div>
    </div>
  );
}
