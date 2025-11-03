"use server";

import { CoachDto } from "@/interfaces/coach.dto";
import { cookies } from "next/headers";

export async function getCoachesList(): Promise<CoachDto[]> {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/coach", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: /* body here if required */ null,
            cache: "no-store",
        });
        const body = await resp.json();
        if(resp.status !== 200) {
            throw new Error(body.message);
        }
        
        return body;
    } catch (error) {
        throw new Error("Error fetching coaches list");
    }
}