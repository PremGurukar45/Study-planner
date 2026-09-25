"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Play,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useState } from "react";

import AppShell from "@/components/layout/AppShell";

type StudyTask = {
  id: number;
  time: string;
  duration: string;
  subject: string;
  topic: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const initialTasks: StudyTask[] = [
  {
    id: 1,
    time: "08:00",
    duration: "45 min",
    subject: "Mathematics",
    topic: "Differential Equations",
    type: "Concept Learning",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    time: "10:00",
    duration: "60 min",
    subject: "Physics",
    topic: "Electromagnetic Induction",
    type: "Deep Study",
    priority: "High",
    completed: false,
  },
  {
    id: 3,
    time: "14:30",
    duration: "45 min",
    subject: "Computer Science",
    topic: "Binary Trees",
    type: "Practice",
    priority: "Medium",
    completed: false,
  },
  {
    id: 4,
    time: "17:00",
    duration: "30 min",
    subject: "Physics",
    topic: "Formula Revision",
    type: "Revision",
    priority: "Medium",
    completed: false,
  },
  {
    id: 5,
    time: "20:00",
    duration: "35 min",
    subject: "Mathematics",
    topic: "Problem Set",
    type: "Practice",
    priority: "Low",
    completed: false,
  },
];

const days = [
  { day: "MON", date: "21" },
  { day: "TUE", date: "22" },
  { day: "WED", date: "23" },
  { day: "THU", date: "24" },
  { day: "FRI", date: "25" },
  { day: "SAT", date: "26" },
  { day: "SUN", date: "27" },
];

export default function PlannerPage() {
  const [selectedDay, setSelectedDay] = useState(3);
  const [tasks, setTasks] = useState(initialTasks);
  const [generating, setGenerating] = useState(false);

  const completedTasks = tasks.filter((task) => task.completed).length;

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }

  function regeneratePlan() {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
    }, 1400);
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-600/[0.12] via-white/[0.025] to-cyan-500/[0.06] p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                  <Brain size={14} />
                </div>

                <span className="text-[10px] tracking-[0.3em] text-violet-300">
                  AI PLANNER
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-[8px] tracking-wider text-emerald-300">
                  OPTIMIZED
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Your intelligent study path.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                Your schedule is dynamically organized around your exams,
                current skill levels, study time, and recent performance.
              </p>
            </div>

            <button
              type="button"
              onClick={regeneratePlan}
              disabled={generating}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-xs text-violet-200 transition hover:bg-violet-500/20 disabled:opacity-50"
            >
              <Sparkles
                size={15}
                className={generating ? "animate-spin" : ""}
              />
              {generating ? "Recalculating..." : "Regenerate Plan"}
            </button>
          </div>
        </motion.section>

        {/* AI metrics */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Metric
            icon={<Target size={17} />}
            label="Plan Confidence"
            value="94%"
          />

          <Metric
            icon={<Clock3 size={17} />}
            label="Study Today"
            value="3h 35m"
          />

          <Metric
            icon={<Flame size={17} />}
            label="Priority Score"
            value="8.7"
          />

          <Metric
            icon={<Zap size={17} />}
            label="Adaptation"
            value="+12%"
          />
        </section>

        {/* Calendar */}
        <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-2xl md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-white/30">
                SEPTEMBER 2026
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Weekly Timeline
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <button
                key={day.day}
                type="button"
                onClick={() => setSelectedDay(index)}
                className={`relative rounded-2xl border p-3 transition ${
                  selectedDay === index
                    ? "border-violet-400/30 bg-violet-500/15 shadow-[0_0_25px_rgba(139,92,246,0.12)]"
                    : "border-white/[0.06] bg-black/10 hover:bg-white/[0.04]"
                }`}
              >
                <p
                  className={`text-[9px] tracking-wider ${
                    selectedDay === index
                      ? "text-violet-300"
                      : "text-white/25"
                  }`}
                >
                  {day.day}
                </p>

                <p className="mt-1 text-lg font-semibold">{day.date}</p>

                <div className="mx-auto mt-2 flex justify-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-violet-400" />
                  <span className="h-1 w-1 rounded-full bg-cyan-400" />
                  <span className="h-1 w-1 rounded-full bg-fuchsia-400" />
                </div>

                {selectedDay === index && (
                  <motion.div
                    layoutId="selectedDay"
                    className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-violet-400"
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Main planner */}
        <section className="grid gap-6 xl:grid-cols-[1fr_350px]">
          {/* Timeline */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-2xl md:p-6">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.25em] text-violet-300">
                  THURSDAY · 24 SEPTEMBER
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Today's Schedule
                </h2>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">
                  {completedTasks}
                  <span className="text-white/25">/{tasks.length}</span>
                </p>
                <p className="text-[9px] text-white/30">completed</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-[57px] top-0 w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-transparent" />

              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="relative flex gap-4"
                  >
                    <div className="w-10 shrink-0 pt-4 text-right">
                      <span className="text-[10px] text-white/25">
                        {task.time}
                      </span>
                    </div>

                    <div className="relative flex w-5 shrink-0 justify-center">
                      <div
                        className={`relative z-10 mt-4 h-3 w-3 rounded-full border-2 ${
                          task.completed
                            ? "border-emerald-400 bg-emerald-400/20"
                            : "border-violet-400 bg-[#08080f]"
                        }`}
                      />
                    </div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex min-w-0 flex-1 items-center gap-4 rounded-2xl border p-4 transition ${
                        task.completed
                          ? "border-emerald-400/10 bg-emerald-400/[0.025]"
                          : "border-white/[0.07] bg-black/20 hover:border-violet-400/20"
                      }`}
                    >
                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300 sm:flex">
                        {task.completed ? (
                          <CheckCircle2 size={19} />
                        ) : (
                          <Brain size={19} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] text-violet-300">
                            {task.subject}
                          </span>

                          <PriorityBadge priority={task.priority} />
                        </div>

                        <h3
                          className={`mt-1 truncate text-sm font-semibold ${
                            task.completed
                              ? "text-white/40 line-through"
                              : ""
                          }`}
                        >
                          {task.topic}
                        </h3>

                        <div className="mt-2 flex items-center gap-3 text-[10px] text-white/25">
                          <span>{task.type}</span>
                          <span>•</span>
                          <span>{task.duration}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[10px] transition ${
                          task.completed
                            ? "border border-emerald-400/15 bg-emerald-400/5 text-emerald-300"
                            : "border border-white/10 bg-white/[0.03] text-white/40 hover:border-violet-400/20 hover:text-white"
                        }`}
                      >
                        {task.completed ? (
                          <>
                            <CheckCircle2 size={13} />
                            Done
                          </>
                        ) : (
                          <>
                            <Play size={12} />
                            Start
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AI reasoning */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-cyan-500/[0.05] p-6 backdrop-blur-2xl">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-[70px]" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-300" />
                  <span className="text-[9px] tracking-[0.25em] text-violet-300">
                    WHY THIS PLAN?
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                  AI reasoning
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/40">
                  Physics receives the highest priority because its exam is
                  approaching and your current skill level is below the
                  target threshold.
                </p>

                <div className="mt-5 space-y-3">
                  <Reason
                    label="Exam proximity"
                    value="High"
                    width="88%"
                  />

                  <Reason
                    label="Skill gap"
                    value="Medium"
                    width="64%"
                  />

                  <Reason
                    label="Recent performance"
                    value="Good"
                    width="42%"
                  />
                </div>
              </div>
            </div>

            {/* Focus */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-cyan-300" />

                <span className="text-[9px] tracking-[0.25em] text-cyan-300">
                  FOCUS MODE
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold">
                Next session
              </h2>

              <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <p className="text-[10px] text-white/30">
                  10:00 — 11:00
                </p>

                <h3 className="mt-2 text-sm font-semibold">
                  Electromagnetic Induction
                </h3>

                <p className="mt-1 text-[10px] text-violet-300">
                  Physics · Deep Study
                </p>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-xs font-medium transition hover:bg-violet-500"
              >
                <Play size={14} />
                Start Focus Session
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/10 text-violet-300">
          {icon}
        </div>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>

      <p className="mt-4 text-[9px] tracking-wide text-white/30">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">{value}</p>
    </motion.div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: StudyTask["priority"];
}) {
  const styles = {
    High: "border-red-400/15 bg-red-400/5 text-red-300",
    Medium: "border-amber-400/15 bg-amber-400/5 text-amber-300",
    Low: "border-cyan-400/15 bg-cyan-400/5 text-cyan-300",
  };

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[8px] ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function Reason({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[9px]">
        <span className="text-white/35">{label}</span>
        <span className="text-violet-300">{value}</span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
        />
      </div>
    </div>
  );
}