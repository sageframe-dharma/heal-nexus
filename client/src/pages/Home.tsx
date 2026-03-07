import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NetworkGraph } from "@/components/NetworkGraph";
import { ServicePanel, type ServiceInfo } from "@/components/ServicePanel";
import portraitImage from "@assets/generated_images/professional_black_and_white_portrait_of_a_woman_healer.png";
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
    description:
      "Continuous, nurturing support through pregnancy, labor, birth, and the tender early weeks that follow. As your doula, Nancy provides physical comfort, emotional reassurance, and advocacy — holding space so you can be fully present for one of life's most transformative passages. Postpartum support extends that care into the fourth trimester and beyond.",
  },
];

const SERVICE_NAMES = SERVICES.map((s) => s.name);

export default function Home() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panDirRef = useRef<1 | -1>(1);
  const panYRef = useRef(5);
  const rafRef = useRef<number | null>(null);

  // Native playback — smooth GPU-composited rendering
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.35;
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

  const scrollToConnect = () => {
    document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10">

      {/* Background Video */}
      <video
        ref={videoRef}
        src={bgVideo}
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{ opacity: 0.18 }}
      />

      {/* Blue tint overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ background: 'rgba(20, 40, 160, 0.32)' }} />

      {/* ───── HERO: Hex Graph + Info Panel ───── */}
      <section className="relative z-20 w-full px-4 md:px-8 lg:px-12" style={{ minHeight: '100svh' }}>
        {/* Header */}
        <header className="text-center space-y-3 px-8 py-6 mt-8 md:mt-10 mb-4 rounded-xl w-fit mx-auto" style={{ background: 'rgba(255,255,255,0.20)' }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-primary">
            Nancy Turnquist
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Multimodal Healer & Bodyworker
          </p>
          <div className="h-px w-20 bg-primary/20 mx-auto" />
        </header>

        {/* Side-by-side: Graph left, Panel right */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-4 md:gap-8 lg:gap-12 w-full max-w-6xl mx-auto flex-1">
          {/* Hex Graph */}
          <div className="w-full md:w-1/2 shrink-0 mt-10" style={{ maxWidth: '520px' }}>
            <NetworkGraph
              services={SERVICE_NAMES}
              image={portraitImage}
              activeService={activeService}
              onActiveChange={setActiveService}
            />
          </div>

          {/* Info Panel */}
          <div className="w-full md:w-1/2 max-w-md">
            <ServicePanel
              activeService={activeService}
              services={SERVICES}
            />
          </div>
        </div>
      </section>

      {/* ───── ABOUT ───── */}
      <section id="about" className="relative z-20 w-full px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto rounded-2xl px-6 md:px-8 py-8" style={{ background: 'rgba(255,255,255,0.20)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-primary mb-3">
              About Nancy
            </h2>
            <div className="h-px w-16 bg-primary/20 mb-6" />
            <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-[0.95rem] md:text-base">
              <p>
                Nancy Turnquist is a multimodal healer, bodyworker, and birth professional with over
                two decades of experience supporting people through some of life's most profound
                transitions. Her practice weaves together craniosacral therapy, somatic healing, yoga
                therapy, and birth work into a unified approach rooted in deep listening and
                presence.
              </p>
              <p>
                Nancy's work begins from a simple premise: your body already knows how to heal. Her
                role is to create the conditions — safety, stillness, gentle attention — that allow
                that intelligence to emerge. Whether you're navigating chronic pain, preparing for
                birth, processing grief, or simply seeking a place to slow down and be held, Nancy
                meets you exactly where you are.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── CONNECT / BOOK ───── */}
      <section id="connect" className="relative z-20 w-full px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center rounded-2xl px-6 md:px-8 py-8" style={{ background: 'rgba(255,255,255,0.20)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-primary mb-3">
              Begin Your Journey
            </h2>
            <div className="h-px w-16 bg-primary/20 mx-auto mb-6" />
            <p className="text-muted-foreground font-light leading-relaxed mb-8 max-w-lg mx-auto text-[0.95rem] md:text-base">
              Whether you're ready to book a session or simply have questions about which modality
              might be right for you, Nancy would love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 tracking-wide text-sm font-medium"
              >
                Book a Session
              </a>
              <a
                href="#"
                className="px-8 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 tracking-wide text-sm font-medium"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
