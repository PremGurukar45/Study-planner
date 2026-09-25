export type Subject = {
  id: number;
  name: string;
  level: number;
  progress: number;
  weeklyHours: number;
  priority: "High" | "Medium" | "Low";
  color: string;
};

export const mockSubjects: Subject[] = [
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