import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 px-6">
      <div className="text-center space-y-6">
        <div className="text-7xl font-black text-zinc-800 tracking-tighter">
          404
        </div>
        <p className="text-lg text-zinc-500">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
