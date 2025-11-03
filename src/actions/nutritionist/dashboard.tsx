"use server";
import { cookies } from "next/headers";

export async function getDashboardStats(): Promise<any> {
	const cookieStore = cookies();
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/nutritionist/summary/by/" + user.nutritionist.id,
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
		body.custom = {
			customers: body.full_assignments.length,
			customers_limit: body.remaining_clients.split("/")[1].slice(),
			customers_percent:
				(Number(body.full_assignments.length) * 100) /
				Number(body.remaining_clients.split("/")[1].slice()),
		};

		return body;
	} catch (error) {
		throw new Error("Error fetching data");
	}
}
