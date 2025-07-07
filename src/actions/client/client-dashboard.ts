"use server";

import { cookies } from "next/headers";

export interface DashboardClientStats {
	client_id: number,
	target_weight: number,
    initial_weight: number,
    current_weight: number,
    trainingsDone: number,
    totalTrainings: number,
    trainingPercentage: number
}

export async function getClientDashboard(): Promise<DashboardClientStats> {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/client/dashboard/by/" + user.client.id,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: /* body here if required */ null,
				cache: "no-store",
			}
		);
		let body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error trying to get dashboard info...");
	}
}
