"use client";

import { SelectValue } from "@radix-ui/react-select";

import { PaginatedData } from "@/types/pagination";

import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

type PageAndSize = {
    page: number;
    size: number;
};

type PaginationProps = {
    pagination: PageAndSize;
    paginatedMetdata: PaginatedData<unknown>["metadata"];
    onPagination: (pagination: PageAndSize) => void;
};
const Pagination = ({pagination, paginatedMetdata: {count, hasNextPage}, onPagination}: PaginationProps)  => {    
    const startOffset = pagination.page * pagination.size + 1;
    const endOffset = startOffset - 1 + pagination.size;
    const actualEndOffset = Math.min(endOffset, count);

    const label = `${startOffset} - ${actualEndOffset} of ${count}`;

    const handleNextPage = () => {
        onPagination({...pagination, page: pagination.page + 1});
    }

    const handlePreviousPage = () => {
        onPagination({...pagination, page: pagination.page - 1});
    }

    const handleChangeSize = (size: string) => {
        onPagination({page: 0, size: parseInt(size)});
    }

    const previousButton = (
        <Button
            variant="outline" 
            size="sm" 
            disabled={pagination.page < 1} 
            onClick={handlePreviousPage}
        >
            Prev
        </Button>
    );

    const nextButton = (
        <Button
            variant="outline" 
            size="sm" 
            disabled={!hasNextPage} 
            onClick={handleNextPage}
        >
            Next
        </Button>
    );

    const sizeButton = (
        <Select defaultValue={pagination.size.toString()} onValueChange={handleChangeSize}>
            <SelectTrigger className="h-[35px]">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
            </SelectContent>
        </Select>
    );
    return (
        <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="flex gap-2">
                {sizeButton}
                {previousButton}
                {nextButton}
            </div>
        </div>
    )
}

export {Pagination};