// src/data/dictionary.ts

export interface Term {
  id: string;          // Unique lowercase identifier (used internally)
  title: string;       // How the term appears in the dictionary (can have special chars like ∞)
  definition: string;  // The full explanation
  related?: string[];  // Optional: array of other term ids that are connected
}

export const DICTIONARY_TERMS: Term[] = [
  {
    id: "ONE",
    title: "ONE",
    definition: "The Absolute Void. Pure undifferentiated being. The ground of all possibility from which everything emerges and to which everything returns.",
    related: ["one", "infinity"],
  },
  {
    id: "one",
    title: "one",
    definition: "The primal vortex of potentiality. The first movement of focus and distinction arising from the Absolute Void (ONE).",
    related: ["ONE", "Self"],
  },
  {
    id: "self",
    title: "Self",
    definition: "The emergence of self-awareness. The point where consciousness recognizes itself as distinct yet still connected to the ground.",
    related: ["one", "one+"],
  },
  {
    id: "one+",
    title: "one+",
    definition: "Embodied consciousness. The integration of self-awareness into form, where the individual experiences limitation and expression in the world.",
    related: ["Self", "ONE+"],
  },
  {
    id: "ONE+",
    title: "ONE+",
    definition: "Value Fulfilled. The realization and embodiment of ultimate meaning, where the individual consciously aligns with and expresses the Absolute.",
    related: ["one+", "infinity"],
  },
  {
    id: "infinity",
    title: "∞",
    definition: "Open Future. Infinite unfolding possibility. The eternal horizon of becoming that remains forever beyond complete grasp, inviting continual exploration.",
    related: ["ONE", "ONE+"],
  },
  // Add more terms here as your dictionary grows!
];
