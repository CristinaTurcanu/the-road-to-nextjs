"use server";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signInSchema = z.object({
    email: z.string().min(1, "Email is required").max(191).email("Invalid email format"),
    password: z.string().min(6).max(191),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email, password } = signInSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });
        
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return toActionState("ERROR", "Incorrect email or password.", formData);
        }
        const isValidpassword = verify(user.password, password);
        if (!isValidpassword) {
            return toActionState("ERROR", "Incorrect email or password.", formData);
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        
        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    redirect(ticketsPath());
}

export { signIn };