import { useEffect, useState } from "react";

export interface JumpBarItem {
  id: string;
  label: string;
}

interface JumpBarProps {
  items: JumpBarItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function JumpBar({ items, selectedId, onSelect }: JumpBarProps) {
  const [visibleId, setVisibleId] = useState<string>(selectedId);

  // Keep visibleId in sync when parent programmatically changes selection
  useEffect(() => {
    setVisibleId(selectedId);
  }, [selectedId]);

  // Observe card elements entering the upper portion of the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleId(item.id);
          }
        },
        // Top offset = jump bar height (~36px); bottom = only trigger when card
        // is in upper 30% of viewport so the active label tracks card arrival.
        { rootMargin: "-36px 0px -70% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  const handleTap = (id: string) => {
    setVisibleId(id);
    onSelect(id);
  };

  return (
    <div className="l2-jump-bar" aria-label="Jump to section">
      <div className="l2-jump-bar-inner">
        {items.map((item) => (
          <button
            key={item.id}
            className={`l2-jump-bar-btn${visibleId === item.id ? " l2-jump-bar-btn--active" : ""}`}
            onClick={() => handleTap(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
