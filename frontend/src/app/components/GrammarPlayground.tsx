'use client';

import { useState, useEffect } from 'react';

interface GrammarData {
  categories: Record<string, Record<string, string>>;
  directMappings: Record<string, string>;
}

export default function GrammarPlayground() {
  const [grammar, setGrammar] = useState<GrammarData | null>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [translatedResult, setTranslatedResult] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/grammar')
      .then((res) => res.json())
      .then((data) => {
        setGrammar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const englishTerms = grammar ? [
    ...Object.values(grammar.categories).flatMap(cat => Object.keys(cat)),
    ...Object.keys(grammar.directMappings)
  ].sort() : [];

  // Remove duplicates
  const uniqueTerms = Array.from(new Set(englishTerms));

  const addBlock = (term: string) => {
    setSelectedBlocks([...selectedBlocks, term]);
  };

  const removeBlock = (index: number) => {
    setSelectedBlocks(selectedBlocks.filter((_, i) => i !== index));
    setTranslatedResult('');
  };

  const handleTranslateBlocks = async () => {
    if (selectedBlocks.length === 0) return;
    
    setIsTranslating(true);
    const text = selectedBlocks.join(' ');
    
    try {
      const response = await fetch('/api/translate/to-alpha-x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) throw new Error('Translation failed');
      
      const data = await response.json();
      setTranslatedResult(data.translated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  if (loading) return <div className="text-center p-10 font-black animate-pulse">LOADING VIBES...</div>;

  return (
    <section className="mt-12 bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter flex items-center gap-3">
        🧩 Grammar Playground
      </h2>

      <div className="mb-8">
        <h3 className="text-sm font-black uppercase text-gray-400 mb-3 tracking-widest">Grammar Structure Placeholder</h3>
        <div className="min-h-[120px] p-6 border-4 border-dashed border-gray-300 rounded-2xl flex flex-wrap gap-3 items-center bg-gray-50 relative group transition-all">
          {selectedBlocks.length === 0 && (
            <p className="text-gray-300 italic font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Add blocks below to build a sentence...
            </p>
          )}
          {selectedBlocks.map((block, index) => (
            <button
              key={index}
              onClick={() => removeBlock(index)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500 transition-colors relative group/block"
            >
              {block}
              <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover/block:opacity-100">✕</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={handleTranslateBlocks}
            disabled={selectedBlocks.length === 0 || isTranslating}
            className="w-full sm:w-auto bg-green-500 text-black border-4 border-black px-8 py-3 rounded-xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-400 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:bg-gray-200 disabled:shadow-none disabled:opacity-50 transition-all"
          >
            {isTranslating ? 'Cooking...' : 'Glow Up Blocks ✨'}
          </button>
          
          {selectedBlocks.length > 0 && (
            <button 
              onClick={() => { setSelectedBlocks([]); setTranslatedResult(''); }}
              className="text-xs font-black uppercase text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {translatedResult && (
          <div className="mt-8 bg-blue-50 border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-xs font-black uppercase text-blue-400 mb-2 italic">Alpha-x Output</p>
            <p className="text-2xl font-black text-blue-700 italic tracking-tight">{translatedResult}</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-black uppercase text-gray-400 mb-3 tracking-widest text-center">Available English Blocks</h3>
        <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto p-4 border-2 border-gray-100 rounded-xl bg-gray-50 scrollbar-hide">
          {uniqueTerms.map((term) => (
            <button
              key={term}
              onClick={() => addBlock(term)}
              className="bg-blue-400 text-white px-3 py-1 rounded-md font-bold text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all active:bg-blue-600"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
