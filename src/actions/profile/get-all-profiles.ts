"use server"

import { ProfileDto } from "@/interfaces/profile.dto";
import { cookies } from "next/headers";

export async function getAllProfiles(): Promise<ProfileDto[]> {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    //getting the user from the cookie
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );

    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: /* body here if required */ null,
            cache: "no-store",
        });
        let body = await resp.json();
        if(resp.status !== 200) {
            throw new Error(body.message);
        }
        

        return body;
    } catch (error) {
        throw new Error("Error getting profiles info")
    }
}