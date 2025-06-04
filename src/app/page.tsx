import { ticketsPath } from "@/paths";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h1 className="text-3xl font-cold tracking-tight">Home Page</h1>
        <p className="text-sm text-muted-foreground">Your place to start</p>
      </div>
      <div className="flex flex-1 flex-col items-conter">
        <Link href={ticketsPath()} className="underline">Go to tickets</Link>
      </div>
    </div>

  );
}

export default HomePage;
