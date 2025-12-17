import jwt from "jsonwebtoken";
import { config } from "../config/config";
import type { Request } from "express";


export type TokenPayload = {
    userId: string,
};

export async function generateJWTToken(payload: TokenPayload) {
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "7d"});
    return token;
}

export async function getBearerToken(req: Request) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        throw new Error("No authorization error");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("No token provided");
    }
    return token;
}


export async function verifyJWT(token: string) {
    let decoded = jwt.verify(token, config.jwt.secret) as TokenPayload;
    return decoded;
}