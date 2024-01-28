import express from "express";
import {
  createWorkout,
  findallWorkout,
  findsingleWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

//middleware
// require auth for all workout router
router.use(requireAuth);

// GET all workouts
router.get("/", findallWorkout);

// GET a single workout
router.get("/:id", findsingleWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

export default router;
