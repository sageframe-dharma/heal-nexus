import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import type { ServiceInfo } from "@/lib/services";

export type { ServiceInfo };

interface ServicePanelProps {
  activeService: string | null;
  isCenterActive: boolean;
  services: ServiceInfo[];
}

export function ServicePanel({ activeService, isCenterActive, services }: ServicePanelProps) {
  const active = services.find((s) => s.name === activeService);

  return (
    <div className="flex flex-col justify-center h-full px-5 py-6 md:py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <AnimatePresence mode="wait">
        {isCenterActive && !active ? (
          <motion.div
            key="center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-primary mb-3 leading-snug">
              Healing with Presence
            </h2>
            <div className="h-px w-16 bg-primary/20 mb-4" />
            <p className="text-muted-foreground font-light leading-relaxed text-[0.95rem] md:text-base">
              I help people listen to themselves and respond to what they're hearing. People seek support for many reasons — pain, anxiety, preparation for birth, a body carrying more than it can hold, or simply to be understood. I work with what you bring and help create the conditions for you to meet what is ready to happen. You can come with a clear intention for the work you'd like to do or a curiosity to discover it. I draw on deep experience across modalities and collaborate with you to meet what you need most.
            </p>
            <Link
              href="/offerings"
              style={{
                display: "inline-block",
                marginTop: 18,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#C850C0",
                textDecoration: "none",
                letterSpacing: "0.2px",
              }}
            >
              Click for <span style={{ textDecoration: "underline" }}>detailed offerings</span>
            </Link>
          </motion.div>
        ) : active ? (
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-primary mb-3 leading-snug">
              {active.label}
            </h2>
            <div className="h-px w-16 bg-primary/20 mb-4" />
            <p className="text-muted-foreground font-light leading-relaxed text-[0.95rem] md:text-base">
              {active.description}
            </p>
            <Link
              href={`/offerings?card=${encodeURIComponent(active.name)}`}
              style={{
                display: "inline-block",
                marginTop: 18,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#C850C0",
                textDecoration: "none",
                letterSpacing: "0.2px",
              }}
            >
              Learn more →
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-primary mb-3 leading-snug">
              Explore Offerings
            </h2>
            <div className="h-px w-16 bg-primary/20 mb-4" />
            <p className="text-muted-foreground font-light leading-relaxed text-[0.95rem] md:text-base italic">
              Click an image to explore, or click the center to see how they connect.
            </p>
            <Link
              href="/offerings"
              style={{
                display: "inline-block",
                marginTop: 18,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#C850C0",
                textDecoration: "none",
                letterSpacing: "0.2px",
              }}
            >
              Click for <span style={{ textDecoration: "underline" }}>detailed offerings</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

