
import { Github, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-black overflow-hidden">
      {/* Subtle background grain or grid for texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-size-[30px_30px] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Brand Identity */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center transition-all group-hover:border-blue-500/50">
                <Terminal size={14} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tighter uppercase italic leading-none">
                  zryl
                </span>
                <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mt-1">
                  Provenance Engine
                </span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono max-w-60 text-center md:text-left leading-relaxed">
              Standardizing the way developers capture and share command-line executions.
            </p>
          </div>

          {/* Center/Right: System Status & Links */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/HalxDocs/zryl"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-all group"
              >
                <Github size={14} className="group-hover:rotate-12 transition-transform" />
                <span>GITHUB</span>
              </a>
              {/* <a
                href="#"
                className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-all group"
              >
                <Globe size={14} className="group-hover:animate-pulse" />
                <span>DOCUMENTATION</span>
              </a> */}
            </div>

            <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-zinc-950 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System Operational</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-[10px] font-mono text-zinc-600 uppercase">
                © {new Date().getFullYear()} zryl_labs
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Hardware Tagline */}
        <div className="mt-12 pt-8 border-t border-white/3 flex flex-col md:flex-row items-center justify-between opacity-40">
           <span className="text-[9px] font-mono text-zinc-700 tracking-[0.4em] uppercase">
             Build. Capture. Share.
           </span>
           <span className="text-[9px] font-mono text-zinc-700 tracking-[0.4em] uppercase">
             0x3F9A_PROVENANCE_READY
           </span>
        </div>
      </div>
    </footer>
  );
}