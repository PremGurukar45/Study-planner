export type StudyTask = {
  id: number;
  time: string;
  duration: string;
  subject: string;
  topic: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

export type PlannerResponse = {
  plan: {
    date: string;
    subject: string;
    duration: number;
    activity: string;
    type: string;
  }[];
};

export const mockPlannerTasks: StudyTask[] = [
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

export const mockPlanner: PlannerResponse = {
  plan: [
    {
      date: "2026-09-25",
      subject: "Physics",
      duration: 90,
      activity: "Electromagnetic Induction",
      type: "Learning",
    },
    {
      date: "2026-09-25",
      subject: "Mathematics",
      duration: 60,
      activity: "Differential Equations",
      type: "Practice",
    },
    {
      date: "2026-09-25",
      subject: "Computer Science",
      duration: 45,
      activity: "Binary Trees",
      type: "Revision",
    },
  ],
};