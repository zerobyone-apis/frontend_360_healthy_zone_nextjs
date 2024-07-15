// /v1.0/professional/goal/latest/by/client/1

"use server";
import { GoalResponseDTO } from "@/interfaces/goals";
import { cookies } from "next/headers";

//based on the bellow code, create a function that will return the goals
export async function getLatestGoalByClientID(
	clientID: number | string
): Promise<GoalResponseDTO | null> {
	const cookieStore = cookies();
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	try {
		const resp = await fetch(
			process.env.BASE_PATH +
				"/v1.0/professional/goal/latest/by/client/" +
				clientID,
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
		let body = await resp.json();
		return body;
	} catch (error) {
		console.log(error);
		return null;
	}
}
