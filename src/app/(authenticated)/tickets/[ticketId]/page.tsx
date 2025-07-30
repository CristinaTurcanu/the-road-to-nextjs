import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketsPath } from "@/paths";

const TicketsPage = async ({ params }: { params: Promise<{ ticketId: string }> }) => {
    // Use the params promise to get the ticketId
    // This is necessary because Next.js passes params as a promise in dynamic routes
    const ticketId = await params.then(p => p.ticketId);
    const ticket = await getTicket(ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <div className="flex flex-1 flex-col gap-y-8">
            <Breadcrumbs breadcrumbs={[
                { title: 'Tickets', href: ticketsPath() },
                { title: ticket.title }
            ]} />
            <Separator />
            <div className="flex justify-center animate-fade-in-from-top">
                <TicketItem ticket={ticket} isDetail />
            </div>
        </div>

    );
};

export default TicketsPage;