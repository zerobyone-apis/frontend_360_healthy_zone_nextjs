"use server";

export async function confirmResetPassword(token: string, password: string) {
	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/user/confirm/reset/password",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					resetToken: token,
					new_password: password,
					re_new_password: password,
				}),
				cache: "no-store",
			}
		);
		const body = await resp.json();

		if (!resp.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		console.error(error);
		throw new Error("Error trying to change the password...");
	}
}
