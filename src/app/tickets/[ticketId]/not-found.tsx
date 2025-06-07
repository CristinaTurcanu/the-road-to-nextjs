import Link from "next/link";

import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function NotFound () {
    return (
    <div className="flex flex-1">
      <Placeholder
        label="Ticket not found"
        button={<Button asChild variant={"outline"}><Link href={ticketsPath()}>Go to tickets</Link></Button>}
      />
    </div>
    )
};