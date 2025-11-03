"use server";

import { cookies } from "next/headers";

export async function postProffesionalFeedback(obj: any): Promise<any> {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");
	const role = user.user.roles.toLowerCase();
	const endpointUrl = role
		? "/v1.0/nutritionist/comment/for/client/progress"
		: "/v1.0/coach/feedback/for/client/progress";
	const objBody = {
		...obj,
		nutritionist_id: role === "NUTRITIONIST" ? user?.nutritionist?.id : "",
		coach_id: role === "COACH" ? user?.coach?.id : "",
	};

	try {
		const resp = await fetch(process.env.BASE_PATH + endpointUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(objBody),
			cache: "no-store",
		});
		const body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error trying to add feedback...");
	}
}
