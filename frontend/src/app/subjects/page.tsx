"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Clock3,
  MoreVertical,
  Plus,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";

type Subject = {
  id: number;
  name: string;
  level: number;
  progress: number;
  weeklyHours: number;
  priority: "High" | "Medium" | "Low";
  color: string;
};

const initialSubjects: Subject[] = [
  {
    id: 1,
    name: "Physics",
    level: 2,
    progress: 42,
    weeklyHours: 6,
    priority: "High",
    color: "violet",
  },
  {
    id: 2,
    name: "Mathematics",
    level: 3,
    progress: 68,
    weeklyHours: 8,
    priority: "High",
    color: "cyan",
  },
  {
    id: 3,
    name: "Computer Science",
    level: 4,
    progress: 81,
    weeklyHours: 5,
    priority: "Medium",
    color: "fuchsia",
  },
  {
    id: 4,
    name: "Chemistry",
    level: 3,
    progress: 57,
    weeklyHours: 4,
    priority: "Medium",
    color: "emerald",
  },
];

const levelLabels = [
  "Beginner",
  "Basic",
  "Intermediate",
  "Advanced",
  "Expert",
];

function getLevelLabel(level: number) {
  return levelLabels[level - 1];
}

function getPriorityClass(priority: Subject["priority"]) {
  if (priority === "High") {
    return "border-red-400/20 bg-red-500/10 text-red-300";
  }

  if (priority === "Medium") {
    return "border-amber-400/20 bg-amber-500/10 text-amber-300";
  }

  return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [showAdd, setShowAdd] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newLevel, setNewLevel] = useState(3);

  const totalHours = subjects.reduce(
    (total, subject) => total + subject.weeklyHours,
    0,
  );

  const averageProgress =
    subjects.length === 0
      ? 0
      : Math.round(
          subjects.reduce(
            (total, subject) => total + subject.progress,
            0,
          ) / subjects.length,
        );

  function addSubject() {
    const name = newSubject.trim();

    if (!name) return;

    const subject: Subject = {
      id: Date.now(),
      name,
      level: newLevel,
      progress: 0,
      weeklyHours: 3,
      priority: "Medium",
      color: "violet",
    };

    setSubjects((current) => [...current, subject]);
    setNewSubject("");
    setNewLevel(3);
    setShowAdd(false);
  }

  function deleteSubject(id: number) {
    setSubjects((current) =>
      current.filter((subject) => subject.id !== id),
    );
  }

  function updateLevel(id: number, level: number) {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id ? { ...subject, level } : subject,
      ),
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-violet-300">
              <BookOpen size={14} />
              KNOWLEDGE MATRIX
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Your Subjects
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-white/40">
              Manage your subjects, skill levels and learning priorities.
              Your AI planner uses this information to build your schedule.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-[0_0_30px_rgba(124,58,237,0.2)] transition hover:scale-[1.02]"
          >
            <Plus size={17} />
            Add Subject
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<BookOpen size={18} />}
            label="Total Subjects"
            value={subjects.length.toString()}
            detail="Active subjects"
          />

          <StatCard
            icon={<Clock3 size={18} />}
            label="Weekly Study"
            value={`${totalHours}h`}
            detail="Planned per week"
          />

          <StatCard
            icon={<TrendingUp size={18} />}
            label="Average Progress"
            value={`${averageProgress}%`}
            detail="Across all subjects"
          />

          <StatCard
            icon={<Target size={18} />}
            label="High Priority"
            value={subjects
              .filter((subject) => subject.priority === "High")
              .length.toString()}
            detail="Needs attention"
          />
        </div>

        {/* AI insight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-5 backdrop-blur-xl"
        >
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <Sparkles size={18} className="text-violet-300" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                AI Subject Insight
              </p>

              <p className="mt-1 text-sm leading-6 text-white/45">
                Physics currently has the lowest skill level and a high
                priority. Your planner will allocate additional study time
                to strengthen this subject before the exam.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subjects */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Subject Matrix</h2>

            <span className="text-xs text-white/30">
              {subjects.length} subjects
            </span>
          </div>

          {subjects.length === 0 ? (
            <EmptyState onAdd={() => setShowAdd(true)} />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {subjects.map((subject, index) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={index}
                  onDelete={deleteSubject}
                  onLevelChange={updateLevel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Subject Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0b18] p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Add New Subject
                </h2>

                <p className="mt-1 text-xs text-white/35">
                  Add a subject to your AI learning system.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="rounded-xl p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium text-white/60">
                  Subject Name
                </label>

                <input
                  value={newSubject}
                  onChange={(event) =>
                    setNewSubject(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addSubject();
                  }}
                  placeholder="e.g. Biology"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-violet-400/40"
                />
              </div>

              <div>
                <label className="mb-3 block text-xs font-medium text-white/60">
                  Current Skill Level
                </label>

                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setNewLevel(level)}
                      className={`rounded-xl border py-3 text-sm transition ${
                        newLevel === level
                          ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                          : "border-white/10 bg-white/[0.03] text-white/40 hover:bg-white/[0.06]"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-xs text-white/30">
                  {getLevelLabel(newLevel)}
                </p>
              </div>

              <button
                type="button"
                onClick={addSubject}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold transition hover:opacity-90"
              >
                Add Subject
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AppShell>
  );
}

function SubjectCard({
  subject,
  index,
  onDelete,
  onLevelChange,
}: {
  subject: Subject;
  index: number;
  onDelete: (id: number) => void;
  onLevelChange: (id: number, level: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-violet-400/20 hover:bg-white/[0.055]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
              <BookOpen size={19} className="text-violet-300" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {subject.name}
              </h3>

              <p className="mt-0.5 text-xs text-white/30">
                {getLevelLabel(subject.level)}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="rounded-xl p-2 text-white/30 transition hover:bg-white/5 hover:text-white"
              aria-label={`Actions for ${subject.name}`}
            >
              <MoreVertical size={17} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 z-20 w-36 rounded-xl border border-white/10 bg-[#0d0d1c] p-1 shadow-2xl">
                <button
                  type="button"
                  onClick={() => {
                    onDelete(subject.id);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-300 transition hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getPriorityClass(
              subject.priority,
            )}`}
          >
            {subject.priority} Priority
          </span>

          <span className="text-xs text-white/35">
            {subject.weeklyHours}h / week
          </span>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-white/40">Progress</span>
          <span className="text-xs font-semibold text-white">
            {subject.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${subject.progress}%` }}
            transition={{ duration: 0.8, delay: index * 0.08 }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-white/40">
              Skill Level
            </span>

            <span className="text-xs text-violet-300">
              {subject.level}/5
            </span>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onLevelChange(subject.id, level)}
                className={`h-2 flex-1 rounded-full transition ${
                  level <= subject.level
                    ? "bg-violet-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-label={`Set ${subject.name} skill level to ${level}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4 text-xs text-white/30">
          <Brain size={14} className="text-violet-400" />
          AI priority calculated from skill, progress and exams
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center gap-2 text-violet-300">
        {icon}
        <span className="text-[10px] tracking-[0.15em] text-white/35">
          {label.toUpperCase()}
        </span>
      </div>

      <div className="text-2xl font-bold">{value}</div>

      <p className="mt-1 text-xs text-white/30">{detail}</p>
    </motion.div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
        <BookOpen size={22} className="text-violet-300" />
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        No subjects yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-white/35">
        Add your first subject to start building your personalized
        learning system.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold"
      >
        Add First Subject
      </button>
    </div>
  );
}