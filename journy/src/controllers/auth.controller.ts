import type { Request, Response } from "express";
import { getUserProfile, handlerLogin, handlerRegister } from "../services/auth.service";

export async function register(req: Request, res: Response) {
    type parameters = {
        email: string,
        password: string,
        fullName: string,
    };
    try {
        let user: parameters = req.body;
        const createdUser = await handlerRegister(user.email, user.password, user.fullName);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message});
    }
}


export async function login(req: Request, res: Response) {
    type parameters = {
        email: string,
        password: string,
    };

    try {
        let user: parameters = req.body;
        const jwtToken = await handlerLogin(user.email, user.password);
        res.status(200).json(jwtToken);
    } catch (err) {
        res.status(401).json( { error: (err as Error).message});
    }
}


export async function getMe(req: Request, res: Response) {
    const userId = req.userId as string;

    const user = await getUserProfile(userId);

    res.status(200).json(user);
}