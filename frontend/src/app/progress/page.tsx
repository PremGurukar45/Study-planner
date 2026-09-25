"use client";

import AppShell from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const subjectProgress = [
  {
    subject: "Physics",
    progress: 42,
    hours: 6,
    target: 10,
    color: "violet",
  },
  {
    subject: "Mathematics",
    progress: 68,
    hours: 8,
    target: 10,
    color: "cyan",
  },
  {
    subject: "Computer Science",
    progress: 81,
    hours: 5,
    target: 6,
    color: "fuchsia",
  },
  {
    subject: "Chemistry",
    progress: 57,
    hours: 4,
    target: 7,
    color: "emerald",
  },
];

const weeklyActivity = [
  { day: "MON", hours: 2.5 },
  { day: "TUE", hours: 3.8 },
  { day: "WED", hours: 2.1 },
  { day: "THU", hours: 4.4 },
  { day: "FRI", hours: 3.2 },
  { day: "SAT", hours: 5.1 },
  { day: "SUN", hours: 2.8 },
];

const recentAchievements = [
  {
    title: "7 Day Streak",
    description: "Studied consistently for one week",
    icon: Flame,
  },
  {
    title: "25 Sessions",
    description: "Completed 25 study sessions",
    icon: Award,
  },
  {
    title: "CS Milestone",
    description: "Reached 80% preparation",
    icon: Target,
  },
];

export default function ProgressPage() {
  const totalHours = subjectProgress.reduce(
    (sum, subject) => sum + subject.hours,
    0
  );

  const averageProgress = Math.round(
    subjectProgress.reduce(
      (sum, subject) => sum + subject.progress,
      0
    ) / subjectProgress.length
  );

  const weeklyHours = weeklyActivity.reduce(
    (sum, day) => sum + day.hours,
    0
  );

  const completedSessions = 25;
  const currentStreak = 7;

  const stats = [
    {
      label: "Overall Progress",
      value: `${averageProgress}%`,
      description: "Across all subjects",
      icon: TrendingUp,
    },
    {
      label: "Study Hours",
      value: `${totalHours}h`,
      description: "This active week",
      icon: Clock3,
    },
    {
      label: "Current Streak",
      value: `${currentStreak} days`,
      description: "Keep it going",
      icon: Flame,
    },
    {
      label: "Sessions",
      value: completedSessions,
      description: "Completed sessions",
      icon: CheckCircle2,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10">
                <TrendingUp
                  size={16}
                  className="text-violet-300"
                />
              </div>

              <span className="text-xs font-semibold tracking-[0.2em] text-violet-300">
                PERFORMANCE SYSTEM
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Your progress
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-white/40">
              Understand your study patterns and see how your
              preparation is evolving over time.
            </p>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon
                      size={17}
                      className="text-violet-300"
                    />
                  </div>

                  <span className="text-[10px] tracking-[0.16em] text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-2xl font-semibold text-white">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-white/70">
                  {stat.label}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* SUBJECT + WEEKLY */}
        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          {/* SUBJECT PROGRESS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Subject progress
                </h3>

                <p className="mt-1 text-xs text-white/30">
                  Current preparation across your subjects.
                </p>
              </div>

              <BookOpen
                size={18}
                className="text-white/30"
              />
            </div>

            <div className="space-y-5">
              {subjectProgress.map((subject, index) => (
                <div key={subject.subject}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white/80">
                        {subject.subject}
                      </span>

                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] text-white/30">
                        {subject.hours}h / {subject.target}h
                      </span>
                    </div>

                    <span className="text-xs font-medium text-white/60">
                      {subject.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${subject.progress}%`,
                      }}
                      transition={{
                        duration: 0.9,
                        delay: index * 0.1,
                      }}
                      className={`h-full rounded-full ${
                        subject.color === "cyan"
                          ? "bg-cyan-400"
                          : subject.color === "fuchsia"
                            ? "bg-fuchsia-400"
                            : subject.color === "emerald"
                              ? "bg-emerald-400"
                              : "bg-violet-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* WEEKLY ACTIVITY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Weekly activity
                </h3>

                <p className="mt-1 text-xs text-white/30">
                  Study hours over the last seven days.
                </p>
              </div>

              <span className="text-sm font-medium text-violet-300">
                {weeklyHours.toFixed(1)}h
              </span>
            </div>

            <div className="flex h-56 items-end justify-between gap-2">
              {weeklyActivity.map((day, index) => {
                const height = `${(day.hours / 6) * 100}%`;

                return (
                  <div
                    key={day.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="flex w-full flex-1 items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.08,
                        }}
                        className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-violet-600/70 to-violet-300/80"
                      />
                    </div>

                    <span className="text-[9px] tracking-wider text-white/25">
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* STREAK + AI */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* STREAK */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-orange-400/15 bg-orange-500/[0.04] p-6"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10">
                  <Flame
                    size={20}
                    className="text-orange-300"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-orange-300">
                    CURRENT STREAK
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Consistency compounds.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-end gap-3">
                <span className="text-6xl font-semibold tracking-tight text-white">
                  {currentStreak}
                </span>

                <span className="mb-2 text-sm text-white/40">
                  consecutive days
                </span>
              </div>

              <div className="mt-6 flex gap-2">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-400/20 bg-orange-500/10"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-orange-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI INSIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.05] p-6"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                <Brain
                  size={19}
                  className="text-violet-300"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={13}
                    className="text-violet-300"
                  />

                  <p className="text-xs font-semibold tracking-[0.15em] text-violet-300">
                    AI PERFORMANCE INSIGHT
                  </p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Your strongest area is Computer Science at{" "}
                  <span className="font-medium text-fuchsia-300">
                    81%
                  </span>
                  . Physics is currently your largest
                  preparation gap at{" "}
                  <span className="font-medium text-violet-300">
                    42%
                  </span>
                  . The planner can automatically allocate
                  more study time to Physics while maintaining
                  your current momentum in other subjects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ACHIEVEMENTS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
        >
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white">
              Recent achievements
            </h3>

            <p className="mt-1 text-xs text-white/30">
              Milestones from your study activity.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {recentAchievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <div
                  key={achievement.title}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                    <Icon
                      size={17}
                      className="text-violet-300"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      {achievement.title}
                    </p>

                    <p className="mt-1 text-[11px] text-white/30">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* BOTTOM INSIGHT */}
        <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-500/[0.03] px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10">
            <Sparkles
              size={15}
              className="text-cyan-300"
            />
          </div>

          <p className="text-xs leading-relaxed text-white/40">
            Keep your study sessions consistent. The AI planner
            will use your completed sessions and progress to
            continuously improve future schedules.
          </p>
        </div>
      </div>
    </AppShell>
  );
}