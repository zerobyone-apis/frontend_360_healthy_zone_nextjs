"use server";

import { UserMetrics } from "@/interfaces/summary_admin";
import { cookies } from "next/headers";

type Params = {init_date: string, end_date: string}
export async function getUserMetricsByDate ({init_date, end_date}: Params): Promise<UserMetrics[]> {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/admin/dashboard/users/metric",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
					"admin_id": user.admin.id,
                    init_date,
                    end_date
				},
				body: /* body here if required */ null,
				cache: "no-store",
			}
		);
		let body = await resp.json();
		if (resp.status !== 200) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching user metrics");
	}
}
