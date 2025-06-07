import { initialTickets } from "@/data";

import { Ticket } from "../types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
    console.log(`Fetching ticket with ID: ${ticketId}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const maybeTicket = initialTickets.find(ticket => ticket.id.toString() === ticketId);

    return new Promise((resolve) => {
        resolve(maybeTicket || null);
    });
};