"use server"

import { cookies } from "next/headers";

export async function fetchTemplate(trainingID: number | string) {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    //getting the user from the cookie
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );

    try {

        if(!trainingID) {
            throw new Error("Training ID is required");
        }
        
        const resp = await fetch(process.env.BASE_PATH + `/v1.0/training/by/id/${trainingID}/completed/true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: /* body here if required */ null,
            cache: "no-store",
        });
        let body = await resp.json();
        console.log(resp.status);
        if(resp.status !== 200) {
            throw new Error(body.message);
        }
        
        console.log(body);

        return body;
    } catch (error) {
        console.log(error);
        return false;
    }
}