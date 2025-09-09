import { Ticket } from "@prisma/client";

import prisma from "@/lib/prisma";

import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
    userId: string | undefined,
    searchParams: ParsedSearchParams
): Promise<Ticket[]> => {
    const { search, sortKey, sortValue } = await searchParams;
    return await prisma.ticket.findMany({
        where: {
            userId,
            title: {
                contains: search,
                mode: 'insensitive'
            }
        },
        orderBy: {
            // ...(sort === "newest" && {createdAt: 'desc'}),
            // ...(sort === 'bounty' && {bounty: 'desc'}),
            [sortKey]: sortValue
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}  