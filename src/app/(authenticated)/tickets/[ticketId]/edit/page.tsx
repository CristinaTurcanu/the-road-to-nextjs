import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardForm } from "@/components/card-form";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketPath, ticketsPath } from "@/paths";

const TicketEditPage = async ({params}: { params: Promise<{ ticketId: string }> }) => {
    const { user } = await getAuth();
    const ticketId = (await params).ticketId;
    const ticket = await getTicket(ticketId);

    const isTicketFound = !!ticket;
    const isTicketOwner = isOwner(user, ticket);
    
    if (!isTicketFound || !isTicketOwner) {
        notFound();
    }
    
    return (
        <div className="flex flex-1 flex-col gap-y-8">
            <Breadcrumbs breadcrumbs={[
                { title: 'Tickets', href: ticketsPath() },
                { title: ticket.title, href: ticketPath(ticket.id) },
                { title: 'Edit' }
            ]} />
            <Separator />
            <div className="flex flex-1 flex-col item-center">
                <CardForm 
                    className="w-full max-w-[420px] self-center animate-fade-in-from-top"
                    title="Edit ticket"
                    description="Edit the ticket details below."
                    content={<TicketUpsertForm ticket={ticket} />}
                    footer={<p className="text-sm text-muted-foreground">Make changes to the ticket and save.</p>}
                />
            </div>
        </div>
    );
}
export default TicketEditPage; 