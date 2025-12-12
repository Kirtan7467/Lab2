import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import TodoDataRoutes from "./routes/TodoDataRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/TodoData",TodoDataRoutes)

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(8000, () =>
      console.log("Server running on http://localhost:8000")
    );
  });
