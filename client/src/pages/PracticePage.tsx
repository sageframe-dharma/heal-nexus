import { useState } from "react";
import { Layout2 } from "@/components/Layout2";
import { SERVICES } from "@/lib/services";

const ACCENT = "#C850C0";

const INTRO_PARAGRAPHS = [
  "You don't need to know which modality is right for you. That's my job.",
  "When we begin working together, we start with a conversation — what's happening in your body, what brought you here, what you're noticing. This might take ten minutes or most of the session, depending on what's needed. Some people arrive knowing exactly what they want to work on. Others aren't sure yet. Both are fine.",
  "For in-person sessions, I work from a treatment space in my home in Cambridge, MA. It's a quiet, private room. Most hands-on work happens on a massage table — you remain fully clothed and comfortable. I may work at your head, your feet, your sacrum, your belly, or wherever your system draws attention. The touch ranges from very still and light (craniosacral work) to more engaged (somatic or bodywork), depending on what's called for. We may also work seated, standing, or with gentle movement if that's what your body needs.",
  "I also see people online, and this work can be surprisingly powerful — especially somatic therapy and pre- and perinatal work. Online sessions use guided awareness, breath, movement, and verbal processing. You don't need a treatment table. You need a quiet space where you feel safe, and a willingness to pay attention to what's happening inside.",
  "Whether in person or online, a session might involve hands-on craniosacral work, somatic awareness, breath, movement, energy work, or simply slowing down enough for you to feel what's actually there. Often it involves several of these, because your body doesn't organize itself into categories and neither do I.",
  "Sessions are typically 60 to 90 minutes. Some people come weekly. Some come when something is up. There's no prescribed schedule — we find the rhythm that works for you.",
  "What most people notice first is that they feel heard in a way they haven't before — not just listened to, but perceived. The body responds to that kind of attention. Things start to move that have been stuck. Pain shifts. Sleep changes. Old patterns lose their grip.",
  "I don't promise outcomes and I don't have an agenda for yours. I meet what is ready to happen and I support you in responding to your own knowing.",
];

// Responsive styles injected once — avoids Tailwind breakpoint class conflicts with inline styles
const RESPONSIVE_CSS = `
  .practice-layout { display: flex; gap: 32px; align-items: flex-start; }
  .practice-card-col { width: 280px; flex-shrink: 0; overflow-y: auto; max-height: calc(100vh - 160px); }
  .practice-detail { flex: 1; overflow-y: auto; max-height: calc(100vh - 160px); padding-left: 8px; }
  .practice-mobile-detail { display: none; }

  @media (max-width: 767px) {
    .practice-layout { flex-direction: column; gap: 0; }
    .practice-card-col { width: 100%; max-height: none; overflow-y: visible; }
    .practice-detail { display: none; }
    .practice-mobile-detail { display: block; }
  }
`;

export default function PracticePage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const selected = SERVICES.find((s) => s.name === selectedCard);

  const handleCardClick = (name: string) => {
    if (name === selectedCard) {
      setSelectedCard(null);
      setExpandedCard(null);
    } else {
      setSelectedCard(name);
      setExpandedCard(name);
    }
  };

  return (
    <>
      <style>{RESPONSIVE_CSS}</style>
      <Layout2>
        {/* Page title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 36,
            fontWeight: 300,
            color: "#051a1c",
            lineHeight: 1.2,
            marginTop: 0,
            marginBottom: 12,
          }}
        >
          Offerings
        </h1>
        <div style={{ height: 1, width: 64, background: "rgba(5,26,28,0.15)", marginBottom: 36 }} />

        {/* Intro section */}
        <div style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24,
              fontWeight: 300,
              color: "#051a1c",
              lineHeight: 1.3,
              marginTop: 0,
              marginBottom: 22,
            }}
          >
            What a Session Looks Like
          </h2>
          {INTRO_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 15,
                fontWeight: 400,
                color: "#3a3a40",
                lineHeight: 1.7,
                marginTop: 0,
                marginBottom: 16,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Card + detail layout */}
        <div className="practice-layout">
          {/* Card column */}
          <div className="practice-card-col">
            {SERVICES.map((service) => {
              const isActive = selectedCard === service.name;
              const isHovered = hoveredCard === service.name;
              const isExpanded = expandedCard === service.name;
              const experienceParagraphs = (service.experienceText || service.description).split("\n\n");

              return (
                <div key={service.name} style={{ marginBottom: 12 }}>
                  {/* Card */}
                  <div
                    onClick={() => handleCardClick(service.name)}
                    onMouseEnter={() => setHoveredCard(service.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: isActive ? "#faf8f5" : "#ffffff",
                      border: "1px solid rgba(5,26,28,0.08)",
                      borderLeft: isActive
                        ? `3px solid ${ACCENT}`
                        : "1px solid rgba(5,26,28,0.08)",
                      borderRadius: 12,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      boxShadow:
                        isHovered && !isActive ? "0 2px 8px rgba(5,26,28,0.06)" : "none",
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        height: isActive || isHovered ? 180 : 120,
                        overflow: "hidden",
                        transition: "height 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.label}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: service.imagePosition ?? "center",
                            display: "block",
                            transform: service.imageScale
                              ? `scale(${service.imageScale})`
                              : undefined,
                            transformOrigin: "center center",
                          }}
                        />
                      ) : null}
                    </div>
                    {/* Label */}
                    <div style={{ padding: "12px 16px" }}>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 18,
                          fontWeight: isActive ? 400 : 300,
                          color: isActive ? ACCENT : "#051a1c",
                          lineHeight: 1.3,
                          margin: 0,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {service.label}
                      </p>
                    </div>
                  </div>

                  {/* Mobile inline expanded detail */}
                  {isExpanded && (
                    <div
                      className="practice-mobile-detail"
                      style={{
                        padding: "20px 20px 24px",
                        background: "#faf8f5",
                        borderRadius: "0 0 12px 12px",
                        borderLeft: `3px solid ${ACCENT}`,
                        borderRight: "1px solid rgba(5,26,28,0.08)",
                        borderBottom: "1px solid rgba(5,26,28,0.08)",
                        marginTop: -12,
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 22,
                          fontWeight: 300,
                          color: "#051a1c",
                          lineHeight: 1.3,
                          marginTop: 12,
                          marginBottom: 16,
                        }}
                      >
                        {service.label}
                      </h2>
                      {experienceParagraphs.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            color: "#3a3a40",
                            lineHeight: 1.7,
                            marginTop: 0,
                            marginBottom: 14,
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop detail area */}
          <div className="practice-detail">
            {selected ? (
              <>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28,
                    fontWeight: 300,
                    color: "#051a1c",
                    lineHeight: 1.3,
                    marginTop: 0,
                    marginBottom: 20,
                  }}
                >
                  {selected.label}
                </h2>
                <div
                  style={{
                    height: 1,
                    width: 48,
                    background: `${ACCENT}55`,
                    marginBottom: 24,
                  }}
                />
                {(selected.experienceText || selected.description).split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#3a3a40",
                      lineHeight: 1.7,
                      marginTop: 0,
                      marginBottom: 20,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </>
            ) : (
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#9a9aa0",
                  lineHeight: 1.7,
                  marginTop: 4,
                }}
              >
                Click a practice area to learn more.
              </p>
            )}
          </div>
        </div>
      </Layout2>
    </>
  );
}
