'use client';

import { useState, useEffect } from 'react';

interface GrammarData {
  categories: Record<string, Record<string, string>>;
  directMappings: Record<string, string>;
}

export default function GrammarPlayground() {
  const [grammar, setGrammar] = useState<GrammarData | null>(null);
  const [nounSlot, setNounSlot] = useState<string | null>(null);
  const [verbSlot, setVerbSlot] = useState<string | null>(null);
  const [otherBlocks, setOtherBlocks] = useState<string[]>([]);
  const [isIngMode, setIsIngMode] = useState(false);
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

  if (loading) return <div className="text-center p-10 font-black animate-pulse text-2xl">LOADING VIBES...</div>;

  const nouns = grammar?.categories.noun ? Object.keys(grammar.categories.noun) : [];
  const verbs = grammar?.categories.verb ? Object.keys(grammar.categories.verb) : [];
  
  const categorizedKeys = new Set([...nouns, ...verbs]);
  const others = grammar ? [
    ...Object.entries(grammar.categories)
      .filter(([cat]) => cat !== 'noun' && cat !== 'verb')
      .flatMap(([_, mapping]) => Object.keys(mapping)),
    ...Object.keys(grammar.directMappings)
  ].filter(key => !categorizedKeys.has(key)).sort() : [];

  const handleAddNoun = (term: string) => {
    setNounSlot(term);
    setTranslatedResult('');
  };

  const handleAddVerb = (term: string) => {
    setVerbSlot(term);
    setTranslatedResult('');
  };

  const handleAddOther = (term: string) => {
    setOtherBlocks([...otherBlocks, term]);
    setTranslatedResult('');
  };

  const handleTranslate = async () => {
    const parts = [];
    if (nounSlot) parts.push(nounSlot);
    if (verbSlot) {
      let v = verbSlot;
      if (isIngMode) {
        // Simple heuristic for -ing
        if (v.endsWith('e')) v = v.slice(0, -1) + 'ing';
        else if (!v.endsWith('ing')) v = v + 'ing';
      }
      parts.push(v);
    }
    parts.push(...otherBlocks);

    const text = parts.join(' ');
    if (!text.trim()) return;

    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate/to-alpha-x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setTranslatedResult(data.translated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  const clearAll = () => {
    setNounSlot(null);
    setVerbSlot(null);
    setOtherBlocks([]);
    setTranslatedResult('');
  };

  return (
    <section className="mt-12 bg-white border-8 border-black p-8 rounded-[3rem] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
          🧩 Grammar Lab
        </h2>
        <button 
          onClick={() => setIsIngMode(!isIngMode)}
          className={`px-4 py-2 rounded-full font-black border-4 border-black transition-all ${isIngMode ? 'bg-yellow-400 scale-110 shadow-[4px_4px_0px_0px_black]' : 'bg-gray-200 opacity-50'}`}
        >
          {isIngMode ? '-ING MODE ON 🔥' : '-ing mode off'}
        </button>
      </div>

      {/* Grammar Slots */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Noun Slot */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-blue-500 ml-2">Subject Slot (Nouns Only)</label>
          <div className="h-24 border-4 border-dashed border-blue-200 rounded-2xl bg-blue-50 flex items-center justify-center relative group overflow-hidden">
            {nounSlot ? (
              <button 
                onClick={() => setNounSlot(null)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_black] hover:bg-red-500 transition-colors"
              >
                {nounSlot}
              </button>
            ) : (
              <span className="text-blue-200 font-black italic uppercase text-sm">Drop Noun Here</span>
            )}
          </div>
        </div>

        {/* Verb Slot */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-green-500 ml-2">Action Slot (Verbs Only)</label>
          <div className="h-24 border-4 border-dashed border-green-200 rounded-2xl bg-green-50 flex items-center justify-center relative group overflow-hidden">
            {verbSlot ? (
              <button 
                onClick={() => setVerbSlot(null)}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_black] hover:bg-red-500 transition-colors"
              >
                {verbSlot}{isIngMode && (verbSlot.endsWith('e') ? 'ing' : !verbSlot.endsWith('ing') ? 'ing' : '')}
              </button>
            ) : (
              <span className="text-green-200 font-black italic uppercase text-sm">Drop Verb Here</span>
            )}
          </div>
        </div>

        {/* Others Slot */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-gray-400 ml-2">Flavor Text (Others)</label>
          <div className="min-h-24 p-2 border-4 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-wrap gap-2 items-center justify-center">
            {otherBlocks.map((block, i) => (
              <button 
                key={i}
                onClick={() => setOtherBlocks(otherBlocks.filter((_, idx) => idx !== i))}
                className="bg-gray-800 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_black] hover:bg-red-500"
              >
                {block}
              </button>
            ))}
            {otherBlocks.length === 0 && <span className="text-gray-200 font-black italic uppercase text-sm">Add Extras</span>}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="mb-12 flex gap-4">
        <button
          onClick={handleTranslate}
          disabled={isTranslating || (!nounSlot && !verbSlot && otherBlocks.length === 0)}
          className="flex-1 bg-black text-white py-5 rounded-[2rem] font-black text-2xl uppercase tracking-tighter shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-30"
        >
          {isTranslating ? 'COOKING...' : 'GLOW UP FULL SENTENCE ✨'}
        </button>
        <button onClick={clearAll} className="px-8 border-4 border-black rounded-[2rem] font-black uppercase hover:bg-red-100 transition-colors">Clear</button>
      </div>

      {/* Result Display */}
      {translatedResult && (
        <div className="mb-12 bg-yellow-300 border-8 border-black p-8 rounded-[2rem] shadow-[12px_12px_0px_0px_black] animate-in zoom-in-95 duration-200">
          <p className="text-xs font-black uppercase mb-2 tracking-[0.2em] text-black/50 italic">Generated Alpha-x</p>
          <p className="text-4xl font-black text-black italic leading-none">{translatedResult}</p>
        </div>
      )}

      {/* Categorized Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Nouns Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-center font-black uppercase italic bg-blue-600 text-white py-2 rounded-xl shadow-[4px_4px_0px_0px_black]">Nouns</h3>
          <div className="flex flex-wrap gap-2 content-start">
            {nouns.map(n => (
              <button key={n} onClick={() => handleAddNoun(n)} className="bg-blue-400 text-black border-2 border-black px-3 py-1 rounded-md font-bold text-sm shadow-[2px_2px_0px_0px_black] hover:bg-blue-300">
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Verbs Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-center font-black uppercase italic bg-green-600 text-white py-2 rounded-xl shadow-[4px_4px_0px_0px_black]">Verbs</h3>
          <div className="flex flex-wrap gap-2 content-start">
            {verbs.map(v => (
              <button key={v} onClick={() => handleAddVerb(v)} className="bg-green-400 text-black border-2 border-black px-3 py-1 rounded-md font-bold text-sm shadow-[2px_2px_0px_0px_black] hover:bg-green-300">
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Others Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-center font-black uppercase italic bg-gray-600 text-white py-2 rounded-xl shadow-[4px_4px_0px_0px_black]">Others</h3>
          <div className="flex flex-wrap gap-2 content-start">
            {others.map(o => (
              <button key={o} onClick={() => handleAddOther(o)} className="bg-gray-200 text-black border-2 border-black px-3 py-1 rounded-md font-bold text-sm shadow-[2px_2px_0px_0px_black] hover:bg-white">
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
