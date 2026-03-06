import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NetworkGraph } from "@/components/NetworkGraph";
import portraitImage from "@assets/generated_images/professional_black_and_white_portrait_of_a_woman_healer.png";
import bgVideo from "@assets/background.mp4";

const SERVICES = [
  "Biodynamic Craniosacral Therapy",
  "Somatic Therapy",
  "Yoga Therapy",
  "Parenting & Family Coaching",
  "Birth Education",
  "Birth Support & Doula"
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panDirRef = useRef<1 | -1>(1);
  const panYRef = useRef(5); // starts below watermark, never goes above 5%
  const rafRef = useRef<number | null>(null);

  // Native playback — smooth GPU-composited rendering
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.35; // slow but silky smooth
    video.play().catch(() => {});
    return () => { video.pause(); };
  }, []);

  // Separate rAF only for the vertical pan — no seeking, just CSS
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/10">

      {/* Background Video — ping-pong at 20% speed */}
      <video
        ref={videoRef}
        src={bgVideo}
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{ opacity: 0.1 }}
      />

      {/* Main Content */}
      <main className="relative z-20 w-full flex flex-col items-center justify-center px-6 py-4" style={{ minHeight: '100svh' }}>

        {/* Header */}
        <header className="text-center mb-4 space-y-2 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary">
            Nancy Turnquist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
            Multimodal Healer & Bodyworker
          </p>
          <div className="h-px w-24 bg-primary/20 mx-auto mt-2" />
        </header>

        {/* The Graph */}
        <div className="w-full shrink-0" style={{ maxWidth: 'min(100%, 560px)' }}>
          <NetworkGraph
            services={SERVICES}
            image={portraitImage}
            activeService={activeService}
            onActiveChange={setActiveService}
          />
        </div>

        {/* Footer / CTA — always outside and below the graph */}
        <div className="text-center mt-4 mb-2 shrink-0">
          <button
            className="px-6 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 tracking-wide text-xs font-medium uppercase"
          >
            Connect with Nancy
          </button>
        </div>

      </main>
    </div>
  );
}
