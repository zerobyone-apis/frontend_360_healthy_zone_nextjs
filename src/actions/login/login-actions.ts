"use server";
import { cookies } from "next/headers";
// import { Crypto } from "@/utils/encrypt";

type login = {
	email: string;
	password: string;
};

export const login = async ({ email, password }: login) => {
	try {
		const resp = await fetch(process.env.BASE_PATH + "/v1.0/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				cache: "no-store",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		let body = await resp.json();

		// cookieStore.set("user", Crypto.encrypt(JSON.stringify(body)));
		const token: string = resp.headers.get("Authorization") || "";
		console.log("Token desde back en el login: " + token);
		if (!token) return false;

		// adding cookies...
		const sevenDays = 168 * 60 * 60 * 1000;
		const cookieStore = cookies();
		cookieStore.set("user", JSON.stringify(body), {
			expires: Date.now() + sevenDays,
		});
		cookieStore.set("token", token, { expires: Date.now() + sevenDays });

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
