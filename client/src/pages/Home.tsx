import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { NetworkGraph } from "@/components/NetworkGraph";
import { ServicePanel } from "@/components/ServicePanel";
import type { ServiceInfo } from "@/lib/services";
import { SERVICES, portraitImage } from "@/lib/services";
import bgVideo from "@assets/background-mobile.mp4";

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
          I help people listen to themselves and respond to what they're hearing. People seek support for many reasons — pain, anxiety, preparation for birth, a body carrying more than it can hold, or simply to be understood. I work with what you bring and help create the conditions for you to meet what is ready to happen.
        </p>
        {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
        <Link
          href="/offerings"
          style={{
            display: "inline-block",
            marginTop: 14,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "#C850C0",
            textDecoration: "none",
            letterSpacing: "0.2px",
          }}
        >
          Click for <span style={{ textDecoration: "underline" }}>detailed offerings</span>
        </Link>
        */
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
      {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
      <Link
        href={`/offerings?card=${encodeURIComponent(active.name)}`}
        style={{
          display: "inline-block",
          marginTop: 14,
          fontFamily: "Montserrat, sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: "#C850C0",
          textDecoration: "none",
          letterSpacing: "0.2px",
        }}
      >
        Learn more →
      </Link>
      */
    </div>
  );
}

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
  };
  const handleCenterClick = () => {
    setIsCenterActive(true);
    setSelectedNode(null);
    setHoveredNode(null);
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
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }}>
                    <h2 className="text-2xl md:text-3xl font-light mb-3">About Nancy</h2>
                    <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
                    <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 550 }}>
                      Nancy Turnquist is a somatic therapist, craniosacral practitioner, yoga therapist, and birth support specialist with over two decades of experience in Cambridge, MA.
                    </p>
                    {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
                    <Link
                      href="/about"
                      style={{ display: 'inline-block', marginTop: 16, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: '#C850C0', textDecoration: 'none', letterSpacing: '0.2px' }}
                    >
                      Learn more about Nancy →
                    </Link>
                    */
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
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }}>
                    <h2 className="text-2xl md:text-3xl font-light mb-3">Working Together</h2>
                    <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
                    <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 550 }}>
                      Nancy sees clients in person at her Cambridge treatment space and online. Sessions are typically 60 to 90 minutes. You don't need to know which modality is right for you — that's her job.
                    </p>
                    {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
                    <Link
                      href="/sessions"
                      style={{ display: 'inline-block', marginTop: 16, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: '#C850C0', textDecoration: 'none', letterSpacing: '0.2px' }}
                    >
                      Learn more about sessions →
                    </Link>
                    */
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
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a' }}>
                    <h2 className="text-2xl md:text-3xl font-light mb-3">Resources</h2>
                    <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
                    <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 550 }}>
                      Explore Nancy's lineage and training traditions, resources related to her offerings, and deeper materials for current clients.
                    </p>
                    {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
                    <Link
                      href="/resources"
                      style={{ display: 'inline-block', marginTop: 16, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: '#C850C0', textDecoration: 'none', letterSpacing: '0.2px' }}
                    >
                      Explore resources →
                    </Link>
                    */
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
                {/* Offerings quick-select bar — only when a service is active */}
                {(!!effectiveService || isCenterActive) && <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '0 4px', borderBottom: '1px solid rgba(255,255,255,0.18)', marginBottom: 4 }}>
                  {([
                    { name: "__center__",                     short: "Presence" },
                    { name: "Biodynamic Craniosacral Therapy", short: "BCST" },
                    { name: "Somatic\nTherapy",               short: "Somatics" },
                    { name: "Yoga Therapy",                   short: "Yoga" },
                    { name: "Pre- & Perinatal\nPsychology",  short: "PPN" },
                    { name: "Birth, Doula &\nPostpartum",    short: "Birth" },
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
                  <p className="leading-relaxed text-sm opacity-80" style={{ fontWeight: 550 }}>
                    Nancy Turnquist is a somatic therapist, craniosacral practitioner, yoga therapist, and birth support specialist with over two decades of experience in Cambridge, MA.
                  </p>
                  {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
                  <Link
                    href="/about"
                    style={{ display: 'inline-block', marginTop: 14, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: '#C850C0', textDecoration: 'none', letterSpacing: '0.2px' }}
                  >
                    Learn more about Nancy →
                  </Link>
                  */
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
                  <p className="leading-relaxed text-sm opacity-80" style={{ fontWeight: 550 }}>
                    Nancy sees clients in person at her Cambridge treatment space and online. Sessions are typically 60 to 90 minutes. You don't need to know which modality is right for you — that's her job.
                  </p>
                  {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
                  <Link
                    href="/sessions"
                    style={{ display: 'inline-block', marginTop: 14, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: '#C850C0', textDecoration: 'none', letterSpacing: '0.2px' }}
                  >
                    Learn more about sessions →
                  </Link>
                  */
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
                  <p className="leading-relaxed text-sm opacity-80" style={{ fontWeight: 550 }}>
                    Explore Nancy's lineage and training traditions, resources related to her offerings, and deeper materials for current clients.
                  </p>
                  {/* DISABLED: L1→L2 link removed — re-enable when navigation is restored
                  <Link
                    href="/resources"
                    style={{ display: 'inline-block', marginTop: 14, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: '#C850C0', textDecoration: 'none', letterSpacing: '0.2px' }}
                  >
                    Explore resources →
                  </Link>
                  */
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
