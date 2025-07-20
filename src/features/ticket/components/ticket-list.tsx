import { Ticket } from "@prisma/client";

import { getTickets } from "../queries/get-tickets";
import {TicketItem} from "./ticket-item"

type TicketListPprops = {
    userId?: string;
}
const TicketList = async ({userId}: TicketListPprops) => {
    const tickets = await getTickets(userId);

    return (
        <div className='flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top'>
            {tickets.map((ticket) => (
                <TicketItem ticket={ticket as Ticket & {user: {username: string}}} key={ticket.id} />
            ))}
        </div>
    );
}
export {TicketList};
