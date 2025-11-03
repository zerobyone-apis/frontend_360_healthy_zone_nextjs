"use server";
import { DietResponseDTO } from "@/interfaces/diets";
import mockup from "./mockup";

export async function getAllDietsByUserID(userID: number) {
	// funcion hardcoded
	return mockup;
}

export async function getDietById(dietID: number) {
	// funcion hardcoded
	const diet: DietResponseDTO | null = await new Promise((resolve, _reject) => {
		setTimeout(() => {
			const dietResponse: any =
				mockup.find(data => data.diet_id === dietID) || null;
			return resolve(dietResponse);
		}, 2000);
	});

	console.log(diet);
	return diet;
}
