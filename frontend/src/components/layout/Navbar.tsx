"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-white/10 bg-[#050510]/70 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10">
            <span className="text-lg">✦</span>
          </div>

          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white">
              AI STUDY
            </h1>
            <p className="text-[10px] tracking-[0.2em] text-violet-300">
              PLANNER
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex h-9 w-56 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3">
            <Search size={15} className="text-white/40" />
            <span className="text-xs text-white/30">Search...</span>
          </div>

          <button
            type="button"
            className="relative rounded-xl border border-white/10 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold">
              A
            </div>
            <span className="text-xs text-white/80">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}