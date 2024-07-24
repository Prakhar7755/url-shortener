import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./utils/connectDB.js";
import urlRouter from "./routes/url.route.js";
import staticRouter from "./routes/staticRouter.route.js";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB(process.env.DB_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler); // Error handling middleware

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

// Routes
app.use("/url", urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
