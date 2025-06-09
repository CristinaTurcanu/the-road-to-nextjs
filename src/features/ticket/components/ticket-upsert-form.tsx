"use client";
import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import { SubmitButton } from "@/components/form/submit-btn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
    ticket?: Ticket
};

const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => {
    //Option 1: Use useTransition for optimistic updates
    // This is useful if you want to show a loading state while the action is being processed.

    // const [isPending, startTransition] = useTransition();

    // const upsertTicketAction = (formData: FormData) => {
    //     startTransition(async () => {
    //         await upsertTicket.bind(null, ticket?.id)(formData);
    //     })
    // };

    const [actionState, action] = useActionState(
        upsertTicket.bind(null, ticket?.id),
        {
            message: ''
        }
    );

    return (
        <form action={action} className="flex flex-col gap-y-2">

            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={
                (actionState.payload?.get('title') as string) ?? ticket?.title
            }/>

            <Label htmlFor="content">Content</Label>
            <Input id="content" name="content" defaultValue={
                (actionState.payload?.get('content') as string) ?? ticket?.content
            }/>

            <SubmitButton label={ticket ? 'Edit' : 'Create'} />
            {actionState.message && actionState.message}
        </form>
    );
}
export { TicketUpsertForm };