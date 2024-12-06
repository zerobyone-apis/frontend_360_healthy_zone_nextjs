"use server";

import { cookies } from "next/headers";

export async function paypalUnsubscribe() {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			process.env.BASE_PATH +
				"/v2.0/admin/dashboard/subscription/cancel/client/subscription",
			{
				method: "PATCH",
				headers: {
					"Id-Client": user.client.id,
					"Id-Plan": user.client.subscription,
					"Id-Subscription": user.client.plan_id,
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					reason: "N/A",
					id: user.client.id,
				}),
				cache: "no-store",
			}
		);
		const body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		console.log("Subscription body response: ", body);
		const paypalLink: any = body.links.approve.href;

		console.log("Response link de pago: ", paypalLink);
		return paypalLink;
	} catch (error) {
		console.error("Error subscription: ", error);
		throw new Error("Error Creating subscription plan for this client");
	}
}
