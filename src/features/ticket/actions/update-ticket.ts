"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

export const updateTicket = async (id: string, formData: FormData) => {
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
        deadline: formData.get("deadline"),
        bounty: formData.get("bounty"),
    }

    await prisma.ticket.update({
        where: { id },
        data: {
            title: data.title as string, 
            content: data.content as string,
            deadline: data.deadline as string,
            bounty: toCent(Number(data.bounty ?? 0)),
        },
    });
    revalidatePath(ticketsPath());
    redirect(ticketsPath());
};