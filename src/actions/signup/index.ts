"use server";

type registrationType = {
	user: string;
	password: string;
	last_name: string;
	first_name: string;
	phone: string;
	role?: string;
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
			}),
		});
		if(!resp.ok) return null;
		const respi = await resp.json();
		return respi;
	} catch (error) {
		console.log(error)
		return null
	}
};

export const professionalRegistration = async ({
	user,
	password,
	last_name,
	first_name,
	phone,
	role,
}: registrationType) => {
	if (!role) return new Error("Role is not selected");
	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/" + role + "/create",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: user,
					password,
					last_name,
					first_name,
					phone,
					role: role?.toUpperCase(),
				}),
			}
		);

		if(!resp.ok) return null;
		const respi = await resp.json();
		return respi;
	} catch (error) {
		console.log(error)
		return null
	}
};
