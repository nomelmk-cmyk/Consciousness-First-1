import { useState, useMemo } from "react";
import { DICTIONARY_TERMS } from "../data/dictionary";

export default function DictionaryView() {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = DICTIONARY_TERMS;

    if (search) {
      terms = terms.filter(
        (term) =>
          term.title.toLowerCase().includes(search.toLowerCase()) ||
          term.definition.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedLetter) {
      terms = terms.filter(
        (term) => term.title.charAt(0).toUpperCase() === selectedLetter
      );
    }

    return terms.sort((a, b) => a.title.localeCompare(b.title));
  }, [search, selectedLetter]);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0b1020] to-black flex flex-col overflow-hidden">
      {/* Search */}
      <div className="p-6">
        <input
          type="text"
          placeholder="Search terms or definitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Alphabet sidebar */}
        <div className="w-16 border-r border-gray-800 flex flex-col items-center py-6 gap-3 overflow-y-auto">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`text-sm font-medium transition ${
              !selectedLetter ? "text-purple-400" : "text-gray-500"
            } hover:text-purple-300`}
          >
            All
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`text-lg font-bold transition ${
                selectedLetter === letter ? "text-purple-400" : "text-gray-600"
              } hover:text-purple-300`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Terms list - simple cards with Tailwind */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTerms.length === 0 ? (
            <p className="text-center text-gray-500 mt-20 text-lg">
              No terms found
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTerms.map((term) => (
                <div
                  key={term.id}
                  className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-purple-600 transition-all duration-300 shadow-lg"
                >
                  <h3 className="text-purple-300 text-2xl font-light mb-4">
                    {term.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base mb-6">
                    {term.definition}
                  </p>
                  {term.related && term.related.length > 0 && (
                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-sm text-gray-500 mb-3">Related:</p>
                      <div className="flex flex-wrap gap-2">
                        {term.related.map((rel) => (
                          <span
                            key={rel}
                            className="text-sm bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full"
                          >
                            {rel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
