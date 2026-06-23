import { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import {
  Terminal,
  ChevronRight,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { copyToClipboard } from "../lib/copy";

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

/* ---------------- Constants ---------------- */

const LIMIT = 5;

/* ---------------- Component ---------------- */

export default function RunDashboard() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [streamIndex, setStreamIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  /* ---------------- Fetch runs ---------------- */

  useEffect(() => {
    let cancelled = false;

    async function fetchRuns() {
      const { data, error } = await supabase
        .from("runs")
        .select("*")
        .eq("visibility", "public")
        .order("created_at", { ascending: false })
        .limit(LIMIT);

      if (cancelled) return;

      if (error) {
        setFetchError(error.message);
        return;
      }

      if (data) {
        setRuns(data);
      }
    }

    fetchRuns();
    return () => {
      cancelled = true;
    };
  }, []);

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
          setRuns((prev) => [newRun, ...prev].slice(0, LIMIT));
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
  }, []);

  /* ---------------- Derived state ---------------- */

  const resolvedActiveRunId = useMemo(() => {
    if (activeRunId && runs.some((r) => r.id === activeRunId)) {
      return activeRunId;
    }
    return runs.length > 0 ? runs[0].id : null;
  }, [activeRunId, runs]);

  const activeRun = useMemo(
    () => runs.find((r) => r.id === resolvedActiveRunId) ?? null,
    [runs, resolvedActiveRunId]
  );

  const output = useMemo(() => {
    if (!activeRun) return [];
    return [...(activeRun.stdout ?? []), ...(activeRun.stderr ?? [])];
  }, [activeRun]);

  const visibleOutput = output.slice(0, streamIndex);

  useEffect(() => {
    if (streamIndex >= output.length) return;
    const t = setTimeout(() => setStreamIndex((i) => i + 1), 100);
    return () => clearTimeout(t);
  }, [streamIndex, output.length]);

  const handleSelectRun = useCallback((id: string) => {
    setActiveRunId(id);
    setStreamIndex(0);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(output.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fail silently
    }
  }, [output]);

  /* ---------------- UI ---------------- */

  return (
    <section className="relative mt-20 max-w-5xl mx-auto px-6">
      <div className="absolute -inset-4 bg-blue-500/[0.03] blur-3xl rounded-[3rem] pointer-events-none" />

      <div className="relative bg-zinc-950 border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="px-5 py-3 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500">
              Recent runs
            </span>
          </div>
          {activeRun && (
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                activeRun.exit_code === null
                  ? "text-yellow-400 bg-yellow-500/10"
                  : activeRun.exit_code === 0
                  ? "text-green-400 bg-green-500/10"
                  : "text-red-400 bg-red-500/10"
              }`}
            >
              {activeRun.exit_code === null
                ? "running"
                : activeRun.exit_code === 0
                ? "ok"
                : `exit ${activeRun.exit_code}`}
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-12 min-h-[420px]">
          {/* Sidebar */}
          <div className="md:col-span-4 border-r border-white/5 divide-y divide-white/5">
            {runs.map((run) => (
              <button
                key={run.id}
                onClick={() => handleSelectRun(run.id)}
                className={`w-full px-4 py-3 text-left hover:bg-white/[0.03] transition-colors ${
                  run.id === resolvedActiveRunId ? "bg-white/[0.03]" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-blue-400 truncate max-w-[180px]">
                    $ {run.command}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ml-2 ${
                      run.exit_code === null
                        ? "bg-yellow-500"
                        : run.exit_code === 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="text-[10px] text-zinc-600 font-mono flex items-center gap-1.5">
                  <span>{run.id.slice(0, 8)}</span>
                  <span className="text-zinc-700">·</span>
                  <Clock size={9} />
                  <span>{new Date(run.created_at).toLocaleTimeString()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="md:col-span-8 p-5 font-mono text-sm overflow-y-auto">
            {activeRun ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-white">
                    <Terminal size={13} className="text-zinc-500" />
                    <span className="text-sm font-bold">
                      {activeRun.command}
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="space-y-px">
                  {visibleOutput.map((line, i) => (
                    <div
                      key={i}
                      className="text-zinc-400 text-xs leading-relaxed pl-3 border-l border-white/5"
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {streamIndex >= output.length && (
                  <Link
                    to={`/run/${activeRun.id}`}
                    className="inline-flex items-center gap-1.5 mt-5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-md text-[11px] font-medium transition-all"
                  >
                    View full run
                    <ChevronRight size={12} />
                  </Link>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                {fetchError ? (
                  <span className="text-xs text-red-400/70">
                    Failed to load runs
                  </span>
                ) : (
                  <span className="text-xs text-zinc-600">No runs yet</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
