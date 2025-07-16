"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { z } from "zod";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";

const signUpSchema = z.object({
    username: z.string().min(1).max(191).refine(value => !value.includes(" "), "Username is required"),
    email: z.string().min(1).max(191).email("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
const signUp = async (_actionState: ActionState, formData: FormData) => {
    try {
        const {username, email, password} = signUpSchema.parse({
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });
        
        const passwordHash = await hash(password);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: passwordHash,
            },
        });

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }
    return toActionState("SUCCESS", "User created successfully.", formData);
}

export { signUp };