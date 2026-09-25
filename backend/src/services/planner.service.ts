interface Subject {
  name: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  examDate: string;
}

interface GeneratePlanInput {
  subjects: Subject[];
  dailyHours: number;
}

export function generateStudyPlan(input: GeneratePlanInput) {
  const { subjects, dailyHours } = input;

  const today = new Date();

  const subjectsWithPriority = subjects.map((subject) => {
    const examDate = new Date(subject.examDate);

    const daysUntilExam = Math.max(
      1,
      Math.ceil(
        (examDate.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    let skillWeight = 1;

    if (subject.skillLevel === "beginner") {
      skillWeight = 1.3;
    } else if (subject.skillLevel === "intermediate") {
      skillWeight = 1.1;
    }

    const priority = (1 / daysUntilExam) * skillWeight;

    return {
      ...subject,
      daysUntilExam,
      priority
    };
  });

  const totalPriority = subjectsWithPriority.reduce(
    (sum, subject) => sum + subject.priority,
    0
  );

  const totalMinutes = dailyHours * 60;

  return subjectsWithPriority.map((subject) => ({
    subject: subject.name,
    skillLevel: subject.skillLevel,
    examDate: subject.examDate,
    daysUntilExam: subject.daysUntilExam,
    dailyStudyMinutes: Math.round(
      (subject.priority / totalPriority) * totalMinutes
    )
  }));
}