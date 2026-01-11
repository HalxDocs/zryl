import {
  FileText,
  Globe,
  Code,
  Zap,
  Share2,
  Terminal,
  ChevronRight,
} from "lucide-react";

export default function WhatIsZryl() {
  return (
    <section className="relative mt-48 max-w-6xl mx-auto px-6 pb-24">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: High-Contrast Copy */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-sm font-mono tracking-[0.3em] text-blue-500 uppercase font-bold">
              Execution history
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
              Commands shouldn’t disappear <span className="italic text-zinc-600">after they run.</span>
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-xl text-zinc-400 leading-relaxed font-medium">
              zryl gives you a reliable record of your CLI runs. It captures
              <span className="text-white"> exactly what happened </span>
              when a command executed — without guesswork or screenshots.
            </p>

            <div className="space-y-4 border-l border-white/10 pl-6 py-2">
              <p className="text-zinc-500 text-sm leading-relaxed italic">
                “If you’ve ever pasted terminal output into Slack or sent a screenshot
                just to show an error, you already know how messy this gets.”
              </p>
              <p className="text-zinc-400 leading-relaxed">
                zryl collects stdout, exit status, and runtime details into a
                <span className="text-white"> single, unchanging artifact</span>.
                One command. One link. No confusion.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tighter">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Execution context
              </span>
            </div>
            <div className="w-1px h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tighter">∞</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Stored artifacts
              </span>
            </div>
          </div>
        </div>

        {/* Right: The "Capture Architecture" Visual */}
        <div className="relative group">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-4 bg-white/2 rounded-4xl blur-2xl group-hover:bg-blue-500/5 transition-all duration-700" />

          <div className="relative bg-zinc-950 border border-white/8 rounded-2xl p-8 shadow-2xl overflow-hidden">
            {/* Top Bar: Input Prompt */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Terminal size={16} className="text-blue-500" />
                </div>
                <span className="font-mono text-xs text-zinc-400">
                  $ zryl npm test
                </span>
              </div>
              <div className="px-2 py-1 rounded bg-zinc-900 text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                Capturing
              </div>
            </div>

            {/* Data Extraction Visualization */}
            <div className="space-y-4">
              {[
                { icon: <FileText size={14} />, label: "OUTPUT", val: "stdout & stderr" },
                { icon: <Zap size={14} />, label: "RESULT", val: "exit status" },
                { icon: <Globe size={14} />, label: "ENVIRONMENT", val: "OS, arch, env" },
                { icon: <Code size={14} />, label: "DETAILS", val: "timestamps, IDs" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/4 group/item hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-500 group-hover/item:text-blue-500 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-hover/item:text-zinc-300 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-500/60 font-bold tracking-tighter">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Downward Arrow to Result */}
            <div className="flex justify-center my-6">
              <div className="h-8 w-1px bg-linear-to-b from-blue-500/50 to-transparent" />
            </div>

            {/* Final Artifact Output */}
            <div className="bg-blue-600 p-4 rounded-xl flex items-center justify-between group/link cursor-pointer overflow-hidden relative shadow-lg shadow-blue-900/20">
              <div className="flex items-center gap-3 relative z-10">
                <Share2 size={16} className="text-black" />
                <span className="font-mono text-xs font-black text-black">
                  zryl.sh/run/3f9k
                </span>
              </div>
              <ChevronRight
                size={16}
                className="text-black group-hover/link:translate-x-1 transition-transform relative z-10"
              />

              {/* Animated Inner Shimmer */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Background Scanline Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-size-[20px_20px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
