"use server";

import { cookies } from "next/headers";

export async function changePassword(
	current_password: string,
	new_password: string
) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/user/change/password",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					current_password,
					new_password,
					userId: user.user.userId,
					username: user.user.username,
					email: user.user.email,
				}),
				cache: "no-store",
			}
		);
		let body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.error(error);
		throw new Error("Error trying to change the password...");
	}
}
