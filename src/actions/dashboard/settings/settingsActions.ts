"use server";
import { cookies } from "next/headers";
import { Crypto } from "@/utils/encrypt";

interface BasicInfo {
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
}

export type State = {
	message?: string | null;
};

export async function saveBasicInfo(_prevState: State, info: FormData) {
	const cookieStore = cookies();
	// const tokenValue = Crypto.decrypt(cookieStore.get("token")?.value || "");
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;
	const user = JSON.parse(
		// Crypto.decrypt(cookieStore.get("user")?.value || "") || "{}"
		cookieStore.get("user")?.value || "{}"
	);

	const userbody: BasicInfo = {
		first_name: info.get("first_name")?.toString() || "",
		last_name: info.get("last_name")?.toString() || "",
		phone: info.get("phone")?.toString() || "",
		email: info.get("email")?.toString() || "",
	};

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/profile/update/" + user.user.userId,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
					Authorization: token,
				},
				body: JSON.stringify(userbody),
			}
		);

		let respi = await resp.text();
		return {
			error: false,
			message: "Data updated successfuly",
			response: respi,
		};
	} catch (error) {
		return {
			error: true,
			message: "Error trying to updating information, try later.",
			response: null,
		};
	}
}
