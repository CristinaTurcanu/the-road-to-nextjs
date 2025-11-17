"use server";
 
import prisma from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
    // const skip = offset ?? 0;
    const take = 2;
    const where = {
        ticketId,
        id: { lt: cursor }
        // createdAt: {
        //     lt: cursor ? new Date(cursor) : undefined
        // }
    }

    // eslint-disable-next-line prefer-const
    let [comments, count] = await prisma.$transaction([
        prisma.comment.findMany({
            where,
            take: take + 1 ,
            include: { user: { select: { username: true } } },
            orderBy: [{ createdAt: 'desc' }, {id: "desc"}]
        }),
        prisma.comment.count({
            where
        })
    ])

    const hasNextPage = comments.length > take;
    comments = hasNextPage ? comments.slice(0, -1) : comments;

    return {
        list: comments,
        metadata: {
            count,
            hasNextPage,
            cursor: comments.at(-1)?.id
            // hasNextPage: count > skip + take
        }
    }
};