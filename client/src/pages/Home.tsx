import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NetworkGraph } from "@/components/NetworkGraph";
import { ServicePanel } from "@/components/ServicePanel";
import type { ServiceInfo } from "@/lib/services";
import { SERVICES, portraitImage } from "@/lib/services";
import bgVideo from "@assets/background-mobile.mp4";
import nancyJoyImage from "@assets/nancy-joy.webp";

const SUBTITLE = "Healing with Presence";

const SERVICE_NAMES = SERVICES.map((s) => s.name);
const SERVICE_IMAGES = SERVICES.map((s) => (s.hexImage ?? s.image) ?? portraitImage);
const SERVICE_IMAGE_SCALES = SERVICES.map((s) => s.imageScale);
const SERVICE_IMAGE_POSITIONS = SERVICES.map((s) => s.imagePosition);

function MobileServiceContent({ activeService, isCenterActive, services }: { activeService: string | null; isCenterActive: boolean; services: ServiceInfo[] }) {
  if (isCenterActive && !activeService) {
    return (
      <div>
        <h2 className="text-xl font-light text-primary mb-2 leading-snug">Healing with Presence</h2>
        <div className="h-px w-12 bg-primary/20 mb-3" />
        <p className="text-muted-foreground font-light leading-relaxed text-sm">
          I work with the body's own capacity to heal. Through gentle hands-on work, somatic awareness, and deep listening, I help people find relief from pain, resolve held stress and trauma, prepare for birth, and navigate life's most difficult transitions. Sessions are 60–90 minutes, in person in Cambridge, MA or online. You don't need to know what you need — that's my job.
        </p>
      </div>
    );
  }
  const active = services.find((s) => s.name === activeService);
  if (!active) return null;
  return (
    <div>
      <h2 className="text-xl font-light text-primary mb-2 leading-snug">
        {active.label}
      </h2>
      <div className="h-px w-12 bg-primary/20 mb-3" />
      <p className="text-muted-foreground font-light leading-relaxed text-sm">
        {active.description}
      </p>
    </div>
  );
}

// ─── L1 Panel content components ─────────────────────────────────────────────

function AboutContent() {
  return (
    <>
      <img
        src={nancyJoyImage}
        alt="Nancy Turnquist"
        style={{ borderRadius: 12, maxWidth: '100%', marginBottom: 16 }}
      />
      <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 400 }}>
        Nancy Turnquist is a somatic therapist, craniosacral practitioner, yoga therapist, and birth support specialist in Cambridge, MA. She has been in practice since 2000, with training spanning Iyengar yoga therapeutics, biodynamic craniosacral therapy, somatic trauma resolution, and pre- and perinatal psychology. She studied at the Iyengar Institute in Pune, India, trained with some of the leading practitioners in each of her fields, and brings over two decades of hands-on experience to every session. She also speaks fluent Spanish and works with Spanish-speaking clients.
      </p>
    </>
  );
}

