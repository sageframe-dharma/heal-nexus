import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Layout2 } from "@/components/Layout2";
import nancyJoyImage from "@assets/nancy-joy.webp";
import pearlImage from "@assets/pearl.webp";
import lineageImage from "@assets/about-lineage.webp";
import aboutTeachersImage from "@assets/about-teachers.webp";
import aboutCommunityImage from "@assets/about-community.webp";
import aboutTrainingImage from "@assets/about-training.webp";
import placeholderTeacher from "@assets/teachers/placeholder.webp";
import sobonfu from "@assets/teachers/sobunfu.webp";
import patriciaWalden from "@assets/teachers/patricia.webp";
import bksIyengar from "@assets/teachers/iyengar.webp";
import rositaArvigo from "@assets/teachers/rosita.webp";
import donnaSummerville from "@assets/teachers/donna.webp";
import annaChitty from "@assets/teachers/anna.webp";
import maryJackson from "@assets/teachers/mary.webp";
import eileenSendry from "@assets/teachers/eileen.webp";
import sharonWheeler from "@assets/teachers/sharon.webp";
import { JumpBar } from "@/components/JumpBar";

const ACCENT = "#C850C0";

function L({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="l2-link">
      {children}
    </a>
  );
}

// ─── Card definitions ────────────────────────────────────────────────────────

interface AboutCard {
  key: string;
  label: string;
  image: string;
}

const ABOUT_CARDS: AboutCard[] = [
  { key: "about-nancy",  label: "About Nancy",        image: nancyJoyImage as string },
  { key: "training",     label: "Training & Education", image: aboutTrainingImage as string },
  { key: "community",    label: "Community & Work",    image: aboutCommunityImage as string },
  { key: "lineage",      label: "Lineage",             image: lineageImage as string },
  { key: "teachers",    label: "Teachers",            image: aboutTeachersImage as string },
];

// ─── Card 1 — flat paragraphs ────────────────────────────────────────────────

const ABOUT_NANCY_PARAGRAPHS = [
  "Nancy Turnquist, C-IAYT, RCST, is a biodynamic craniosacral therapist and yoga therapist with over two decades of experience supporting nervous system regulation, trauma integration, and perinatal care. Her table-based sessions use gentle, listening touch to invite deep rest and re-balancing; when helpful, she adds a brief yoga-therapy assessment with tailored breath and movement practices to extend the work beyond the table. Nancy's training spans Iyengar-based yoga therapeutics, Somatic Practice, Alchemical Alignment, and Pre-/perinatal dynamics, and she has worked extensively with women's health, childbirth, grief and life transitions, and family systems — bringing a grounded, trauma-informed, and community-oriented approach to every client in their connection to themselves, their relations and the world around them.",
  "Nancy helps people listen to themselves and respond to what they're hearing. People come for real things — pain that won't resolve, anxiety that blocks them, preparation for birth, a body that needs help. She works with what you bring and she meets what is ready to happen.",
  "What's different is how she engages. She isn't imposing a protocol or steering you toward outcomes she's decided are right. What she's built — through thousands of hours of lineage training, somatic work, craniosacral therapy, yoga therapeutics, birth support, grief (both lived and listened to), and a poetry and translation practice — is a quality of presence that allows people to hear themselves. She notices what's happening across physical, emotional, and spiritual dimensions and reflects it back so the person can recognize it and respond from their own knowing. Some people come to pursue a thread. Some people need to rest. She has no agenda for which it is. When someone can actually hear themselves clearly, whatever they choose next has integrity — whether it's action or rest.",
  "The modalities are part of the offering — and they're what make the space deep enough to hold whatever walks in.",
];

// ─── Structured content helpers ───────────────────────────────────────────────

interface Section {
  heading: string;
  items: ReactNode[];
  prose?: string[];   // optional prose paragraphs (Lineage card)
  chain?: string;     // optional lineage chain line (Lineage card)
}

