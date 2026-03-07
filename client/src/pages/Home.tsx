import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NetworkGraph } from "@/components/NetworkGraph";
import { ServicePanel, type ServiceInfo } from "@/components/ServicePanel";
import portraitImage from "@assets/generated_images/professional_black_and_white_portrait_of_a_woman_healer.png";
import doulaImage from "@assets/IMG_2354.JPG";
import yogaImage from "@assets/nancy-vd.png";
import bgVideo from "@assets/background.mp4";

const SERVICES: ServiceInfo[] = [
  {
    name: "Biodynamic Craniosacral Therapy",
    label: "Biodynamic Craniosacral Therapy",
    description:
      "A gentle, hands-on approach that listens to the subtle rhythms of your body to release deep-held tension and support your innate healing intelligence. Sessions create space for the nervous system to settle, allowing physical and emotional patterns to unwind at their own pace. Particularly effective for chronic pain, stress, trauma recovery, and navigating major life transitions.",
  },
  {
    name: "Somatic\nTherapy",
    label: "Somatic Therapy",
    description:
      "The body holds the stories the mind can't always tell. Through guided awareness, breathwork, and gentle movement, somatic therapy helps you reconnect with sensation, process stored emotion, and restore a feeling of safety in your own skin. This work meets you wherever you are — no experience necessary, just a willingness to listen inward.",
  },
  {
    name: "Yoga Therapy",
    label: "Yoga Therapy",
    image: yogaImage,
    description:
      "Unlike a group yoga class, yoga therapy is tailored specifically to you — your body, your history, your goals. Sessions blend adaptive postures, breathwork, meditation, and mindful movement into a personal practice designed to support healing, build resilience, and deepen your relationship with your body over time.",
  },
  {
    name: "Parenting & Family Coaching",
    label: "Parenting & Family Coaching",
    description:
      "Raising children is a profound practice of its own. Nancy offers compassionate, experience-grounded coaching for parents and families navigating the joys and challenges of early parenthood, sibling dynamics, developmental transitions, and the everyday work of creating a home rooted in connection and presence.",
  },
  {
    name: "Birth Education",
    label: "Birth Education",
    description:
      "Knowledge transforms the birth experience from something that happens to you into something you actively participate in. These sessions cover the physiology of birth, comfort measures, decision-making frameworks, and partner support — empowering you with clarity and confidence as you prepare to welcome new life.",
  },
  {
    name: "Birth, Doula, &\nPostpartum Support",
    label: "Birth, Doula, & Postpartum Support",
    image: doulaImage,
    imageScale: 1.3,
    imagePosition: 'center 28%',
    description:
      "Continuous, nurturing support through pregnancy, labor, birth, and the tender early weeks that follow. As your doula, Nancy provides physical comfort, emotional reassurance, and advocacy — holding space so you can be fully present for one of life's most transformative passages. Postpartum support extends that care into the fourth trimester and beyond.",
  },
];

const SERVICE_NAMES = SERVICES.map((s) => s.name);
const SERVICE_IMAGES = SERVICES.map((s) => s.image ?? portraitImage);
const SERVICE_IMAGE_SCALES = SERVICES.map((s) => s.imageScale);
const SERVICE_IMAGE_POSITIONS = SERVICES.map((s) => s.imagePosition);

