import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { Terminal, Activity, ChevronRight, Hash, Clock, Globe } from "lucide-react";

type Status = "running" | "success" | "error";

type Run = {
  id: string;
  command: string;
  output: string[];
  status: Status;
  created_at: string;
};

export default function RunDashboard() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    supabase
      .from("runs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        setRuns(data);
        setActiveRunId(data[0].id);
        setStreamIndex(0);
      });
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("runs-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "runs" },
        (payload) => {
          const newRun = payload.new as Run;
          setRuns((prev) => [newRun, ...prev].slice(0, 5));
          setActiveRunId(newRun.id);
          setStreamIndex(0);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "runs" },
        (payload) => {
          const updatedRun = payload.new as Run;
          setRuns((prev) =>
            prev.map((r) => (r.id === updatedRun.id ? updatedRun : r))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const activeRun = runs.find((r) => r.id === activeRunId);

  useEffect(() => {
    if (!activeRun) return;
    setStreamIndex(0);
  }, [activeRunId]);

  const visibleOutput = activeRun?.output.slice(0, streamIndex) ?? [];

  useEffect(() => {
    if (!activeRun) return;
    if (streamIndex >= activeRun.output.length) return;

    const timer = setTimeout(() => {
      setStreamIndex((i) => i + 1);
    }, 150); // Faster streaming for a snappier feel

    return () => clearTimeout(timer);
  }, [streamIndex, activeRun]);

  return (
    <section className="relative mt-24 max-w-5xl mx-auto px-6">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-[3rem] pointer-events-none" />

      <div className="relative bg-zinc-950 border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Dashboard Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-zinc-900/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 flex items-center gap-2">
              <Activity size={12} className="text-blue-500" />
              Live Telemetry Dashboard
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-tighter">Realtime Link Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-100">
          
          {/* Sidebar: Run History */}
          <div className="md:col-span-4 border-r border-white/5 bg-black/40">
            <div className="p-3 border-b border-white/5 bg-zinc-900/10">
              <span className="text-[9px] uppercase font-bold text-zinc-600 tracking-widest">Recent Artifacts</span>
            </div>
            <div className="divide-y divide-white/5">
              {runs.map((run) => {
                const isActive = run.id === activeRunId;
                return (
                  <button
                    key={run.id}
                    onClick={() => setActiveRunId(run.id)}
                    className={`w-full text-left px-5 py-4 transition-all duration-300 group hover:bg-white/2 ${
                      isActive ? "bg-white/4" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <span className={`font-mono text-xs ${isActive ? "text-blue-400" : "text-zinc-400"}`}>
                          $ {run.command.slice(0, 20)}{run.command.length > 20 ? '...' : ''}
                        </span>
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                          run.status === "success" ? "bg-green-500" : run.status === "error" ? "bg-red-500" : "bg-yellow-500 animate-pulse"
                        }`} />
                      </div>
                      <span className="text-[9px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors capitalize flex items-center gap-2">
                        <Hash size={10} /> {run.id.slice(0, 8)} • <Clock size={10} /> {new Date(run.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main: Active Output Window */}
          <div className="md:col-span-8 flex flex-col bg-black">
            {activeRun ? (
              <>
                {/* Meta Bar */}
                <div className="px-6 py-3 bg-zinc-900/30 border-b border-white/5 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-zinc-600" />
                    <span className="text-[10px] font-mono text-zinc-500">Origin: 127.0.0.1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-zinc-600" />
                    <span className="text-[10px] font-mono text-zinc-500">Shell: zsh/zryl</span>
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="relative p-8 font-mono text-sm leading-relaxed overflow-y-auto max-h-100 scrollbar-hide">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-blue-500 font-bold">❯</span>
                    <span className="text-white font-bold tracking-tight">{activeRun.command}</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {visibleOutput.map((line, i) => (
                      <div key={i} className="text-zinc-400 animate-in fade-in slide-in-from-left-2 duration-300 border-l border-white/5 pl-4">
                        {line}
                      </div>
                    ))}
                    {streamIndex < (activeRun.output.length) && (
                      <div className="w-2 h-4 bg-blue-500 animate-pulse inline-block ml-4 mt-1" />
                    )}
                  </div>

                  {visibleOutput.length === activeRun.output.length && (
                    <div className="mt-10 animate-in fade-in zoom-in-95 duration-700">
                      <Link
                        to={`/run/${activeRun.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all group"
                      >
                        Explore Artifact
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Scanline Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-size-[100%_4px,3px_100%]" />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 gap-4">
                <Terminal size={40} className="opacity-20" />
                <span className="text-xs font-mono tracking-widest uppercase">Initializing Stream...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-6 flex justify-between items-center px-2">
        <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">System.Node_01 // Region.US_East</span>
        <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">Capture_Engine v1.0.4</span>
      </div>
    </section>
  );
}