import  { useState, useEffect } from "react";
import { Github } from "lucide-react";

const ZrylLogo = ({ scrolled }: { scrolled: boolean }) => (
  <div className="relative group cursor-pointer flex items-center justify-center">
    <svg
      width={scrolled ? "28" : "32"}
      height={scrolled ? "28" : "32"}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10 transition-all duration-500"
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
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger change after 20px of scrolling
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-100 flex justify-center p-4 md:p-6 pointer-events-none">
      <nav
        className={`
          pointer-events-auto
          flex items-center justify-between
          transition-all duration-500 ease-in-out
          border border-white/10 backdrop-blur-xl bg-black/40
          ${scrolled 
            ? "w-full max-w-2xl h-12 px-4 rounded-full py-2 shadow-2xl shadow-black" 
            : "w-full max-w-5xl h-16 px-6 rounded-2xl py-4"
          }
        `}
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3 group">
          <ZrylLogo scrolled={scrolled} />
          <span className={`
            font-bold tracking-tighter text-white uppercase italic transition-all duration-500
            ${scrolled ? "text-sm" : "text-xl"}
          `}>
            zryl
          </span>
        </div>

        {/* Right: GitHub */}
        <div className="flex items-center">
          <a
            href="https://github.com/HalxDocs/zryl"
            target="_blank"
            rel="noreferrer"
            className="group relative"
          >
            <div className={`
              absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 
              group-hover:opacity-100 transition-opacity duration-300
            `} />
            <div className={`
              relative flex items-center justify-center rounded-full border border-white/5 bg-zinc-900/50
              hover:border-white/20 transition-all duration-300
              ${scrolled ? "p-1.5" : "p-2.5"}
            `}>
              <Github 
                size={scrolled ? 16 : 20} 
                className="text-zinc-400 group-hover:text-white transition-colors" 
              />
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
}