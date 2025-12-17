import { db } from "../index.js";
import { users, visits } from "../schema.js";
import type { NewUser, NewVisit } from "../schema.js";
import { and, desc, eq } from "drizzle-orm";

export async function createUser(user: NewUser) {
    const [result] = await db
    .insert(users)
    .values(user)
    .returning();
    return result
}


// true if user exists, false if user not exists
export async function checkIfUserExists(email: string) {
    const result = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

    return result.length > 0;
}

export async function getUserByEmail(email: string) {
    const [result] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
    
    return result;
}


export async function getUserById(id: string) {
    const [result] = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

    return result;
}

export async function addVisit(visit: NewVisit) {
    const [result] = await db
    .insert(visits)
    .values(visit)
    .returning();
    return result;
}


export async function getVisitsByUserId(userId: string) {
    const result = await db
    .select()
    .from(visits)
    .where(eq(visits.user_id, userId))
    .orderBy(desc(visits.visit_date));

    return result;
}

export async function deleteVisit(visitId: string, userId: string) {
    const [deleted] = await db
    .delete(visits)
    .where(and(eq(visits.id, visitId), eq(visits.user_id, userId)))
    .returning();
    return deleted;
}

export async function updateVisit(visitId: string, userId: string, data: Partial<NewVisit>) {
    const [updated] = await db
    .update(visits)
    .set(data)
    .where(and(eq(visits.id, visitId), eq(visits.user_id, userId)))
    .returning();

    return updated;
}