"use server";
import { TrainingResponseDto } from "@/interfaces/trainings";
import mockup, { exercises_from_api, mock_daily_train } from "./mockup";
import { cookies } from "next/headers";

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

export async function getTrainingsID(trainingID: number) {
	// funcion hardcoded
	let training: TrainingResponseDto | null = await new Promise(
		(resolve, _reject) => {
			setTimeout(() => {
				let trainingResponse: TrainingResponseDto | null =
					mockup.find(data => data.training_id === trainingID) || null;
				return resolve(trainingResponse);
			}, 2000);
		}
	);

	console.log(training);
	return training;
}

export async function getExerciseDay(daily_train_id: string) {
	console.log("DailyTrain ID", daily_train_id);

	// Funcion hardcoded...
	let training: any = await new Promise(async (resolve, _reject) => {
		let trainingResponse = await exercises_from_api();
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

		trainingResponse.forEach((exerciseData: any, index: number) => {
			let rest = {
				rest: true,
				rest_in_seconds: exerciseData.rest_in_seconds,
			};
			let exercise = { ...exerciseData, rest: false };
			exercisesAndRests.push(exercise);
			if (index !== trainingResponse.length - 1) exercisesAndRests.push(rest);
		});
		return resolve({
			training: trainingResponse,
			exercises: exercisesAndRests,
		});
	});

	console.log(training);
	return training;
}

//GENERAR MARK AS COMPLTE BY DAILY TRAIN
// /v1.0/daily_train/by/id/[id]/completed/true
