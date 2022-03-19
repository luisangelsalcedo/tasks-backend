import express, { urlencoded } from "express";
import userRoute from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";
import "dotenv/config";
import "./dataBase.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

// routes
const base = "/api";
app.use(base, userRoute);
app.use(base, boardRoutes);
app.use(base, taskRoutes);

export default app;
