"use server";
import { cookies } from "next/headers";

interface BasicInfo {
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
}

export async function saveBasicInfo(info: BasicInfo) {
	if (typeof info === "undefined") return new Error("There is no info to save");
	const cookieStore = cookies();
	const token = "Bearer " + cookieStore.get("token")?.value;
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	try {
		const resp = await fetch(
			"http://localhost:8080/v1.0/profile/update/" + user.id,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(info),
			}
		);

		let respi = await resp.json();
		console.log(respi);
	} catch (error) {
		console.log(error);
		return error;
	}
}
