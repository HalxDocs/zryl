import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="flex items-center gap-2.5">
            <Terminal size={14} className="text-zinc-600" />
            <span className="text-sm font-bold tracking-tighter text-white uppercase italic">
              zryl
            </span>
          </div>

          {/* Right: Links + Status */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/HalxDocs/zryl"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-zinc-500 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Operational
              </span>
            </div>
            <span className="text-[10px] text-zinc-700">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
