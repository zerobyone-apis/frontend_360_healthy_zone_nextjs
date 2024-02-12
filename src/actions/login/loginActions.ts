"use server";
import { cookies } from "next/headers";

type login = {
	email: string;
	password: string;
};

export const login = async ({ email, password }: login) => {
	try {
		const resp = await fetch("http://localhost:8080/v1.0/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password,
			}),
		});
		let body = await resp.text();
		const cookieStore = cookies();

		cookieStore.set("user", body);
		return resp.headers.get("Authorization") || "";
	} catch (error) {
		return console.log(error);
	}
};
