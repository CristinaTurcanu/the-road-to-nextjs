export type TicketStatus = 'OPEN' | 'CLOSED' | 'IN_PROGRESS';

export type Ticket = {
    id: string | number;
    title: string;
    content: string;
    status: TicketStatus
};
