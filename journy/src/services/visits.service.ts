import { addVisit, deleteVisit, getVisitsByUserId, updateVisit } from "../db/queries/queries.js";
import { type NewVisit } from "../db/schema";


type CreateVisitInput = {
    userId: string;
    countryCode: string;
    color?: string;
    notes?: string;
};

type UpdateVisitInput = {
    countryCode?: string;
    color?: string;
    notes?: string;
};


export async function handlerCreateVisit(input: CreateVisitInput) {

    const visitData: NewVisit = {
        user_id: input.userId,
        country_code: input.countryCode,
        color: input.color,
        notes: input.notes,
    };

    const createdVisit = await addVisit(visitData);

    return createdVisit;
}

export async function getAllVisits(userId: string) {
    return await getVisitsByUserId(userId);
}


export async function handlerRemoveVisit(visitId: string, userId: string) {
    return await deleteVisit(visitId, userId);
}


export async function handlerUpdateVisit(visitId: string, userId: string, input: UpdateVisitInput) {
    const updateData: any = {};

    if (input.countryCode) {
        updateData.country_code = input.countryCode;
    }
    if (input.color) {
        updateData.color = input.color;
    }
    if (input.notes) {
        updateData.notes = input.notes;
    }

    if (Object.keys(updateData).length === 0) {
        return null;
    }

    return await updateVisit(visitId, userId, updateData);
}