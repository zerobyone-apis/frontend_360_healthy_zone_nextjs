"use server";
import { GoalNewDTO } from "@/interfaces/goals";
import { cookies } from "next/headers";

export async function createNewGoal(
	client_id: number | string, goal: GoalNewDTO
): Promise<boolean | string> {
	const cookieStore = cookies();
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;
    console.log(goal);
	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/professional/goal/create/for/client/" + client_id,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(goal),
				cache: "no-store",
			}
		);
        if (!resp.ok) {
            const error = await resp.json();
            console.log(error);
            throw Error("Error creating goal");
        }
        
		console.log("create goal's response:", resp);
		return true;
	} catch (error) {
		console.log(error);
		throw Error("Error creating goal");
	}
}
