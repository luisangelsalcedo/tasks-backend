import { Router } from "express";
import { validateToken } from "../middlewares/index.js";
import * as taskCtrl from "../controllers/task.controller.js";

const route = Router();

route.post("/task", validateToken, taskCtrl.createTask);
route.get("/tasks", validateToken, taskCtrl.getAllTask);
route.get("/task/:id", validateToken, taskCtrl.getTaskById);
route.put("/task/:id", validateToken, taskCtrl.updateTask);
route.delete("/task/:id", validateToken, taskCtrl.deleteTask);
//
route.get("/tasks/board/:id", validateToken, taskCtrl.getTasksByBoardId);
route.post("/task/:id/assign", validateToken, taskCtrl.assignTask);

export default route;
