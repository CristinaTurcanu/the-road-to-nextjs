

import prisma from "@/lib/prisma";

import { Ticket } from "../types";

export const getTicket = async (id: string) => {
    return await prisma.ticket.findUnique({
        where: { id},
})
};