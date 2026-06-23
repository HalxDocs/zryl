import Hero from "../components/Hero";
import RunDashboard from "../components/RunDashboard";
import Navbar from "../components/Navbar";
import WhatIsZryl from "../components/WhatIsZryl";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      <Hero />
      <div className="max-w-6xl mx-auto px-6">
        <RunDashboard />
      </div>
      <WhatIsZryl />
      <Footer />
    </main>
  );
}
