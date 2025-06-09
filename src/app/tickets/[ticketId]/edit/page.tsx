import { notFound } from "next/navigation";

import { CardForm } from "@/components/card-form";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

const TicketEditPage = async ({params}: { params: Promise<{ ticketId: string }> }) => {
    const ticketId = (await params).ticketId;
    const ticket = await getTicket(ticketId);
    
    if (!ticket) {
        notFound();
    }
    
    return (
        <div className="flex flex-1 flex-col item-center">
            <CardForm 
                className="w-full max-w-[420px] self-center animate-fade-in-from-top"
                title="Edit ticket"
                description="Edit the ticket details below."
                content={<TicketUpsertForm ticket={ticket} />}
                footer={<p className="text-sm text-muted-foreground">Make changes to the ticket and save.</p>}
            />
        </div>
    );
}
export default TicketEditPage; 