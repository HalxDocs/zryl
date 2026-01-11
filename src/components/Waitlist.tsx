import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Terminal,
  Sparkles,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function joinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        setError("You’re already on the waitlist.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setSuccess(true);
      setEmail("");
    }

    setLoading(false);
  }

  return (
    <section
      id="waitlist"
      className="relative mt-20 md:mt-24 pb-28 md:pb-40 text-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Visual background anchor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-150 h-75 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/8 mb-6 md:mb-8">
          <Sparkles size={12} className="text-blue-500" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
            Early access · v0.1
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-tight">
          Secure your <span className="italic text-zinc-500">access.</span>
        </h2>

        <p className="text-zinc-400 font-medium text-base sm:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
          Get early access to a better way to
          <span className="text-white"> share what actually happened</span>{" "}
          when you run a command.
        </p>

        {!success ? (
          <div className="group relative max-w-md mx-auto">
            {/* Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

            <form
              onSubmit={joinWaitlist}
              className="relative flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 bg-zinc-950 border border-white/8 rounded-2xl transition-all duration-300 group-hover:border-white/20 shadow-2xl"
            >
              <div className="hidden sm:flex pl-4 pr-2 text-zinc-600">
                <Terminal size={18} />
              </div>

              <input
                type="email"
                required
                placeholder="developer@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent py-3 px-4 sm:px-0 text-white placeholder:text-zinc-700 focus:outline-none text-sm font-medium selection:bg-blue-500/30"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 disabled:opacity-50 text-black text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <span>Join</span>
                    <ChevronRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Footer hints */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                Input: Email
              </span>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                Status: Awaiting entry.
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-blue-500/20 flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="text-blue-500" size={28} />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
              You’re on the list
            </h3>
            <p className="text-zinc-500 text-sm font-medium text-center">
              We’ll notify you when zryl is ready.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-500 text-xs font-mono animate-in slide-in-from-top-2">
            <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
