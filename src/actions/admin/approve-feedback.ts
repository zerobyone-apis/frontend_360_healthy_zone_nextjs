"use server";

import { cookies } from "next/headers";

export async function ApproveFeedback(progressID: string) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");
	try {
		const resp = await fetch(
			process.env.BASE_PATH +
				"/v1.0/admin/approve/progress/feedback/by/" +
				progressID,
			{
				method: "PATCH",
				headers: {
					admin_id: user?.admin.id,
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: null,
				cache: "no-store",
			}
		);
		let body = await resp.text();

		if (!resp.ok) {
			throw new Error("Error trying to approve feedback");
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error trying to approve...");
	}
}
