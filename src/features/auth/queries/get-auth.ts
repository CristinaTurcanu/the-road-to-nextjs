"use server";

import { cookies } from "next/headers";
import { cache } from "react";

import { lucia } from "@/lib/lucia";

export const getAuth = cache(async () => {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get(lucia.sessionCookieName)?.value ?? null;
    
    if (!sessionCookie) {
        return {
            user: null,
            session: null
        };
    }

    const result = await lucia.validateSession(sessionCookie);

    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookieStore).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

        if(!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            (await cookieStore).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {
        // do nothing for RSC
    }

    return result;
})