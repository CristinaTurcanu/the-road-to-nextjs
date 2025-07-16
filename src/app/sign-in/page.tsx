import Link from "next/link";
import React from "react";

import { CardForm } from "@/components/card-form";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";


const SignInPage = () => {
    return (
        <div className="flex flex-1 flex-col item-center">
            <CardForm 
                className="w-full max-w-[420px] self-center animate-fade-in-from-top"
                title="Sign In"
                description="Sign in to your account to manage your tickets."
                content={<SignInForm />}
                footer={
                    <>
                        <Link href={signUpPath()} className="text-blue-500 hover:underline">
                        No account yet?<span>{' '}</span> 
                        </Link>
                        <Link href={passwordForgotPath()} className="text-blue-500 hover:underline">
                        Forgot your password?   
                        </Link>
                    </>
                } 
            />
        </div>
    );
}
export default SignInPage;