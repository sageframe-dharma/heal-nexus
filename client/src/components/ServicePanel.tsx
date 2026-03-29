import { motion, AnimatePresence } from "framer-motion";

export interface ServiceInfo {
  name: string;
  label: string;
  description: string;
  image?: string;
  imageScale?: number;
  imagePosition?: string;
}

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
              Explore
            </h2>
            <div className="h-px w-16 bg-primary/20 mb-4" />
            <p className="text-muted-foreground font-light leading-relaxed text-[0.95rem] md:text-base italic">
              Explore a modality to learn more, or click the center to see how they connect.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

