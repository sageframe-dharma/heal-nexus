import { motion, AnimatePresence } from "framer-motion";
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
    <div className="flex flex-col justify-start h-full px-5 py-6 md:py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1a1a1a', overflowY: 'auto', maxHeight: '520px' }}>
      <AnimatePresence mode="wait">
        {isCenterActive && !active ? (
          <motion.div
            key="center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-3 leading-snug">
              Healing with Presence
            </h2>
            <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
            <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 550 }}>
              I work with the body’s own capacity to heal. Through gentle hands-on work, somatic awareness, and deep listening, I help people find relief from pain, resolve held stress and trauma, prepare for birth, and navigate life’s most difficult transitions. Sessions are 60–90 minutes, in person in Cambridge, MA or online. You don’t need to know what you need — that’s my job.
            </p>
          </motion.div>
        ) : active ? (
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-3 leading-snug">
              {active.label}
            </h2>
            <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
            <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80" style={{ fontWeight: 350 }}>
              {active.description}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-3 leading-snug">
              Explore Offerings
            </h2>
            <div className="h-px w-16 mb-4" style={{ background: '#C850C0' }} />
            <p className="leading-relaxed text-[0.95rem] md:text-base opacity-80 italic" style={{ fontWeight: 400 }}>
              Click an image to explore, or click the center to see how they connect.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

