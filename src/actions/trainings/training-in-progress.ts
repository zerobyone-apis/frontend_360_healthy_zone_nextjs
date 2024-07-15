"use server";
import { cookies } from "next/headers";

export async function trainingMarkInProgress(trainingID: number | string) {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {

        if(!trainingID) {
            throw new Error("Training ID is required");
        }
        
        const resp = await fetch(process.env.BASE_PATH + `/v1.0/training/client/start/by/id/${trainingID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body:  null,
            cache: "no-store",
        });
        let body = await resp.text();
        console.log(resp.status);
        if(resp.status !== 200) {
            throw new Error(body);
        }
        
        console.log(body);

        return body;
    } catch (error) {
        console.log(error);
        return false;
    }
}