 
"use server";
import { cookies } from "next/headers";


export const setCookieByKey = async (key: string, value: string) => {
    return (await (cookies())).set(key, value);
};

export const getCookieByKey = async (key: string) => {
    const cookie = (await cookies()).get(key);
    return cookie?.value ?? null;
}

export const deleteCookieByKey = async (key: string) => {
    return (await (cookies())).delete(key);
};