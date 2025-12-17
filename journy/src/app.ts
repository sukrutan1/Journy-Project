import express from "express";
import { db } from "./db/index.js";
import authRouter from "./routes/auth.routes.js";
import visitsRouter from "./routes/visits.routes.js";


const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/visits", visitsRouter);

app.get("/health", async (req, res) => {
    try {
        await db.execute("SELECT 1");
        res.json({
            status: "OK",
            uptime: process.uptime(),
            timestamp: new Date(),
            db: "Connected",
        });
    } catch (err) {
        console.error("Health check failed:", err);
        res.status(500).json({ status: "ERROR", db: "Disconnected", });
    }
});

export default app;

