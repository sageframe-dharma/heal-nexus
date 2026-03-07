import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "./ServiceNode";
import centralImage from "@assets/pearl.png";

interface NetworkGraphProps {
  services: string[];
  image: string;
  activeService: string | null;
  onActiveChange: (service: string | null) => void;
}

export function NetworkGraph({ services, image, activeService, onActiveChange }: NetworkGraphProps) {
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
      className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center"
    >
      {/* SVG Layer for Connections — sits below nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
        {connections.map((conn) => {
          const fromIdx = services.indexOf(conn.from.service);
          const toIdx = services.indexOf(conn.to.service);
          const activeIdx = activeService ? services.indexOf(activeService) : -1;
          const n = services.length;

          // Only the two "skip-one" connections light up (±2 steps = nodes 3 and 5 for node 1)
          const isHighlighted = activeIdx !== -1 && (
            (fromIdx === activeIdx && (toIdx === (activeIdx + 2) % n || toIdx === (activeIdx + 4) % n)) ||
            (toIdx === activeIdx && (fromIdx === (activeIdx + 2) % n || fromIdx === (activeIdx + 4) % n))
          );

          return (
            <motion.line
              key={conn.id}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="white"
              animate={{
                opacity: activeIdx === -1 ? 0.15 : (isHighlighted ? 0.85 : 0),
                strokeWidth: isHighlighted ? 2 : 0.5,
              }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {nodes.map((node, i) => {
        const activeIndex = activeService ? services.indexOf(activeService) : -1;
        const isAdjacent = activeIndex !== -1 && (
          i === (activeIndex + 1) % services.length ||
          i === (activeIndex - 1 + services.length) % services.length
        );
        return (
        <ServiceNode
          key={node.service}
          x={node.x}
          y={node.y}
          index={i}
          service={node.service}
          image={image}
          isActive={activeService === node.service}
          isRelated={isAdjacent}
          onHover={onActiveChange}
        />
        );
      })}

      {/* Central Hexagon with Image + Inner-angle Overlay */}
      <div
        className="absolute pointer-events-none z-5"
        style={{
          left: centerX,
          top: centerY,
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
        }}
      >
        <div
          className="overflow-hidden relative w-full h-full"
          style={{
            clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          }}
        >
          {/* Base image at low opacity */}
          <img
            src={centralImage}
            alt="Nancy Turnquist"
            className="w-full h-full object-cover"
            style={{ opacity: 0.55 }}
          />

          {/* Full-opacity image reveal in inner-angle region — polygon N, N+2, N+3, N+4 */}
          <AnimatePresence>
            {activeService && (() => {
              const hexVerts: [number, number][] = [
                [50, 0], [93.3, 25], [93.3, 75], [50, 100], [6.7, 75], [6.7, 25]
              ];
              const n = services.indexOf(activeService);
              const pts = [n, (n+2)%6, (n+3)%6, (n+4)%6].map(i => hexVerts[i]);
              const clipPath = `polygon(${pts.map(p => `${p[0]}% ${p[1]}%`).join(', ')})`;
              return (
                <motion.div
                  key={activeService}
                  className="absolute inset-0"
                  style={{ clipPath }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <img
                    src={centralImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>

      {/* Service label centered in hex */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: centerX,
          top: centerY,
          width: radius * 1.2,
          height: radius * 0.5,
          marginLeft: -radius * 0.6,
          marginTop: -radius * 0.25,
          zIndex: 40,
        }}
      >
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.span
              key={activeService}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center font-medium leading-snug"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.35rem)', color: 'rgba(220, 248, 255, 0.96)', textShadow: '0 2px 8px rgba(55, 0, 80, 0.95), 0 4px 16px rgba(55, 0, 80, 0.8), 0 0 24px rgba(0, 180, 210, 0.55)', maxWidth: radius * 1.1, whiteSpace: 'pre-line' }}
            >
              {activeService}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
