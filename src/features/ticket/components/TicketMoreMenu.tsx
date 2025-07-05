"use client";
import { Ticket, TicketStatus } from '@prisma/client';
import { LucideTrash } from 'lucide-react';
import { toast } from 'sonner';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { updateTicketStatus } from '../actions/update-ticket-status';
import { TICKET_STATUS_LABELS } from '../constants';

type TicketMoreMenuProps = {
    ticket: Ticket;
    trigger: React.ReactNode;
}

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
    const deleteTicketButton = (
        <DropdownMenuItem>
            <LucideTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );

    const handleTicketStatusChange = async (value: string) => {
        const promise  = updateTicketStatus(ticket.id, value as TicketStatus);

        toast.promise(promise, {
            loading: "Updating ticket status...",
        })

        const result = await promise;

        if (result.status === "ERROR") {
            toast.error(result.message);
        } else if (result.status === "SUCCESS") {
            toast.success(result.message);
        }
    }

    const ticketStatusRadioGroupItem = (
        <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleTicketStatusChange}>
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
                <DropdownMenuRadioItem key={key} value={key}>{TICKET_STATUS_LABELS[key]}</DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
                {ticketStatusRadioGroupItem}
                <DropdownMenuSeparator />
                {deleteTicketButton}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export {TicketMoreMenu};
