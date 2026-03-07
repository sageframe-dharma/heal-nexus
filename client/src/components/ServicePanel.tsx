import { motion, AnimatePresence } from "framer-motion";

export interface ServiceInfo {
  name: string;
  label: string;
  description: string;
}

interface ServicePanelProps {
  activeService: string | null;
  services: ServiceInfo[];
}

export function ServicePanel({ activeService, services }: ServicePanelProps) {
  const active = services.find((s) => s.name === activeService);

  return (
    <div className="flex flex-col justify-center h-full px-5 py-6 md:py-6 rounded-2xl" style={{ background: 'rgba(170, 185, 240, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <AnimatePresence mode="wait">
        {active ? (
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
            <p className="text-muted-foreground/70 font-light leading-relaxed text-[0.95rem] italic">
              Hover over a practice to learn more…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
