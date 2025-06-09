import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center self-center">
            <LucideLoaderCircle className="h-16 w-16 animate-spin text-blue-500"/>
        </div>
    );
};
export {Spinner};