function SectionBlock({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <div key={i}>
          <h3 className="l2-subheading">{s.heading}</h3>
          {s.chain && <span className="l2-lineage-chain">{s.chain}</span>}
          {s.prose && s.prose.map((p, j) => (
            <p key={j} className="l2-body">{p}</p>
          ))}
          {s.items.length > 0 && (
            <ul className="l2-list">
              {s.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

// ─── Training & Education ─────────────────────────────────────────────────────

const TRAINING_SECTIONS: Section[] = [
  {
    heading: "Certifications & Credentials",
    items: [
      <><L href="https://www.craniosacraltherapy.org/">RCST</L> — Certified Biodynamic Craniosacral Therapy Practitioner</>,
      <><L href="https://iynaus.org/">C-IYT</L> — Certified Iyengar Yoga Teacher, Junior Intermediate II Level</>,
      <><L href="https://www.iayt.org/">C-IAYT</L> — Certified Yoga Therapist (International Association of Yoga Therapists)</>,
      <>Certified <L href="https://bodyreadymethod.com/">Body Ready Method</L> Professional</>,
      <>Certified <L href="https://www.innatepostpartumcare.com/">INNATE Postpartum Care</L> Practitioner</>,
      <>Reiki Master (<L href="https://ihreiki.com/">International House of Reiki</L>)</>,
      <>The <L href="https://www.lamatrona.com/">Matrona</L> Midwifery Program — Completed</>,
      <>Certified <L href="https://www.positivediscipline.com/">Positive Discipline</L> Classroom Educator</>,
    ],
  },
  {
    heading: "Academic",
    items: [
      <>MA in Literary Translation — <L href="https://www.upf.edu/">Universitat Pompeu Fabra</L>, Barcelona, Spain (2005)</>,
      <>BA in English Literature (Creative Writing) & Spanish Literature — <L href="https://www.kenyon.edu/">Kenyon College</L>, Magna Cum Laude (1998)</>,
      <>Interpretation Certificate — <L href="https://www.umb.edu/">UMass Boston</L> (2000)</>,
      <>Superior Level of Competency in Spanish — <L href="https://www.cervantes.es/">Instituto Cervantes</L></>,
      "Graduate Summer at Universidad Internacional Menendez Pelayo, Santander, Spain (Simmons College), 1999",
      "Junior Year Abroad — Universidad de la Complutense, Madrid, 1996–1997",
    ],
  },
  {
    heading: "Biodynamic Craniosacral Therapy",
    items: [
      <>Biodynamic Craniosacral Therapy Training (700 hours) — <L href="https://www.energyschool.com/">Colorado School of Energy Studies</L> with Anna Chitty, 2022–2024</>,

      "Biodynamic Principles for Professionals Program — CSES, 2022–2023",
      "Intro to BCST — Divine Structure School with Kate Klemer, 2021",
      "Upledger Craniosacral Therapy Foundations, 2009",
      "Weekly craniosacral apprenticeship, 2002–2003",
    ],
  },
  {
    heading: "Somatic Therapy",
    items: [
      "Blueprint Resonance Polarity Coaching — Anna Chitty, CSES, 2023–2024",
      <><L href="https://www.alchemicalalignment.com/">Alchemical Alignment</L> Modules 1–14 — Brigit Viksnins, 2021–2023 (300+ hours, 100 sessions)</>,
      <>Somatics of Common Complex Emotions — <L href="https://somaticpractice.net/">Kathy Kain</L> & Tony Richardson, 2020</>,
      <>Somatic Narrative — <L href="https://somaticpractice.net/">Kathy Kain</L>, 2020</>,
      <>Touch Skills Training — <L href="https://somaticpractice.net/">Kathy Kain</L>, 2018–2019 (three 5-day modules)</>,
      <>Resilience and Self-Regulation — <L href="https://somaticpractice.net/">Kathy Kain</L>, 2018</>,

    ],
  },
  {
    heading: "Yoga Therapy",
    items: [
      <>12+ year apprenticeship/mentorship with <L href="https://www.patriciawaldenyoga.com/">Patricia Walden</L> (assisted 12 hrs/week)</>,
      <>Iyengar Yoga Teacher Training — <L href="https://www.patriciawaldenyoga.com/">Patricia Walden</L>, 2001–2003 (500 hours)</>,
      <>Yoga Therapeutics — <L href="https://www.stephaniequirk.com.au/">Stephanie Quirk</L>, 2010–2013 (500 hours)</>,
      <>3 extended study periods at <L href="https://bksiyengar.com/">RIMYI</L>, Pune, India with BKS Iyengar, Geeta Iyengar, and Prashant Iyengar</>,

      "RIMYI Medical Class Assistant, Pune, India (2010, 2011, 2012)",
      <>~20 weeklong retreats with <L href="https://www.patriciawaldenyoga.com/">Patricia Walden</L></>,
      <>~6 weeklong intensives with Manouso Manos</>,
      <>~40 single day or weekend workshops with <L href="https://www.patriciawaldenyoga.com/">Patricia Walden</L></>,
      <>5 Iyengar Assessment preparation courses with <L href="https://www.patriciawaldenyoga.com/">Patricia Walden</L> and Joan White</>,
      <>Attended 4 <L href="https://iynaus.org/">IYNAUS</L> national conferences (one with Geeta Iyengar)</>,
      "Attended AEYI Conference, Spain, 2005",
    ],
  },
  {
    heading: "Teaching & Mentoring",
    items: [
      "Faculty on BKS Iyengar Yogamala Teacher Training",
      <>Official <L href="https://iynaus.org/">IYNAUS</L> recommending teacher and mentor of students preparing for Introductory CIYT Assessment</>,
      <>Assisted <L href="https://www.patriciawaldenyoga.com/">Patricia Walden</L>'s two-year teacher training; mentor to aspiring teachers</>,
      "Taught 5–7 group yoga therapy classes/week for ~15 years (15–20 students per class)",
      "5–10 private yoga therapy clients/week",
      "1–2 children/youth classes per week",
    ],
  },
  {
    heading: "Pre- and Perinatal & Birth",
    items: [
      <><L href="https://castellinotraining.com/">Castellino</L> Prenatal and Birth Therapy Training (T17) — Mary Jackson & Tara Blasco, 2024–ongoing (400+ hours)</>,
      "Sequencing Imprints — Mary Jackson & Tara Blasco, 2022",
      "Foundations in Prenatal and Perinatal Dynamics, 2021",
      <><L href="https://bodyreadymethod.com/">Body Ready Method</L> Training — Lindsay McCoy, 2021–2022</>,
      <>Matrona Midwifery Training, 2021–2022 (226 hours coursework + 144 hours study group)</>,
      <>Holistic Doula Training — <L href="https://www.lamatrona.com/">La Matrona</L>, 2020</>,
      <><L href="https://www.innatepostpartumcare.com/">Innate Postpartum Care</L> Doula Training, 2020</>,
      "Womb Surround Process Workshop with Frank Carbone (BEBA), October 2023",
      "Developmental Primitive Reflexes with Kimberly Clark OT, BCST, 2022–2023",
      "The Rainbow Bridge Continuum with Moriah Melin, 2021",
      "Matriz y Concha — traditional women's health care and the art of the sobada, 2020",
    ],
  },
  {
    heading: "Energy Work & Complementary",
    items: [
      <>Reiki Master — <L href="https://ihreiki.com/">International House of Reiki</L> (Shoden, Okuden, Shinpiden), 2010–2012</>,

      "Jin Shin Jyutsu Foundations — Jed Schwartz, 2012",
      "Introduction to Spiritual Healing & Advanced Spiritual Healing — Rosita Arvigo, 2009–2010",
      "American Folk Herbal Studies — Gaia School of Healing, 2008–2011 (250 hours)",
      "Reiki 1–2 — John Harvey Grey Institute",
      "Mayan Abdominal Massage — Arvigo Institute, 2008",
    ],
  },
];

// ─── Community & Work ─────────────────────────────────────────────────────────

const COMMUNITY_SECTIONS: Section[] = [
  {
    heading: "Professional Practice",
    items: [
      "Somatic Therapist, Private Practice — Cambridge, MA, 2014–present",
      "Doula and Birth Support Specialist — Cambridge, MA, 2002–present",
      "Yoga Therapy Practitioner — Cambridge, MA, 2000–present",
      "Student Experience & Logistics Coordinator — Colorado School of Energy Studies & Alchemical Alignment, 2021–present",
      "Co-Manager and Teacher — BKS Iyengar Yogamala, Boston, MA, 2006–2013",
      <>Founder & Community Engagement Lead — Dandelion Montessori / <L href="https://wildflowerschools.org/">Wildflower Network</L>, Cambridge, MA, 2015–2018</>,
      "Spanish-English Interpreter — Freelance, Barcelona & Cambridge, 2000–2006",
      <>Middle & High School Spanish Teacher — Concord Middle School, <L href="https://www.pingree.org/">The Pingree School</L>, 1998–2001</>,
    ],
  },
  {
    heading: "Community & Volunteer",
    items: [
      "Co-Facilitator: Monthly Support Group for Self-Awareness, Meditation & Relational Skills — ongoing",
      <>Founding Board Member and Clerk Secretary — <L href="https://iyane.org/">IYANE</L> (Iyengar Yoga Association of New England), 2009–2011</>,
      <>Yoga for At-Risk Moms — <L href="https://www.riversidecc.org/">Riverside Community Care</L>, 2008–2010</>,
      "Volunteer Yoga Teacher — YMCA Charlestown to Latina Youth, 1999–2000",
      "Regular attendance at Relationship and Grief Rituals with Sobonfu Somé, 2006–2017",
      "American Folk Herbal Studies and Apprenticeship — Gaia School of Healing, 2008–2011",
      "Northeast Montessori Classroom Assistant Training, 2015",
      "Advanced Assistant Training, 2017",
      <>Certified <L href="https://www.positivediscipline.com/">Positive Discipline</L> Classroom Educator, 2016</>,
    ],
  },
  {
    heading: "Presentation & Publication",
    items: [      <><L href="https://iynaus.org/">IYNAUS</L>'s First Regional Conference, Shining Light on New England — Presenter, October 16–18, 2009, Providence, RI</>,      <><L href="https://pubmed.ncbi.nlm.nih.gov/20722471/">Recognized contributor</L>: “Effects of Yoga Versus Walking on Mood, Anxiety, and Brain GABA Levels: A Randomized Controlled MRS Study.” The Journal of Alternative and Complementary Medicine, Volume 16, Number 11, 2010.</>,
    ],
  },
];

// ─── Lineage ──────────────────────────────────────────────────────────────────

const LINEAGE_SECTIONS: Section[] = [
  {
    heading: "Iyengar Yoga",
    chain: "Krishnamacharya → BKS Iyengar → Geeta & Prashant Iyengar → Patricia Walden + Stephanie Quirk → Nancy",
    items: [],
    prose: [
      "Krishnamacharya is often called the father of modern yoga. BKS Iyengar, who came to his teacher as a sick teenager, spent seventy-five years refining the practice into a method of extraordinary precision. Patricia Walden met Iyengar in 1976 and has returned to Pune every year since — one of his most senior students worldwide. Stephanie Quirk lived and studied at RIMYI for twenty years and became the foremost teacher of Iyengar yoga therapeutics.",
      "Nancy entered this lineage through both Patricia and Stephanie. She trained with Patricia from 2001 to 2003 and then continued as her assistant for twelve years. She completed five hundred hours of therapeutic training with Stephanie. She also went to the source: three extended study periods at RIMYI with BKS, Geeta, and Prashant Iyengar.",
      "What Nancy carries: the understanding that the body responds to precision. That a single posture, held with the right support, can reorganize the relationship between structure and breath, between bone and nerve.",
    ],
  },
  {
    heading: "Biodynamic Craniosacral Therapy",
    chain: "Andrew Taylor Still → William Garner Sutherland → Harold Magoun → Franklyn Sills → Anna & John Chitty (CSES) → Elizabeth Chitty Sandoval → Nancy",
    items: [],
    prose: [
      "Andrew Taylor Still, a frontier physician who lost three children to spinal meningitis, founded osteopathy in 1874. His student William Garner Sutherland discovered that the cranial bones have subtle, rhythmic motion. Over generations, practitioners moved from mechanical manipulation toward listening — the biodynamic approach. Anna and John Chitty founded the Colorado School of Energy Studies in 1992 and built one of the most respected BCST training programs in North America.",
      "Nancy completed the full BCST training with Anna — seven hundred hours — and the Blueprint Resonance Polarity Coaching program.",
      "What Nancy carries: the capacity to perceive the subtle rhythms that organize the body beneath muscular movement, beneath the breath. The understanding that health is already present in the system and the practitioner's job is to listen for it.",
    ],
  },
  {
    heading: "Somatic Practice and Trauma Resolution",
    chain: "Wilhelm Reich + Elsa Gindler → Charlotte Selver → Peter Levine (+ Porges, + Gendlin) → Kathy Kain + Steve Terrell → Nancy",
    items: [],
    prose: [
      "The roots of somatic trauma work reach back to Wilhelm Reich, who first proposed that unresolved emotion is held in the body as muscular tension, and to Elsa Gindler, whose sensory awareness practice influenced an entire generation of body-oriented therapists. Peter Levine developed Somatic Experiencing from the observation that traumatic stress lives in the body as an incomplete physiological response.",
      "Kathy Kain, a senior trainer in Somatic Experiencing with over 40 years of practice, developed Touch Skills and Somatic Narrative — approaches that bring precise, co-regulating touch to trauma resolution work. Nancy trained directly with Kathy across multiple programs.",
      "What Nancy carries: the ability to meet the body's held material without overwhelming it. The understanding that trauma resolution happens through the body, not around it.",
    ],
  },
  {
    heading: "Pre- and Perinatal Psychology",
    chain: "Randolph Stone → Ray Castellino → Mary Jackson + Tara Blasco → Nancy",
    items: [],
    prose: [
      "Randolph Stone, the founder of Polarity Therapy, was among the first to recognize that patterns from conception, gestation, and birth shape lifelong health. Ray Castellino built on this work to develop a comprehensive approach to prenatal and birth therapy. After Castellino's death in 2020, Mary Jackson and Tara Blasco continued the Foundation Training.",
      "Nancy is currently in the Castellino Foundation Training (T17) with Mary.",
      "What Nancy carries: the understanding that how we arrived shapes how we live. That patterns from our earliest experiences can be met and reorganized through somatic presence.",
    ],
  },
  {
    heading: "Dagara Grief Ritual",
    chain: "Dagara people of Burkina Faso → Sobonfu Somé → Nancy",
    items: [],
    prose: [
      "The Dagara people of West Africa maintain a tradition of communal grief ritual that has no equivalent in modern Western culture. Sobonfu Somé brought this practice to the West, teaching for decades and offering grief and relationship rituals across the United States and Europe.",
      "Nancy attended grief and relationship rituals with Sobonfu for eleven years, from 2006 until Sobonfu's death on January 14, 2017 — the first anniversary of Nancy's daughter Ada's death. Sobonfu performed a private healing ritual for Nancy that day.",
      "What Nancy carries: everything about how she holds grief. The understanding that grief is not a problem to solve but a relationship with what you love. That it is cyclical, not linear. That it belongs to the community.",
    ],
  },
  {
    heading: "Wild Feminine and Holistic Pelvic Care",
    chain: "Tami Lynn Kent → Nancy",
    items: [],
    prose: [
      "Tami Lynn Kent is a holistic pelvic care practitioner and author of Wild Feminine and Wild Creative. Her work reclaims the female pelvis as the creative and energetic center of a woman's body.",
      "What Nancy carries: the understanding that the female body's creative intelligence is not separate from its healing intelligence.",
    ],
  },
  {
    heading: "Maya Healing and Spiritual Practice",
    chain: "Maya healing traditions → Don Elijio Panti + Hortense Robinson → Rosita Arvigo → Nancy",
    items: [],
    prose: [
      "The Maya healing traditions of Central America are thousands of years old. Don Elijio Panti, a Maya shaman in Belize, carried this knowledge into the twentieth century. Rosita Arvigo apprenticed with both Don Elijio and Hortense Robinson and developed the Arvigo Techniques of Maya Abdominal Therapy.",
      "Nancy trained with Rosita in both spiritual healing and Mayan abdominal massage.",
      "What Nancy carries: the understanding that physical touch and spiritual practice are not separate activities. That healing involves dimensions of a person's life that modern medicine does not have language for.",
    ],
  },
];

// ─── Teachers gallery ────────────────────────────────────────────────────────────

const TEACHERS = [
  { name: "Sobonfu Som\u00e9",      image: sobonfu as string },
  { name: "Patricia Walden",   image: patriciaWalden as string },
  { name: "BKS Iyengar",       image: bksIyengar as string },
  { name: "Rosita Arvigo",     image: rositaArvigo as string },
  { name: "Donna Summerville", image: donnaSummerville as string },
  { name: "Anna Chitty",       image: annaChitty as string },
  { name: "Mary Jackson",      image: maryJackson as string },
  { name: "Eileen Sendry",     image: eileenSendry as string },
  { name: "Sharon Wheeler",    image: sharonWheeler as string },
];

interface LightboxState { image: string; name: string; }

function TeacherGallery() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <div className="l2-teacher-grid">
        {TEACHERS.map((t) => (
          <div
            key={t.name}
            className="l2-teacher-item"
            onClick={() => setLightbox({ image: t.image, name: t.name })}
          >
            <img src={t.image} alt={t.name} />
            <p className="l2-meta">{t.name}</p>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <img
            src={lightbox.image}
            alt={lightbox.name}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 8,
              display: "block",
            }}
          />
          <p style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 16,
            color: "#ffffff",
            marginTop: 16,
            textAlign: "center",
          }}>
            {lightbox.name}
          </p>
        </div>
      )}
    </>
  );
}

