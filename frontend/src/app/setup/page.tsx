"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";

type Subject = {
  id: number;
  name: string;
  level: number;
};

type Exam = {
  id: number;
  subject: string;
  date: string;
};

const skillLevels = [
  { value: 1, label: "Beginner", description: "Just starting" },
  { value: 2, label: "Basic", description: "Know the fundamentals" },
  { value: 3, label: "Intermediate", description: "Comfortable with basics" },
  { value: 4, label: "Advanced", description: "Strong understanding" },
  { value: 5, label: "Expert", description: "Need mostly revision" },
];

export default function SetupPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Physics", level: 2 },
    { id: 2, name: "Mathematics", level: 3 },
  ]);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      subject: "Physics",
      date: "2026-11-20",
    },
  ]);

  const [hours, setHours] = useState(3);
  const [newSubject, setNewSubject] = useState("");
  const [generating, setGenerating] = useState(false);

  function addSubject() {
    const name = newSubject.trim();

    if (!name) return;

    setSubjects((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        level: 3,
      },
    ]);

    setNewSubject("");
  }

  function removeSubject(id: number) {
    setSubjects((current) => current.filter((subject) => subject.id !== id));
  }

  function updateLevel(id: number, level: number) {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id ? { ...subject, level } : subject,
      ),
    );
  }

  function addExam() {
    setExams((current) => [
      ...current,
      {
        id: Date.now(),
        subject: subjects[0]?.name ?? "Physics",
        date: "2026-12-01",
      },
    ]);
  }

  function removeExam(id: number) {
    setExams((current) => current.filter((exam) => exam.id !== id));
  }

  function updateExam(
    id: number,
    field: "subject" | "date",
    value: string,
  ) {
    setExams((current) =>
      current.map((exam) =>
        exam.id === id ? { ...exam, [field]: value } : exam,
      ),
    );
  }

  function generatePlan() {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      window.location.href = "/planner";
    }, 1200);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl pb-12">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <Sparkles size={21} />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] text-violet-300">
                AI CONFIGURATION
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
                Build your study system.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                Tell the AI about your subjects, current skill levels,
                available time, and upcoming exams.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="space-y-6">
          {/* Subjects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-2xl md:p-6"
          >
            <SectionHeader
              icon={<BookOpen size={18} />}
              eyebrow="01 / SUBJECTS"
              title="What are you studying?"
              description="Add every subject you want the AI to include in your plan."
            />

            <div className="mt-6 space-y-3">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
                        <Brain size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium">{subject.name}</p>
                        <p className="text-[10px] text-white/30">
                          Current skill level
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skillLevels.map((skill) => (
                        <button
                          key={skill.value}
                          type="button"
                          onClick={() =>
                            updateLevel(subject.id, skill.value)
                          }
                          className={`rounded-xl border px-3 py-2 text-[10px] transition ${
                            subject.level === skill.value
                              ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
                              : "border-white/[0.07] bg-white/[0.02] text-white/35 hover:bg-white/[0.05] hover:text-white/60"
                          }`}
                        >
                          {skill.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeSubject(subject.id)}
                      className="self-end rounded-lg p-2 text-white/20 transition hover:bg-red-500/10 hover:text-red-400 lg:self-auto"
                      aria-label={`Remove ${subject.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={newSubject}
                onChange={(event) => setNewSubject(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addSubject();
                }}
                placeholder="Add another subject..."
                className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/30"
              />

              <button
                type="button"
                onClick={addSubject}
                className="flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 text-xs text-violet-200 transition hover:bg-violet-500/20"
              >
                <Plus size={15} />
                Add
              </button>
            </div>
          </motion.section>

          {/* Available time */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-2xl md:p-6"
          >
            <SectionHeader
              icon={<Clock3 size={18} />}
              eyebrow="02 / AVAILABILITY"
              title="How much time do you have?"
              description="The AI will distribute your available hours across your subjects."
            />

            <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-white/35">
                    Daily study time
                  </p>

                  <p className="mt-1 text-4xl font-bold">
                    {hours}
                    <span className="ml-2 text-sm font-normal text-white/30">
                      hours / day
                    </span>
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Clock3 size={18} />
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={hours}
                onChange={(event) =>
                  setHours(Number(event.target.value))
                }
                className="mt-7 w-full accent-violet-500"
              />

              <div className="mt-2 flex justify-between text-[9px] text-white/20">
                <span>1 hour</span>
                <span>5 hours</span>
                <span>10 hours</span>
              </div>
            </div>
          </motion.section>

          {/* Exams */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-2xl md:p-6"
          >
            <SectionHeader
              icon={<CalendarDays size={18} />}
              eyebrow="03 / EXAMS"
              title="When are your exams?"
              description="Exam dates help the AI prioritize what needs attention first."
            />

            <div className="mt-6 space-y-3">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:flex-row"
                >
                  <select
                    value={exam.subject}
                    onChange={(event) =>
                      updateExam(
                        exam.id,
                        "subject",
                        event.target.value,
                      )
                    }
                    className="flex-1 rounded-xl border border-white/[0.08] bg-[#08080f] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/30"
                  >
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    value={exam.date}
                    onChange={(event) =>
                      updateExam(exam.id, "date", event.target.value)
                    }
                    className="rounded-xl border border-white/[0.08] bg-[#08080f] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/30"
                  />

                  <button
                    type="button"
                    onClick={() => removeExam(exam.id)}
                    className="rounded-xl border border-white/[0.07] px-4 text-white/25 transition hover:border-red-400/20 hover:text-red-400"
                    aria-label="Remove exam"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addExam}
              className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-xs text-white/45 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Plus size={15} />
              Add exam
            </button>
          </motion.section>

          {/* Generate */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-r from-violet-600/[0.12] via-fuchsia-500/[0.06] to-cyan-500/[0.08] p-6 md:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />

            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-300" />

                  <span className="text-[10px] tracking-[0.25em] text-violet-300">
                    READY TO COMPUTE
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  Generate your personalized study system.
                </h2>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  {subjects.length} subjects · {hours} hours/day ·{" "}
                  {exams.length} upcoming exam
                  {exams.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={generatePlan}
                disabled={generating || subjects.length === 0}
                className="group flex shrink-0 items-center gap-3 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-semibold shadow-[0_0_40px_rgba(139,92,246,0.25)] transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {generating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate AI Plan
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </AppShell>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
        {icon}
      </div>

      <div>
        <p className="text-[9px] tracking-[0.25em] text-violet-300">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-lg font-semibold">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-white/35">
          {description}
        </p>
      </div>
    </div>
  );
}