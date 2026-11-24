import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NetworkGraph } from "@/components/NetworkGraph";
import { SERVICES, portraitImage } from "@/lib/services";
import bgVideo from "@assets/background-mobile.mp4";

/**
 * HexWindow — the original home page (water, blue tint, hexagon, frosted panel)
 * held inside a bounded window on the About page. The full original is at /archive.
 *
 * Background values are the published ones and are not to be changed here:
 * tint rgba(45, 138, 185, 0.67), video opacity 0.41, playback rate 0.25.
 */

const SERVICE_NAMES = SERVICES.map((s) => s.name);
const SERVICE_IMAGES = SERVICES.map((s) => (s.hexImage ?? s.image) ?? portraitImage);
const SERVICE_IMAGE_SCALES = SERVICES.map((s) => s.imageScale);
const SERVICE_IMAGE_POSITIONS = SERVICES.map((s) => s.imagePosition);

const CENTER = "__center__";
const JUMP: { name: string; short: string }[] = [
  { name: CENTER, short: "Presence" },
  { name: SERVICE_NAMES[0], short: "BCST" },
  { name: SERVICE_NAMES[1], short: "Somatics" },
  { name: SERVICE_NAMES[2], short: "Yoga" },
  { name: SERVICE_NAMES[3], short: "PPN" },
  { name: SERVICE_NAMES[4], short: "Babies" },
  { name: SERVICE_NAMES[5], short: "Life" },
];

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function HexWindow() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isCenterActive, setIsCenterActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const effectiveService = selectedNode ?? hoveredNode;
  const active = SERVICES.find((s) => s.name === effectiveService);

  const selectNode = (service: string) => {
    setSelectedNode((prev) => (prev === service ? null : service));
    setIsCenterActive(false);
  };
  const selectCenter = () => {
    setIsCenterActive(true);
    setSelectedNode(null);
    setHoveredNode(null);
  };
  const clearAll = () => {
    setHoveredNode(null);
    setSelectedNode(null);
    setIsCenterActive(false);
  };

  // Slow playback and the vertical drift, as on the original home page.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.playbackRate = 0.25;
    video.play().catch(() => {});

    const PAN_SPEED = 0.018;
    const PAN_MIN = 5;
    const PAN_MAX = 45;
    let pan = PAN_MIN;
    let dir: 1 | -1 = 1;
    let last: number | null = null;
    let raf = 0;
    const tick = (now: number) => {
      if (last !== null) {
        const next = pan + ((now - last) / 1000) * PAN_SPEED * (PAN_MAX - PAN_MIN) * dir;
        if (next >= PAN_MAX) { pan = PAN_MAX; dir = -1; }
        else if (next <= PAN_MIN) { pan = PAN_MIN; dir = 1; }
        else pan = next;
        video.style.objectPosition = `center ${pan}%`;
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); video.pause(); };
  }, []);

  const panelKey = active ? active.name : isCenterActive ? CENTER : "intro";

  return (
    <section className="ns-window" aria-label="Nancy's work, as six connected practices" onClick={clearAll}>
      <video ref={videoRef} className="ns-window-video" src={bgVideo} muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="ns-window-tint" />
      <div className="ns-window-stage">
        <div className="ns-window-graph">
          <NetworkGraph
            services={SERVICE_NAMES}
            image={portraitImage}
            images={SERVICE_IMAGES}
            imageScales={SERVICE_IMAGE_SCALES}
            imagePositions={SERVICE_IMAGE_POSITIONS}
            activeService={effectiveService}
            selectedService={selectedNode}
            isCenterActive={isCenterActive}
            onActiveChange={setHoveredNode}
            onSelectChange={selectNode}
            onCenterClick={selectCenter}
            onCenterHover={(hovered) => { if (hovered) { setHoveredNode(null); setSelectedNode(null); } }}
          />
          <div className="ns-window-jump" onClick={(e) => e.stopPropagation()}>
            {JUMP.map(({ name, short }) => (
              <button
                key={name}
                type="button"
                aria-pressed={name === CENTER ? isCenterActive : selectedNode === name}
                onClick={() => (name === CENTER ? selectCenter() : selectNode(name))}
              >
                {short}
              </button>
            ))}
          </div>
        </div>

        <div className="ns-window-panel" tabIndex={0} role="region" aria-label="The work" aria-live="polite" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            <motion.div
              key={panelKey}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {active ? (
                <>
                  <h2>{active.label}</h2>
                  <div className="ns-window-rule" />
                  <p>{active.description}</p>
                </>
              ) : isCenterActive ? (
                <>
                  <h2>Healing with Presence</h2>
                  <div className="ns-window-rule" />
                  <p>
                    I work with the body’s own capacity to heal. Through gentle hands-on work, somatic awareness, and deep listening, I help people find relief from pain, resolve held stress and trauma, prepare for birth, and navigate life’s most difficult transitions. Sessions are 60–90 minutes, in person in Cambridge, MA or online.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I built this site to share where I have been and what I do. The approaches are a tapestry of experiences, approaches, and modalities that represent the lineages I am a part of. They create a sum greater than the parts and inform my practice.
                  </p>
                  <div className="ns-window-rule" />
                  <p>Click on the circles to explore, or the center to see how they connect.</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
