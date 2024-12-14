import {
	DietResponseDTO,
	DietStatus,
	NutritionistPlansServices,
} from "./diets";
import { CoachPlansServices, Training, TrainingStatus } from "./trainings";

export interface ClientEdited {
	id: number | string;
	edited_name: string;
	city: string;
	country: string;
	description: string | null;
	client_status: string;
	nutritionist_id: number | null;
	coach_id: number | null;
	initial_height: number;
	initial_weight: number;
	current_weight: number;
	goals: GoalResponseDTO[];
	diets: any[]; // Replace with the appropriate type
	training: any[]; // Replace with the appropriate type
	goalClients: {
		id: number;
		client_id: number;
		target: string;
		roles: string;
		deadline: string;
		created_on: string;
		updated_on: string | null;
		isActive: boolean;
	}[];
	customForm: {
		id: number;
		userId: number;
		profileId: number;
		formMap: {
			[key: string]: string;
		};
		type: string;
		created_on: string;
		updated_on: string | null;
		isActive: boolean;
	};
	isActive: boolean;
}

export interface GoalResponseDTO {
	id: number;
	client: ClientEdited;
	status: GoalStatus;
	descriptionGoal: string;
	percentage: string;
	progressGoalPercentage: number;
	goalType: TypeGoals;
	healthyFocusDescription: string;
	trainerPlans: CoachPlansServices;
	trainings: Training[];
	diets: DietResponseDTO[];
	nutritionistPlans: NutritionistPlansServices;
	dietStatus: DietStatus;
	trainingStatus: TrainingStatus;
	init_on: string;
	end_on: string;
	created_on: string;
	updated_on: string;
	isCompleted: boolean;
	amountOfDays: string;
	initial_weight: number;
	initial_height: number;
	current_weight: number;
	target_weight: number;
	initial_body_fat_percentage: number;
	current_body_fat_percentage: number;
	target_body_fat_percentage: number;
}

export enum GoalStatus {
	"CREATED" = "CREATED",
	"STARTED" = "STARTED",
	"IN_PROGRESS" = "IN PROGRESS",
	"COMPLETED" = "COMPLETED",
	"CANCELED" = "CANCELED",
	"MODIFIED" = "MODIFIED",
}

export enum TypeGoals {
	"LOSE_WEIGHT" = "LOSE WEIGHT",
	"INCREASE_MASS_MUSCLE" = "INCREASE MASS MUSCLE",
	"LOSE_WEIGHT_HEALTHY_HABITS" = "LOSE WEIGHT HEALTHY HABITS",
}

export interface GoalNewDTO {
	description_goal: string;
	percentage_body_fat: number;
	healthy_focus_description: string | null;
	type: TypeGoals | string | null;
	nutritionist_plans: NutritionistPlansServices | string | null;
	trainer_plans: CoachPlansServices | null | string;
	amount_of_days: number;
	initial_weight: number;
	initial_height: number;
	initial_body_fat_percentage: number;
	current_weight: number;
	target_weight: number;
	current_body_fat_percentage: number;
	target_body_fat_percentage: number;
}