// ─── Detail renderer ──────────────────────────────────────────────────────────

function renderDesktopDetail(key: string): ReactNode {
  switch (key) {
    case "about-nancy":
      return (
        <>
          <h2 className="l2-detail-heading">About Nancy</h2>
          <hr className="l2-divider" />
          {ABOUT_NANCY_PARAGRAPHS.map((p, i) => (
            <p key={i} className="l2-body">{p}</p>
          ))}
        </>
      );
    case "training":
      return (
        <>
          <h2 className="l2-detail-heading">Training & Education</h2>
          <hr className="l2-divider" />
          <SectionBlock sections={TRAINING_SECTIONS} />
        </>
      );
    case "community":
      return (
        <>
          <h2 className="l2-detail-heading">Community & Work</h2>
          <hr className="l2-divider" />
          <SectionBlock sections={COMMUNITY_SECTIONS} />
        </>
      );
    case "lineage":
      return (
        <>
          <h2 className="l2-detail-heading">Lineage</h2>
          <hr className="l2-divider" />
          <p className="l2-body">Nancy’s work does not come from one place. It comes from many streams — each carried by people who gave their lives to understanding something true about the body, the breath, the spirit, or the conditions under which healing happens. She did not assemble these traditions like a curriculum. She followed what she needed to learn, and each teacher led her to the next.</p>
          <p className="l2-body">Lineage matters to Nancy because it is how this kind of knowledge actually moves — not through textbooks or certifications, but through relationship. A teacher works with you, sees you, corrects you, and transmits something that cannot be written down. You learn by being in the room. What Nancy carries from her teachers is not technique alone — it is their attention, their way of seeing, their understanding of what it means to be with another person in difficulty. She holds this with deep gratitude for the teachers and ancestors who shaped it, and with the humility to know that what she offers was built by many hands across many lifetimes before it reached hers.</p>
          <SectionBlock sections={LINEAGE_SECTIONS} />
        </>
      );
    case "teachers":
      return (
        <>
          <h2 className="l2-detail-heading">Teachers</h2>
          <hr className="l2-divider" />
          <TeacherGallery />
        </>
      );
    default:
      return null;
  }
}

