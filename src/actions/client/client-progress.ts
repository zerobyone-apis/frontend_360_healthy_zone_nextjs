"use server";
import { cookies } from "next/headers";

export async function getClientProgress(clientId: string) {
	const cookieStore = cookies();
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;
	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/progress/all/by/client/" + clientId,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
					Authorization: token,
				},
				next: {
					revalidate: 10,
				},
			}
		);

		let respi = await resp.json();
		return respi;
	} catch (error) {
		return {
			error: true,
			message: "Error trying to get information, try later.",
		};
	}
}
