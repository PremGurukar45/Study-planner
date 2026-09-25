"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "AI Planner",
    href: "/planner",
    icon: Sparkles,
  },
  {
    label: "Subjects",
    href: "/subjects",
    icon: BookOpen,
  },
  {
    label: "Exams",
    href: "/exams",
    icon: CalendarDays,
  },
  {
    label: "Progress",
    href: "/progress",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 border-r border-white/10 bg-[#050510]/65 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col p-4">
        <div className="mb-6 rounded-2xl border border-violet-400/10 bg-violet-500/[0.04] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-xs font-medium text-violet-300">
              AI ASSISTANT
            </span>
          </div>

          <p className="text-xs leading-relaxed text-white/40">
            Your study plan continuously adapts to your progress.
          </p>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  active
                    ? "border border-violet-400/20 bg-violet-500/15 text-white"
                    : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={17} />
                <span>{item.label}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/50 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Settings size={17} />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}