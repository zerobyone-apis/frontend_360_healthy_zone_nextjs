"use server";

import { NotificationDto } from "@/interfaces";
import { cookies } from "next/headers";

export async function getNotificationsByUser(): Promise<NotificationDto[]> {
	const cookieStore = cookies();

	//getting the token from the cookie
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	//getting the user from the cookie
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	const userID = user.user.userId;

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/notifications/by/user/" + userID,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: null,
				cache: "no-store",
			}
		);
		let body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		throw new Error(`Error getting notifications for user id: ${userID} Error: ${error}`);
	}
}
