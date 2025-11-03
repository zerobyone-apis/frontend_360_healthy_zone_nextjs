"use server";

import { cookies } from "next/headers";

export async function getCustomFormsByUserID() {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/custom-form/user/" + user.user.userId,
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

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.error(error);
		throw new Error("Error trying to getting custom form");
	}
}
