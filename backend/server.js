import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import workOutRoute from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// rotes
app.use("/api/workouts", workOutRoute);
app.use("/api/user", userRoutes);

// Connect to the DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to DB");
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
