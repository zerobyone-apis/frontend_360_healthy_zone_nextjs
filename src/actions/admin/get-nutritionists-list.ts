"use server";

import { NutritionistDto } from "@/interfaces/nutritionist.dto";
import { cookies } from "next/headers";

export async function getNutritionistsList(): Promise<NutritionistDto[]> {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/nutritionist", {
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
        throw new Error("Error fetching nutritionists list");
    }
}