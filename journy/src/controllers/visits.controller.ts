import type { Request, Response } from "express";
import { getAllVisits, handlerCreateVisit, handlerRemoveVisit, handlerUpdateVisit } from "../services/visits.service";

export async function addVisit(req: Request, res: Response) {

    try {
        const { countryCode, color, notes } = req.body;
        const userId = req.userId as string;
        if (!countryCode) {
            return res.status(400).json({ error: "Country code is required"});
        }

        const visit = await handlerCreateVisit({
            userId,
            countryCode,
            color,
            notes
        });

        res.status(201).json(visit);
    } catch (err) {
        console.error("Add visit Error:", err);
        res.status(500).json({ error: "Failed to add visit"});
    }

}

export async function listVisits(req: Request, res: Response) {
    try {
        const userId = req.userId as string;
        const visits = await getAllVisits(userId);

        res.status(200).json(visits);
    } catch (err) {
        console.error("List visits error:", err);
        res.status(500).json({ error: "Failed to fetch visits"});
    }
}

export async function deleteUserVisit(req: Request, res: Response) {
    try {
        const userId = req.userId as string;
        const visitId = req.params.id as string;

        const deleted = await handlerRemoveVisit(visitId, userId);

        if (!deleted) {
            return res.status(404).json({ error: "Visit not found or not authorized"});
        }

        res.status(200).json({ message: "Visit deleted successfully" });
    } catch (err) {
        console.error("Delete Visit Error:", err);
        res.status(500).json({ error: "Failed to delete visit" });
    }
}


export async function updateUserVisit(req: Request, res: Response) {
    try {
        const userId = req.userId as string;
        const visitId = req.params.id as string;

        const { countryCode, color, notes } = req.body;

        const updated = await handlerUpdateVisit(visitId, userId, {
            countryCode,
            color,
            notes
        });

        if (!updated) {
            return res.status(404).json({ error: "Visit not found or not authorized" });
        }

        res.status(200).json(updated);

    } catch (err) {
        console.error("Update Visit Error:", err);
        res.status(500).json({ error: "Failed to update visit" });
    }
}

