import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET (
    _request: Request,
    { params }: { params: Record<string, string> }
) {
    const ticket = await getTicket(params.ticketId);
    
    return Response.json(ticket);
}