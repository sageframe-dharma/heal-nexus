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
  const [wedgeOpacities, setWedgeOpacities] = useState<number[]>(Array(6).fill(0.2));
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

  // Generate random opacities for wedges when service is activated
  useEffect(() => {
    if (activeService) {
      const newOpacities = Array(services.length)
        .fill(0)
        .map(() => Math.random() * 0.3 + 0.3); // Random between 0.3 and 0.6
      setWedgeOpacities(newOpacities);
    } else {
      setWedgeOpacities(Array(services.length).fill(0.2));
    }
  }, [activeService, services.length]);

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
                  opacity: isConnectedToActive ? 0.8 : isFaded ? 0.02 : 0.04,
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
        className="absolute pointer-events-none z-5"
        style={{
          left: centerX,
          top: centerY,
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
        }}
        animate={{ 
          // No scale animation
        }}
        transition={{ duration: 0 }}
      >
        <div 
          className="overflow-hidden relative w-full h-full"
          style={{
            clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          }}
        >
          {/* 6 Wedge Image Sections - Each with independent opacity */}
          {nodes.map((node, index) => {
            const wedgeAngle = (360 / nodes.length);
            // Wedge is centered between two adjacent nodes
            const midpointAngle = (wedgeAngle * index) + (wedgeAngle / 2) - 90;
            const startAngle = midpointAngle - (wedgeAngle / 2);
            const endAngle = midpointAngle + (wedgeAngle / 2);
            
            // Create wedge polygon points - from center point in the hex
            const wedgePoints = [
              [50, 50], // center of hex
              [50 + 50 * Math.cos((startAngle) * Math.PI / 180), 50 + 50 * Math.sin((startAngle) * Math.PI / 180)],
              [50 + 50 * Math.cos((endAngle) * Math.PI / 180), 50 + 50 * Math.sin((endAngle) * Math.PI / 180)],
            ];
            const clipPath = `polygon(${wedgePoints.map(p => `${p[0]}% ${p[1]}%`).join(', ')})`;
            
            return (
              <motion.div
                key={`wedge-${index}`}
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath,
                }}
                animate={{
                  opacity: wedgeOpacities[index] || 0.15,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img 
                  src={centralImage}
                  alt="Nancy Turnquist"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
