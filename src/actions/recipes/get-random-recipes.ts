"use server";

export async function getRandomRecipes() {
	try {
		const resp = await fetch(
			"https://api.spoonacular.com/recipes/random?number=20",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": process.env.SPOONACULAR_TOKEN || "",
				},
				body: /* body here if required */ null,
			}
		);
		let body = await resp.json();

		if (!resp.ok) {
			throw new Error(body);
		}

		return body;
	} catch (error) {
		console.log(error);
		throw new Error("Error trying to get the recipes...");
	}
}
