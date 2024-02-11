"use server";

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

		return resp.headers.get("Authorization") || "";
	} catch (error) {
		return console.log(error);
	}
};
