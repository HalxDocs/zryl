import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import {
  Terminal,
  Activity,
  ChevronRight,
  Hash,
  Clock,
  Copy,
  Check,
} from "lucide-react";

/* ---------------- Types ---------------- */

type Run = {
  id: string;
  command: string;
  stdout: string[] | null;
  stderr: string[] | null;
  exit_code: number | null;
  created_at: string;
  visibility: "public" | "private";
};

type Status = "running" | "success" | "error";

/* ---------------- Helpers ---------------- */

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    success: "bg-green-500/20 text-green-400",
    error: "bg-red-500/20 text-red-400",
    running: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}

/* ---------------- Component ---------------- */

export default function RunDashboard() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [streamIndex, setStreamIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [limit, setLimit] = useState(5);

  /* ---------------- Fetch runs ---------------- */

  useEffect(() => {
    let cancelled = false;

    async function fetchRuns() {
      const { data } = await supabase
        .from("runs")
        .select("*")
        .eq("visibility", "public")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (!cancelled && data) {
        setRuns(data);
      }
    }

    fetchRuns();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  /* ---------------- Realtime ---------------- */

  useEffect(() => {
    const channel = supabase
      .channel("runs-public")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "runs",
          filter: "visibility=eq.public",
        },
        (payload) => {
          const newRun = payload.new as Run;
          setRuns((prev) => [newRun, ...prev].slice(0, limit));
          setActiveRunId(newRun.id);
          setStreamIndex(0);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "runs",
          filter: "visibility=eq.public",
        },
        (payload) => {
          const updated = payload.new as Run;
          setRuns((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  /* ---------------- Active run safety ---------------- */

  useEffect(() => {
    if (runs.length === 0) {
      setActiveRunId(null);
      return;
    }

    if (!activeRunId || !runs.some((r) => r.id === activeRunId)) {
      setActiveRunId(runs[0].id);
    }
  }, [runs, activeRunId]);

  /* ---------------- Derived state ---------------- */

  const activeRun = runs.find((r) => r.id === activeRunId) ?? null;

  const output = useMemo(() => {
    if (!activeRun) return [];
    return [...(activeRun.stdout ?? []), ...(activeRun.stderr ?? [])];
  }, [activeRun]);

  const status: Status = useMemo(() => {
    if (!activeRun || activeRun.exit_code === null) return "running";
    return activeRun.exit_code === 0 ? "success" : "error";
  }, [activeRun]);

  const visibleOutput = output.slice(0, streamIndex);

  useEffect(() => {
    if (streamIndex >= output.length) return;
    const t = setTimeout(() => setStreamIndex((i) => i + 1), 120);
    return () => clearTimeout(t);
  }, [streamIndex, output.length]);

  useEffect(() => {
    setStreamIndex(0);
  }, [activeRunId]);

  /* ---------------- UI ---------------- */

  return (
    <section className="relative mt-24 max-w-5xl mx-auto px-6">
      <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-[3rem]" />

      <div className="relative bg-zinc-950 border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-white/5 bg-zinc-900/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-blue-500" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
              Live Telemetry Dashboard
            </span>
          </div>
          {activeRun && <StatusBadge status={status} />}
        </div>

        <div className="grid md:grid-cols-12 min-h-[480px]">
          {/* Sidebar */}
          <div className="md:col-span-4 border-r border-white/5">
            {runs.map((run) => (
              <button
                key={run.id}
                onClick={() => setActiveRunId(run.id)}
                className={`w-full px-4 py-3 text-left hover:bg-white/5 ${
                  run.id === activeRunId ? "bg-white/5" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-blue-400">
                    $ {run.command.slice(0, 24)}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      run.exit_code === null
                        ? "bg-yellow-500"
                        : run.exit_code === 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="text-[9px] text-zinc-600 flex gap-2 items-center mt-1">
                  <Hash size={10} />
                  {run.id.slice(0, 8)}
                  <Clock size={10} />
                  {new Date(run.created_at).toLocaleTimeString()}
                </div>
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="md:col-span-8 p-6 font-mono text-sm overflow-y-auto">
            {activeRun ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Terminal size={14} />
                    <span className="text-white font-bold">
                      {activeRun.command}
                    </span>
                  </div>

                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(output.join("\n"));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="flex items-center gap-2 text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                {visibleOutput.map((line, i) => (
                  <div key={i} className="text-zinc-400 pl-4 border-l border-white/5">
                    {line}
                  </div>
                ))}

                {streamIndex >= output.length && (
                  <Link
                    to={`/run/${activeRun.id}`}
                    className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white text-black rounded text-xs font-bold hover:bg-blue-500 hover:text-white"
                  >
                    View Full Run <ChevronRight size={14} />
                  </Link>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-600">
                No runs yet
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}