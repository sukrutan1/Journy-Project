import type { NextFunction, Request, Response } from "express";
import { getBearerToken, verifyJWT } from "../utils/jwt";

export async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = await getBearerToken(req);
        const decoded = await verifyJWT(token);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "No auth." });
    }
}