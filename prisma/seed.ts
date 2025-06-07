import { PrismaClient, TicketStatus} from '@prisma/client'
const prisma = new PrismaClient();

const tickets = [
  { title: 'Ticket 1', content: 'content for ticket 1', status: 'OPEN' as TicketStatus },
  { title: 'Ticket 2', content: 'content for ticket 2', status: 'CLOSED' as TicketStatus },
  { title: 'Ticket 3', content: 'content for ticket 3', status: 'OPEN' as TicketStatus },
  { title: 'Ticket 4', content: 'content for ticket 4', status: 'IN_PROGRESS' as TicketStatus },
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