import { useState } from "react";
import CosmologyView from "./CosmologyView";

type Tab = "cosmology" | "dictionary" | "simulator" | "practice";

export default function App() {
  const [tab, setTab] = useState<Tab>("cosmology");

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden">
      {/* Top Nav */}
      <div className="flex gap-2 p-3 justify-center">
        {(["cosmology", "dictionary", "simulator", "practice"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm capitalize touch-manipulation
              ${tab === t ? "bg-purple-600" : "bg-gray-800"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* View */}
      <div className="w-full h-[calc(100%-56px)]">
        {tab === "cosmology" && <CosmologyView />}
        {tab !== "cosmology" && (
          <div className="h-full flex items-center justify-center text-gray-500">
            {tab} view (coming next)
          </div>
        )}
      </div>
    </div>
  );
}
