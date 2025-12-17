import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller";
import { authenticateMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticateMiddleware, getMe);

export default authRouter;