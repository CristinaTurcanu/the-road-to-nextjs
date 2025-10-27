/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Ticket } from "@prisma/client";
import { useEffect,useState } from "react";

import AiSuggestedReply from "@/components/ai-suggested-reply";
import { CardForm } from "@/components/card-form";
import { Button } from "@/components/ui/button";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
    ticketId: string;
    paginatedComments?: {
        list: CommentWithMetadata[],
        metadata: {count: number, hasNextPage: boolean}
    };
    ticket?: Ticket
};

const Comments = ({ticketId, paginatedComments, ticket }: CommentsProps) => {
    const [comments, setComments] = useState(paginatedComments?.list);
    const [metadata, setMetadata] = useState(paginatedComments?.metadata);

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await getAuth();
                if (mounted) setUser(res.user);
            } catch {}
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const handleMore = async () => {
        const morePaginatedComments = await getComments(ticketId, comments?.length);
        const moreComments = morePaginatedComments.list;

        setComments([...(comments || []), ...moreComments]);
        setMetadata(morePaginatedComments.metadata)
    }

    const handleDeleteComment = (id: string) => {
        setComments(prevComments => prevComments?.filter(comment => comment.id !== id))
    }

    const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
        if(!comment) return;
        setComments((prevComments) => [comment, ...(prevComments ?? [])]);
    }

    return (
        <>
            <CardForm title="Add comment" description="A new comment will be added" content={
                <CommentCreateForm ticketId={ticketId} onCreateComment={handleCreateComment}/>
            }/>
            <div className="flex flex-col gap-y-2 ml-8">
                {comments?.map(comment => (
                    <CommentItem key={comment.id} comment={comment} buttons={[
                        ...(isOwner(user, comment))
                            ? [<CommentDeleteButton key={comment.id} id={comment.id} onDelete={handleDeleteComment}/>] 
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
            {metadata?.hasNextPage && <div className="flex flex-col justify-center ml-8">
                <Button variant={'ghost'} onClick={handleMore}>More</Button>
            </div>}
        </>
    )
};

export {Comments};