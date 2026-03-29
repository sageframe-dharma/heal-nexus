import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "./ServiceNode";
import centralImage from "@assets/pearl.png";

const ACCENT = "#A855F7";

// Hexagon polygon points, flat-top orientation, given center + radius
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

interface NetworkGraphProps {
  services: string[];
  image: string;
  images?: string[];
  imageScales?: (number | undefined)[];
  imagePositions?: (string | undefined)[];
  activeService: string | null;
  selectedService: string | null;
  isCenterActive: boolean;
  onActiveChange: (service: string | null) => void;
  onSelectChange: (service: string) => void;
  onCenterClick: () => void;
  onCenterHover: (hovered: boolean) => void;
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
  onCenterHover,
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
  const centerHexRadius = 32;

  const nodes = services.map((service, i) => {
    const angle = (i / services.length) * 2 * Math.PI - Math.PI / 2;
    return {
      id: service,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      service,
    };
  });

  // 12 explicit connections: 6 perimeter + 6 diagonals, nothing crossing center
  // Node indices: 0=top, 1=upper-right, 2=lower-right, 3=bottom, 4=lower-left, 5=upper-left
  const linePairs: [number, number][] = [
    // Perimeter (6): each node to its neighbors
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    // Diagonals (6): each node to +2 and +4 (skip-one neighbors)
    [0, 2], [1, 3], [2, 4], [3, 5], [4, 0], [5, 1],
  ];

  const activeIdx = activeService ? services.indexOf(activeService) : -1;
  const n = services.length;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center"
    >
      {/* SVG Layer for Connections — original wedge geometry, sits below nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10, overflow: "visible" }}>
        {linePairs.map(([a, b]) => {
          // Wedge highlight: the two skip-one lines from the active node
          const isHighlighted = !isCenterHovered && !isCenterActive && activeIdx !== -1 && (
            (a === activeIdx && (b === (activeIdx + 2) % n || b === (activeIdx + 4) % n)) ||
            (b === activeIdx && (a === (activeIdx + 2) % n || a === (activeIdx + 4) % n))
          );

          const lineStroke = isCenterActive ? ACCENT : "white";
          const lineOpacity = isCenterActive
            ? 0.9
            : isCenterHovered
              ? 0.15
              : activeIdx === -1
                ? 0.15
                : (isHighlighted ? 0.85 : 0);
          const lineWidth = isCenterActive
            ? 4
            : isHighlighted
              ? 2
              : 0.5;

          return (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={lineStroke}
              opacity={lineOpacity}
              strokeWidth={lineWidth}
              style={{
                transition: "stroke 1s, opacity 1s, stroke-width 1s, filter 1s",
                filter: isCenterActive ? `drop-shadow(0 0 6px ${ACCENT})` : "none",
              }}
            />
          );
        })}
      </svg>

      {/* SVG overlay — center hex only */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 11, overflow: "visible" }}>
        {/* Center hexagon (flat-top, 32px radius) */}
        <polygon
          points={hexPoints(centerX, centerY, centerHexRadius)}
          fill={isCenterActive ? ACCENT : isCenterHovered ? ACCENT : "rgba(170, 185, 240, 0.4)"}
          stroke="rgba(170, 185, 240, 0.6)"
          strokeWidth="1"
          style={{
            cursor: "pointer",
            pointerEvents: "all",
            transition: "fill 0.3s ease, filter 0.3s ease",
            filter: isCenterActive || isCenterHovered ? `drop-shadow(0 0 6px ${ACCENT})` : "none",
          }}
          onMouseEnter={() => { setIsCenterHovered(true); onCenterHover(true); }}
          onMouseLeave={() => { setIsCenterHovered(false); onCenterHover(false); }}
          onClick={onCenterClick}
        />
      </svg>

      {/* Nodes Layer — original geometry */}
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

      {/* Central Hexagon with Image + Inner-angle Overlay */}
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
          style={{
            clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          }}
        >
          <img
            src={centralImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: isCenterHovered || isCenterActive ? 1 : 0.55, transition: 'opacity 0.35s ease' }}
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
          {activeService && !isCenterHovered && (
            <motion.span
              key={activeService}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center font-medium leading-snug"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.35rem)', color: 'rgba(240, 235, 255, 0.97)', textShadow: '0 2px 8px rgba(80, 0, 120, 0.90), 0 4px 18px rgba(80, 0, 120, 0.70), 0 0 28px rgba(160, 100, 220, 0.60)', maxWidth: radius * 1.1, whiteSpace: 'pre-line' }}
            >
              {activeService}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
