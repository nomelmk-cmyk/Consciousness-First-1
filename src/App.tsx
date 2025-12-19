import { useState } from "react";
import CosmologyView from "./Views/CosmologyView";

type Tab = "cosmology" | "dictionary" | "simulator" | "practice";

export default function App() {
  const [tab, setTab] = useState<Tab>("cosmology");

  return (
    <div className="w-screen h-screen text-white bg-black">
      {/* Top Nav */}
      <div className="flex gap-2 p-3 bg-black/60 backdrop-blur">
        {(["cosmology", "dictionary", "simulator", "practice"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg capitalize touch-manipulation ${
              tab === t ? "bg-purple-600" : "bg-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* View */}
      <div className="w-full h-[calc(100vh-56px)]">
        {tab === "cosmology" && <CosmologyView />}
        {tab !== "cosmology" && (
          <div className="flex items-center justify-center h-full opacity-60">
            {tab} coming soon
          </div>
        )}
      </div>
    </div>
  );
}