function MobileServiceContent({ activeService, services }: { activeService: string; services: ServiceInfo[] }) {
  const active = services.find((s) => s.name === activeService);
  if (!active) return null;
  return (
    <div className="overflow-y-auto" style={{ maxHeight: 'calc(45svh - 60px)' }}>
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

export default function Home() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'services' | 'about' | 'book'>('services');
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
    <div className="h-screen relative selection:bg-primary/10 flex flex-col overflow-hidden" style={{ background: '#051a1c' }}>

      {/* Background Video — cropped top 5% to hide watermark */}
      <div className="fixed inset-0 z-0 overflow-hidden" style={{ top: '-5vh' }}>
        <video
          ref={videoRef}
          src={bgVideo}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.22, objectPosition: 'center 10%' }}
        />
      </div>

      {/* Light aqua-turquoise wash */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ background: 'rgba(0, 195, 195, 0.56)' }} />

      {/* ───── Header + Nav ───── */}
      <div className="relative z-30 w-full flex flex-col items-center pt-3 md:pt-4 pb-3 shrink-0">
        <header className="text-center space-y-2 md:space-y-3 px-6 py-3 md:px-8 md:py-5 rounded-xl w-fit" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-primary">
            Nancy Turnquist
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground font-light">
            Multimodal Healer & Bodyworker
          </p>
          <div className="h-px w-20 bg-primary/20 mx-auto" />
        </header>
        <nav className="flex items-center gap-6 md:gap-8 px-5 py-2 mt-1.5 rounded-lg w-fit" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          {(['services', 'about', 'book'] as const).map((v) => (
            <button
              key={v}
              onClick={() => { setActiveView(v); if (v !== 'services') setActiveService(null); }}
              className={`text-xs md:text-sm font-medium transition-colors tracking-wide uppercase ${activeView === v ? 'text-primary' : 'text-primary/50 hover:text-primary/80'}`}
            >
              {v === 'book' ? 'Book' : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </nav>
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
              activeService={activeService}
              onActiveChange={(s) => { setActiveService(s); if (s) setActiveView('services'); }}
            />
          </div>
          <div className="w-1/2 max-w-md">
            <AnimatePresence mode="wait">
              {activeView === 'services' && (
                <motion.div
                  key="view-services"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ServicePanel activeService={activeService} services={SERVICES} />
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
                  <div className="px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <h2 className="text-2xl md:text-3xl font-light text-primary mb-3">About Nancy</h2>
                    <div className="h-px w-16 bg-primary/20 mb-6" />
                    <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-[0.95rem] md:text-base">
                      <p>
                        Nancy Turnquist is a multimodal healer, bodyworker, and birth professional with over
                        two decades of experience supporting people through some of life's most profound
                        transitions. Her practice weaves together craniosacral therapy, somatic healing, yoga
                        therapy, and birth work into a unified approach rooted in deep listening and presence.
                      </p>
                      <p>
                        Nancy's work begins from a simple premise: your body already knows how to heal. Her
                        role is to create the conditions — safety, stillness, gentle attention — that allow
                        that intelligence to emerge. Whether you're navigating chronic pain, preparing for
                        birth, processing grief, or simply seeking a place to slow down and be held, Nancy
                        meets you exactly where you are.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeView === 'book' && (
                <motion.div
                  key="view-book"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="text-center px-5 py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <h2 className="text-2xl md:text-3xl font-light text-primary mb-3">Begin Your Journey</h2>
                    <div className="h-px w-16 bg-primary/20 mx-auto mb-6" />
                    <p className="text-muted-foreground font-light leading-relaxed mb-4 max-w-lg mx-auto text-[0.95rem] md:text-base">
                      Whether you're ready to book a session or simply have questions about which modality
                      might be right for you, Nancy would love to hear from you.
                    </p>
                    <p className="text-muted-foreground font-light leading-relaxed mb-8 max-w-lg mx-auto text-[0.95rem] md:text-base">
                      Nancy sees clients both remotely and in person at her Cambridge treatment space.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a href="#" className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 tracking-wide text-sm font-medium">Book a Session</a>
                      <a href="#" className="px-8 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 tracking-wide text-sm font-medium">Get in Touch</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: content area fades between views */}
        <div className="flex md:hidden flex-col items-center h-full pt-6">
          <AnimatePresence mode="wait">
            {activeView === 'services' && (
              <motion.div
                key="m-services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full flex-1 min-h-0"
                style={{ maxWidth: '400px' }}
              >
                <NetworkGraph
                  services={SERVICE_NAMES}
                  image={portraitImage}
                  images={SERVICE_IMAGES}
                  imageScales={SERVICE_IMAGE_SCALES}
                  imagePositions={SERVICE_IMAGE_POSITIONS}
                  activeService={activeService}
                  onActiveChange={(s) => { setActiveService(s); if (s) setActiveView('services'); }}
                />
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
                <div className="rounded-2xl px-5 py-6" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                  <h2 className="text-xl font-light text-primary mb-2">About Nancy</h2>
                  <div className="h-px w-12 bg-primary/20 mb-4" />
                  <div className="space-y-3 text-muted-foreground font-light leading-relaxed text-sm">
                    <p>
                      Nancy Turnquist is a multimodal healer, bodyworker, and birth professional with over
                      two decades of experience supporting people through some of life's most profound
                      transitions. Her practice weaves together craniosacral therapy, somatic healing, yoga
                      therapy, and birth work into a unified approach rooted in deep listening and presence.
                    </p>
                    <p>
                      Nancy's work begins from a simple premise: your body already knows how to heal. Her
                      role is to create the conditions — safety, stillness, gentle attention — that allow
                      that intelligence to emerge. Whether you're navigating chronic pain, preparing for
                      birth, processing grief, or simply seeking a place to slow down and be held, Nancy
                      meets you exactly where you are.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            {activeView === 'book' && (
              <motion.div
                key="m-book"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full px-2"
              >
                <div className="text-center rounded-2xl px-5 py-6" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                  <h2 className="text-xl font-light text-primary mb-2">Begin Your Journey</h2>
                  <div className="h-px w-12 bg-primary/20 mx-auto mb-4" />
                  <p className="text-muted-foreground font-light leading-relaxed mb-3 text-sm">
                    Whether you're ready to book a session or simply have questions about which modality
                    might be right for you, Nancy would love to hear from you.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6 text-sm">
                    Nancy sees clients both remotely and in person at her Cambridge treatment space.
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <a href="#" className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 tracking-wide text-sm font-medium">Book a Session</a>
                    <a href="#" className="px-8 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 tracking-wide text-sm font-medium">Get in Touch</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom sheet — services view only */}
      <AnimatePresence>
        {activeView === 'services' && activeService && (
          <motion.div
            key="mobile-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden rounded-t-2xl px-5 pt-3 pb-6"
            style={{ background: 'rgba(170, 185, 240, 0.78)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', maxHeight: '45svh' }}
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-2" />
            <MobileServiceContent activeService={activeService} services={SERVICES} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
