import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceNodeProps {
  x: number;
  y: number;
  service: string;
  image: string;
  isActive: boolean;
  isRelated: boolean;
  onHover: (service: string | null) => void;
  index: number;
}

export function ServiceNode({
  x,
  y,
  service,
  image,
  isActive,
  isRelated,
  onHover,
  index,
}: ServiceNodeProps) {
  return (
    <motion.div
      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.12 : isRelated ? 1.04 : 1,
        zIndex: isActive ? 50 : 30,
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 120,
          damping: 14,
          delay: isActive ? 0 : isRelated ? 0.18 : 0,
        },
        opacity: { duration: 0.4, delay: index * 0.08 },
        zIndex: { duration: 0 },
      }}
      onMouseEnter={() => onHover(service)}
      onMouseLeave={() => onHover(null)}
      data-testid={`node-${service}`}
    >
      {/* Circle Container */}
      <div
        className={cn(
          "relative w-24 h-24 rounded-full overflow-hidden border-2 transition-colors duration-500",
          isActive ? "border-primary shadow-xl" : "border-transparent shadow-md"
        )}
      >
        <img
          src={image}
          alt={service}
          className="w-full h-full object-cover"
        />

        {/* Overlay for inactive state */}
        <div className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-500",
          isActive ? "opacity-0" : "opacity-100"
        )} />
      </div>
    </motion.div>
  );
}
