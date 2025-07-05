
import { LucideCircleCheck, LucideFileText, LucidePencil } from 'lucide-react';

export const TICKETS_ICONS = {
    OPEN: <LucideFileText className="text-blue-500" />,
    CLOSED: <LucideCircleCheck className="text-green-500" />,
    IN_PROGRESS: <LucidePencil className="text-yellow-500" />,
};

export const TICKET_STATUS_LABELS = {
    OPEN: 'Open',
    CLOSED: 'Closed',
    IN_PROGRESS: 'In Progress',
};