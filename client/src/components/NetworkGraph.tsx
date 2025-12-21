import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "./ServiceNode";

interface NetworkGraphProps {
  services: string[];
  image: string;
}

export function NetworkGraph({ services, image }: NetworkGraphProps) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Keep it square-ish or proportional, but responsive
        setDimensions({ width, height: Math.min(width, 600) }); 
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate positions in a circle
  const radius = Math.min(dimensions.width, dimensions.height) / 2.5;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  const nodes = services.map((service, i) => {
    const angle = (i / services.length) * 2 * Math.PI - Math.PI / 2; // Start from top
    return {
      id: service,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      service,
    };
  });

  // Calculate connections (all to all, or specific)
  // For "network", let's connect every node to its neighbors and maybe across
  const connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      connections.push({
        id: `${i}-${j}`,
        from: nodes[i],
        to: nodes[j],
      });
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center"
    >
      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <AnimatePresence>
          {connections.map((conn) => {
            const isConnectedToActive = 
              activeService === conn.from.service || 
              activeService === conn.to.service;

            const isFaded = activeService && !isConnectedToActive;
            
            return (
              <motion.line
                key={conn.id}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isConnectedToActive ? 0.6 : isFaded ? 0.05 : 0.15,
                  strokeWidth: isConnectedToActive ? 2 : 1
                }}
                stroke="currentColor"
                className="text-primary"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Nodes Layer */}
      {nodes.map((node, i) => (
        <ServiceNode
          key={node.service}
          x={node.x}
          y={node.y}
          index={i}
          service={node.service}
          image={image}
          isActive={activeService === node.service}
          isRelated={!!activeService} // Simplify for now: if one is active, others are "related" in the network
          onHover={setActiveService}
        />
      ))}

      {/* Central "Hub" Text (Optional, fills the empty space) */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center z-0"
        animate={{ opacity: activeService ? 0.1 : 1 }}
        transition={{ duration: 0.5 }}
      >
         {/* Could put a central logo or name here */}
      </motion.div>
    </div>
  );
}
