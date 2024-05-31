import { DietStatus, NutritionistPlansServices } from "@/interfaces/diets";
import { GoalStatus, TypeGoals } from "@/interfaces/goals";
import {
	CoachPlansServices,
	TrainingStatus,
	TrainingTypes,
} from "@/interfaces/trainings";
import { randomIntFromInterval } from "@/utils/randomGnr";
import { randomUUID } from "crypto";

export default [
	{
		training_id: 1,
		client_id: 123,
		goal: {
			id: 456,
			client_id: 123,
			status: GoalStatus.IN_PROGRESS,
			descriptionGoal: "Reduce body fat by 10% in 3 months",
			timeLapse: "3",
			timeUnit: "months",
			percentage: "10%",
			goalType: TypeGoals.INCREASE_MASS_MUSCLE,
			healthyFocusDescription:
				"Focus on high-intensity interval training and clean eating",
			trainerPlans: CoachPlansServices.MUSCLE,
			nutritionistPlans: NutritionistPlansServices.HEALTHY_EAT,
			dietStatus: DietStatus.IN_PROGRESS,
			trainingStatus: TrainingStatus.IN_PROGRESS,
			init_on: "2024-03-01",
			end_on: "2024-05-31",
			created_on: "2024-02-15",
			updated_on: "2024-03-20",
			isCompleted: false,
		},
		coach_id: 789,
		customForm_id: 101,
		coach_plans: CoachPlansServices.MUSCLE,
		training_status: TrainingStatus.IN_PROGRESS,
		type: TrainingTypes.LOSE_WEIGHT,
		description_training:
			"High-intensity interval training with focus on cardio and strength",
		exercise: "Burpees, Squats, Deadlifts",
		exercise_description: "Perform 3 sets of 10 reps for each exercise",
		series: "3",
		repetitions: "10",
		amount_of_days: "5",
		frequency: "Daily",
		init_on: "2024-03-01",
		end_on: "2024-03-31",
		created_on: "2024-02-20",
		updated_on: "2024-03-25",
		isCompleted: false,
		isActive: true,
	},
	{
		training_id: 2,
		client_id: 456,
		goal: {
			id: 456,
			client_id: 123,
			status: GoalStatus.IN_PROGRESS,
			descriptionGoal: "Reduce body fat by 10% in 3 months",
			timeLapse: "3",
			timeUnit: "months",
			percentage: "10%",
			goalType: TypeGoals.INCREASE_MASS_MUSCLE,
			healthyFocusDescription:
				"Focus on high-intensity interval training and clean eating",
			trainerPlans: CoachPlansServices.MUSCLE,
			nutritionistPlans: NutritionistPlansServices.HEALTHY_EAT,
			dietStatus: DietStatus.IN_PROGRESS,
			trainingStatus: TrainingStatus.IN_PROGRESS,
			init_on: "2024-03-01",
			end_on: "2024-05-31",
			created_on: "2024-02-15",
			updated_on: "2024-03-20",
			isCompleted: false,
		},
		coach_id: 789,
		customForm_id: 102,
		coach_plans: CoachPlansServices.RITMIA,
		training_status: TrainingStatus.COMPLETED,
		type: TrainingTypes.INCREASE_MASS_MUSCLE,
		description_training:
			"Strength training with emphasis on compound exercises",
		exercise: "Squats, Bench Press, Deadlifts",
		exercise_description: "Perform 4 sets of 8 reps for each exercise",
		series: "4",
		repetitions: "8",
		amount_of_days: "4",
		frequency: "Every other day",
		init_on: "2024-02-01",
		end_on: "2024-03-31",
		created_on: "2024-01-20",
		updated_on: "2024-04-05",
		isCompleted: true,
		isActive: false,
	},
];

export const exercises_from_api = async () => {
	const url =
		"https://exercisedb.p.rapidapi.com/exercises/equipment/body weight?limit=10";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ad496e97f5msh7c152be18c636d3p1e6d66jsncc13664c364a",
			"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, {
			...options,
			cache: "no-store",
			next: { revalidate: 10 },
		});
		const result = await response.json();
		console.log(result);
		let data = result.map((exercise: any, index: number) => {
			return {
				id: randomUUID(),
				name: exercise.name,
				type: exercise.bodyPart.toUpperCase(),
				description: exercise.instructions.join("\n"),
				gifUrl: exercise.gifUrl,
				is_completed: false,
				difficulty: Math.floor(Math.random() * 5),
				rest_in_seconds: randomIntFromInterval(15, 30),
				series: index % 2 === 0 ? randomIntFromInterval(15, 30) : null,
				repetitions: index % 2 === 0 ? randomIntFromInterval(3, 5) : null,
				duration_in_seconds:
					index % 2 !== 0 ? randomIntFromInterval(15, 40) : null,
			};
		});
		return data;
	} catch (error) {
		console.error(error);
		return new Error("Problem fetching the api");
	}
};

export const mock_daily_train: any = [
	{
		id: "3c08a661-ec06-4a5d-9f13-de23584d578e",
		name: "Arm slingers hanging bent knee legs",
		type: "WAIST",
		description:
			"Hang from a pull-up bar with your arms fully extended and your knees bent at a 90-degree angle. \n Engage your core and lift your knees towards your chest, bringing them as close to your elbows as possible.\n Slowly lower your legs back down to the starting position.\nRepeat for the desired number of repetitions.",
		gifUrl: "https://v2.exercisedb.io/image/MY4WKv83Y7nke",
		is_completed: false,
		difficulty: 1,
		rest_in_seconds: 30,
		series: 15,
		repetitions: 3,
		duration_in_seconds: null,
	},
];

export const trainings: any = [
	{
		name: "Russian Twist",
		description:
			"Exercise description here lorem skaaskdaskdas,  masd,,sm d,mm,,m,m asdasm,dam,s.d asdjaskdasldjk \n asjkdljasdlkasjkalsdjasdlsajdlkasjdklasjklasjdkljaskjdlas \n akjsdasjdhaskhdakshdajshdjkashdashjdhasjkhdaskjhdkjasdjkashdjkashdjkash \n akjsdasjdhaskhdakshdajshdjkashdashjdhasjkhdaskjhdkjasdjkashdjkashdjkash \n akjsdasjdhaskhdakshdajshdjkashdashjdhasjkhdaskjhdkjasdjkashdjkashdjkash \n akjsdasjdhaskhdakshdajshdjkashdashjdhasjkhdaskjhdkjasdjkashdjkashdjkash ",
		sets: 20,
		reps: 3,
		ready: false,
	},
	{
		name: "Russian Twist",
		description: "Exercise description here....",
		sets: 20,
		reps: 3,
		ready: false,
	},
];
