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
	description?: string;
	sets?: number | null;
	seconds?: number | null;
	reps?: number | null;
	ready: boolean;
}
