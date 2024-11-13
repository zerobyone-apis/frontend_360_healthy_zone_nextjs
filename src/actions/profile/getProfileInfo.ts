"use server";
import { cookies } from "next/headers";

export async function getProfileInfo() {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/profile/" + user.user.profileId,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: /* body here if required */ null,
				cache: "no-store",
			}
		);
		let body = await resp.json();
		console.log(resp.status);
		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error getting profile info");
	}
}
