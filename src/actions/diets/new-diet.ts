"use server";

import { cookies } from "next/headers";

export async function createNewDiet(clientID: string, dietObj: any) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");
	const obj = { ...dietObj, nutritionist_id: user.nutritionist.id };

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/diet/create/client/" + clientID,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(obj),
				cache: "no-store",
			}
		);
		const body = await resp.json();
		if (!resp.ok) {
			console.log(body);
			throw new Error(body.message);
		}

		console.log(body);

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error trying to create a new diet");
	}
}
