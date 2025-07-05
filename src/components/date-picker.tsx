"use client"

import { format } from "date-fns"
import { LucideCalendar } from "lucide-react"
import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export type ImpertiveHandleFromDatePicker = {
    reset: () => void;
}

type DatePickerProps = {
    id: string;
    name: string;
    defaultValue?: Date | string | undefined;
    imperativeHandleRef?: React.RefObject<ImpertiveHandleFromDatePicker>;
}

export const DatePicker = ({id, name, defaultValue, imperativeHandleRef }: DatePickerProps) => {
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date());
    const [open, setOpen] = useState(false);

    React.useImperativeHandle(imperativeHandleRef, () => ({
        reset: () => {
            setDate(new Date());
            setOpen(false);
        }
    }), []);

    const formattedDateString = date ? format(date, "yyyy-mm-dd") : "";

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full" id={id} asChild>
                <Button
                    variant="outline"
                    className="justify-start font-normal text-left"
                >
                    <LucideCalendar className="mr-2 h-4 w-4"/>
                    {formattedDateString}
                    <input type="hidden" name={name} value={formattedDateString}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleSelect} />
            </PopoverContent>
        </Popover>
    )
}