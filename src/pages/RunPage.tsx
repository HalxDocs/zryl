import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Run = {
  id: string;
  command: string;
  output: string[];
  status: string;
  created_at: string;
};

export default function RunPage() {
  const { id } = useParams();
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("runs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) setRun(data);
      });
  }, [id]);

  if (!run) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading run…
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-mono text-blue-400 text-sm">
          $ {run.command}
        </h1>

        <div className="mt-2 text-xs text-gray-400">
          Status:{" "}
          <span className="capitalize">{run.status}</span> •{" "}
          {new Date(run.created_at).toLocaleString()}
        </div>

        <div className="mt-6 bg-[#0b0b0b] border border-[#1a1a1a] rounded-xl p-4 font-mono text-sm space-y-1">
          {run.output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
