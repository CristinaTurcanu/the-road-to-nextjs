import { Ticket } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateTicket } from "../actions/update-ticket";

type TicketUpdateFormProps = {
    ticket: Ticket
};

const TicketUpdateForm = ({ticket}: TicketUpdateFormProps) => {
    return (
        <form action={updateTicket.bind(null, ticket.id)} className="flex flex-col gap-y-2">
            <Input type="hidden" name="id" defaultValue={ticket.id} />

            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket.title}/>

            <Label htmlFor="content">Content</Label>
            <Input id="content" name="content" defaultValue={ticket.content}/>

            <Button type="submit">Save</Button>
        </form>
    );
}
export {TicketUpdateForm};