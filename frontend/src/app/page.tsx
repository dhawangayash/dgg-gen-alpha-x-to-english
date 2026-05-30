import TranslationSection from './components/TranslationSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] p-8 md:p-12 font-sans selection:bg-yellow-300">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
            Alpha-x <span className="text-blue-600">Translator</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-widest italic">
            English to Gen Z Slang • No Cap • Real Talk
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* English to Alpha-x */}
          <TranslationSection
            title="English to Alpha-x"
            placeholder="Type some mid English here..."
            buttonText="Glow Up"
            apiUrl="/api/translate/to-alpha-x"
            bgColor="bg-blue-400"
            emoji="🧢"
          />

          {/* Alpha-x to English */}
          <TranslationSection
            title="Alpha-x to English"
            placeholder="Type some bussin Alpha-x here..."
            buttonText="Un-vibe"
            apiUrl="/api/translate/to-english"
            bgColor="bg-yellow-400"
            emoji="📚"
          />
        </div>

        <footer className="mt-20 text-center">
          <div className="inline-block bg-black text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:scale-110 transition-transform cursor-default">
            Built with ✨ Vibes ✨
          </div>
          <p className="mt-4 font-bold text-gray-400 uppercase text-xs tracking-tighter">
            Powered by Spring Boot + Next.js + Rule-based Grammar
          </p>
        </footer>
      </div>
    </main>
  );
}
