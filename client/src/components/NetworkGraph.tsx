import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "./ServiceNode";
import centralImage from "@assets/sensative_4_1766316400450.jpg";

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

      {/* Central Hexagon with Image - Wedge-based Animation */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none"
        animate={{ 
          scale: activeService ? 1.05 : 1,
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        <div 
          className="w-48 h-48 md:w-56 md:h-56 overflow-hidden relative"
          style={{
            clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          }}
        >
          {/* Base Image - fills entire hexagon */}
          <img 
            src={centralImage}
            alt="Nancy Turnquist"
            className="w-full h-full object-cover"
          />
          
          {/* 6 Wedge Overlays - Each responds to corresponding service */}
          {nodes.map((node, index) => {
            const wedgeAngle = (360 / nodes.length);
            const startAngle = (wedgeAngle * index) - 90; // Start from top
            
            return (
              <motion.div
                key={`wedge-${index}`}
                className="absolute inset-0 pointer-events-none mix-blend-darken"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((startAngle) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle) * Math.PI / 180)}%, ${50 + 50 * Math.cos((startAngle + wedgeAngle) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle + wedgeAngle) * Math.PI / 180)}%)`,
                }}
                animate={{
                  opacity: 
                    activeService === node.service
                      ? 0 // Brighten this wedge
                      : activeService
                      ? 0.4 // Dim other wedges
                      : 0.25, // Light overlay at rest
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            );
          })}
          
          {/* Dynamic Glow Pulse */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, transparent 70%)',
            }}
            animate={{
              boxShadow: activeService 
                ? [
                    '0 0 0 0px rgba(0,0,0,0.3)',
                    '0 0 30px 2px rgba(0,0,0,0.15)',
                    '0 0 0 0px rgba(0,0,0,0.3)',
                  ]
                : 'none',
            }}
            transition={{
              duration: 1.5,
              repeat: activeService ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
