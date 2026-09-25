"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Clock3,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

function FloatingObject({
  className,
  delay,
  icon,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-violet-300 shadow-[0_0_40px_rgba(124,58,237,0.15)] backdrop-blur-xl ${className}`}
      animate={{
        y: [0, -18, 0],
        rotate: [0, 6, -4, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  );
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    description:
      "Build a personalized study plan around your subjects, skill level and exams.",
  },
  {
    icon: Target,
    title: "Adaptive Focus",
    description:
      "Your schedule continuously adjusts as your progress and priorities change.",
  },
  {
    icon: Clock3,
    title: "Smart Time Allocation",
    description:
      "Turn your available study hours into focused sessions that actually fit your day.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050510] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <motion.div
          className="absolute right-[5%] top-[30%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]"
          animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      </div>

      {/* Floating objects */}
      <FloatingObject
        className="left-[8%] top-[28%]"
        delay={0}
        icon={<Brain size={22} />}
      />

      <FloatingObject
        className="right-[12%] top-[24%]"
        delay={1}
        icon={<CalendarDays size={22} />}
      />

      <FloatingObject
        className="left-[15%] bottom-[22%]"
        delay={2}
        icon={<Target size={22} />}
      />

      <FloatingObject
        className="right-[17%] bottom-[18%]"
        delay={3}
        icon={<Zap size={22} />}
      />

      {/* Navigation */}
      <header className="relative z-20 flex h-20 items-center justify-between border-b border-white/10 bg-[#050510]/40 px-6 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles size={19} className="text-violet-300" />
          </motion.div>

          <div>
            <div className="text-sm font-bold tracking-[0.18em]">
              AI STUDY
            </div>
            <div className="text-[9px] tracking-[0.3em] text-violet-300">
              PLANNER
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden rounded-xl px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Dashboard
          </Link>

          <Link
            href="/setup"
            className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition hover:bg-violet-500/20"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs tracking-[0.18em] text-violet-200">
              AI SYSTEM ONLINE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            Your study plan
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              thinks with you.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/45 md:text-lg"
          >
            AI Study Planner transforms your subjects, available time,
            skill levels and exam deadlines into a personalized learning
            system that adapts as you progress.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/setup"
              className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-4 text-sm font-semibold shadow-[0_0_50px_rgba(124,58,237,0.3)] transition hover:scale-[1.03]"
            >
              Build My Study Plan

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
            >
              Explore Dashboard
            </Link>
          </motion.div>

          {/* Feature cards */}
          <div className="mt-20 grid gap-4 text-left md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.12,
                  }}
                  whileHover={{ y: -6 }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-violet-400/20 hover:bg-white/[0.06]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                    <Icon size={18} className="text-violet-300" />
                  </div>

                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/35">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] text-white/25"
          >
            <span className="h-px w-10 bg-white/10" />
            ENTER THE SYSTEM
            <span className="h-px w-10 bg-white/10" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}