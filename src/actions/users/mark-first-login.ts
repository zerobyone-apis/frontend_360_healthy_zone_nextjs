"use server";

import { cookies } from "next/headers";

export async function markFirstLogin() {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");
	const userID = user.user.userId;

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/user/login/mark/" + userID,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: /* body here if required */ null,
				cache: "no-store",
			}
		);
		const body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		throw new Error("Error trying to mark user first login ");
	}
}
