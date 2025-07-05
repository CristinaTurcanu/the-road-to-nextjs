import { PrismaClient, TicketStatus} from '@prisma/client'
const prisma = new PrismaClient();

const tickets = [
    { title: 'Ticket 1', content: 'content for ticket 1', status: 'OPEN' as TicketStatus, deadline: "2024-10-10", bounty: 100 },
    { title: 'Ticket 2', content: 'content for ticket 2', status: 'CLOSED' as TicketStatus, deadline: "2024-10-10", bounty: 200 },
    { title: 'Ticket 3', content: 'content for ticket 3', status: 'OPEN' as TicketStatus, deadline: "2024-10-10", bounty: 150 },
    { title: 'Ticket 4', content: 'content for ticket 4', status: 'IN_PROGRESS' as TicketStatus, deadline: "2024-10-10", bounty: 250 },
]

const seed = async () => {
    console.log('DB Seed: Started');

    // Clear existing data  
    await prisma.ticket.deleteMany({});
    // Create new tickets
    await prisma.ticket.createMany({
        data: tickets,
    });

    console.log('DB Seed: Completed');
}
seed();