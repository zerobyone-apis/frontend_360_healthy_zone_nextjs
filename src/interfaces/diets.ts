import { GoalResponseDTO } from "./goals";
import { CoachPlansServices, TrainingStatus } from "./trainings";

export enum DietStatus {
	"CREATED" = "CREATED",
	"STARTED" = "STARTED",
	"IN_PROGRESS" = "IN PROGRESS",
	"COMPLETED" = "COMPLETED",
	"CANCELED" = "CANCELED",
	"MODIFIED" = "MODIFIED",
	"NOT_APPLY" = "NOT APPLY",
}

export enum NutritionistPlansServices {
	"HEALTH_WEIGHT" = "HEALTH WEIGHT",
	"HEALTHY_EAT" = "HEALTHY EAT",
	"HEALTHY_EAT_AND_LOSE_WEIGHT" = "HEALTHY EAT AND LOSE WEIGHT",
	"NOT_APPLY" = "NOT APPLY",
}

export enum TypeDiets {
	"LOSE_WEIGHT" = "LOSE WEIGHT 🏃",
	"INCREASE_MASS_MUSCLE" = "INCREASE MASS MUSCLE 💪",
	"LOSE_WEIGHT_HEALTHY_HABITS" = "LOSE WEIGHT HEALTHY HABITS 🥑",
}

export interface DietResponseDTO {
	diet_id: number;
	client_id: number;
	nutritionist: number;
	custom_form: number;
	goal: GoalResponseDTO;
	trainer_plans: CoachPlansServices;
	nutritionist_plans: NutritionistPlansServices;
	diet_status: DietStatus;
	training_status: TrainingStatus;
	type: TypeDiets;
	description_diet: string;
	balanced_meal_plan: string;
	portion_size_guide: string;
	healthy_shopping_list: string;
	healthy_recipes: string;
	tips_for_change_eating_habits: string;
	nutrition_information: string;
	hydratation: string;
	food_education: string;

	longTimeInMonths: number;
	duration: string;
	init_on: string;
	end_on: string;
	created_on: string;
	isCompleted: boolean;
	isActive: boolean;
}
