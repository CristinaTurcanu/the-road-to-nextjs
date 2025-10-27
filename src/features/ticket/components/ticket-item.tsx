import { Prisma } from '@prisma/client';
import clsx from 'clsx';
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { Comments } from '@/features/comment/components/comments';
import { CommentWithMetadata } from '@/features/comment/types';
import { ticketEditPath, ticketPath } from '@/paths';
import { toCurrencyFromCents } from '@/utils/currency';

import { TICKETS_ICONS } from '../constants';
import { TicketMoreMenu } from './TicketMoreMenu';

type TicketItemProps = {
    ticket: Prisma.TicketGetPayload<{
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    }>;
    isDetail?: boolean;
    paginatedComments?: {
        list: CommentWithMetadata[],
        metadata: {count: number, hasNextPage: boolean}
    };
};

const TicketItem = async ({ticket, isDetail, paginatedComments}: TicketItemProps) => {
    const { user } = await getAuth();
    const isTicketOwner = isOwner(user, ticket);
    
    const viewButton = (
        <Button variant={"outline"} size={"icon"} asChild>
            <Link prefetch href={ticketPath(ticket.id)} className="text-blue-500 underline">
                <LucideSquareArrowOutUpRight className='h-4 w-4' />
            </Link>
        </Button>
    );

    // const deleteButton = useConfirmDialog({
    //     action: deleteTicket.bind(null, ticket.id),
    //     trigger: (
    //         <Button variant={"outline"} size={"icon"} >
    //             <LucideTrash className='h-4 w-4' />
    //         </Button>
    //     )
    // });

    const editButton = isTicketOwner ? (
        <form action={''}>
            <Button variant={"outline"} size={"icon"} >
                <Link prefetch href={ticketEditPath(ticket.id)} className="text-blue-500 underline">
                    <LucidePencil className='h-4 w-4' />
                </Link>
            </Button>
        </form>
    ) : null;

    const moreMenu = isTicketOwner ? (<TicketMoreMenu 
        ticket={ticket} 
        trigger={
            <Button className="p-2 rounded hover:bg-gray-100">
                <LucideMoreVertical className="h-4 w-4" />
            </Button>
        }
    />) : null;

    return (
        <div className={clsx('w-full flex flex-col gap-y-4', {
            'max-w-[580px]': isDetail,
            'max-w-[420px]': !isDetail,
        })}>
            <div className='flex gap-x-2'>
                <Card key={ticket.id} className="w-full">
                    <CardHeader>
                        <CardTitle className='flex gap-x-2 items-baseline'>
                            <span>{TICKETS_ICONS[ticket.status]}</span>
                            <span className="truncate">{ticket.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className={clsx('whitespace-break-spaces', {
                            "line-clamp-3": !isDetail,
                        })}>
                            {ticket.content}
                        </span>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <p className="text-sm text-muted-foreground">{ticket.deadline} by {ticket.user.username}</p>
                        <p className="text-sm text-muted-foreground">{toCurrencyFromCents(ticket.bounty)}</p>
                    </CardFooter>
                </Card>
                <div className='flex flex-col gap-y-1'>
                    {isDetail ? (
                        <>
                            {editButton}
                            {moreMenu}
                        </>) : (
                        <>
                            {viewButton}
                            {editButton}
                        </>
                    )
                    }
                </div>
            </div>
            {isDetail && 
                <Comments ticketId={ticket.id} ticket={ticket} paginatedComments={paginatedComments}/>
            }
        </div>
    )
};
export {TicketItem};
 
