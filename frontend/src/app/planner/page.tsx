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
import { useEffect, useMemo, useState } from "react";

import AppShell from "@/components/layout/AppShell";

type BackendPlanItem = {
  subject: string;
  skillLevel: string;
  examDate: string;
  daysUntilExam: number;
  dailyStudyMinutes: number;
};

type StudyTask = {
  id: number;
  time: string;
  duration: string;
  subject: string;
  topic: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  daysUntilExam: number;
  skillLevel: string;
  examDate: string;
  dailyStudyMinutes: number;
};

const days = [
  { day: "MON", date: "21" },
  { day: "TUE", date: "22" },
  { day: "WED", date: "23" },
  { day: "THU", date: "24" },
  { day: "FRI", date: "25" },
  { day: "SAT", date: "26" },
  { day: "SUN", date: "27" },
];

function getPriority(daysUntilExam: number): "High" | "Medium" | "Low" {
  if (daysUntilExam <= 10) return "High";
  if (daysUntilExam <= 20) return "Medium";
  return "Low";
}

function formatTime(index: number) {
  const hour = 9 + index * 2;
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function PlannerPage() {
  const [selectedDay, setSelectedDay] = useState(3);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("studyPlan");

    if (!savedPlan) return;

    try {
      const plan: BackendPlanItem[] = JSON.parse(savedPlan);

      const formattedTasks: StudyTask[] = plan.map((item, index) => ({
        id: index + 1,
        time: formatTime(index),
        duration: `${item.dailyStudyMinutes} min`,
        dailyStudyMinutes: item.dailyStudyMinutes,
        subject: item.subject,
        topic: "Personalized Study Session",
        type:
          item.skillLevel.toLowerCase() === "beginner"
            ? "Concept Learning"
            : item.skillLevel.toLowerCase() === "intermediate"
              ? "Practice & Learning"
              : "Advanced Practice",
        priority: getPriority(item.daysUntilExam),
        completed: false,
        daysUntilExam: item.daysUntilExam,
        skillLevel: item.skillLevel,
        examDate: item.examDate,
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error("Failed to load study plan:", error);
    }
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalStudyMinutes = useMemo(() => {
    return tasks.reduce(
      (total, task) => total + task.dailyStudyMinutes,
      0
    );
  }, [tasks]);

  const priorityScore = useMemo(() => {
    if (tasks.length === 0) return "0.0";

    const score =
      tasks.reduce((total, task) => {
        if (task.priority === "High") return total + 10;
        if (task.priority === "Medium") return total + 7;
        return total + 4;
      }, 0) / tasks.length;

    return score.toFixed(1);
  }, [tasks]);

  const highestPriorityTask = useMemo(() => {
    if (tasks.length === 0) return null;

    return [...tasks].sort(
      (a, b) => a.daysUntilExam - b.daysUntilExam
    )[0];
  }, [tasks]);

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function regeneratePlan() {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
    }, 1000);
  }

  const studyHours = Math.floor(totalStudyMinutes / 60);
  const studyMinutes = totalStudyMinutes % 60;

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
                  LIVE PLAN
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Your intelligent study path.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                Your schedule is dynamically organized around your exams,
                current skill levels, study time, and priorities.
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

        {/* Metrics */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Metric
            icon={<Target size={17} />}
            label="Plan Status"
            value={tasks.length > 0 ? "Ready" : "Waiting"}
          />

          <Metric
            icon={<Clock3 size={17} />}
            label="Study Today"
            value={`${studyHours}h ${studyMinutes}m`}
          />

          <Metric
            icon={<Flame size={17} />}
            label="Priority Score"
            value={priorityScore}
          />

          <Metric
            icon={<Zap size={17} />}
            label="Subjects"
            value={`${tasks.length}`}
          />
        </section>

        {/* Calendar */}
        <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-2xl md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-white/30">
                STUDY WEEK
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

                <p className="mt-1 text-lg font-semibold">
                  {day.date}
                </p>

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

        {/* Main Planner */}
        <section className="grid gap-6 xl:grid-cols-[1fr_350px]">

          {/* Timeline */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-2xl md:p-6">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.25em] text-violet-300">
                  TODAY
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Today&apos;s Schedule
                </h2>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">
                  {completedTasks}
                  <span className="text-white/25">
                    /{tasks.length}
                  </span>
                </p>

                <p className="text-[9px] text-white/30">
                  completed
                </p>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-8 text-center">
                <Brain
                  className="mx-auto text-violet-300"
                  size={30}
                />

                <h3 className="mt-4 text-sm font-semibold">
                  No study plan found
                </h3>

                <p className="mt-2 text-xs text-white/35">
                  Go to Setup and generate your personalized study plan.
                </p>
              </div>
            ) : (
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

                            <PriorityBadge
                              priority={task.priority}
                            />
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

                          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-white/25">
                            <span>{task.type}</span>
                            <span>•</span>
                            <span>{task.duration}</span>
                            <span>•</span>
                            <span>
                              Exam in {task.daysUntilExam} days
                            </span>
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
            )}
          </div>

          {/* AI Reasoning */}
          <div className="space-y-6">

            <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-cyan-500/[0.05] p-6 backdrop-blur-2xl">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-[70px]" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={16}
                    className="text-violet-300"
                  />

                  <span className="text-[9px] tracking-[0.25em] text-violet-300">
                    WHY THIS PLAN?
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                  AI reasoning
                </h2>

                {highestPriorityTask ? (
                  <>
                    <p className="mt-3 text-xs leading-6 text-white/40">
                      <strong className="text-white/70">
                        {highestPriorityTask.subject}
                      </strong>{" "}
                      currently receives the highest priority because its
                      exam is in{" "}
                      <strong className="text-violet-300">
                        {highestPriorityTask.daysUntilExam} days
                      </strong>
                      .
                    </p>

                    <div className="mt-5 space-y-3">
                      <Reason
                        label="Exam proximity"
                        value={highestPriorityTask.priority}
                        width={
                          highestPriorityTask.priority === "High"
                            ? "88%"
                            : highestPriorityTask.priority === "Medium"
                              ? "64%"
                              : "35%"
                        }
                      />

                      <Reason
                        label="Current skill"
                        value={highestPriorityTask.skillLevel}
                        width={
                          highestPriorityTask.skillLevel.toLowerCase() ===
                          "beginner"
                            ? "80%"
                            : highestPriorityTask.skillLevel.toLowerCase() ===
                                "intermediate"
                              ? "55%"
                              : "30%"
                        }
                      />

                      <Reason
                        label="Daily allocation"
                        value={`${highestPriorityTask.dailyStudyMinutes} min`}
                        width={`${Math.min(
                          100,
                          (highestPriorityTask.dailyStudyMinutes / 180) * 100
                        )}%`}
                      />
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-xs text-white/40">
                    Generate a study plan to see AI reasoning.
                  </p>
                )}
              </div>
            </div>

            {/* Focus */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-2">
                <Target
                  size={16}
                  className="text-cyan-300"
                />

                <span className="text-[9px] tracking-[0.25em] text-cyan-300">
                  FOCUS MODE
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold">
                Next session
              </h2>

              {highestPriorityTask ? (
                <>
                  <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                    <p className="text-[10px] text-white/30">
                      {highestPriorityTask.time} ·{" "}
                      {highestPriorityTask.duration}
                    </p>

                    <h3 className="mt-2 text-sm font-semibold">
                      {highestPriorityTask.topic}
                    </h3>

                    <p className="mt-1 text-[10px] text-violet-300">
                      {highestPriorityTask.subject} ·{" "}
                      {highestPriorityTask.type}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-xs font-medium transition hover:bg-violet-500"
                  >
                    <Play size={14} />
                    Start Focus Session
                  </button>
                </>
              ) : (
                <p className="mt-5 text-xs text-white/35">
                  Your next focus session will appear after generating a
                  plan.
                </p>
              )}
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