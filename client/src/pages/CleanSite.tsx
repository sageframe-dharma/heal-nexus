import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { SiteShell, ContactBand, Arrow, PATHS, emailNancy } from "@/components/SiteShell";

export const CLEAN_PATHS: string[] = Object.values(PATHS);
import { HexWindow } from "@/components/HexWindow";
import portrait from "@assets/nancy-portrait.webp";
import forestPortrait from "@assets/nancy-joy.webp";
import laughing from "@assets/nancy-laughing.webp";
import waterImage from "@assets/water.webp";
import treatmentImage from "@assets/session-treatment.webp";
import treatmentRoomImage from "@assets/session-treatment-room.webp";

/**
 * CleanSite — the clean, multi-page site. One shell, six pages.
 * App.tsx mounts it on every path in CLEAN_PATHS.
 */

// ─── Home ─────────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <section className="ns-hero">
        <div>
          <h1>human.being.</h1>
          <p className="ns-subtitle">Being human can be hard, being together doesn't have to be.</p>
          <p className="ns-intro">
            I help people meet intense experiences with steadiness, connection, and room for something new to become possible.
          </p>
          <Link className="ns-action" href={PATHS.contact}>Start a conversation</Link>
          <Link className="ns-link ns-hero-more" href={PATHS.sessions}>What a session is like</Link>
        </div>
        <figure>
          <img className="ns-portrait" src={portrait as string} alt="Nancy Turnquist" width={1100} height={1653} style={{ objectPosition: "center 22%" }} />
          <figcaption>Nancy Turnquist, RCST, C-IAYT</figcaption>
        </figure>
      </section>

      <section className="ns-row is-first" id="approach" aria-labelledby="approach-title">
        <div className="ns-row-aside">
          <h2 id="approach-title">Approach</h2>
          <img className="ns-photo" src={waterImage as string} alt="Sunlight scattered across the surface of dark water" width={1024} height={768} loading="lazy" />
        </div>
        <div className="ns-prose">
          <p className="ns-lede">
            Birth, loss, pain, and major life changes can bring us to places we don’t know how to navigate. Sometimes we feel overwhelmed; sometimes we keep functioning while parts of our experience feel impossible to touch. I offer a place to begin meeting what is happening, with someone who can stay present alongside you.
          </p>
          <p>
            My work brings together body awareness, movement, touch, and conversation. We might begin by noticing a sensation, finding support in your body, or giving attention to something you have struggled to put into words. What we do grows out of what you are experiencing and what you are willing to explore. Together, we make room for feelings and possibilities that have been difficult to approach alone.
          </p>
          <p>
            At the foundation of my work is a relationship with the sacred: the deeper intelligence I encounter in the body, in relationship, and in life itself. My own experiences of pain, birth, and loss have shaped my capacity to stay with intensity. I bring that steadiness to our work, along with curiosity about your experience and respect for your choices. You have a say in the pace, the direction, and how far we go.
          </p>
          <p>
            You may arrive wanting relief from a particular difficulty, or sensing that something in your life needs to change. As we work, we can also explore how you relate to yourself, what happens when things become difficult, and where you want more connection or freedom. Our first conversation is a chance to talk about what brings you here and whether this is the support you are looking for.
          </p>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

const CLIENT_FORM_GROUPS = [
  { heading: "Adult clients", forms: [
    { label: "Client Intake & Consent Form", href: "https://form.jotform.com/260885378599077" },
    { label: "Adult Release of Liability & Informed Consent", href: "https://form.jotform.com/260884926005057" },
  ]},
  { heading: "Minor clients", forms: [
    { label: "Minor Client Intake & Consent Form", href: "https://form.jotform.com/261857397336067" },
    { label: "Minor Release of Liability & Informed Consent", href: "https://form.jotform.com/260884607383163" },
  ]},
];

