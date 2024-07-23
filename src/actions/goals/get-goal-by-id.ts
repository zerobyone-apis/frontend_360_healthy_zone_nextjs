"use server";
import { GoalResponseDTO } from "@/interfaces/goals";

export async function getGoalByID(goalID: string | number): Promise<GoalResponseDTO | null> {
    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/professional/goal/by/" + goalID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: null,
            cache: "no-store",
        });
        if(!resp.ok) return null;
        
        let body = await resp.json();

        return body;
    } catch (error) {
        console.log(error);
        return null;
    }
}
