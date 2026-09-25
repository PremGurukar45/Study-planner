import { Router } from "express";
import { generatePlanner } from "../controllers/planner.controller";

const router = Router();

router.post("/generate", generatePlanner);

export default router;