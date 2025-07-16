"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia } from "@/lib/lucia";
import { signInPath } from "@/paths";

import { getAuth } from "../queries/get-auth";

const signOut = async () => {
    const session = getAuth();

    if(!session) {
        redirect(signInPath())
    }

    await lucia.invalidateSession((await session)?.session?.id as string);

    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    redirect(signInPath());
};

export { signOut };