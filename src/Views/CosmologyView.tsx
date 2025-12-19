import { useEffect, useRef, useState } from "react";

type NodeID = "ONE" | "one" | "Self" | "one+" | "ONE+" | "infinity";

interface Node {
  id: NodeID;
  label: string;
  subtitle: string;
  y: number;
}

const NODES: Node[] = [
  { id: "ONE", label: "ONE", subtitle: "Absolute Void", y: 80 },
  { id: "one", label: "one", subtitle: "Vortex / Focus", y: 170 },
  { id: "Self", label: "Self", subtitle: "Self-Awareness", y: 260 },
  { id: "one+", label: "one+", subtitle: "Embodied", y: 350 },
  { id: "ONE+", label: "ONE+", subtitle: "Value Fulfilled", y: 440 },
  { id: "infinity", label: "∞", subtitle: "Open Future", y: 540 },
];

export default function CosmologyView() {
  const [collapsed, setCollapsed] = useState<Record<NodeID, boolean>>({});
  const [animate, setAnimate] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) return;
    const loop = () => {
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [animate]);

  const toggle = (id: NodeID) =>
    setCollapsed(c => ({ ...c, [id]: !c[id] }));

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0b1020] to-black overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => setAnimate(a => !a)}
          className="px-3 py-2 rounded bg-gray-800 text-white touch-manipulation"
        >
          {animate ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setCollapsed({})}
          className="px-3 py-2 rounded bg-gray-800 text-white touch-manipulation"
        >
          Reset
        </button>
      </div>

      {/* SVG */}
      <svg
        viewBox="0 0 400 620"
        className="w-full h-full pointer-events-none"
        style={{ touchAction: "manipulation" }}
      >
        {/* Vertical axis */}
        <line
          x1="200"
          y1="40"
          x2="200"
          y2="580"
          stroke="rgba(180,160,255,0.3)"
          strokeDasharray="4 6"
        />

        {NODES.map(node => {
          const hidden = collapsed[node.id];
          return (
            <g
              key={node.id}
              transform={`translate(200, ${node.y})`}
              onClick={() => toggle(node.id)}
              className="cursor-pointer pointer-events-auto"
            >
              <circle
                r={hidden ? 14 : 26}
                fill="rgba(140,120,255,0.15)"
                stroke="rgba(180,160,255,0.8)"
                strokeWidth={2}
              />
              {!hidden && (
                <>
                  <text
                    y={4}
                    textAnchor="middle"
                    fill="white"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {node.label}
                  </text>
                  <text
                    y={22}
                    textAnchor="middle"
                    fill="rgba(200,200,255,0.7)"
                    fontSize={10}
                  >
                    {node.subtitle}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
