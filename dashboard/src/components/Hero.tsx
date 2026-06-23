import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "../lib/copy";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const installCmd = "curl -fsSL https://zryl.vercel.app/install.sh | sh";

  const handleCopy = async () => {
    try {
      await copyToClipboard(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fail silently
    }
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#000000] px-6 pt-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-600/[0.04] blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Beta badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
              v0.1 beta
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[0.9] mb-6">
          Stop screenshotting
          <br />
          <span className="text-zinc-600">your terminal.</span>
        </h1>

        {/* Description */}
        <p className="max-w-xl mx-auto text-base md:text-lg text-zinc-400 leading-relaxed mb-10">
          zryl captures exactly what happened when a command ran — the output,
          the result, the context — and gives you a link to share it.
        </p>

        {/* Install snippet */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 overflow-hidden">
              <span className="text-zinc-600 mr-2 select-none">$</span>
              <code className="flex-1 text-sm font-mono text-zinc-300 truncate text-left">
                {installCmd}
              </code>
              <button
                onClick={handleCopy}
                className="ml-3 shrink-0 p-1.5 rounded-md hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
                aria-label="Copy install command"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-zinc-500">
          <span className="font-mono">
            <span className="text-zinc-700">$</span>{" "}
            <span className="text-zinc-400">zryl run npm test</span>
          </span>
          <span className="hidden sm:inline text-zinc-700">→</span>
          <span className="text-zinc-600">zryl.vercel.app/run/ca312...</span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}
