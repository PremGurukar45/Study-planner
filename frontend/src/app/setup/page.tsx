"use client";

import { useState } from "react";

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
  { value: 1, label: "Beginner" },
  { value: 2, label: "Basic" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

const skillMap: Record<
  number,
  "beginner" | "intermediate" | "advanced"
> = {
  1: "beginner",
  2: "beginner",
  3: "intermediate",
  4: "advanced",
  5: "advanced",
};

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
    {
      id: 2,
      subject: "Mathematics",
      date: "2026-11-25",
    },
  ]);

  const [hours, setHours] = useState(3);
  const [generating, setGenerating] = useState(false);

  function updateSubjectName(id: number, name: string) {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id ? { ...subject, name } : subject
      )
    );
  }

  function updateSkill(id: number, level: number) {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id ? { ...subject, level } : subject
      )
    );
  }

  function updateExamDate(subjectName: string, date: string) {
    setExams((current) =>
      current.map((exam) =>
        exam.subject === subjectName ? { ...exam, date } : exam
      )
    );
  }

  function addSubject() {
    const id =
      subjects.length > 0
        ? Math.max(...subjects.map((subject) => subject.id)) + 1
        : 1;

    const newSubject = {
      id,
      name: "",
      level: 1,
    };

    setSubjects((current) => [...current, newSubject]);

    setExams((current) => [
      ...current,
      {
        id,
        subject: "",
        date: "",
      },
    ]);
  }

  function removeSubject(id: number) {
    setSubjects((current) =>
      current.filter((subject) => subject.id !== id)
    );

    setExams((current) =>
      current.filter((exam) => exam.id !== id)
    );
  }

  async function generatePlan() {
    if (subjects.length === 0) {
      alert("Please add at least one subject.");
      return;
    }

    const invalidSubject = subjects.find(
      (subject) => !subject.name.trim()
    );

    if (invalidSubject) {
      alert("Please enter a name for every subject.");
      return;
    }

    const formattedSubjects = subjects.map((subject) => {
      const exam = exams.find(
        (item) => item.id === subject.id
      );

      return {
        name: subject.name.trim(),
        skillLevel: skillMap[subject.level],
        examDate:
          exam?.date ||
          new Date().toISOString().split("T")[0],
      };
    });

    setGenerating(true);

    try {
      const response = await fetch(
        "https://study-planner-backend-avww.onrender.com/api/planner/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subjects: formattedSubjects,
            dailyHours: hours,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate study plan");
      }

      const data = await response.json();

      if (!data.success || !Array.isArray(data.plan)) {
        throw new Error("Invalid response from backend");
      }

      localStorage.setItem(
        "studyPlan",
        JSON.stringify(data.plan)
      );

      window.location.href = "/planner";
    } catch (error) {
      console.error("Planner generation failed:", error);

      alert(
        "Could not generate the study plan. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#08080f] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] text-violet-300">
            AI STUDY PLANNER
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Set up your study plan
          </h1>

          <p className="mt-3 text-sm text-white/40">
            Enter your subjects, skill levels, exam dates and
            available study time.
          </p>
        </div>

        <div className="space-y-6">
          {/* Subjects */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Your Subjects
                </h2>

                <p className="mt-1 text-sm text-white/35">
                  Tell the planner what you need to study.
                </p>
              </div>

              <button
                type="button"
                onClick={addSubject}
                className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/20"
              >
                + Add Subject
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {subjects.map((subject) => {
                const exam = exams.find(
                  (item) => item.id === subject.id
                );

                return (
                  <div
                    key={subject.id}
                    className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                      <div>
                        <label className="mb-2 block text-xs text-white/40">
                          Subject
                        </label>

                        <input
                          value={subject.name}
                          onChange={(e) =>
                            updateSubjectName(
                              subject.id,
                              e.target.value
                            )
                          }
                          placeholder="e.g. DSA"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-violet-400/40"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs text-white/40">
                          Skill Level
                        </label>

                        <select
                          value={subject.level}
                          onChange={(e) =>
                            updateSkill(
                              subject.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#11111a] px-4 py-3 text-sm outline-none focus:border-violet-400/40"
                        >
                          {skillLevels.map((skill) => (
                            <option
                              key={skill.value}
                              value={skill.value}
                            >
                              {skill.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs text-white/40">
                          Exam Date
                        </label>

                        <input
                          type="date"
                          value={exam?.date || ""}
                          onChange={(e) =>
                            updateExamDate(
                              subject.name,
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-violet-400/40"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() =>
                            removeSubject(subject.id)
                          }
                          className="rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-sm text-red-300 hover:bg-red-400/10"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Study Hours */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">
              Daily Study Time
            </h2>

            <p className="mt-1 text-sm text-white/35">
              How many hours can you study every day?
            </p>

            <div className="mt-6 flex items-center gap-5">
              <input
                type="range"
                min="1"
                max="12"
                value={hours}
                onChange={(e) =>
                  setHours(Number(e.target.value))
                }
                className="w-full accent-violet-500"
              />

              <div className="min-w-[90px] rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-center">
                <span className="text-xl font-bold">
                  {hours}
                </span>

                <span className="ml-1 text-xs text-white/40">
                  hrs
                </span>
              </div>
            </div>
          </section>

          {/* Generate */}
          <section className="rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Generate Your Plan
                </h2>

                <p className="mt-1 text-sm text-white/35">
                  The backend will calculate study priority
                  based on your exams and skill levels.
                </p>
              </div>

              <button
                type="button"
                onClick={generatePlan}
                disabled={generating}
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {generating
                  ? "Generating..."
                  : "Generate Study Plan"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}