function SessionsContent() {
  const handleEmailClick = () => {
    const user = 'nancyturnquist';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <>
      <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 400 }}>
        You don't need to know which modality is right for you. That's my job.
      </p>
      <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80 mt-3" style={{ fontWeight: 400 }}>
        Sessions are 60–90 minutes, in person at Nancy's treatment space in Cambridge, MA or online. Most work happens on a massage table, where you remain fully clothed, using gentle, listening touch — though sessions may also include seated or standing work, breath, and movement. Online sessions are especially effective for somatic and pre- and perinatal work. Some people come weekly, some come when something is up. There's no prescribed schedule.
      </p>

      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginTop: 24, marginBottom: 8, color: '#1a1a1a' }}>
        New Client Forms
      </h3>
      <div className="h-px w-12 mb-3" style={{ background: '#C850C0' }} />
      <p className="text-[0.9rem] opacity-80 mb-3" style={{ fontWeight: 400 }}>
        After your initial conversation with Nancy, new clients are asked to complete an intake form before the first session.
      </p>
      <div className="flex flex-col gap-1">
        <a href="#" style={{ color: '#C850C0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Client Intake &amp; Consent Form</a>
        <a href="#" style={{ color: '#C850C0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Adult Release of Liability &amp; Informed Consent</a>
        <a href="#" style={{ color: '#C850C0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Minor Release of Liability &amp; Informed Consent</a>
      </div>

      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginTop: 24, marginBottom: 8, color: '#1a1a1a' }}>
        Contact
      </h3>
      <div className="h-px w-12 mb-3" style={{ background: '#C850C0' }} />
      <div className="flex flex-col gap-1.5 text-[0.9rem]" style={{ fontWeight: 400 }}>
        <a href="tel:6179020849" style={{ color: '#C850C0', textDecoration: 'none' }}>(617) 902-0849</a>
        <button
          onClick={handleEmailClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#C850C0', fontSize: '0.9rem', fontWeight: 500 }}
        >
          Email Nancy
        </button>
        <span style={{ color: '#5a5a60' }}>In person: Cambridge, MA</span>
        <span style={{ color: '#5a5a60' }}>Online: Everywhere</span>
      </div>
    </>
  );
}

interface MentorItem { name: string; href?: string; body: string; }
interface ResourceLinkItem { name: string; href: string; description: string; }
interface ResourceGroupItem { heading: string; links: ResourceLinkItem[]; }

const L1_MENTORS: MentorItem[] = [
  { name: "Sobonfu Somé (1960–2017)", href: "https://www.sobonfu.com", body: "West African teacher of grief ritual, relationship, and community. Nancy attended grief and relationship rituals with Sobonfu from 2006 until her death. Sobonfu performed a private healing ritual for Nancy on the first anniversary of her daughter Ada's death. This lineage of communal grief work — the understanding that grief needs ritual, that it is inseparable from love, that it belongs to the community and not just the individual — runs through everything Nancy does." },
  { name: "Anna Chitty", href: "https://www.energyschool.com/about", body: "Nancy's BCST and Blueprint Resonance teacher. Founder of the Colorado School of Energy Studies with her late husband John. Lifetime Achievement Award from the Biodynamic Craniosacral Therapy Association of North America. Over 40 years at the intersection of craniosacral therapy, polarity, and somatic work." },
  { name: "Mary Jackson", href: "https://birthinconnection.com/", body: "Home birth midwife since 1975. Over 2,500 births. Co-teacher of the Castellino Foundation Training. Integrated PPN and craniosacral work into her midwifery practice." },
  { name: "Kathy Kain", href: "https://somaticpractice.net/", body: "Nancy's foundational somatic teacher. Senior trainer in Somatic Experiencing. Over 40 years practicing and teaching bodywork and trauma recovery. Author of Nurturing Resilience and The Tao of Trauma." },
  { name: "Patricia Walden", href: "https://www.patriciawaldenyoga.com/", body: "Nancy's yoga teacher for over twelve years. One of BKS Iyengar's most senior students worldwide. Nancy assisted Patricia 2–3 times per week, learning hands-on adjustment, nervous system tracking, and the depth of the Iyengar therapeutic tradition through daily practice and feedback." },
  { name: "BKS Iyengar (1918–2014)", href: "https://bksiyengar.com/", body: "Founder of Iyengar yoga. Nancy studied directly with him and his children Geeta and Prashant at the Ramamani Iyengar Memorial Yoga Institute in Pune, India." },
  { name: "Tami Lynn Kent", href: "https://www.wildfeminine.com/", body: "Author of Wild Feminine and Wild Creative. Holistic pelvic care practitioner whose work on the female body as a creative center informs Nancy's approach to birth, postpartum, and women's health." },
  { name: "Rosita Arvigo", href: "https://rositaarvigo.com/", body: "Naprapathic physician, herbalist, founder of the Arvigo Techniques of Maya Abdominal Therapy. Nancy trained in both spiritual healing and abdominal massage with Rosita." },
];

const L1_RESOURCE_GROUPS: ResourceGroupItem[] = [
  { heading: "Craniosacral Therapy", links: [
    { name: "Biodynamic Craniosacral Therapy Association of North America", href: "https://www.craniosacraltherapy.org/", description: "professional association and practitioner directory" },
    { name: "Colorado School of Energy Studies", href: "https://www.energyschool.com/", description: "BCST, polarity, and verbal skills training; articles and handouts freely available" },
  ]},
  { heading: "Somatic Therapy", links: [
    { name: "Somatic Practice — Kathy Kain", href: "https://somaticpractice.net/", description: "training in touch for trauma resolution" },
    { name: "Co-Regulating Touch Directory", href: "https://coregulatingtouch.com/", description: "practitioner directory for co-regulating touch approaches" },
  ]},
  { heading: "Yoga", links: [
    { name: "IYNAUS", href: "https://iynaus.org/", description: "Iyengar Yoga National Association of the United States — national association, teacher directory, certification" },
    { name: "International Association of Yoga Therapists (IAYT)", href: "https://www.iayt.org/", description: "credentialing body for yoga therapy" },
  ]},
  { heading: "Pre- & Perinatal", links: [
    { name: "Castellino Training", href: "https://castellinotraining.com/", description: "prenatal and birth therapy training" },
    { name: "BEBA", href: "https://beba.org/", description: "Building and Enhancing Bonding and Attachment — family clinic for prenatal, birth, and early trauma" },
    { name: "APPPAH", href: "https://birthpsychology.com/", description: "Association for Prenatal and Perinatal Psychology and Health — professional association for the PPN field" },
  ]},
  { heading: "Birth & Postpartum", links: [
    { name: "Body Ready Method", href: "https://bodyreadymethod.com/", description: "evidence-based preparation for birth" },
    { name: "La Matrona", href: "https://www.lamatrona.com/", description: "holistic doula and midwifery training" },
    { name: "Innate Postpartum Care", href: "https://www.innatepostpartumcare.com/", description: "fourth-trimester support model" },
  ]},
];

function ResourcesContent() {
  return (
    <>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, marginBottom: 8, color: '#1a1a1a' }}>Mentors</h3>
      <div className="h-px w-12 mb-3" style={{ background: '#C850C0' }} />
      <p className="text-[0.9rem] opacity-80 mb-4" style={{ fontWeight: 400 }}>
        These people shaped me. Everything I offer was first offered to me — through their hands, their attention, their willingness to teach. I carry their work with gratitude.
      </p>
      {L1_MENTORS.map((m) => (
        <div key={m.name} style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>
            {m.href
              ? <a href={m.href} target="_blank" rel="noopener noreferrer" style={{ color: '#C850C0', textDecoration: 'none' }}>{m.name}</a>
              : <span style={{ color: '#C850C0' }}>{m.name}</span>
            }
          </p>
          <p className="text-[0.85rem] opacity-80" style={{ fontWeight: 400 }}>{m.body}</p>
        </div>
      ))}

      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, marginTop: 8, marginBottom: 8, color: '#1a1a1a' }}>Resources</h3>
      <div className="h-px w-12 mb-3" style={{ background: '#C850C0' }} />
      {L1_RESOURCE_GROUPS.map((group) => (
        <div key={group.heading} style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#1a1a1a' }}>{group.heading}</p>
          {group.links.map((link) => (
            <p key={link.href} className="text-[0.85rem] opacity-80 mb-2" style={{ fontWeight: 400 }}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: '#C850C0', textDecoration: 'none' }}>{link.name}</a>
              {" — "}
              {link.description}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isCenterActive, setIsCenterActive] = useState(false);
  const [activeView, setActiveView] = useState<'practice' | 'about' | 'sessions' | 'resources'>('practice');

  const effectiveService = selectedNode ?? hoveredNode;

  const handleNodeHover = (service: string | null) => {
    setHoveredNode(service);
    if (service) setActiveView('practice');
  };
  const handleNodeSelect = (service: string) => {
    setSelectedNode((prev) => (prev === service ? null : service));
    setIsCenterActive(false);
    setActiveView('practice');
    setTimeout(() => panelAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  const handleCenterClick = () => {
    setIsCenterActive(true);
    setSelectedNode(null);
    setHoveredNode(null);
    setTimeout(() => panelAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  const handleCenterHover = (hovered: boolean) => {
    if (hovered) {
      setHoveredNode(null);
      setSelectedNode(null);
    }
  };
  const handleBackgroundClick = () => {
    setHoveredNode(null);
    setSelectedNode(null);
    setIsCenterActive(false);
    setActiveView('practice');
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const panDirRef = useRef<1 | -1>(1);
  const panYRef = useRef(5);
  const rafRef = useRef<number | null>(null);
  const panelAnchorRef = useRef<HTMLDivElement>(null);

  // Native playback — smooth GPU-composited rendering
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.25;
    video.play().catch(() => {});
    return () => { video.pause(); };
  }, []);

  // Vertical pan via object-position
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const PAN_SPEED = 0.018;
    const PAN_MIN = 5;
    const PAN_MAX = 45;
    let lastTime: number | null = null;

    const tick = (now: number) => {
      if (lastTime !== null) {
        const delta = (now - lastTime) / 1000;
        const nextPan = panYRef.current + delta * PAN_SPEED * (PAN_MAX - PAN_MIN) * panDirRef.current;
        if (nextPan >= PAN_MAX) {
          panYRef.current = PAN_MAX;
          panDirRef.current = -1;
        } else if (nextPan <= PAN_MIN) {
          panYRef.current = PAN_MIN;
          panDirRef.current = 1;
        } else {
          panYRef.current = nextPan;
        }
        video.style.objectPosition = `center ${panYRef.current}%`;
      }
      lastTime = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="h-screen relative selection:bg-primary/10 flex flex-col overflow-hidden" style={{ background: '#051a1c' }} onClick={handleBackgroundClick}>

      {/* Background Video — cropped top 5% to hide watermark */}
      <div className="fixed inset-0 z-0 overflow-hidden" style={{ top: '-5vh' }}>
        <video
          ref={videoRef}
          src={bgVideo}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.22, objectPosition: 'center 10%' }}
        />
      </div>

      {/* Light aqua-turquoise wash */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ background: 'rgba(0, 195, 195, 0.56)' }} />

      {/* ───── Header + Nav ───── */}
      <div className="relative z-30 w-full flex flex-col items-center pt-3 md:pt-4 pb-3 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-stretch w-fit gap-1.5">
          <header className="text-center space-y-2 md:space-y-3 px-6 py-3 md:px-8 md:py-5 rounded-xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight">
              Nancy Turnquist
            </h1>
            <div className="h-px w-20 mx-auto" style={{ background: '#C850C0' }} />
            <p className="text-sm md:text-lg font-light opacity-75">
              {SUBTITLE}
            </p>
          </header>
          <nav className="flex items-center justify-center gap-4 md:gap-6 px-5 py-2 rounded-lg" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            {(['practice', 'about', 'sessions', 'resources'] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setActiveView(v);
                  setHoveredNode(null);
                  setSelectedNode(null);
                  setIsCenterActive(false);
                }}
                className={`text-xs md:text-sm transition-colors tracking-wide uppercase ${activeView === v ? 'font-normal' : 'font-medium text-primary/50 hover:text-primary/80'}`}
                style={activeView === v ? { color: '#C850C0' } : {}}
              >
                {v === 'practice' ? 'Offerings' : v === 'sessions' ? 'Sessions' : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ───── Main Content ───── */}
      <div className="relative z-20 flex-1 min-h-0 w-full px-4 md:px-8 lg:px-12">

        {/* Desktop: graph always left, right panel fades between views */}
        <div className="hidden md:flex flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-6xl mx-auto h-full">
          <div className="w-1/2 shrink-0" style={{ maxWidth: '520px' }}>
            <NetworkGraph
              services={SERVICE_NAMES}
              image={portraitImage}
              images={SERVICE_IMAGES}
              imageScales={SERVICE_IMAGE_SCALES}
              imagePositions={SERVICE_IMAGE_POSITIONS}
              activeService={effectiveService}
              selectedService={selectedNode}
              isCenterActive={isCenterActive}
              onActiveChange={handleNodeHover}
              onSelectChange={handleNodeSelect}
              onCenterClick={handleCenterClick}
              onCenterHover={handleCenterHover}
            />
          </div>
          <div className="w-1/2 max-w-md" onClick={e => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              {activeView === 'practice' && (
                <motion.div
                  key="view-services"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ServicePanel activeService={effectiveService} isCenterActive={isCenterActive} services={SERVICES} />
                </motion.div>
              )}
              {activeView === 'about' && (
                <motion.div
                  key="view-about"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a', overflowY: 'auto', maxHeight: '520px' }}>
                    <h2 className="text-2xl md:text-3xl font-light mb-3">About Nancy</h2>
                    <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
                    <AboutContent />
                  </div>
                </motion.div>
              )}
              {activeView === 'sessions' && (
                <motion.div
                  key="view-sessions"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a', overflowY: 'auto', maxHeight: '520px' }}>
                    <h2 className="text-2xl md:text-3xl font-light mb-3">Working Together</h2>
                    <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
                    <SessionsContent />
                  </div>
                </motion.div>
              )}
              {activeView === 'resources' && (
                <motion.div
                  key="view-resources"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a', overflowY: 'auto', maxHeight: '520px' }}>
                    <h2 className="text-2xl md:text-3xl font-light mb-3">Resources</h2>
                    <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
                    <ResourcesContent />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: content area fades between views */}
        <div className="flex md:hidden flex-col items-center overflow-y-auto h-full pt-6">
          <AnimatePresence mode="wait">
            {activeView === 'practice' && (
              <motion.div
                key="m-practice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full flex flex-col pb-6"
                style={{ maxWidth: '400px' }}
              >
                {/* Hexagon — fixed height so it's always fully visible; extra 56px clears the bottom node */}
                <div style={{ height: 'min(58svh, 436px)', flexShrink: 0, width: '100%', paddingLeft: 8, paddingRight: 8 }}>
                  <NetworkGraph
                    services={SERVICE_NAMES}
                    image={portraitImage}
                    images={SERVICE_IMAGES}
                    imageScales={SERVICE_IMAGE_SCALES}
                    imagePositions={SERVICE_IMAGE_POSITIONS}
                    activeService={effectiveService}
                    selectedService={selectedNode}
                    isCenterActive={isCenterActive}
                    onActiveChange={handleNodeHover}
                    onSelectChange={handleNodeSelect}
                    onCenterClick={handleCenterClick}
                    onCenterHover={handleCenterHover}
                  />
                </div>
                {/* Scroll anchor — sits right below hexagon so nodes snap panel to top */}
                <div ref={panelAnchorRef} />
                {/* Offerings quick-select bar — only when a service is active */}
                {(!!effectiveService || isCenterActive) && <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '0 4px', borderBottom: '1px solid rgba(255,255,255,0.18)', marginBottom: 4 }}>
                  {([
                    { name: "__center__",                     short: "Presence" },
                    { name: "Biodynamic Craniosacral Therapy", short: "BCST" },
                    { name: "Somatic\nTherapy",               short: "Somatics" },
                    { name: "Yoga Therapy",                   short: "Yoga" },
                    { name: "Pre- & Perinatal\nPsychology",  short: "PPN" },
                    { name: "Birth, Babies &\nPostpartum",    short: "Birth" },
                    { name: "Grief &\nTransitions",          short: "Life" },
                  ] as { name: string; short: string }[]).map(({ name, short }) => (
                    <button
                      key={name}
                      onClick={e => { e.stopPropagation(); name === "__center__" ? handleCenterClick() : handleNodeSelect(name); }}
                      style={{
                        flex: '1 1 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 2px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 10,
                        fontWeight: 500,
                        textAlign: 'center',
                        color: (name === "__center__" ? isCenterActive : selectedNode === name) ? '#C850C0' : 'rgba(255,255,255,0.75)',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {short}
                    </button>
                  ))}
                </div>}
                {/* Content panel appears below the hexagon, not over it */}
                <AnimatePresence>
                  {(!!effectiveService || isCenterActive) && (
                    <motion.div
                      key="m-practice-panel"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full rounded-2xl px-5 pt-4 pb-6 mt-4"
                      style={{ background: 'rgba(170, 185, 240, 0.78)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', minHeight: 180 }}
                      onClick={e => e.stopPropagation()}
                    >
                      <MobileServiceContent activeService={effectiveService} isCenterActive={isCenterActive} services={SERVICES} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            {activeView === 'about' && (
              <motion.div
                key="m-about"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full px-2"
              >
                <div className="rounded-2xl px-5 py-6" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }} onClick={e => e.stopPropagation()}>
                  <h2 className="text-xl font-light mb-2">About Nancy</h2>
                  <div className="h-px w-12 mb-4" style={{ background: '#C850C0' }} />
                  <AboutContent />
                </div>
              </motion.div>
            )}
            {activeView === 'sessions' && (
              <motion.div
                key="m-sessions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full px-2"
              >
                <div className="rounded-2xl px-5 py-6" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }} onClick={e => e.stopPropagation()}>
                  <h2 className="text-xl font-light mb-2">Working Together</h2>
                  <div className="h-px w-12 mb-4" style={{ background: '#C850C0' }} />
                  <SessionsContent />
                </div>
              </motion.div>
            )}
            {activeView === 'resources' && (
              <motion.div
                key="m-resources"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full px-2"
              >
                <div className="rounded-2xl px-5 py-6" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }} onClick={e => e.stopPropagation()}>
                  <h2 className="text-xl font-light mb-2">Resources</h2>
                  <div className="h-px w-12 mb-4" style={{ background: '#C850C0' }} />
                  <ResourcesContent />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
