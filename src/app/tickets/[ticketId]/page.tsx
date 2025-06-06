import React, { use } from "react";
import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";
import TicketItem from "@/features/ticket/components/ticket-item";
import Link from "next/link";

const TicketsPage = ({ params }: { params: Promise<{ ticketId: string }> }) => {
  const { ticketId } = use(params);
  const ticket = initialTickets.find(t => t.id.toString() === ticketId);

  if (!ticket) {
    return (
    <div className="flex flex-1">
      <Placeholder
        label="Ticket not found"
        button={<Button asChild variant={"outline"}><Link href={ticketsPath()}>Go to tickets</Link></Button>}
      />
    </div>
  )}

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketsPage;