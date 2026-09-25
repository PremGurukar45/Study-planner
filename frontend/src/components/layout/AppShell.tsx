"use client";

import Scene from "@/components/3d/Scene";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <Scene />

      <Navbar />
      <Sidebar />

      <main className="relative z-10 min-h-screen pt-16 lg:pl-64">
        <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}