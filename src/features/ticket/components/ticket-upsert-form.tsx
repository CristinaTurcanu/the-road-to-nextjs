"use client";
import { Ticket } from "@prisma/client";
import { useActionState, useRef } from "react";

import { DatePicker, ImpertiveHandleFromDatePicker } from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-btn";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fromCent } from "@/utils/currency";

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
        EMPTY_ACTION_STATE
    );

    const datePicketImperativeHandleRef = useRef<ImpertiveHandleFromDatePicker>(null!);

    const handleSuccess = () => {
        datePicketImperativeHandleRef.current?.reset();
    }

    return (
        <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={
                (actionState.payload?.get('title') as string) ?? ticket?.title
            }/>
            <FieldError actionState={actionState} name="title" />

            <Label htmlFor="content">Content</Label>
            <Input id="content" name="content" defaultValue={
                (actionState.payload?.get('content') as string) ?? ticket?.content
            }/>
            <FieldError actionState={actionState} name="content" />

            <div className="flex gap-x-2 mb-1">
                <div className="w-1/2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <DatePicker 
                        id="deadline" 
                        name="deadline" 
                        defaultValue={
                            (actionState.payload?.get('deadline') as string) ?? ticket?.deadline
                        } 
                        imperativeHandleRef={datePicketImperativeHandleRef} />
                    <FieldError actionState={actionState} name="deadline" />
                </div>

                <div className="w-1/2">
                    <Label htmlFor="">Bounty ($)</Label>
                    <Input id="bounty" name="bounty" step=".01" inputMode="decimal" defaultValue={
                        (actionState.payload?.get('bounty') as string) ?? 
                        (ticket?.bounty ? fromCent(ticket?.bounty) : "")
                    }/>
                    <FieldError actionState={actionState} name="bounty" />
                </div>
            </div>

            <SubmitButton label={ticket ? 'Edit' : 'Create'} />
        </Form>
    );
}
export { TicketUpsertForm };