import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { supabase, supabaseReady } from "../lib/supabase";
import { ArrowLeft, Copy, Check, Terminal } from "lucide-react";
import { copyToClipboard } from "../lib/copy";

type Run = {
  id: string;
  command: string;
  stdout: string[] | null;
  stderr: string[] | null;
  exit_code: number;
  started_at: string;
  finished_at: string;
  duration_ms: number;
  os: string;
  arch: string;
  cwd: string;
  visibility: "public" | "private";
};

type PageState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "ready"; run: Run };

export default function RunPage() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<PageState>(
    !id
      ? { status: "error", message: "Missing run ID" }
      : !supabaseReady
      ? { status: "error", message: "Supabase not configured" }
      : { status: "loading" }
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id || !supabaseReady) return;

    let cancelled = false;

    async function fetchRun() {
      try {
        const { data, error: dbError } = await supabase
          .from("runs")
          .select("*")
          .eq("id", id)
          .eq("visibility", "public")
          .maybeSingle();

        if (cancelled) return;

        if (dbError) {
          setState({ status: "error", message: dbError.message });
          return;
        }

        if (!data) {
          setState({ status: "error", message: "Run not found or not public" });
          return;
        }

        setState({ status: "ready", run: data });
      } catch {
        if (!cancelled) {
          setState({ status: "error", message: "Failed to load run" });
        }
      }
    }

    fetchRun();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (state.status === "ready") {
      document.title = `$ ${state.run.command} — zryl`;
    }
    return () => {
      document.title = "zryl — preserve command executions";
    };
  }, [state]);

  const handleCopy = useCallback(async () => {
    if (state.status !== "ready") return;
    try {
      const output = [
        ...(state.run.stdout ?? []),
        ...(state.run.stderr ?? []),
      ].join("\n");
      await copyToClipboard(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fail silently
    }
  }, [state]);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-zinc-500 text-sm">
        Loading…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-zinc-400 px-6 gap-4">
        <p className="text-red-400/80 text-sm">{state.message}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          Back to home
        </Link>
      </div>
    );
  }

  const run = state.run;
  const stdout = run.stdout ?? [];
  const stderr = run.stderr ?? [];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          All runs
        </Link>

        {/* Command + Copy */}
        <div className="bg-zinc-950 border border-white/8 rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Terminal size={14} className="text-blue-500" />
              </div>
              <code className="text-sm font-mono text-blue-400 break-all">
                $ {run.command}
              </code>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy output"}
            </button>
          </div>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-3 text-[11px] font-mono text-zinc-500">
          {[
            { label: "exit", value: String(run.exit_code) },
            { label: "duration", value: `${run.duration_ms}ms` },
            { label: "os", value: `${run.os}/${run.arch}` },
            { label: "cwd", value: run.cwd },
          ].map((item) => (
            <div
              key={item.label}
              className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5"
            >
              <span className="text-zinc-600">{item.label}:</span>{" "}
              <span className="text-zinc-400">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Stdout */}
        {stdout.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-2">
              Output
            </div>
            <pre className="bg-zinc-950 border border-white/5 rounded-xl p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
              {stdout.join("\n")}
            </pre>
          </div>
        )}

        {/* Stderr */}
        {stderr.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-2">
              Errors
            </div>
            <pre className="bg-red-950/30 border border-red-500/10 rounded-xl p-4 text-xs font-mono text-red-300/80 overflow-x-auto leading-relaxed">
              {stderr.join("\n")}
            </pre>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-600 flex gap-4">
          <span>started: {new Date(run.started_at).toLocaleString()}</span>
          <span>ended: {new Date(run.finished_at).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
