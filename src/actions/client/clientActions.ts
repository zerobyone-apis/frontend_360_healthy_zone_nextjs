"use server";
import { User } from "@/interfaces/user";
import { cookies } from "next/headers";

export async function getProfile() {
	const cookieStore = cookies();
	const user: User = JSON.parse(cookieStore.get("user")?.value || "");
	const userId = user.user.userId;
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	try {
		const resp = await fetch(process.env.BASE_PATH + "/v1.0/client/" + userId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				Authorization: token,
			},
		});

		let respi = await resp.json();
		return respi;
	} catch (error) {
		return {
			error: true,
			message: "Error trying to get information, try later.",
		};
	}
}
