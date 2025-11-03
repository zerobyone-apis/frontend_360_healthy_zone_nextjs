"use server";

import { cookies } from "next/headers";

export async function RejectFeedback(progressID: string, reason: string) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH +
				"/v1.0/admin/desapprove/progress/feedback/by/" +
				progressID,
			{
				method: "PATCH",
				headers: {
					admin_id: user.admin.id,
					reason_why: reason,
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: null,
				cache: "no-store",
			}
		);
		const body = await resp.text();

		if (!resp.ok) {
			console.log(body);
			throw new Error("Error trying to reject this progress");
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error trying to reject...");
	}
}
