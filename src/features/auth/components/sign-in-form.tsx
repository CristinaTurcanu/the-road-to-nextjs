"use client";
import React, { useActionState } from "react";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-btn";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";

import { signIn } from "../actions/sign-in";

const SignInForm = () => {  
    const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);
    
    return (
        <Form action={action} actionState={actionState}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={actionState?.payload?.get('email') as string}
                />
                <FieldError actionState={actionState} name="email" />

            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={actionState?.payload?.get('password') as string}

                />
                <FieldError actionState={actionState} name="password" />

            </div>
            <SubmitButton label='Sign In' />
        </Form>
    );
}
export {SignInForm};