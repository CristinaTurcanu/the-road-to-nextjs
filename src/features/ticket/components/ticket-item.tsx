import { ticketPath } from '@/paths';
import Link from 'next/link';
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TICKETS_ICONS } from '../constants';
import { Ticket } from '../types';
import { LucideSquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

type TicketItemProps = {
    ticket: Ticket;
    isDetail?: boolean;
};

const TicketItem = ({ticket, isDetail}: TicketItemProps) => {
    const detailButton = (
        <Button variant={"outline"} size={"icon"} asChild>
            <Link href={ticketPath(ticket.id)} className="text-blue-500 underline">
                <LucideSquareArrowOutUpRight className='h-4 w-4' />
            </Link>
        </Button>
    );

    return (
        <div className={clsx('w-full flex gap-x-1', {
            'max-w-[580px]': isDetail,
            'max-w-[420px]': !isDetail,
        })}>
            <Card key={ticket.id} className="w-full">
              <CardHeader>
                <CardTitle className='flex gap-x-2'>
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
            </Card>
            {isDetail ? null : <div className='flex flex-col gap-y-1'>{detailButton}</div>}
        </div>
    )
};
export default TicketItem;
 
