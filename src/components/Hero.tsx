export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#000000] px-6 pt-32 overflow-hidden">
      
      {/* Background Ambience - Outray Style */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-125 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        
        {/* YC Badge - Refined to 'Hardware' style */}
        <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-zinc-950 border border-white/8 shadow-2xl">
            <span className="flex items-center justify-center w-4 h-4 rounded-[3px] bg-orange-500 text-black text-[9px] font-black leading-none">
              Y
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
              Not backed by Y Combinator
            </span>
          </div>
        </div>

        {/* Headline - Bold, Tight, and Impactful */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-10">
          Stop screenshotting <br />
          <span className="text-zinc-600 italic group-hover:text-blue-500 transition-colors duration-500">
            your terminal.
          </span>
        </h1>

        {/* Description - Modern Sans with relaxed leading */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-medium leading-relaxed mb-12">
  zryl is an open-source CLI that saves exactly what happened when you ran a command — 
  <span className="text-white">the output, the result, and the context it ran in</span> — 
  and gives you a single link you can share.
</p>


        {/* This is where you will drop your <Waitlist /> and <Terminal /> components */}
      </div>
      
      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-20" />
    </section>
  );
}