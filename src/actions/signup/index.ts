"use server";

type registrationType = {
	user: string;
	password: string;
	last_name: string;
	first_name: string;
	phone: string;
};

export const registration = async ({
	user,
	password,
	last_name,
	first_name,
	phone,
}: registrationType) => {
	try {
		const resp = await fetch(process.env.BASE_PATH + "/v1.0/client/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: user,
				password,
				last_name,
				first_name,
				phone,
				country: "UY",
			}),
		});

		let respi = await resp.json();
		return respi;
	} catch (error) {
		return console.log(error);
	}
};
