import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "./ServiceNode";
import centralImage from "@assets/pearl.png";

const SAFFRON = "#D4841A";

// Hexagon polygon points, rotated 30° (flat top/bottom), given center + radius
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i); // 0°,60°,...,300° → flat-top
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

interface NetworkGraphProps {
  services: string[];
  image: string;
  images?: string[];
  imageScales?: (number | undefined)[];
  imagePositions?: (string | undefined)[];
  activeService: string | null;       // effectiveService (hover ?? selected)
  selectedService: string | null;     // persisted click only
  isCenterActive: boolean;
  onActiveChange: (service: string | null) => void;   // hover
  onSelectChange: (service: string) => void;           // click
  onCenterClick: () => void;
}

export function NetworkGraph({
  services,
  image,
  images,
  imageScales,
  imagePositions,
  activeService,
  selectedService,
  isCenterActive,
  onActiveChange,
  onSelectChange,
  onCenterClick,
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: Math.min(width, 600) });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = Math.min(dimensions.width, dimensions.height) / 2.5;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const centerHexRadius = 32; // 64px point-to-point

  const nodes = services.map((service, i) => {
    const angle = (i / services.length) * 2 * Math.PI - Math.PI / 2;
    return {
      id: service,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      service,
    };
  });

  // Only center-to-node lines (6 spokes) — for the illumination effect
  const spokes = nodes.map((node, i) => ({ id: `spoke-${i}`, node, index: i }));

  // All-to-all non-spoke connections (aesthetic background web)
  const webConnections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      webConnections.push({ id: `${i}-${j}`, from: nodes[i], to: nodes[j] });
    }
  }

  const activeIdx = activeService ? services.indexOf(activeService) : -1;
  const n = services.length;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center"
    >
      {/* SVG layer — connections + center hex */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10, overflow: "visible" }}>
        <defs>
          <filter id="saffron-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={SAFFRON} floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Background web — node-to-node lines */}
        {webConnections.map((conn) => {
          const fromIdx = services.indexOf(conn.from.service);
          const toIdx = services.indexOf(conn.to.service);
          const isHighlighted = !isCenterActive && activeIdx !== -1 && (
            fromIdx === activeIdx || toIdx === activeIdx
          );

          return (
            <motion.line
              key={conn.id}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={SAFFRON}
              animate={{
                opacity: isCenterActive ? 0 : activeIdx === -1 ? 0.15 : isHighlighted ? 0.85 : 0,
                strokeWidth: isHighlighted ? 2.5 : 0.5,
              }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        })}

        {/* Spoke lines — center to each node, illuminate saffron on center click */}
        {spokes.map(({ id, node, index }) => (
          <motion.line
            key={id}
            x1={centerX}
            y1={centerY}
            x2={node.x}
            y2={node.y}
            animate={isCenterActive ? {
              stroke: SAFFRON,
              opacity: 0.8,
              strokeWidth: 1.5,
            } : {
              stroke: "white",
              opacity: activeIdx === -1 ? 0.12 : 0,
              strokeWidth: 0.5,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isCenterActive ? index * 0.04 : 0,
            }}
          />
        ))}

        {/* Center hexagon (flat-top, 32px radius) */}
        <polygon
          points={hexPoints(centerX, centerY, centerHexRadius)}
          fill={isCenterActive ? SAFFRON : isCenterHovered ? SAFFRON : "rgba(170, 185, 240, 0.4)"}
          stroke="rgba(170, 185, 240, 0.6)"
          strokeWidth="1"
          filter={isCenterActive || isCenterHovered ? "url(#saffron-glow)" : undefined}
          style={{
            cursor: "pointer",
            zIndex: 60,
            transition: "fill 0.3s ease, filter 0.3s ease",
          }}
          onMouseEnter={() => setIsCenterHovered(true)}
          onMouseLeave={() => setIsCenterHovered(false)}
          onClick={onCenterClick}
        />
      </svg>

      {/* Nodes layer */}
      {nodes.map((node, i) => {
        const isAdjacent = activeIdx !== -1 && (
          i === (activeIdx + 1) % n ||
          i === (activeIdx - 1 + n) % n
        );
        return (
          <ServiceNode
            key={node.service}
            x={node.x}
            y={node.y}
            index={i}
            service={node.service}
            image={images?.[i] ?? image}
            objectPosition={imagePositions?.[i] ?? 'center'}
            imageScale={imageScales?.[i]}
            isActive={activeService === node.service}
            isSelected={selectedService === node.service}
            isRelated={isAdjacent}
            isCenterActive={isCenterActive}
            onHover={onActiveChange}
            onSelect={onSelectChange}
          />
        );
      })}

      {/* Central hexagon image + wedge overlay */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: centerX,
          top: centerY,
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
          zIndex: 5,
        }}
      >
        <div
          className="overflow-hidden relative w-full h-full"
          style={{ clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)' }}
        >
          <img
            src={centralImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: isCenterHovered || isCenterActive ? 1 : 0.55, transition: 'opacity 0.35s ease' }}
          />
          <AnimatePresence>
            {activeService && (() => {
              const hexVerts: [number, number][] = [
                [50, 0], [93.3, 25], [93.3, 75], [50, 100], [6.7, 75], [6.7, 25]
              ];
              const ni = services.indexOf(activeService);
              const pts = [ni, (ni + 2) % 6, (ni + 3) % 6, (ni + 4) % 6].map(k => hexVerts[k]);
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
                  <img src={centralImage} alt="" className="w-full h-full object-cover" />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>

      {/* Service label in center */}
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
          {activeService && !isCenterHovered && (
            <motion.span
              key={activeService}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center font-medium leading-snug"
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.35rem)',
                color: 'rgba(240, 235, 255, 0.97)',
                textShadow: '0 2px 8px rgba(80, 0, 120, 0.90), 0 4px 18px rgba(80, 0, 120, 0.70), 0 0 28px rgba(160, 100, 220, 0.60)',
                maxWidth: radius * 1.1,
                whiteSpace: 'pre-line',
              }}
            >
              {activeService}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
