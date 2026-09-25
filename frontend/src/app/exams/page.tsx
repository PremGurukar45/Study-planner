"use client";

import AppShell from "@/components/layout/AppShell";
import { AnimatePresence, motion } from "framer-motion";
import {
AlertTriangle,
CalendarDays,
CheckCircle2,
Clock3,
GraduationCap,
Plus,
Sparkles,
Target,
Trash2,
X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Exam = {
id: number;
subject: string;
examName: string;
date: string;
progress: number;
priority: "High" | "Medium" | "Low";
};

const initialExams: Exam[] = [
{
id: 1,
subject: "Physics",
examName: "End Semester Examination",
date: "2026-11-20",
progress: 42,
priority: "High",
},
{
id: 2,
subject: "Mathematics",
examName: "University Examination",
date: "2026-12-05",
progress: 68,
priority: "High",
},
{
id: 3,
subject: "Computer Science",
examName: "Internal Assessment",
date: "2026-12-15",
progress: 81,
priority: "Medium",
},
{
id: 4,
subject: "Chemistry",
examName: "Final Examination",
date: "2027-01-08",
progress: 57,
priority: "Low",
},
];

const subjectColors: Record<string, string> = {
Physics: "violet",
Mathematics: "cyan",
"Computer Science": "fuchsia",
Chemistry: "emerald",
};

function getDaysRemaining(date: string) {
const today = new Date();
const examDate = new Date(date);

today.setHours(0, 0, 0, 0);
examDate.setHours(0, 0, 0, 0);

const difference = examDate.getTime() - today.getTime();

return Math.max(
0,
Math.ceil(difference / (1000 * 60 * 60 * 24))
);
}

function formatDate(date: string) {
return new Date(date).toLocaleDateString("en-US", {
day: "numeric",
month: "short",
year: "numeric",
});
}

export default function ExamsPage() {
const [exams, setExams] = useState<Exam[]>(initialExams);
const [showModal, setShowModal] = useState(false);

const [subject, setSubject] = useState("");
const [examName, setExamName] = useState("");
const [date, setDate] = useState("");
const [priority, setPriority] =
useState<Exam["priority"]>("Medium");

const upcomingExams = useMemo(() => {
return [...exams].sort(
(a, b) =>
getDaysRemaining(a.date) -
getDaysRemaining(b.date)
);
}, [exams]);

const nearestExam = upcomingExams[0];

const totalExams = exams.length;

const completedExams = exams.filter(
(exam) => exam.progress >= 100
).length;

const averageProgress =
exams.length > 0
? Math.round(
exams.reduce(
(sum, exam) => sum + exam.progress,
0
) / exams.length
)
: 0;

const urgentExams = exams.filter(
(exam) => getDaysRemaining(exam.date) <= 30
).length;

function addExam() {
if (!subject.trim() || !examName.trim() || !date) {
return;
}
const newExam: Exam = {
  id: Date.now(),
  subject: subject.trim(),
  examName: examName.trim(),
  date,
  progress: 0,
  priority,
};

setExams((current) => [...current, newExam]);

setSubject("");
setExamName("");
setDate("");
setPriority("Medium");
setShowModal(false);
}

function deleteExam(id: number) {
setExams((current) =>
current.filter((exam) => exam.id !== id)
);
}

return ( <AppShell> <div className="space-y-6">
{/* Header */}
<motion.div
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
> <div> <div className="mb-2 flex items-center gap-2"> <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10"> <CalendarDays
               size={16}
               className="text-violet-300"
             /> </div>

```
          <span className="text-xs font-semibold tracking-[0.2em] text-violet-300">
            EXAM COMMAND CENTER
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Your exams
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-white/40">
          Track upcoming examinations and let the AI
          planner adjust your preparation around every
          deadline.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500/25"
      >
        <Plus size={17} />
        Add Exam
      </button>
    </motion.div>

    {/* Stats */}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {
          label: "Total Exams",
          value: totalExams,
          icon: GraduationCap,
          description: "Scheduled examinations",
        },
        {
          label: "Average Progress",
          value: `${averageProgress}%`,
          icon: Target,
          description: "Overall preparation",
        },
        {
          label: "Within 30 Days",
          value: urgentExams,
          icon: AlertTriangle,
          description: "Need immediate focus",
        },
        {
          label: "Completed",
          value: completedExams,
          icon: CheckCircle2,
          description: "Fully prepared exams",
        },
      ].map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
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

    {/* Nearest Exam */}
    {nearestExam && (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/[0.12] via-fuchsia-500/[0.06] to-transparent p-5"
      >
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles
                size={15}
                className="text-violet-300"
              />

              <span className="text-[10px] font-semibold tracking-[0.2em] text-violet-300">
                NEXT EXAM
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">
              {nearestExam.subject} ·{" "}
              {nearestExam.examName}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                {formatDate(nearestExam.date)}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={13} />
                {getDaysRemaining(nearestExam.date)}{" "}
                days remaining
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-semibold text-white">
                {nearestExam.progress}%
              </p>

              <p className="text-[10px] tracking-wider text-white/30">
                PREPARED
              </p>
            </div>

            <div className="h-12 w-px bg-white/10" />

            <div className="h-12 w-12 rounded-full border border-violet-400/20 bg-violet-500/10 p-1">
              <div
                className="flex h-full w-full items-center justify-center rounded-full text-xs font-semibold text-violet-200"
                style={{
                  background: `conic-gradient(#8b5cf6 ${nearestExam.progress}%, rgba(255,255,255,0.06) ${nearestExam.progress}%)`,
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b0920]">
                  {nearestExam.progress}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )}

    {/* Exam Timeline */}
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Examination timeline
          </h3>

          <p className="mt-1 text-xs text-white/30">
            Your preparation deadlines, ordered by
            urgency.
          </p>
        </div>

        <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-wider text-white/40">
          {exams.length} EXAMS
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {upcomingExams.map((exam, index) => {
            const daysRemaining =
              getDaysRemaining(exam.date);

            const color =
              subjectColors[exam.subject] ?? "violet";

            const priorityStyles = {
              High:
                "border-red-400/20 bg-red-500/10 text-red-300",
              Medium:
                "border-amber-400/20 bg-amber-500/10 text-amber-300",
              Low:
                "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
            };

            return (
              <motion.div
                layout
                key={exam.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-violet-400/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                        color === "cyan"
                          ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
                          : color === "fuchsia"
                            ? "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300"
                            : color === "emerald"
                              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                              : "border-violet-400/20 bg-violet-500/10 text-violet-300"
                      }`}
                    >
                      <GraduationCap size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-violet-300">
                        {exam.subject}
                      </p>

                      <h4 className="mt-1 truncate text-base font-semibold text-white">
                        {exam.examName}
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteExam(exam.id)
                    }
                    aria-label={`Delete ${exam.examName}`}
                    className="rounded-lg p-2 text-white/20 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-white/25">
                      EXAM DATE
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      {formatDate(exam.date)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        daysRemaining <= 14
                          ? "text-red-300"
                          : daysRemaining <= 30
                            ? "text-amber-300"
                            : "text-white"
                      }`}
                    >
                      {daysRemaining}
                    </p>

                    <p className="text-[10px] tracking-[0.12em] text-white/25">
                      DAYS LEFT
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-white/35">
                      Preparation
                    </span>

                    <span className="text-xs font-medium text-white/60">
                      {exam.progress}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${exam.progress}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                      }}
                      className={`h-full rounded-full ${
                        color === "cyan"
                          ? "bg-cyan-400"
                          : color === "fuchsia"
                            ? "bg-fuchsia-400"
                            : color === "emerald"
                              ? "bg-emerald-400"
                              : "bg-violet-400"
                      }`}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium ${priorityStyles[exam.priority]}`}
                  >
                    {exam.priority} Priority
                  </span>

                  {exam.progress >= 80 ? (
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-300">
                      <CheckCircle2 size={13} />
                      Strong preparation
                    </span>
                  ) : exam.progress >= 50 ? (
                    <span className="text-[10px] text-amber-300">
                      Keep building
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] text-red-300">
                      <AlertTriangle size={13} />
                      Needs attention
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {exams.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
          <CalendarDays
            size={32}
            className="mx-auto text-white/20"
          />

          <h3 className="mt-4 text-sm font-medium text-white/70">
            No exams scheduled
          </h3>

          <p className="mt-1 text-xs text-white/30">
            Add your next examination to let the AI
            planner prepare for it.
          </p>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-5 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-200 transition hover:bg-violet-500/20"
          >
            Add your first exam
          </button>
        </div>
      )}
    </div>

    {/* AI Insight */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.05] p-5"
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
          <Sparkles
            size={17}
            className="text-violet-300"
          />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-violet-300">
            AI PREPARATION INSIGHT
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">
            {nearestExam
              ? `${nearestExam.subject} is currently your nearest examination. Your planner can increase its study allocation as the deadline approaches while maintaining revision time for your other subjects.`
              : "Add an examination deadline and the AI planner will automatically account for it when generating your study schedule."}
          </p>
        </div>
      </div>
    </motion.div>
  </div>

  {/* Add Exam Modal */}
  <AnimatePresence>
    {showModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setShowModal(false);
          }
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0920] p-6 shadow-2xl shadow-violet-950/40"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-300">
                NEW DEADLINE
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                Add examination
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowModal(false)
              }
              className="rounded-lg p-2 text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs text-white/50">
                Subject
              </label>

              <input
                value={subject}
                onChange={(event) =>
                  setSubject(event.target.value)
                }
                placeholder="e.g. Physics"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/50">
                Examination name
              </label>

              <input
                value={examName}
                onChange={(event) =>
                  setExamName(event.target.value)
                }
                placeholder="e.g. End Semester Examination"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/50">
                Exam date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/50">
                Priority
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(
                  ["High", "Medium", "Low"] as const
                ).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setPriority(item)
                    }
                    className={`rounded-xl border px-3 py-2.5 text-xs transition ${
                      priority === item
                        ? item === "High"
                          ? "border-red-400/30 bg-red-500/10 text-red-300"
                          : item === "Medium"
                            ? "border-amber-400/30 bg-amber-500/10 text-amber-300"
                            : "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                        : "border-white/10 bg-white/[0.03] text-white/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={addExam}
            disabled={
              !subject.trim() ||
              !examName.trim() ||
              !date
            }
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500/25 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={16} />
            Add Examination
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</AppShell>
)
}