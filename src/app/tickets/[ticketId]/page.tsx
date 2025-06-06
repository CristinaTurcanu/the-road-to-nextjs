import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import TicketItem from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
  params: { ticketId: string };
};

const TicketsPage = ({params}: TicketPageProps) => {
  const ticket = initialTickets.find(t => t.id.toString() === params.ticketId);

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