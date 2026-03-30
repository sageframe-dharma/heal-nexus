import { useState } from "react";
import type { ReactNode } from "react";
import { Layout2 } from "@/components/Layout2";
import waterImage from "@assets/water.png";
import trainingImage from "@assets/about-training.jpg";
import resourcesChairImage from "@assets/resources-chair.png";

const ACCENT = "#C850C0";

// ─── Card definitions ────────────────────────────────────────────────────────

interface ResourceCard {
  key: string;
  label: string;
  image: string;
}

const RESOURCE_CARDS: ResourceCard[] = [
  { key: "mentors",          label: "Mentors",          image: waterImage as string },
  { key: "resources",        label: "Resources",        image: trainingImage as string },
  { key: "client-resources", label: "Client Resources", image: resourcesChairImage as string },
];

// ─── Link helper ─────────────────────────────────────────────────────────────

function L({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="l2-link">
      {children}
    </a>
  );
}

// ─── Mentor data ─────────────────────────────────────────────────────────────

interface Mentor {
  name: string;
  href?: string;
  body: string;
}

const MENTORS: Mentor[] = [
  {
    name: "Sobonfu Somé (1960–2017)",
    href: "https://www.sobonfu.com",
    body: "West African teacher of grief ritual, relationship, and community. Nancy attended grief and relationship rituals with Sobonfu from 2006 until her death. Sobonfu performed a private healing ritual for Nancy on the first anniversary of her daughter Ada's death. This lineage of communal grief work — the understanding that grief needs ritual, that it is inseparable from love, that it belongs to the community and not just the individual — runs through everything Nancy does.",
  },
  {
    name: "Anna Chitty",
    href: "https://www.energyschool.com/about",
    body: "Nancy's BCST and Blueprint Resonance teacher. Founder of the Colorado School of Energy Studies with her late husband John. Lifetime Achievement Award from the Biodynamic Craniosacral Therapy Association of North America. Over 40 years at the intersection of craniosacral therapy, polarity, and somatic work.",
  },
  {
    name: "Mary Jackson",
    href: "https://birthinconnection.com/",
    body: "Home birth midwife since 1975. Over 2,500 births. Co-teacher of the Castellino Foundation Training. Integrated PPN and craniosacral work into her midwifery practice.",
  },
  {
    name: "Kathy Kain",
    href: "https://somaticpractice.net/",
    body: "Nancy's foundational somatic teacher. Senior trainer in Somatic Experiencing. Over 40 years practicing and teaching bodywork and trauma recovery. Author of Nurturing Resilience and The Tao of Trauma.",
  },
  {
    name: "Patricia Walden",
    href: "https://www.patriciawaldenyoga.com/",
    body: "Nancy's yoga teacher for over twelve years. One of BKS Iyengar's most senior students worldwide. Nancy assisted Patricia 2–3 times per week, learning hands-on adjustment, nervous system tracking, and the depth of the Iyengar therapeutic tradition through daily practice and feedback.",
  },
  {
    name: "BKS Iyengar (1918–2014)",
    href: "https://bksiyengar.com/",
    body: "Founder of Iyengar yoga. Nancy studied directly with him and his children Geeta and Prashant at the Ramamani Iyengar Memorial Yoga Institute in Pune, India.",
  },
  {
    name: "Tami Lynn Kent",
    href: "https://www.wildfeminine.com/",
    body: "Author of Wild Feminine and Wild Creative. Holistic pelvic care practitioner whose work on the female body as a creative center informs Nancy's approach to birth, postpartum, and women's health.",
  },
  {
    name: "Rosita Arvigo",
    href: "https://rositaarvigo.com/",
    body: "Naprapathic physician, herbalist, founder of the Arvigo Techniques of Maya Abdominal Therapy. Nancy trained in both spiritual healing and abdominal massage with Rosita.",
  },
];

// ─── Resource link data ───────────────────────────────────────────────────────

interface ResourceLink { name: string; href: string; description: string; }
interface ResourceGroup { heading: string; links: ResourceLink[]; }

const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    heading: "Craniosacral Therapy",
    links: [
      { name: "Biodynamic Craniosacral Therapy Association of North America", href: "https://www.craniosacraltherapy.org/", description: "professional association and practitioner directory" },
      { name: "Colorado School of Energy Studies", href: "https://www.energyschool.com/", description: "BCST, polarity, and verbal skills training; articles and handouts freely available" },
    ],
  },
  {
    heading: "Somatic Therapy",
    links: [
      { name: "Somatic Practice — Kathy Kain", href: "https://somaticpractice.net/", description: "training in touch for trauma resolution" },
      { name: "Co-Regulating Touch Directory", href: "https://coregulatingtouch.com/", description: "practitioner directory for co-regulating touch approaches" },
    ],
  },
  {
    heading: "Yoga",
    links: [
      { name: "IYNAUS", href: "https://iynaus.org/", description: "Iyengar Yoga National Association of the United States — national association, teacher directory, certification" },
      { name: "International Association of Yoga Therapists (IAYT)", href: "https://www.iayt.org/", description: "credentialing body for yoga therapy" },
    ],
  },
  {
    heading: "Pre- & Perinatal",
    links: [
      { name: "Castellino Training", href: "https://castellinotraining.com/", description: "prenatal and birth therapy training" },
      { name: "BEBA", href: "https://beba.org/", description: "Building and Enhancing Bonding and Attachment — family clinic for prenatal, birth, and early trauma" },
      { name: "APPPAH", href: "https://birthpsychology.com/", description: "Association for Prenatal and Perinatal Psychology and Health — professional association for the PPN field" },
    ],
  },
  {
    heading: "Birth & Postpartum",
    links: [
      { name: "Body Ready Method", href: "https://bodyreadymethod.com/", description: "evidence-based preparation for birth" },
      { name: "La Matrona", href: "https://www.lamatrona.com/", description: "holistic doula and midwifery training" },
      { name: "Innate Postpartum Care", href: "https://www.innatepostpartumcare.com/", description: "fourth-trimester support model" },
    ],
  },
];

