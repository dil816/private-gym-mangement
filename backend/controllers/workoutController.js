import { workout } from "../models/workoutmodel.js";
import mongoose from "mongoose";

// get all workouts
export const findallWorkout = async (req, res) => {
  const user_id = req.user._id;

  try {
    const result = await workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
export const findsingleWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such a data" });
    }
    const result = await workout.findById(id);

    if (!result) {
      return res.status(404).json({ error: "No such a data" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new workouts
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill all fields", emptyFields });
  }

  try {
    //special step
    const user_id = req.user._id;

    const result = await workout.create({ title, load, reps, user_id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such a data" });
    }
    //findByIdAndDelete
    const result = await workout.findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(404).json({ error: "No such a data" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such a data" });
    }
    //findByIdAndUpdate
    const result = await workout.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!result) {
      return res.status(404).json({ error: "No such a data" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
