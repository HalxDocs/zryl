import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ZrylLogo = ({ scrolled }: { scrolled: boolean }) => (
  <svg
    width={scrolled ? 24 : 28}
    height={scrolled ? 24 : 28}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-all duration-500"
  >
    <path
      d="M12 10L18 14L12 18"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 30L22 26L28 22"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="20" r="2" fill="#3b82f6" />
    <rect
      x="2"
      y="2"
      width="36"
      height="36"
      rx="10"
      stroke="white"
      strokeOpacity="0.1"
      strokeWidth="1"
    />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <nav
        className={`
          pointer-events-auto
          flex items-center justify-between
          transition-all duration-500 ease-in-out
          border border-white/10 backdrop-blur-xl bg-black/50
          ${scrolled
            ? "w-full max-w-2xl h-12 px-4 rounded-full shadow-2xl shadow-black"
            : "w-full max-w-5xl h-14 px-6 rounded-2xl"
          }
        `}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <ZrylLogo scrolled={scrolled} />
          <span
            className={`
            font-bold tracking-tighter text-white uppercase italic transition-all duration-500
            ${scrolled ? "text-sm" : "text-lg"}
          `}
          >
            zryl
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/HalxDocs/zryl"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
          >
            <Github size={14} />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink size={10} className="opacity-40" />
          </a>
        </div>
      </nav>
    </div>
  );
}
