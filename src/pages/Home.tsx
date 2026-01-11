import Hero from "../components/Hero";
import RunDashboard from "../components/RunDashboard";
import Waitlist from "../components/Waitlist";
import Navbar from "../components/Navbar";
import WhatIsRunshare from "../components/WhatIsZryl";
import Footer from "../components/Footer";



export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
        <Navbar />
      <Hero />
      <Waitlist />
      <div className="max-w-6xl mx-auto px-6">
        <RunDashboard />
      </div>
        <WhatIsRunshare />
      <Footer />
      
    </main>
  );
}
