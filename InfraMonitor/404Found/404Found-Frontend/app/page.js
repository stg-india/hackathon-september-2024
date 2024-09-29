import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";


export default function Home() {
  return (
    <div className="min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex items-center justify-items-center gap-8 h-full sm:items-start ">
        <Sidebar />
        <Hero />
      </main>
    </div>
  );
}
