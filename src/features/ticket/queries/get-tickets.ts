import { Ticket } from "@prisma/client";

import prisma from "@/lib/prisma";

import { ParsedSearchParams } from "../search-params";

type GetTicketsResult = {
    list: Ticket[];
    metadata: {
        count: number;
        hasNextPage: boolean;
    };
};

export const getTickets = async (
    userId: string | undefined,
    searchParams: ParsedSearchParams
): Promise<GetTicketsResult> => {
    const { search, sortKey, sortValue, page, size } = await searchParams;
    const where = {
        userId,
        title: {
            contains: search,
            mode: 'insensitive' as const
        }
    };
    const take = size;
    const skip = page * size;

    const [tickets, count] = await prisma.$transaction([
        prisma.ticket.findMany({
            where,
            skip,
            take,
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
        }),
        prisma.ticket.count({ where })
    ]);

    return {
        list: tickets,
        metadata: {
            count,
            hasNextPage: count > skip + take,
        },
    };
}