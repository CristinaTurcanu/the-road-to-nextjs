import Link from "next/link";
import React from "react";

import { CardForm } from "@/components/card-form";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

const SignUpPage = () => {
    return (
        <div className="flex flex-1 flex-col item-center">
            <CardForm 
                className="w-full max-w-[420px] self-center animate-fade-in-from-top"
                title="Sign Up"
                description="Create a new account to manage your tickets."
                content={<SignUpForm />}
                footer={<Link className="text-sm text-muted-foreground" href={signInPath()} >Already have an account? Sign in</Link>}
            />
        </div>
    );
}
export default SignUpPage;