"use server";

import { SummaryAdmin } from "@/interfaces/summary_admin";
import { cookies } from "next/headers";

export async function getAdminDashboardStatus(): Promise<SummaryAdmin> {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/admin/dashboard/summary",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
					"admin-id": user.admin.id,
				},
				body: /* body here if required */ null,
				cache: "no-store",
			}
		);
		let body = await resp.json();
		console.log(resp.status);
		if (resp.status !== 200) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching admin summary data");
	}
}
