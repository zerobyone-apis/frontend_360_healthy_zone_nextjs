"use server";
import { cookies } from "next/headers";

export async function deactivateTraining(id: string | number) { 
    const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {
        const resp = await fetch(process.env.BASE_PATH + `/v1.0/training/by/id/${id}/activate/false` , {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: null,
            cache: "no-store",
        });
        let body = await resp.text();
        console.log(resp.status);
        if(!resp.ok || resp.status !== 200) {
            throw new Error(body || "Failed to deactivate training");
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}