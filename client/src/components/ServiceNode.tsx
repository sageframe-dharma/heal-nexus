import { motion } from "framer-motion";

interface ServiceNodeProps {
  x: number;
  y: number;
  service: string;
  image: string;
  objectPosition?: string;
  imageScale?: number;
  isActive: boolean;   // hovered (transient)
  isSelected: boolean; // clicked (persisted)
  isRelated: boolean;
  isCenterActive: boolean;
  onHover: (service: string | null) => void;
  onSelect: (service: string) => void;
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
  isSelected,
  isRelated,
  isCenterActive,
  onHover,
  onSelect,
  index,
}: ServiceNodeProps) {
  // Visual precedence: selected > hovered > center-active > idle
  const imgOpacity = isSelected ? 1 : isActive ? 0.85 : isCenterActive ? 1 : 0.38;
  const imgFilter = isSelected
    ? "blur(0px) grayscale(0%)"
    : isActive
    ? "blur(0.5px) grayscale(10%)"
    : isCenterActive
    ? "blur(0px) grayscale(0%)"
    : "blur(2.5px) grayscale(60%)";
  const scale = isSelected ? 1.12 : isActive ? 1.06 : isRelated ? 1.04 : 1;

  return (
    <motion.div
      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale,
        zIndex: isSelected || isActive ? 50 : 30,
      }}
      transition={{
        scale: {
          type: "tween",
          duration: isSelected || isActive ? 1.1 : 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isSelected || isActive ? 0 : isRelated ? 0.35 : 0,
        },
        opacity: { duration: 0.9, delay: index * 0.12 },
        zIndex: { duration: 0 },
      }}
      onMouseEnter={() => onHover(service)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onSelect(service); }}
      data-testid={`node-${service}`}
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-0">
        <motion.img
          src={image}
          alt={service}
          className="w-full h-full object-cover"
          style={{ objectPosition, transform: imageScale ? `scale(${imageScale})` : undefined, transformOrigin: 'center' }}
          animate={{ opacity: imgOpacity, filter: imgFilter }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}
