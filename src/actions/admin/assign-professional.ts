"use server";

import { cookies } from "next/headers";

type Params = {
	client_id: string;
	coach_id: string | number | null;
	nutritionist_id: number | string | null;
};

export async function assignClientToProfessional({
	client_id,
	coach_id,
	nutritionist_id,
}: Params) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	const assignedTo = coach_id
		? "CLIENT_ASSIGNED_TO_COACH"
		: "CLIENT_ASSIGNED_TO_NUTRITIONIST";

	const content = JSON.stringify({
		client_id,
		coach_id,
		nutritionist_id,
		admin_id: user.admin.id,
		client_status: assignedTo,
		subscription_type: "PRIME",
		is_completed: false,
	});

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/assignments/create",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: content,
				cache: "no-store",
			}
		);
		let body = await resp.json();
		if (resp.status !== 200) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error assigning professional to client");
	}
}
