import { notFound } from "next/navigation";

import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: { ticketId: string };
};

const TicketsPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
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