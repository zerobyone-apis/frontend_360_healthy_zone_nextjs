"use server"

import { cookies } from "next/headers";

export async function trainingMarkAsComplete(trainingID: number | string) {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {

        if(!trainingID) {
            throw new Error("Training ID is required");
        }
        
        const resp = await fetch(process.env.BASE_PATH + `/v1.0/training/by/id/${trainingID}/completed/true`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body:  null,
            cache: "no-store",
        });
        const body = await resp.text();
        console.log(resp.status);
        if(resp.status !== 200) {
            throw new Error(body);
        }
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export async function dailyTrainMarkAsComplete(dayId: number | string) {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {

        if(!dayId) {
            throw new Error("Day ID is required");
        }
        
        const resp = await fetch(process.env.BASE_PATH + `/v1.0/daily_train/by/id/${dayId}/completed/true`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body:  null,
            cache: "no-store",
        });
        const body = await resp.text();
        console.log(resp.status);
        if(resp.status !== 200) {
            throw new Error(body);
        }
        
        console.log(body);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}