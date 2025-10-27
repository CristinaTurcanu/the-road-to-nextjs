"use client";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

import { deleteComment } from "../actions/delete-comment";

type CommentDeleteButtonProps = {
    id: string;
    onDelete?: (id: string) => void
}

const CommentDeleteButton = ({id, onDelete}: CommentDeleteButtonProps) => {
    const [deleteButton, deleteDialog] = useConfirmDialog({
        action: deleteComment.bind(null, id),
        trigger: (isPending) => (
            <Button variant={'outline'} size="icon">
                {isPending ?  <LucideLoaderCircle className="h-4 w-4"/> : <LucideTrash className="h-4 w-4"/>}
            </Button>
        ),
        onSuccess: () => onDelete?.(id)
    })
    
    return (
        <>
            {deleteDialog}
            {deleteButton}
        </>
    )
};

export {CommentDeleteButton}