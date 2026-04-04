import { useEffect } from "react";
import { Layout2 } from "@/components/Layout2";
import treatmentRoomImage from "@assets/session-treatment-room.webp";
import treatmentImage from "@assets/session-treatment.webp";

const SESSION_PARAGRAPHS = [
  "You don't need to know which modality is right for you. That's my job.",
  "When we begin working together, we start with a conversation — what's happening in your body, what brought you here, what you're noticing. This might take ten minutes or most of the session, depending on what's needed. Some people arrive knowing exactly what they want to work on. Others aren't sure yet. Both are fine.",
  "For in-person sessions, I work from a treatment space in my home in Cambridge, MA. It's a quiet, private room. Most hands-on work happens on a massage table — you remain fully clothed and comfortable. I may work at your head, your feet, your sacrum, your belly, or wherever your system draws attention. The touch ranges from very still and light (craniosacral work) to more engaged (somatic or bodywork), depending on what's called for. We may also work seated, standing, or with gentle movement if that's what your body needs.",
  "I also see people online, and this work can be surprisingly powerful — especially somatic therapy and pre- and perinatal work. Online sessions use guided awareness, breath, movement, and verbal processing. You don't need a treatment table. You need a quiet space where you feel safe, and a willingness to pay attention to what's happening inside.",
  "Whether in person or online, a session might involve hands-on craniosacral work, somatic awareness, breath, movement, energy work, or simply slowing down enough for you to feel what's actually there. Often it involves several of these, because your body doesn't organize itself into categories and neither do I.",
  "Sessions are typically 60 to 90 minutes. Some people come weekly. Some come when something is up. There's no prescribed schedule — we find the rhythm that works for you.",
  "What most people notice first is that they feel heard in a way they haven't before — not just listened to, but perceived. The body responds to that kind of attention. Things start to move that have been stuck. Pain shifts. Sleep changes. Old patterns lose their grip.",
  "I don't promise outcomes and I don't have an agenda for yours. I meet what is ready to happen and I support you in responding to your own knowing.",
];


export default function SessionsPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).jotformEmbedHandler === "function") {
        (window as any).jotformEmbedHandler(
          "iframe[id='JotFormIFrame-260883853283063']",
          "https://form.jotform.com/"
        );
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleEmailClick = () => {
    const user = "nancyturnquist";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <Layout2 inlineNav>
      <div className="l2-page">
        <div className="l2-single-column">
          <div className="l2-single-col">

          {/* Section 1 — Hero banner */}
          <section>
            <img
              src={treatmentRoomImage as string}
              alt="Nancy's treatment room"
              className="l2-banner-img"
            />
          </section>

          {/* Section 2 — What a Session Looks Like */}
          <section>
            <h2 className="l2-detail-heading">What a Session Looks Like</h2>
            <hr className="l2-divider" />
            {SESSION_PARAGRAPHS.map((p, i) => (
              <p key={i} className="l2-body">{p}</p>
            ))}
          </section>

          {/* Section 3 — Treatment photo */}
          <section>
            <img
              src={treatmentImage as string}
              alt="Nancy working with a client"
              className="l2-inline-img"
            />
          </section>

          {/* Section 4 — Get in Touch / JotForm */}
          <section>
            <h2 className="l2-detail-heading">Get in Touch</h2>
            <hr className="l2-divider" />
            <div style={{
              border: "0.5px solid #C850C0",
              borderRadius: 12,
              overflow: "hidden",
            }}>
              <iframe
                id="JotFormIFrame-260883853283063"
                title="Get in Touch"
                src="https://form.jotform.com/260883853283063"
                style={{ minWidth: "100%", maxWidth: "100%", border: "none", display: "block", marginBottom: -64 }}
                scrolling="no"
                frameBorder={0}
              />
            </div>
          </section>

          {/* Section 5 — New Client Forms */}
          <section>
            <h2 className="l2-detail-heading">New Client Forms</h2>
            <hr className="l2-divider" />
            <p className="l2-body">
              After your initial conversation with Nancy, new clients are asked to complete an intake form before the first session.
            </p>
            <div className="l2-form-item">
              <a href="https://form.jotform.com/260885378599077" target="_blank" rel="noopener noreferrer" className="l2-form-label">
                Client Intake & Consent Form
              </a>
            </div>
            <div className="l2-form-item">
              <a href="https://form.jotform.com/260884926005057" target="_blank" rel="noopener noreferrer" className="l2-form-label">
                Adult Release of Liability & Informed Consent
              </a>
            </div>
            <div className="l2-form-item">
              <a href="https://form.jotform.com/260884607383163" target="_blank" rel="noopener noreferrer" className="l2-form-label">
                Minor Release of Liability & Informed Consent
              </a>
            </div>
          </section>

          {/* Section 6 — Contact */}
          <section>
            <h2 className="l2-detail-heading">Contact</h2>
            <hr className="l2-divider" />
            <div className="l2-contact-row">
              <a href="tel:+16179020849" className="l2-contact-link">(617) 902-0849</a>
            </div>
            <div className="l2-contact-row">
              <button className="l2-contact-link" onClick={handleEmailClick}>
                Email Nancy
              </button>
            </div>
            <div className="l2-contact-row">In person: Cambridge, MA</div>
            <div className="l2-contact-row">Online: Everywhere</div>
          </section>

          </div>
        </div>
      </div>
    </Layout2>
  );
}
