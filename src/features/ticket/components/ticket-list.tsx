import { Ticket } from "@prisma/client";

import { Placeholder } from "@/components/placeholder";

import { getTickets } from "../queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import {TicketItem} from "./ticket-item"
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListPprops = {
    userId?: string;
    searchParams: ParsedSearchParams;
}
const TicketList = async ({userId, searchParams}: TicketListPprops) => {
    const tickets = await getTickets(userId, searchParams);

    return (
        <div className='flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top'>
            <div className="w-full max-w-[420px] flex gap-x-2">
                <TicketSearchInput placeholder="Search" />
                <TicketSortSelect
                    options={[
                        { label: 'Newest', sortKey: 'createdAt', sortValue: 'desc' },
                        { label: 'Oldest', sortKey: 'createdAt', sortValue: 'asc' },
                        { label: 'Bounty', sortKey: 'bounty', sortValue: 'desc' },
                    ]} />
            </div>
            {tickets.length ? tickets.map((ticket) => (
                <TicketItem ticket={ticket as Ticket & {user: {username: string}}} key={ticket.id} />
            )) : (
                <Placeholder label="No tickets found" />
            )}
        </div>
    );
}
export {TicketList};
