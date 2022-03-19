import { Router } from "express";
import { validateToken } from "../middlewares/index.js";
import * as boardCtrl from "../controllers/board.controller.js";

const route = Router();

route.post("/board", validateToken, boardCtrl.createBoard);
route.get("/boards", validateToken, boardCtrl.getAllBoards);
route.get("/board/:id", validateToken, boardCtrl.getBoardById);
route.put("/board/:id", validateToken, boardCtrl.updateBoard);
route.delete("/board/:id", validateToken, boardCtrl.deleteBoard);
// GUESTS
route.get("/boards/user/:id", validateToken, boardCtrl.getBoardsByUserId);
route.post("/board/:boardID/guest", validateToken, boardCtrl.addGuestInBoard);
// TASKS
route.post("/board/:boardID/addtask", validateToken, boardCtrl.addTaskInBoard);
route.post(
  "/board/:boardID/removetask",
  validateToken,
  boardCtrl.removeTaskInBoard
);

export default route;
