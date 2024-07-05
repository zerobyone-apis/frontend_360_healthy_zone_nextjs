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



export async function getTrainingsID(trainingID: number) {
	//TODO
//delete this const and use the function from the server
const daily_training_days = [
    {
      "number_training_day": 1,
      "total_training_days": 2,
      "selected_exercises": [
    {
        "name": "3/4 sit-up",
        "type": "ABS",
        "description": "Lie flat on your back with your knees bent and feet flat on the ground.\nPlace your hands behind your head with your elbows pointing outwards.\nEngaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.\nPause for a moment at the top, then slowly lower your upper body back down to the starting position.\nRepeat for the desired number of repetitions.",
        "series": "",
        "repetitions": "",
        "duration_in_seconds": 20,
        "rest_in_seconds": 30,
        "difficulty": 1,
        "url_image": "https://storage.googleapis.com/avance-clientes/exercises-imgs/ec3bb682-8f8a-4671-a22f-85ed9d1847d0.gif",
        "is_completed": false
    },
    {
        "name": "45° side bend",
        "type": "ABS",
        "description": "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.\nKeeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.\nPause for a moment at the bottom, then slowly return to the starting position.\nRepeat on the other side.\nContinue alternating sides for the desired number of repetitions.",
        "series": "",
        "repetitions": "",
        "duration_in_seconds": 25,
        "rest_in_seconds": 30,
        "difficulty": 1,
        "url_image": "https://storage.googleapis.com/avance-clientes/exercises-imgs/da3a4cc8-1baf-42ba-bdd7-2028db1ffecc.gif",
        "is_completed": false
    },
    {
        "name": "air bike",
        "type": "ABS",
        "description": "Lie flat on your back with your hands placed behind your head.\nLift your legs off the ground and bend your knees at a 90-degree angle.\nBring your right elbow towards your left knee while simultaneously straightening your right leg.\nReturn to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.\nContinue alternating sides in a pedaling motion for the desired number of repetitions.",
        "series": 3,
        "repetitions": 5,
        "duration_in_seconds": "",
        "rest_in_seconds": 30,
        "difficulty": 1,
        "url_image": "https://storage.googleapis.com/avance-clientes/exercises-imgs/04eecbad-f8aa-4cb4-b74b-13e0e07913b5.gif",
        "is_completed": false
    }
]
    },
    {
      "number_training_day": 2,
      "total_training_days": 2,
      "selected_exercises": [
    {
        "name": "3/4 sit-up",
        "type": "ABS",
        "description": "Lie flat on your back with your knees bent and feet flat on the ground.\nPlace your hands behind your head with your elbows pointing outwards.\nEngaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.\nPause for a moment at the top, then slowly lower your upper body back down to the starting position.\nRepeat for the desired number of repetitions.",
        "series": "",
        "repetitions": "",
        "duration_in_seconds": 20,
        "rest_in_seconds": 30,
        "difficulty": 1,
        "url_image": "https://storage.googleapis.com//avance-clientes/exercises-imgs/ec3bb682-8f8a-4671-a22f-85ed9d1847d0.gif",
        "is_completed": false
    },
    {
        "name": "45° side bend",
        "type": "ABS",
        "description": "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.\nKeeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.\nPause for a moment at the bottom, then slowly return to the starting position.\nRepeat on the other side.\nContinue alternating sides for the desired number of repetitions.",
        "series": "",
        "repetitions": "",
        "duration_in_seconds": 25,
        "rest_in_seconds": 30,
        "difficulty": 1,
        "url_image": "https://storage.googleapis.com//avance-clientes/exercises-imgs/da3a4cc8-1baf-42ba-bdd7-2028db1ffecc.gif",
        "is_completed": false
    },
    {
        "name": "air bike",
        "type": "ABS",
        "description": "Lie flat on your back with your hands placed behind your head.\nLift your legs off the ground and bend your knees at a 90-degree angle.\nBring your right elbow towards your left knee while simultaneously straightening your right leg.\nReturn to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.\nContinue alternating sides in a pedaling motion for the desired number of repetitions.",
        "series": 3,
        "repetitions": 5,
        "duration_in_seconds": "",
        "rest_in_seconds": 30,
        "difficulty": 1,
        "url_image": "https://storage.googleapis.com//avance-clientes/exercises-imgs/04eecbad-f8aa-4cb4-b74b-13e0e07913b5.gif",
        "is_completed": false
    }
]
    }
  ]

	// funcion hardcoded
	
	try{
		let trainings = await getAllTrainings();
		let training = trainings.find((training: any) => training.training_id == trainingID);

		// training.daily_training_days = daily_training_days;
		console.log(training)
		return training;
	}catch(error){
		console.log(error);
		return null;
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

//GENERAR MARK AS COMPLTE BY DAILY TRAIN
// /v1.0/daily_train/by/id/[id]/completed/true
