import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CardForm } from '@/components/card-form';
import { Heading } from '@/components/heading';
import { Placeholder } from '@/components/placeholder';
import { Spinner } from '@/components/spinner'; 
import { getAuth } from '@/features/auth/queries/get-auth';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';

// export const dynamic = 'force-dynamic'; // Force dynamic rendering for this page
 
const TicketsPage = async( ) => {
    const { user } = await getAuth();
    return (  
        <div className="flex flex-1 flex-col gap-y-8">
            <Heading title="My Tickets" description={"All your tickets at one place"} />
            <CardForm 
                title={'Create ticket'}
                description='Create a new ticket'
                className='w-full max-w-[420px] self-center'
                content={<TicketUpsertForm />}
            />
            <ErrorBoundary fallback={<Placeholder label="Something went wrong while loading tickets" />}>
                <Suspense fallback={<Spinner />}>
                    <TicketList userId={user?.id}/>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default TicketsPage;