// ─── Detail renderers ─────────────────────────────────────────────────────────

function MentorsDetail() {
  return (
    <>
      <h2 className="l2-detail-heading">Mentors</h2>
      <hr className="l2-divider" />
      {MENTORS.map((m) => (
        <div key={m.name} style={{ marginBottom: 28 }}>
          <h3 className="l2-subheading">
            {m.href ? <L href={m.href}>{m.name}</L> : <span style={{ color: "#C850C0" }}>{m.name}</span>}
          </h3>
          <p className="l2-body">{m.body}</p>
        </div>
      ))}
    </>
  );
}

function ResourcesDetail() {
  return (
    <>
      <h2 className="l2-detail-heading">Resources</h2>
      <hr className="l2-divider" />
      {RESOURCE_GROUPS.map((group) => (
        <div key={group.heading} style={{ marginBottom: 28 }}>
          <h3 className="l2-subheading">{group.heading}</h3>
          {group.links.map((link) => (
            <p key={link.href} className="l2-body" style={{ marginBottom: 10 }}>
              <L href={link.href}>{link.name}</L>
              {" — "}
              {link.description}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

function ClientResourcesDetail() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "healing2025") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <h2 className="l2-detail-heading">Client Resources</h2>
      <hr className="l2-divider" />
      <p className="l2-body">
        This area contains resources for current clients of Nancy's practice, including session preparation materials, recommended reading, and practice guides.
      </p>
      {isAuthenticated ? (
        <p className="l2-body" style={{ fontStyle: "italic", color: "#5a5a60" }}>
          Welcome. Client resources will be available here soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12, maxWidth: 340 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            style={{
              border: "1px solid rgba(5,26,28,0.15)",
              borderRadius: 8,
              padding: "12px 16px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 15,
              outline: "none",
              color: "#1a1a1e",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#C850C0"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(5,26,28,0.15)"; }}
          />
          <button
            type="submit"
            style={{
              background: "#C850C0",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#A03D9A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#C850C0"; }}
          >
            Access Resources
          </button>
          {error && (
            <p className="l2-meta" style={{ marginTop: 4 }}>
              Incorrect code. Please contact Nancy for access.
            </p>
          )}
        </form>
      )}
    </>
  );
}

function renderDesktopDetail(key: string): ReactNode {
  switch (key) {
    case "mentors":          return <MentorsDetail />;
    case "resources":        return <ResourcesDetail />;
    case "client-resources": return <ClientResourcesDetail />;
    default:                 return null;
  }
}

function renderMobileDetail(key: string): ReactNode {
  switch (key) {
    case "mentors":          return <MentorsDetail />;
    case "resources":        return <ResourcesDetail />;
    case "client-resources": return <ClientResourcesDetail />;
    default:                 return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [selectedCard, setSelectedCard] = useState<string>("mentors");

  return (
    <Layout2 inlineNav contentStyle={{ padding: 0 }}>
      <div className="l2-page">
        <div className="l2-layout">
          {/* Card column */}
          <div className="l2-card-col">
            {RESOURCE_CARDS.map(({ key, label, image }) => {
              const isActive = selectedCard === key;
              return (
                <div key={key} style={{ marginBottom: 8 }}>
                  <div
                    onClick={() => setSelectedCard(key)}
                    style={{
                      border: "1px solid rgba(5,26,28,0.10)",
                      borderLeft: isActive ? `3px solid ${ACCENT}` : "1px solid rgba(5,26,28,0.10)",
                      borderRadius: 10,
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#ffffff",
                      transition: "box-shadow 0.2s ease",
                    }}
                  >
                    <div style={{ padding: "12px 16px" }}>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 17,
                          fontWeight: isActive ? 400 : 300,
                          color: isActive ? ACCENT : "#051a1c",
                          margin: 0,
                          lineHeight: 1.3,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {label}
                      </p>
                    </div>
                    <div style={{ maxHeight: isActive ? 600 : 4, overflow: "hidden", transition: "max-height 300ms ease" }}>
                      <img src={image} alt={label} style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>
                  </div>

                  {/* Mobile accordion */}
                  {isActive && (
                    <div
                      className="l2-mobile-detail"
                      style={{
                        padding: "20px 20px 24px",
                        background: "transparent",
                        borderLeft: `3px solid ${ACCENT}`,
                        borderRight: "1px solid rgba(5,26,28,0.08)",
                        borderBottom: "1px solid rgba(5,26,28,0.08)",
                        borderRadius: "0 0 10px 10px",
                      }}
                    >
                      {renderMobileDetail(key)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop detail panel */}
          <div className="l2-detail">
            {renderDesktopDetail(selectedCard)}
          </div>
        </div>
      </div>
    </Layout2>
  );
}

