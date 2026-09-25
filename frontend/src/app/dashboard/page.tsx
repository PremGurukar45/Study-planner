"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";

const todayTasks = [
  {
    subject: "Physics",
    topic: "Electromagnetic Induction",
    duration: "90 min",
    type: "Deep Study",
    progress: 65,
    color: "violet",
  },
  {
    subject: "Mathematics",
    topic: "Differential Equations",
    duration: "60 min",
    type: "Practice",
    progress: 35,
    color: "cyan",
  },
  {
    subject: "Computer Science",
    topic: "Data Structures",
    duration: "45 min",
    type: "Revision",
    progress: 80,
    color: "fuchsia",
  },
];

const upcoming = [
  {
    day: "25",
    month: "SEP",
    subject: "Physics",
    exam: "Mid-Term Examination",
    days: "56 days",
  },
  {
    day: "02",
    month: "OCT",
    subject: "Mathematics",
    exam: "Unit Test",
    days: "63 days",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6 pb-10">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] tracking-[0.25em] text-emerald-300">
                  AI SYSTEM ACTIVE
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Good morning, Student.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Your AI study system has analyzed your progress and prepared
                today's learning path.
              </p>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2.5 text-xs text-violet-200 transition hover:bg-violet-500/20"
            >
              <Brain size={15} />
              Recalculate Plan
            </button>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Clock3 size={18} />}
            label="Today's Study"
            value="2h 35m"
            change="+35m"
            positive
          />

          <StatCard
            icon={<Target size={18} />}
            label="Weekly Goal"
            value="72%"
            change="+12%"
            positive
          />

          <StatCard
            icon={<Flame size={18} />}
            label="Study Streak"
            value="8 days"
            change="Personal best"
            positive
          />

          <StatCard
            icon={<TrendingUp size={18} />}
            label="Overall Progress"
            value="68%"
            change="+8.4%"
            positive
          />
        </section>

        {/* Main grid */}
        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          {/* Today's plan */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-2xl md:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-violet-300">
                  AI GENERATED
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Today's Learning Path
                </h2>
              </div>

              <div className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/40">
                24 SEP
              </div>
            </div>

            <div className="space-y-3">
              {todayTasks.map((task, index) => (
                <motion.div
                  key={task.topic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20 p-4 transition hover:border-violet-400/20"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                        task.color === "cyan"
                          ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
                          : task.color === "fuchsia"
                            ? "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300"
                            : "border-violet-400/20 bg-violet-500/10 text-violet-300"
                      }`}
                    >
                      <Brain size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div>
                          <p className="text-xs text-white/40">
                            {task.subject}
                          </p>

                          <h3 className="mt-1 text-sm font-semibold">
                            {task.topic}
                          </h3>
                        </div>

                        <span className="text-xs text-white/35">
                          {task.duration}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                          />
                        </div>

                        <span className="text-[10px] text-white/35">
                          {task.progress}%
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`Complete ${task.topic}`}
                      className="hidden rounded-lg border border-white/10 p-2 text-white/20 transition hover:border-emerald-400/20 hover:text-emerald-400 sm:block"
                    >
                      <CheckCircle2 size={17} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI insight */}
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-cyan-500/[0.05] p-6 backdrop-blur-2xl">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-[70px]" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                  <Zap size={19} />
                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-[9px] tracking-wider text-emerald-300">
                  AI INSIGHT
                </span>
              </div>

              <h2 className="text-lg font-semibold">
                Your schedule has been optimized.
              </h2>

              <p className="mt-3 text-xs leading-6 text-white/40">
                Your Physics performance has improved this week. The system
                has increased your next Physics session slightly while
                maintaining your Mathematics revision cycle.
              </p>

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Optimization score</span>
                  <span className="font-semibold text-violet-300">94%</span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-xs text-white/60 transition hover:bg-white/[0.08] hover:text-white"
              >
                View AI reasoning
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Bottom section */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Weekly progress */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-cyan-300">
                  THIS WEEK
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Study Activity
                </h2>
              </div>

              <TrendingUp size={18} className="text-emerald-400" />
            </div>

            <div className="flex h-40 items-end justify-between gap-3">
              {[55, 75, 42, 90, 68, 82, 35].map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end gap-2"
                >
                  <div className="relative flex flex-1 items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.08,
                      }}
                      className="w-full rounded-t-xl bg-gradient-to-t from-violet-600/70 to-cyan-400/70"
                    />
                  </div>

                  <span className="text-center text-[9px] text-white/25">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Exams */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-fuchsia-300">
                  UPCOMING
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Exam Timeline
                </h2>
              </div>

              <CalendarDays size={18} className="text-fuchsia-300" />
            </div>

            <div className="space-y-3">
              {upcoming.map((exam) => (
                <div
                  key={exam.exam}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/10">
                    <span className="text-lg font-bold leading-none">
                      {exam.day}
                    </span>
                    <span className="mt-1 text-[8px] tracking-wider text-fuchsia-300">
                      {exam.month}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-white/35">
                      {exam.subject}
                    </p>

                    <h3 className="mt-1 truncate text-sm font-medium">
                      {exam.exam}
                    </h3>
                  </div>

                  <span className="text-[10px] text-white/30">
                    {exam.days}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
          {icon}
        </div>

        <span
          className={`text-[10px] ${
            positive ? "text-emerald-400" : "text-white/30"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="mt-4 text-[10px] tracking-wide text-white/35">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">{value}</p>
    </motion.div>
  );
}