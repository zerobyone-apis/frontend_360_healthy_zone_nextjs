"use server";

export async function resetPassword(email: string) {
	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/user/reset/password",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				}),
				cache: "no-store",
			}
		);
		let body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.error(error);
		throw new Error("Error trying to change the password...");
	}
}
