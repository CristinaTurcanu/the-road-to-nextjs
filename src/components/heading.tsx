import React from "react";

import { Separator } from "./ui/separator";
type HeadingProps = {
  title: string;
  description?: string;
  tabs?: React.ReactElement
}

const Heading = ({ title, description, tabs }: HeadingProps) => {
    return (
        <>      
            {tabs}
            <div className="px-8">
                <h2 className="text-3xl font-cold tracking-tight">{title}</h2>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <Separator />
        </>
    );
};

export {Heading};