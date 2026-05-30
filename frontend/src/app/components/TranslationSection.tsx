'use client';

import { useState } from 'react';

interface TranslationSectionProps {
  title: string;
  placeholder: string;
  buttonText: string;
  apiUrl: string;
  bgColor: string;
  emoji: string;
}

export default function TranslationSection({
  title,
  placeholder,
  buttonText,
  apiUrl,
  bgColor,
  emoji,
}: TranslationSectionProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Backend is taking an L. Is it running?');
      }

      const data = await response.json();
      setOutput(data.translated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went mid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-3xl shadow-xl ${bgColor} border-4 border-black transition-transform hover:scale-[1.02]`}>
      <h2 className="text-2xl font-black mb-4 flex items-center gap-2 italic uppercase tracking-tighter">
        <span>{emoji}</span> {title}
      </h2>
      
      <div className="flex flex-col gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full h-32 p-4 rounded-xl border-4 border-black bg-white text-black font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        />
        
        <button
          onClick={handleTranslate}
          disabled={isLoading || !input.trim()}
          className="bg-black text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          {isLoading ? 'Cooking...' : buttonText}
        </button>

        {error && (
          <div className="bg-red-400 border-4 border-black p-3 rounded-xl text-black font-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            💀 {error}
          </div>
        )}

        <div className="min-h-[100px] p-4 rounded-xl border-4 border-black bg-white/80 text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group">
          <p className="text-gray-400 text-xs absolute top-2 right-2 font-black uppercase italic">Result</p>
          <div className="mt-2 text-lg break-words leading-tight">
            {output || <span className="text-gray-300 italic">Translation will appear here...</span>}
          </div>
          {output && (
            <button 
              onClick={() => navigator.clipboard.writeText(output)}
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded-md uppercase font-black"
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
