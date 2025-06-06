import Heading from "@/components/heading";
import { ticketsPath } from "@/paths";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title={"Home"} description="Your place to start"/>
      <div className="flex flex-1 flex-col items-conter">
        <Link href={ticketsPath()} className="underline">Go to tickets</Link>
      </div>
    </div>

  );
}

export default HomePage;
