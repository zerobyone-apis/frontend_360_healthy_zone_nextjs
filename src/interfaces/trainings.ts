import { GoalResponseDTO } from "./goals";

export interface TrainingResponseDto {
	training_id: number; //Este ultimo no esta confirmado, lo inventé suponiendo que existe
	client_id: number;
	goal: GoalResponseDTO;
	coach_id: number;
	customForm_id: number;
	coach_plans: CoachPlansServices;
	training_status: TrainingStatus;
	type: TrainingTypes;
	description_training: string;
	exercise: string;
	exercise_description: string;
	series: string;
	repetitions: string;
	amount_of_days: string;
	frequency: string;
	init_on: string;
	end_on: string;
	created_on: string;
	updated_on: string;
	isCompleted: boolean;
	isActive: boolean;
}

export enum TrainingStatus {
	CREATED = "CREATED",
	RESERVED = "RESERVED",
	PAUSED = "PAUSED",
	IN_PROGRESS = "IN PROGRESS",
	COMPLETED = "COMPLETED",
	CANCELED = "CANCELED",
	NOT_APPLY = "NOT APPLY",
}

export enum CoachPlansServices {
	"MUSCLE" = "MUSCLE",
	"RITMIA" = "RITMIA",
	"HIPERTROFIA" = "HIPERTROFIA",
	"NOT_APPLY" = "NOT APPLY",
}

export enum TrainingTypes {
	LOSE_WEIGHT = "LOSE WEIGHT",
	INCREASE_MASS_MUSCLE = "INCREASE MASS MUSCLE",
	LOSE_WEIGHT_HEALTHY_HABITS = "LOSE WEIGHT HEALTHY HABITS",
}

// personalizados>

export type DayExercises = {
	number_of_day: number;
	status: DayExercisesStatus;
};

export enum DayExercisesStatus {
	"READY" = "READY",
	"OMMITED" = "OMMITED",
	"IN_PROGRESS" = "IN PROGRESS",
	"PENDING" = "PENDING",
}

export interface ExerciseDTO {
	name: string;
	type: string;
	description?: string;
	series?: number | null;
	duration_in_seconds?: number | null;
	repetitions?: number | null;
	rest_in_seconds: number;
	difficulty: number;
	ready: boolean;
	url_image?: string;
	is_completed: boolean;
}

export interface Training {
	coach_id: number;
	goal_id: number;
	type: string;
	training_status: string;
	coach_plans: string;
	description_training: string;
	frequency: string;
	init_on: string;
	amount_of_days: number;
	daily_training_days: DailyTrainingDay[];
}

export interface DailyTrainingDay {
	number_training_day: number;
	selected_exercises: SelectedExercise[];
	total_training_days: number;
}

export interface SelectedExercise {
	name: string;
	type: string;
	description: string;
	series: number;
	repetitions: number;
	duration_in_seconds: number;
	rest_in_seconds: number;
	difficulty: number;
	url_image: string;
	is_completed: boolean;
	created_on?: string | null;
	updated_on?: string | null;
}
