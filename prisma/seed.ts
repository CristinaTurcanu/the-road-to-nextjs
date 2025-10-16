import { hash } from '@node-rs/argon2';
import { PrismaClient, TicketStatus} from '@prisma/client'
const prisma = new PrismaClient();

const users = [
    { username: 'admin', email: 'admin@google.com' },
    { username: 'usercris', email: '1424kristina@gmail.com'}
];

const tickets = [
    { title: 'Ticket 1', content: 'content for ticket 1', status: 'OPEN' as TicketStatus, deadline: "2024-10-10", bounty: 100 },
    { title: 'Ticket 2', content: 'content for ticket 2', status: 'CLOSED' as TicketStatus, deadline: "2024-10-10", bounty: 200 },
    { title: 'Ticket 3', content: 'content for ticket 3', status: 'OPEN' as TicketStatus, deadline: "2024-10-10", bounty: 150 },
    { title: 'Ticket 4', content: 'content for ticket 4', status: 'IN_PROGRESS' as TicketStatus, deadline: "2024-10-10", bounty: 250 },
];

const comments = [
    { content: 'This is a comment on ticket 1', ticketId: 1 },
    { content: 'This is another comment on ticket 1', ticketId: 1 },
    { content: 'This is a comment on ticket 2', ticketId: 2 },
];

const seed = async () => {
    console.log('DB Seed: Started');

    const passwordHash = await hash('password123');

    // Clear existing data  
    await prisma.comment.deleteMany({});
    await prisma.ticket.deleteMany({});
    await prisma.user.deleteMany({});


    // Create new users
    const dbUsers = await prisma.user.createManyAndReturn({
        data: users.map(user => ({
            ...user,
            password: passwordHash
        }))
    });

    // Create new tickets
    const dbTickets = await prisma.ticket.createManyAndReturn({
        data: tickets.map((ticket) => ({
            ...ticket,
            userId: dbUsers[0].id // Assigning the first user as the owner of all tickets
        })),
    });

    // Create new commments
    await prisma.comment.createMany({
        data: comments.map((comment) => ({
            ...comment,
            userId: dbUsers[0].id, // Assigning the first user as the owner of comments
            ticketId: dbTickets[0].id // Ensure ticketId matches the created tickets   
        })),
    });

    console.log('DB Seed: Completed');
}
seed();