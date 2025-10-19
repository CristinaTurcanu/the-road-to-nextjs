import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET (
    _request: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: any
) {
    const ticket = await getTicket(params.ticketId);
    
    return Response.json(ticket);
}