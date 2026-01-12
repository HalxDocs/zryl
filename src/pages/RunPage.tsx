import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Run = {
  id: string;
  command: string;
  stdout: string[];
  stderr: string[];
  exit_code: number;
  started_at: string;
  finished_at: string;
  duration_ms: number;
  os: string;
  arch: string;
  cwd: string;
};

export default function RunPage() {
  const { id } = useParams<{ id: string }>();
  const [run, setRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("runs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setRun(data);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Loading run…
      </div>
    );
  }

  if (error || !run) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Run not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Command */}
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
            Command
          </div>
          <div className="font-mono text-blue-400">$ {run.command}</div>
        </div>

        {/* Stdout */}
        {run.stdout.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Output
            </div>
            <pre className="bg-zinc-900 rounded-xl p-4 text-sm overflow-x-auto">
              {run.stdout.join("\n")}
            </pre>
          </div>
        )}

        {/* Stderr */}
        {run.stderr.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Errors
            </div>
            <pre className="bg-red-950/40 border border-red-500/20 rounded-xl p-4 text-sm text-red-300 overflow-x-auto">
              {run.stderr.join("\n")}
            </pre>
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-xs text-zinc-500">
          <div>OS: {run.os}</div>
          <div>Arch: {run.arch}</div>
          <div>Exit code: {run.exit_code}</div>
          <div>Duration: {run.duration_ms}ms</div>
          <div className="col-span-2">CWD: {run.cwd}</div>
        </div>
      </div>
    </div>
  );
}
