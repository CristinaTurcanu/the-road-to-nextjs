"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";

import { Pagination } from "@/components/pagination";
import { paginationOptions, paginationParser, searchParser } from "@/features/ticket/search-params";
import { PaginatedData } from "@/types/pagination";

import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
    paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"]
};

const TicketPagination = ({paginatedTicketMetadata}: TicketPaginationProps) => {
    const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions);
    const [search] = useQueryState('search', searchParser);
    const prevSearch = useRef(search);

    useEffect(() => {
        if (search === prevSearch.current) return;
        setPagination({...pagination, page: 0})
    }, [pagination, setPagination, search])

    return <Pagination 
        pagination={pagination ?? {page: 0, size: 0}} 
        paginatedMetdata={paginatedTicketMetadata} 
        onPagination={setPagination}/>;
};

export {TicketPagination};
