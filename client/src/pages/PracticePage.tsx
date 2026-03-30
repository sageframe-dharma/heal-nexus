import { useState } from "react";
import { Layout2 } from "@/components/Layout2";
import { SERVICES } from "@/lib/services";
import waterImage from "@assets/water.png";

const ACCENT = "#C850C0";
const OFFERINGS_KEY = "__offerings__";

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

// Unified card list: Offerings first, then the 6 modality services
const ALL_CARDS = [
  { key: OFFERINGS_KEY, label: "Offerings", image: waterImage as string, imagePosition: "center" as string | undefined },
  ...SERVICES.map((s) => ({ key: s.name, label: s.label, image: s.image ?? "", imagePosition: s.imagePosition })),
];

function getDetail(key: string): { title: string; paragraphs: string[] } | null {
  if (key === OFFERINGS_KEY) return { title: "What a Session Looks Like", paragraphs: INTRO_PARAGRAPHS };
  const svc = SERVICES.find((s) => s.name === key);
  if (!svc) return null;
  return { title: svc.label, paragraphs: (svc.experienceText || svc.description).split("\n\n") };
}

const RESPONSIVE_CSS = `
  /* ── Desktop ── */
  @media (min-width: 768px) {
    .practice-page {
      /* fills remaining cream height below nav; nav is flex-shrink:0 sibling above */
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
      /* small internal padding — outer lavender handles the frame margin */
      padding: 16px 28px 28px;
      display: flex;
      flex-direction: column;
    }
    .practice-layout {
      display: flex;
      gap: 64px;
      align-items: stretch;
      margin-top: 12px;
      flex: 1;
      min-height: 0;
    }
    .practice-card-col {
      width: 310px;
      flex-shrink: 0;
      overflow-y: auto;
      min-height: 0;
    }
    .practice-detail {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      border: 2px solid #C850C0;
      border-radius: 16px;
      padding: 36px 40px;
    }
    .practice-mobile-detail { display: none; }
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    /* nav is inside cream box — reduce top padding accordingly */
    .practice-page { padding: 20px 16px 32px; }
    .practice-layout { display: flex; flex-direction: column; margin-top: 16px; gap: 0; }
    .practice-card-col { width: 100%; overflow-y: visible; }
    .practice-detail { display: none; }
    .practice-mobile-detail { display: block; }
  }
`;

export default function PracticePage() {
  // Offerings is selected by default — detail panel always shows something
  const [selectedCard, setSelectedCard] = useState<string>(OFFERINGS_KEY);

  const detail = getDetail(selectedCard);

  const handleCardClick = (key: string) => {
    setSelectedCard(key);
  };

  return (
    <>
      <style>{RESPONSIVE_CSS}</style>
      {/* contentStyle zeros padding; inlineNav puts nav inside the lavender frame on desktop */}
      <Layout2 inlineNav contentStyle={{ padding: 0 }}>
        <div className="practice-page">
          {/* Two-column layout */}
          <div className="practice-layout">
            {/* Card column */}
            <div className="practice-card-col">
              {ALL_CARDS.map(({ key, label, image, imagePosition }) => {
                const isActive = selectedCard === key;
                const cardDetail = getDetail(key);

                return (
                  <div key={key} style={{ marginBottom: 8 }}>
                    {/* Card: label on top, image sliver below */}
                    <div
                      onClick={() => handleCardClick(key)}
                      style={{
                        border: "1px solid rgba(5,26,28,0.10)",
                        borderLeft: isActive
                          ? `3px solid ${ACCENT}`
                          : "1px solid rgba(5,26,28,0.10)",
                        borderRadius: 10,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "#ffffff",
                        transition: "box-shadow 0.2s ease",
                      }}
                    >
                      {/* Label */}
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
                      {/* Image: 4px sliver when inactive → natural aspect ratio when active */}
                      <div
                        style={{
                          maxHeight: isActive ? 600 : 4,
                          overflow: "hidden",
                          transition: "max-height 300ms ease",
                        }}
                      >
                        {image && (
                          <img
                            src={image}
                            alt={label}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Mobile: inline detail accordion below card */}
                    {isActive && cardDetail && (
                      <div
                        className="practice-mobile-detail"
                        style={{
                          padding: "20px 20px 24px",
                          background: "transparent",
                          borderLeft: `3px solid ${ACCENT}`,
                          borderRight: "1px solid rgba(5,26,28,0.08)",
                          borderBottom: "1px solid rgba(5,26,28,0.08)",
                          borderRadius: "0 0 10px 10px",
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 20,
                            fontWeight: 300,
                            color: "#051a1c",
                            lineHeight: 1.3,
                            margin: "0 0 14px 0",
                          }}
                        >
                          {cardDetail.title}
                        </h2>
                        {cardDetail.paragraphs.map((p, i) => (
                          <p
                            key={i}
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: 14,
                              color: "#3a3a40",
                              lineHeight: 1.7,
                              margin: "0 0 12px 0",
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop detail panel — orchid border, no fill */}
            <div className="practice-detail">
              {detail ? (
                <>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26,
                      fontWeight: 300,
                      color: "#051a1c",
                      lineHeight: 1.3,
                      margin: "0 0 18px 0",
                    }}
                  >
                    {detail.title}
                  </h2>
                  <div
                    style={{
                      height: 1,
                      width: 48,
                      background: `${ACCENT}55`,
                      marginBottom: 22,
                    }}
                  />
                  {detail.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 15,
                        color: "#3a3a40",
                        lineHeight: 1.7,
                        margin: "0 0 18px 0",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Layout2>
    </>
  );
}
