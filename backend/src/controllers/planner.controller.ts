import { Request, Response } from "express";
import { generateStudyPlan } from "../services/planner.service";

export function generatePlanner(req: Request, res: Response) {
  try {
    const plan = generateStudyPlan(req.body);

    res.json({
      success: true,
      plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate study plan"
    });
  }
}