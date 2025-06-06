import { initialTickets } from "@/data";
import { Ticket } from "../types";

export const getTickets = async (): Promise<Ticket[]> => {
  // Simulate an API call to fetch tickets

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Promise((resolve) => {
      resolve(initialTickets);
  });
}  