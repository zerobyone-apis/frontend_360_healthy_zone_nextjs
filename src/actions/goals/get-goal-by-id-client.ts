"use server"

import { GoalResponseDTO } from "@/interfaces/goals";
import { cookies } from "next/headers";

export async function getGoalsByClientID(): Promise<GoalResponseDTO[] | Array<never>> {
    const cookieStore = cookies();

    //getting the token from the cookie
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    //getting the user from the cookie
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );
    
        try {
            const resp = await fetch(
                process.env.BASE_PATH +
                    "/v1.0/professional/goal/all/by/client/" +
                    user.client.id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: null,
                    cache: "no-store",
                }
            );
            const body = await resp.json();
            return body;
        } catch (error) {
            console.log(error);
            return [];
        }
    }