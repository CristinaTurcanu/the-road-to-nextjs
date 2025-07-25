"use client";
import clsx from "clsx";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

type SubmitButtonProps = {
    label?: string;
    icon?: React.ReactElement<{className?: string}>;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
}

const SubmitButton = ({label, icon, variant, size}: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} type="submit" variant={variant} size={size}>
            {pending && (<LucideLoaderCircle className={clsx("h-4 w-4 animate-spin", {
                "mr-2": !!label
            })} />)}
            {label}
            {icon && <span className={clsx({
                "ml-2": !!label
            })}>
                {cloneElement(icon, {className: "h-4 w-4"} )}
            </span>}
        </Button>
    );
}   
export {SubmitButton};