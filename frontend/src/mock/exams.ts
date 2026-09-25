export type Exam = {
  id: number;
  subject: string;
  examName: string;
  date: string;
  progress: number;
  priority: "High" | "Medium" | "Low";
};

export const mockExams: Exam[] = [
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