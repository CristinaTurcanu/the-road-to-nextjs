"use client";

import React, { useEffect, useState } from 'react';
import {initialTickets} from '@/data';
import Heading from '@/components/heading';
import TicketItem from '@/features/ticket/components/ticket-item';
import { Ticket } from '@/features/ticket/types';
import { getTickets } from '@/features/ticket/queries/get-tickets';

const TicketsPage = () => {
  const [tickets, setTickets]= useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();
      setTickets(result);
    }
    
    fetchTickets();
  }, []);

  return (  
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title={"Tickets"} description={"All your tickets at one place"} />
      <div className='flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top'>
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
      ))}
      </div>

    </div>
  );
};

export default TicketsPage;