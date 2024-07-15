"use server";
import { cookies } from "next/headers";

/**
 * Retrieves all trainings for the current user.
 * 
 * @returns A Promise that resolves to an array of training objects.
 */
export async function getAllTrainings() {
	const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );

    try {
        const resp = await fetch(
            process.env.BASE_PATH + "/v1.0/training/client/" + user.client.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store",
                    Authorization: token,
                },
                body: null,
            }
        );

        const respi = await resp.json();
        return respi;

    } catch (error) {
		console.log(error);	
        return []
    }
}



export async function getTrainingsID(trainingID: number | string) {
	
	const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;

    try {
        const resp = await fetch(
            process.env.BASE_PATH + "/v1.0/training/by/" + trainingID,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store",
                    Authorization: token,
                },
                body: null,
            }
        );

        const respi = await resp.json();
        return respi;

    } catch (error) {
		console.log(error);	
        return null
    }

	
}

export async function getExerciseDay(day_id: string, training_id: string) {

	// Funcion hardcoded...
	let training: any = await new Promise(async (resolve, _reject) => {
		let trainingResponse = await getTrainingsID(Number(training_id));
		let dailyTraining = trainingResponse.daily_training_days.find(
			(day: any) => day.id == day_id
		);
		//fragmentando ejercicios y descansos:
		let exercisesAndRests: any = [
			/**
			 * Primer descanso antes de comenzar
			 */
			{
				rest: true,
				rest_in_seconds: 5,
			},
		];

		dailyTraining.selected_exercises.forEach((exerciseData: any, index: number) => {
			let rest = {
				rest: true,
				rest_in_seconds: exerciseData.rest_in_seconds,
			};
			let exercise = { ...exerciseData, rest: false };
			exercisesAndRests.push(exercise);
			if (index !== dailyTraining.length - 1) exercisesAndRests.push(rest);
		});
		return resolve({
			training: dailyTraining,
			exercises: exercisesAndRests,
		});
	});

	return training;
}
