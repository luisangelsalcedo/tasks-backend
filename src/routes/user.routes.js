import { Router } from "express";
import { validateToken } from "../middlewares/index.js";
import * as userCtrl from "../controllers/user.controller.js";

const route = Router();

route.post("/user", userCtrl.createUser);
route.post("/user/login", userCtrl.login);
//
route.get("/users", validateToken, userCtrl.getAllUsers);
route.get("/user/:id", validateToken, userCtrl.getUserById);
route.delete("/user/:id", validateToken, userCtrl.deleteUser);
route.get("/user/token/:token", validateToken, userCtrl.userAuth);
//
route.post("/usergoogle", userCtrl.createUserGoogle);
route.post("/usergoogle/login", userCtrl.loginGoogle);

export default route;
