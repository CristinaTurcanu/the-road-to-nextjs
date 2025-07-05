"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

export const createTicket = async (formData: FormData) => {
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
        deadline: formData.get("deadline"),
        bounty: formData.get("bounty"),
    }

    if (!data.title || !data.content) {
        throw new Error("Title and content are required");
    }

    await prisma.ticket.create({
        data: { 
            title: data.title as string,
            content: data.content as string,
            deadline: data.deadline as string,
            bounty: toCent(Number(data.bounty ?? 0)),
        },
    });
    revalidatePath(ticketsPath());
};