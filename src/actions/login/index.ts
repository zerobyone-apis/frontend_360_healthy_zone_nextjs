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
			cache: "no-store",
		});
		let body = await resp.json();

		// cookieStore.set("user", Crypto.encrypt(JSON.stringify(body)));
		const token: string = resp.headers.get("Authorization") || "";
		if (!token) return false;

		// adding cookies...
		const sevenDays = 168 * 60 * 60 * 1000;
		const cookieStore = cookies();
		
		if(body.user.roles === "COACH") {
			delete body.coach.clients;
			delete body.coach.trainings;
			delete body.nutritionist;
			delete body.client;
			delete body.admin;
		};
		if(body.user.roles === "NUTRITIONIST") {
			delete body.nutritionist.clients;
			delete body.nutritionist.diets;
			delete body.coach;
			delete body.client;
			delete body.admin;
		}

		cookieStore.set("user", JSON.stringify(body), {
			expires: Date.now() + sevenDays,
		});
		
		console.log("login body:", body);
		cookieStore.set("token", token, { expires: Date.now() + sevenDays });

		return body;
	} catch (error) {
		console.log(error);
		return false;
	}
};
