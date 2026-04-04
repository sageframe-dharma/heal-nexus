import { useState } from "react";
import { useSearch } from "wouter";
import { Layout2 } from "@/components/Layout2";
import { SERVICES } from "@/lib/services";
import waterImage from "@assets/water.webp";
import { JumpBar } from "@/components/JumpBar";

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

// Short labels for the mobile jump bar (service keys contain \n chars)
const JUMP_BAR_LABELS: Record<string, string> = {
  [OFFERINGS_KEY]:                 "Offerings",
  "Biodynamic Craniosacral Therapy": "BCST",
  "Somatic\nTherapy":              "Somatics",
  "Yoga Therapy":                  "Yoga",
  "Pre- & Perinatal\nPsychology":  "PPN",
  "Birth, Doula &\nPostpartum":    "Birth",
  "Grief &\nTransitions":          "Life",
};

export default function PracticePage() {
  const search = useSearch();
  const cardParam = new URLSearchParams(search).get("card");
  const initialCard = cardParam && SERVICES.find(s => s.name === cardParam)
    ? cardParam
    : OFFERINGS_KEY;
  const [selectedCard, setSelectedCard] = useState<string>(initialCard);

  const detail = getDetail(selectedCard);

  const handleCardClick = (key: string) => {
    setSelectedCard(key);
    // Defer scroll until after the 300ms accordion image transition
    setTimeout(() => {
      document.getElementById(key)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
  };

  return (
    <Layout2 inlineNav contentStyle={{ padding: 0 }}>
      <div className="l2-page">
        <JumpBar
          items={ALL_CARDS.map((c) => ({ id: c.key, label: JUMP_BAR_LABELS[c.key] ?? c.label }))}
          selectedId={selectedCard}
          onSelect={handleCardClick}
        />
        <div className="l2-layout">
          {/* Card column */}
          <div className="l2-card-col">
            {ALL_CARDS.map(({ key, label, image }) => {
              const isActive = selectedCard === key;
              const cardDetail = getDetail(key);

              return (
                <div key={key} id={key} className="l2-card" style={{ marginBottom: 8 }}>
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
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Mobile: inline detail accordion below card */}
                  {isActive && cardDetail && (
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
                      <h2 className="l2-mobile-heading">{cardDetail.title}</h2>
                      {cardDetail.paragraphs.map((p, i) => (
                        <p key={i} className="l2-mobile-body">{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop detail panel — orchid border, no fill */}
          <div className="l2-detail">
            {detail ? (
              <>
                <h2 className="l2-detail-heading">{detail.title}</h2>
                <hr className="l2-divider" />
                {detail.paragraphs.map((p, i) => (
                  <p key={i} className="l2-body">{p}</p>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Layout2>
  );
}
