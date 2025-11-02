/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export interface ClientSubscription {
	client_id: number;
	plan_id: string;
	shiping_amount: ShipingAmount;
	type: string;
}

export interface ShipingAmount {
	value: number;
	currency_code: string;
}

export async function paypalSubscription(subscription: ClientSubscription) {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	// const user = JSON.parse(cookieStore.get('user')?.value || '{}');

	console.log("body: ", subscription);

	try {
		const resp = await fetch(
			process.env.BASE_PATH +
				"/v2.0/admin/dashboard/subscription/create/client/subscription",
			{
				method: "POST",
				headers: {
					"Id-Client": String(subscription.client_id),
					"Id-Plan": String(subscription.plan_id),
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(subscription),
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
