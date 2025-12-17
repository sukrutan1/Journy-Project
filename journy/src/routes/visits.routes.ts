import { Router } from "express";
import { addVisit, listVisits, deleteUserVisit, updateUserVisit } from "../controllers/visits.controller";
import { authenticateMiddleware } from "../middlewares/auth.middleware";

const visitsRouter = Router();

visitsRouter.post("/", authenticateMiddleware, addVisit);
visitsRouter.get("/", authenticateMiddleware, listVisits);
visitsRouter.delete("/:id", authenticateMiddleware, deleteUserVisit);
visitsRouter.put("/:id", authenticateMiddleware, updateUserVisit);


export default visitsRouter;