 
"use client";

import { Ticket, User } from "@prisma/client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect,useState } from "react";
import { useInView } from "react-intersection-observer";

import AiSuggestedReply from "@/components/ai-suggested-reply";
import { CardForm } from "@/components/card-form";
import { Button } from "@/components/ui/button";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { PaginatedData } from "@/types/pagination";

import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
    ticketId: string;
    paginatedComments?: PaginatedData<CommentWithMetadata>;
    ticket?: Ticket
};

const Comments = ({ticketId, paginatedComments, ticket }: CommentsProps) => {
    const [user, setUser] = useState<User | null>(null);
    const queryKey = ['comments', ticketId];
    const {ref, inView} = useInView();

    const {data, fetchNextPage, hasNextPage, isFetchNextPageError} = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage?.metadata?.hasNextPage ? lastPage.metadata.cursor : undefined,
        initialData: {
            pages: [{
                list: paginatedComments?.list,
                metadata: paginatedComments?.metadata
            }],
            pageParams: [undefined]
        }
    })
    const comments = data.pages.map((page) => page.list).flat() || [];

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await getAuth();
                if (mounted) setUser(res.user as unknown as User);
            } catch {}
        })();
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if(inView && hasNextPage && !isFetchNextPageError) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage, isFetchNextPageError]);

    const queryClient = useQueryClient();

    const handleDeleteComment = () => queryClient.invalidateQueries({queryKey});

    const handleCreateComment = () => queryClient.invalidateQueries({queryKey});

    return (
        <>
            <CardForm title="Add comment" description="A new comment will be added" content={
                <CommentCreateForm ticketId={ticketId} onCreateComment={handleCreateComment}/>
            }/>
            <div className="flex flex-col gap-y-2 ml-8">
                {comments.map(comment => (
                    <CommentItem key={comment?.id} comment={comment as CommentWithMetadata} buttons={[
                        ...(isOwner(user, comment))
                            ? [<CommentDeleteButton key={comment?.id} id={comment?.id as string} onDelete={handleDeleteComment}/>] 
                            : []
                    ]}/>
                ))}
            </div>
            <AiSuggestedReply
                ticketTitle={ticket?.title}
                ticketDescription={ticket?.content ?? ""}
                previousComments={paginatedComments?.list?.map(c => c.content).join("\n")}
                onInsertSuggestion={() => {}}
            />
            {/* {hasNextPage && <div className="flex flex-col justify-center ml-8">
                <Button 
                    variant={'ghost'} 
                    onClick={handleMore}
                    disabled={isFetchNextPageError}
                >More
                </Button>
            </div>} */}
            <div ref={ref}>{!hasNextPage && <p className="text-xs text-right italic">No more comments</p>}</div>
        </>
    )
};

export {Comments};