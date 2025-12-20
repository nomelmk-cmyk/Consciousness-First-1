import { useState, useMemo } from "react";
import { DICTIONARY_TERMS } from "../data/dictionary";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="relative w-full h-full bg-gradient-to-b from-[#0b1020] to-black flex flex-col">
      {/* Search */}
      <div className="p-6">
        <Input
          placeholder="Search terms or definitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md bg-gray-900/80 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
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

        {/* Terms */}
        <ScrollArea className="flex-1 p-6">
          {filteredTerms.length === 0 ? (
            <p className="text-center text-gray-500 mt-20 text-lg">
              No terms found
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTerms.map((term) => (
                <Card
                  key={term.id}
                  className="bg-gray-900/60 border-gray-800 hover:border-purple-600 transition-all duration-300 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-purple-300 text-2xl font-light">
                      {term.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed text-base">
                      {term.definition}
                    </p>
                    {term.related && term.related.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-800">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
