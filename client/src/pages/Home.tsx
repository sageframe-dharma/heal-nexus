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
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const SPEED = 0.2;
    let lastTime: number | null = null;

    const tick = (now: number) => {
      if (lastTime !== null && video.duration) {
        const delta = (now - lastTime) / 1000;
        const next = video.currentTime + delta * SPEED * directionRef.current;
        if (next >= video.duration) {
          video.currentTime = video.duration;
          directionRef.current = -1;
        } else if (next <= 0) {
          video.currentTime = 0;
          directionRef.current = 1;
        } else {
          video.currentTime = next;
        }
      }
      lastTime = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => { rafRef.current = requestAnimationFrame(tick); };
    video.addEventListener("loadedmetadata", start);
    if (video.readyState >= 1) start();

    return () => {
      video.removeEventListener("loadedmetadata", start);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
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
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{ opacity: 0.1 }}
      />

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-6 py-12 md:py-24 flex flex-col items-center justify-center min-h-screen">

        {/* Header */}
        <header className="text-center mb-12 md:mb-20 space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-primary">
            Nancy Turnquist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
            Multimodal Healer & Bodyworker
          </p>
          <div className="h-px w-24 bg-primary/20 mx-auto mt-8" />
          <div className="h-7 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.span
                  key={activeService}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed"
                >
                  {activeService}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* The Graph */}
        <div className="w-full mb-16">
          <NetworkGraph
            services={SERVICES}
            image={portraitImage}
            activeService={activeService}
            onActiveChange={setActiveService}
          />
        </div>

        {/* Footer / CTA */}
        <div className="text-center space-y-8 max-w-xl mx-auto">
          <p className="text-muted-foreground italic font-serif text-lg">
            "Weaving together somatic wisdom, birth support, and therapeutic healing."
          </p>
          <button
            className="px-8 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 tracking-wide text-sm font-medium uppercase hover-elevate"
          >
            Connect with Nancy
          </button>
        </div>

      </main>
    </div>
  );
}
