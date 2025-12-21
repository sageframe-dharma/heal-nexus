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
        scale: isActive ? 1.3 : isRelated ? 1.1 : 1,
        zIndex: isActive ? 20 : 10
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      onMouseEnter={() => onHover(service)}
      onMouseLeave={() => onHover(null)}
      data-testid={`node-${service}`}
    >
      {/* Label + Description Box */}
      <motion.div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 whitespace-normal pointer-events-none transition-all duration-300",
          "flex flex-col gap-2"
        )}
        style={{
          top: index < 3 ? 'auto' : '0', // Top nodes go up, bottom nodes go down
          bottom: index < 3 ? 'auto' : 'undefined',
          transform: 'translateX(-50%)',
        }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : (index < 3 ? 10 : -10),
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Service Name Pill */}
        <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-sm">
          {service}
        </div>
        
        {/* Description Box */}
        <div className="px-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-light text-muted-foreground shadow-sm max-w-xs">
          <p>Discover holistic wellness through personalized somatic practices and embodied healing techniques designed to restore balance and vitality.</p>
        </div>
      </motion.div>

      {/* Circle Container */}
      <div 
        className={cn(
          "relative w-24 h-24 rounded-full overflow-hidden border-2 transition-colors duration-500",
          isActive ? "border-primary shadow-xl" : "border-transparent shadow-md grayscale hover:grayscale-0"
        )}
      >
        <img 
          src={image} 
          alt={service}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay for inactive state */}
        <div className={cn(
          "absolute inset-0 bg-primary/20 transition-opacity duration-500",
          isActive ? "opacity-0" : "opacity-30"
        )} />
      </div>
    </motion.div>
  );
}
