"use server";

import { cookies } from "next/headers";

export async function blockUserRequest(
	userID: string | number,
	reason: string
) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/admin/block/user/by/" + userID,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					admin_id: user.admin.id,
					username_admin: user.admin.username,
					reason_blocked: reason,
				}),
				cache: "no-store",
			}
		);
		const body = await resp.text();

		if (!resp.ok) {
			throw new Error(body);
		}

		return body;
	} catch (error) {
		throw new Error("Error trying to...");
	}
}
