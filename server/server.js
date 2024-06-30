import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/users", userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
