import {
  FileText,
  Globe,
  Code,
  Zap,
  Share2,
  Terminal,
} from "lucide-react";

export default function WhatIsZryl() {
  return (
    <section className="relative mt-32 max-w-6xl mx-auto px-6 pb-24">
      <div className="absolute -top-24 left-0 w-64 h-64 bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left: Copy */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-mono tracking-[0.3em] text-blue-500 uppercase font-bold">
              How it works
            </h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-[0.95]">
              One command.
              <br />
              <span className="text-zinc-600">One link.</span>
            </h3>
          </div>

          <p className="text-zinc-400 leading-relaxed max-w-md">
            zryl wraps your command, captures everything — stdout, stderr, exit
            code, environment — and stores it as a single artifact you can share.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { icon: <Terminal size={14} />, label: "Run", desc: "zryl run <command>" },
              { icon: <FileText size={14} />, label: "Capture", desc: "stdout, stderr, exit code, env" },
              { icon: <Share2 size={14} />, label: "Share", desc: "one URL for the full run" },
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {step.label}
                  </span>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5 truncate">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-500/[0.02] blur-2xl rounded-3xl" />

          <div className="relative bg-zinc-950 border border-white/8 rounded-2xl p-6 shadow-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="font-mono text-xs text-zinc-500">terminal</span>
            </div>

            {/* Terminal output */}
            <div className="space-y-3 font-mono text-xs">
              <div className="text-zinc-500">
                <span className="text-blue-400">$</span> zryl run npm test
              </div>
              <div className="text-zinc-600 pl-4 space-y-0.5">
                <div> PASS  src/utils.test.ts</div>
                <div> PASS  src/api.test.ts</div>
                <div className="text-green-500/70">
                  {"✓"} 12 tests passed
                </div>
              </div>
              <div className="border-t border-white/5 pt-3 mt-3">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Globe size={12} />
                  <span>OS: linux/amd64</span>
                  <span className="text-zinc-700">·</span>
                  <span>exit: 0</span>
                  <span className="text-zinc-700">·</span>
                  <span>2.3s</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3 mt-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-green-500">✓</span>
                  <span className="text-green-400 font-bold">
                    zryl.vercel.app/run/3f9k...
                  </span>
                </div>
              </div>
            </div>

            {/* Data captured */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-3">
                Captured
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <FileText size={11} />, label: "stdout & stderr" },
                  { icon: <Zap size={11} />, label: "exit status" },
                  { icon: <Globe size={11} />, label: "OS, arch, cwd" },
                  { icon: <Code size={11} />, label: "timestamps" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[10px] text-zinc-500"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scanline texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-size-[20px_20px] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
