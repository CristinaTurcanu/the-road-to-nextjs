import { getTickets } from "../queries/get-tickets";
import {TicketItem} from "./ticket-item"

const TicketList = async () => {
    const tickets = await getTickets();

    return (
        <div className='flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top'>
            {tickets.map((ticket) => (
                <TicketItem ticket={ticket} key={ticket.id} />
            ))}
        </div>
    );
}
export {TicketList};
