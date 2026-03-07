import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceNodeProps {
  x: number;
  y: number;
  service: string;
  image: string;
  objectPosition?: string;
  imageScale?: number;
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
  objectPosition = 'center',
  imageScale,
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
          type: "tween",
          duration: isActive ? 1.1 : 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isActive ? 0 : isRelated ? 0.35 : 0,
        },
        opacity: { duration: 0.9, delay: index * 0.12 },
        zIndex: { duration: 0 },
      }}
      onMouseEnter={() => onHover(service)}
      onMouseLeave={() => onHover(null)}
      data-testid={`node-${service}`}
    >
      {/* Circle Container */}
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden border-0"
      >
        <motion.img
          src={image}
          alt={service}
          className="w-full h-full object-cover"
          style={{ objectPosition, transform: imageScale ? `scale(${imageScale})` : undefined, transformOrigin: 'center' }}
          animate={{
            opacity: isActive ? 1 : 0.38,
            filter: isActive ? "blur(0px) grayscale(0%)" : "blur(2.5px) grayscale(60%)",
          }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}