function renderMobileDetail(key: string): ReactNode {
  switch (key) {
    case "about-nancy":
      return (
        <>
          <h2 className="l2-mobile-heading">About Nancy</h2>
          {ABOUT_NANCY_PARAGRAPHS.map((p, i) => (
            <p key={i} className="l2-mobile-body">{p}</p>
          ))}
        </>
      );
    case "training":
      return (
        <>
          <h2 className="l2-mobile-heading">Training & Education</h2>
          <SectionBlock sections={TRAINING_SECTIONS} />
        </>
      );
    case "community":
      return (
        <>
          <h2 className="l2-mobile-heading">Community & Work</h2>
          <SectionBlock sections={COMMUNITY_SECTIONS} />
        </>
      );
    case "lineage":
      return (
        <>
          <h2 className="l2-mobile-heading">Lineage</h2>
          <p className="l2-mobile-body">Nancy’s work does not come from one place. It comes from many streams — each carried by people who gave their lives to understanding something true about the body, the breath, the spirit, or the conditions under which healing happens. She did not assemble these traditions like a curriculum. She followed what she needed to learn, and each teacher led her to the next.</p>
          <p className="l2-mobile-body">Lineage matters to Nancy because it is how this kind of knowledge actually moves — not through textbooks or certifications, but through relationship. A teacher works with you, sees you, corrects you, and transmits something that cannot be written down. You learn by being in the room. What Nancy carries from her teachers is not technique alone — it is their attention, their way of seeing, their understanding of what it means to be with another person in difficulty. She holds this with deep gratitude for the teachers and ancestors who shaped it, and with the humility to know that what she offers was built by many hands across many lifetimes before it reached hers.</p>
          <SectionBlock sections={LINEAGE_SECTIONS} />
        </>
      );
    case "teachers":
      return (
        <>
          <h2 className="l2-mobile-heading">Teachers</h2>
          <TeacherGallery />
        </>
      );
    default:
      return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [selectedCard, setSelectedCard] = useState<string>("about-nancy");

  const selectAndScroll = (key: string) => {
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
          items={ABOUT_CARDS.map((c) => ({ id: c.key, label: c.label }))}
          selectedId={selectedCard}
          onSelect={selectAndScroll}
        />
        <div className="l2-layout">
          {/* Card column */}
          <div className="l2-card-col">
            {ABOUT_CARDS.map(({ key, label, image }) => {
              const isActive = selectedCard === key;

              return (
                <div key={key} id={key} className="l2-card" style={{ marginBottom: 8 }}>
                  {/* Card */}
                  <div
                    onClick={() => selectAndScroll(key)}
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
                    {/* Image sliver */}
                    <div
                      style={{
                        maxHeight: isActive ? 600 : 4,
                        overflow: "hidden",
                        transition: "max-height 300ms ease",
                      }}
                    >
                      <img
                        src={image}
                        alt={label}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
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

