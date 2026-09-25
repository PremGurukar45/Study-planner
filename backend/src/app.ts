import express from "express";
import cors from "cors";
import plannerRoutes from "./routes/planner.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/planner", plannerRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Study Planner Backend is running!"
  });
});

export default app;