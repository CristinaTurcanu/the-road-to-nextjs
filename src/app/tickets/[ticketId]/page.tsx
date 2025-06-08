import { notFound } from "next/navigation";

import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

const TicketsPage = async ({ params }: { params: Promise<{ ticketId: string }> }) => {
    // Use the params promise to get the ticketId
    // This is necessary because Next.js passes params as a promise in dynamic routes
    const ticketId = await params.then(p => p.ticketId);
    const ticket = await getTicket(ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <div className="flex justify-center animate-fade-in-from-top">
            <TicketItem ticket={ticket} isDetail />
        </div>
    );
};

export default TicketsPage;