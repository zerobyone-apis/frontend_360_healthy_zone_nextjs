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
	console.log({
		email: user,
		password,
		last_name,
		first_name,
		phone,
		country: "UY",
	});
	try {
		const resp = await fetch("http://localhost:8080/v1.0/client/register", {
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
		console.log(respi);
	} catch (error) {
		return console.log(error);
	}
};