function SessionsPage() {
  return (
    <>
      <section className="ns-hero">
        <div>
          <h1>Sessions</h1>
          <p className="ns-subtitle">60–90 minutes, in person in Cambridge, MA or online</p>
          <p className="ns-intro">
            Sessions are 60–90 minutes, in person at Nancy's treatment space in Cambridge, MA or online. Most work happens on a massage table, where you remain fully clothed, using gentle, listening touch—though sessions may also include seated or standing work, breath, and movement. Online sessions can be very effective for most of the modalities that I work with.
          </p>
          <Link className="ns-action" href={PATHS.contact}>Start a conversation</Link>
        </div>
        <figure>
          <img className="ns-portrait" src={treatmentImage as string} alt="Nancy working with a client on a treatment table beside a window" width={1024} height={738} style={{ objectPosition: "88% center" }} />
          <figcaption>A session in Nancy's treatment space</figcaption>
        </figure>
      </section>

      <section className="ns-feature" aria-labelledby="space-title">
        <img className="ns-photo" src={treatmentRoomImage as string} alt="Nancy's treatment room, lit by a small lamp" width={1024} height={768} loading="lazy" />
        <div>
          <h2 id="space-title">The space</h2>
          <ul className="ns-facts">
            <li><span>Length</span><span>60–90 minutes</span></li>
            <li><span>In person</span><span>Cambridge, MA</span></li>
            <li><span>Online</span><span>Everywhere</span></li>
          </ul>
        </div>
      </section>

      <section className="ns-section" aria-labelledby="forms-title">
        <h2 id="forms-title">New client forms</h2>
        <p className="ns-section-intro">After your initial conversation with Nancy, new clients are asked to complete an intake form before the first session.</p>
        <div className="ns-cards">
          {CLIENT_FORM_GROUPS.map((group) => (
            <article className="ns-card" key={group.heading}>
              <h3>{group.heading}</h3>
              <ul className="ns-forms">
                {group.forms.map((form) => (
                  <li key={form.href}>
                    <a href={form.href} target="_blank" rel="noopener noreferrer">
                      {form.label}
                      <Arrow external />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <ContactBand />
    </>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <>
      <HexWindow />
      <section className="ns-row is-first" aria-labelledby="bio-title">
        <img className="ns-photo ns-bio-photo" src={laughing as string} alt="Nancy laughing" width={800} height={1118} loading="lazy" />
        <div className="ns-prose">
          <h1 className="ns-bio-name" id="bio-title">Nancy Turnquist</h1>
          <span className="ns-credentials">RCST · C-IAYT · in practice since 2000</span>
          <p className="ns-lede">Nancy Turnquist is a holistic healing practitioner. She has been in practice since 2000.</p>
          <p>
            The modalities she works with include Biodynamic Cranio Sacral Therapy (BCST), Yoga Therapy, somatic trauma resolution, pre and perinatal psychology, and birth and life transition support. She studied at the Iyengar Institute in Pune, India and has trained with some of the leading practitioners in each of her fields. Nancy brings over two decades of hands-on experience to every session. She also speaks fluent Spanish and works with Spanish-speaking clients.
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

// ─── Relational Vitality ──────────────────────────────────────────────────────

const VITALITY_FORM_ID = "262824796754170";

function VitalityPage() {
  const [status, setStatus] = useState("");
  return (
    <>
      <section className="ns-hero" aria-labelledby="rv-title">
        <div>
          <h1 id="rv-title">Relational<br />Vitality</h1>
          <p className="ns-subtitle">Building skills for presence, connection, and purposeful action</p>
          <p className="ns-with">A community of practice taking shape with Nancy Turnquist.</p>
          <p className="ns-intro">
            Relational Vitality brings people together to cultivate connection—with ourselves, with each other, and with the world around us. Through somatic awareness, conversation, and shared learning, we’ll explore how to meet everyday life with greater presence, clarity, and capacity to act.
          </p>
          <a className="ns-action" href="#interest" onClick={(e) => { e.preventDefault(); document.getElementById("interest")?.scrollIntoView({ behavior: "smooth" }); }}>
            I’m interested
          </a>
        </div>
        <figure>
          <img className="ns-portrait" src={forestPortrait as string} alt="Nancy Turnquist smiling in a woodland, holding a yellow leaf" width={683} height={1024} style={{ objectPosition: "center 37%" }} />
          <figcaption>With Nancy Turnquist</figcaption>
        </figure>
      </section>

      <section className="ns-section" aria-labelledby="rhythm-title">
        <h2 id="rhythm-title">A monthly rhythm</h2>
        <p className="ns-section-intro">These gatherings will connect ongoing relationships with opportunities to learn and practice.</p>
        <div className="ns-cards">
          <article className="ns-card">
            <h3>Build community</h3>
            <p className="ns-format">One online gathering each month</p>
            <p>Get to know one another, share experiences, and explore how these practices live in our relationships and daily lives.</p>
          </article>
          <article className="ns-card">
            <h3>Deepen practice</h3>
            <p className="ns-format">One in-person gathering each month</p>
            <p>Learn somatic and relational skills through guided exercises, exploration, and reflection together.</p>
          </article>
        </div>
      </section>

      <section className="ns-row" aria-labelledby="who-title">
        <h2 id="who-title">Who it’s for</h2>
        <div>
          <p>Created for therapists, mental health practitioners, and others who work closely with people.</p>
          <p>Anyone drawn to this practice is welcome.</p>
        </div>
      </section>

      <section className="ns-row" aria-labelledby="rv-about-title" style={{ paddingTop: 4, borderTop: 0, paddingBottom: 42 }}>
        <h2 id="rv-about-title">
          About Nancy
          <span className="ns-credentials">C-IAYT · RCST · PPNE</span>
        </h2>
        <p>
          Nancy Turnquist is a craniosacral therapist and yoga therapist with more than 23 years of experience. Her work brings together somatic practice, education, and attention to relationships, families, and life transitions.
        </p>
      </section>

      <section className="ns-band" id="interest" aria-labelledby="interest-title" style={{ marginTop: 0 }}>
        <div>
          <h2 id="interest-title">Join the interest list</h2>
          <p>
            The community is taking shape around this proposed monthly rhythm. Leave your email to receive details about the gatherings, location, and cost as they are confirmed.
          </p>
        </div>
        <form
          aria-label="Relational Vitality interest list"
          action={`https://submit.jotform.com/submit/${VITALITY_FORM_ID}`}
          method="post"
          target="_top"
          acceptCharset="utf-8"
          onSubmit={() => setStatus("Submitting your interest…")}
        >
          <input type="hidden" name="formID" value={VITALITY_FORM_ID} />
          <input type="hidden" name="simple_spc" value={`${VITALITY_FORM_ID}-${VITALITY_FORM_ID}`} />
          <div hidden>
            <label>
              Leave this field empty
              <input type="text" name="website" defaultValue="" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label htmlFor="rv-email">Your email address</label>
          <input id="rv-email" type="email" name="q2_email" autoComplete="email" placeholder="you@example.com" required aria-describedby="rv-note" />
          <label className="ns-comment-label" htmlFor="rv-comments">Anything you’d like Nancy to know? (optional)</label>
          <textarea id="rv-comments" name="q3_comments" rows={3} maxLength={2000} placeholder="What interests you about the community, or any questions you have." />
          <button className="ns-action" type="submit">I’m interested</button>
          <p className="ns-note" id="rv-note">Your email and any comment will be shared with Nancy and saved to her interest list.</p>
          <p className="ns-response" role="status" aria-live="polite">{status}</p>
        </form>
      </section>
    </>
  );
}

// ─── Resources ────────────────────────────────────────────────────────────────

interface ResourceLink { name: string; href: string; description: string; }
interface ResourceGroup { heading: string; links: ResourceLink[]; }

// The same list the archived home page shows in its Resources panel.
const RESOURCE_GROUPS: ResourceGroup[] = [
  { heading: "Craniosacral Therapy", links: [
    { name: "Biodynamic Craniosacral Therapy Association of North America", href: "https://www.craniosacraltherapy.org/", description: "Professional association and practitioner directory" },
    { name: "Colorado School of Energy Studies", href: "https://www.energyschool.com/", description: "BCST, polarity, and verbal skills training; articles and handouts freely available" },
  ]},
  { heading: "Somatic Therapy", links: [
    { name: "Somatic Practice—Kathy Kain", href: "https://somaticpractice.net/", description: "Training in touch for trauma resolution" },
    { name: "Co-Regulating Touch Directory", href: "https://coregulatingtouch.com/", description: "Practitioner directory for co-regulating touch approaches" },
  ]},
  { heading: "Yoga", links: [
    { name: "IYNAUS", href: "https://iynaus.org/", description: "Iyengar Yoga National Association of the United States—national association, teacher directory, certification" },
    { name: "International Association of Yoga Therapists (IAYT)", href: "https://www.iayt.org/", description: "Credentialing body for yoga therapy" },
  ]},
  { heading: "Pre- & Perinatal", links: [
    { name: "Castellino Training", href: "https://castellinotraining.com/", description: "Prenatal and birth therapy training" },
    { name: "BEBA", href: "https://beba.org/", description: "Building and Enhancing Bonding and Attachment—family clinic for prenatal, birth, and early trauma" },
    { name: "APPPAH", href: "https://birthpsychology.com/", description: "Association for Prenatal and Perinatal Psychology and Health—professional association for the PPN field" },
  ]},
  { heading: "Birth & Postpartum", links: [
    { name: "Body Ready Method", href: "https://bodyreadymethod.com/", description: "Evidence-based preparation for birth" },
    { name: "La Matrona", href: "https://www.lamatrona.com/", description: "Holistic doula and midwifery training" },
    { name: "Innate Postpartum Care", href: "https://www.innatepostpartumcare.com/", description: "Fourth-trimester support model" },
  ]},
];

function ResourcesPage() {
  return (
    <>
      <section className="ns-top">
        <h1>Resources</h1>
        <p className="ns-subtitle">These links reflect the places I have studied and the communities I recommend.</p>
      </section>
      <div style={{ paddingTop: 44, paddingBottom: 12 }}>
        {RESOURCE_GROUPS.map((group) => (
          <section className="ns-row" key={group.heading}>
            <h2 className="ns-small">{group.heading}</h2>
            <dl className="ns-links">
              {group.links.map((link) => (
                <div key={link.href} style={{ display: "contents" }}>
                  <dt>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.name}
                      <Arrow external />
                    </a>
                  </dt>
                  <dd>{link.description}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const CONTACT_FORM_ID = "260883853283063";

function ContactPage() {
  // Jotform's handler sizes the embedded form to its content.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    script.async = true;
    script.onload = () => {
      const handler = (window as unknown as { jotformEmbedHandler?: (selector: string, origin: string) => void }).jotformEmbedHandler;
      if (typeof handler === "function") {
        handler(`iframe[id='JotFormIFrame-${CONTACT_FORM_ID}']`, "https://form.jotform.com/");
      }
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <>
      <section className="ns-top">
        <h1>Start a conversation</h1>
        <p className="ns-subtitle" style={{ maxWidth: 620 }}>
          Our first conversation is a chance to talk about what brings you here and whether this is the support you are looking for.
        </p>
        <div className="ns-page-ways">
          <a href="tel:6179020849">(617) 902-0849</a>
          <button type="button" onClick={emailNancy}>Email Nancy</button>
        </div>
      </section>
      <section className="ns-section" style={{ paddingTop: 26 }}>
        <div className="ns-formframe">
          <iframe id={`JotFormIFrame-${CONTACT_FORM_ID}`} title="Contact Nancy" src={`https://form.jotform.com/${CONTACT_FORM_ID}`} scrolling="no" />
        </div>
      </section>
    </>
  );
}

// ─── Site ─────────────────────────────────────────────────────────────────────

export default function CleanSite() {
  // The location is passed to Switch so a page keeps rendering while it fades out.
  const [rawLocation] = useLocation();
  const location = rawLocation.length > 1 ? rawLocation.replace(/\/+$/, "") : rawLocation;
  return (
    <SiteShell>
      <Switch location={location}>
        <Route path={PATHS.home} component={HomePage} />
        <Route path={PATHS.about} component={AboutPage} />
        <Route path={PATHS.vitality} component={VitalityPage} />
        <Route path={PATHS.sessions} component={SessionsPage} />
        <Route path={PATHS.resources} component={ResourcesPage} />
        <Route path={PATHS.contact} component={ContactPage} />
      </Switch>
    </SiteShell>
  );
}
