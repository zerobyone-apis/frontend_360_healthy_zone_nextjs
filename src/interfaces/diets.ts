export enum TypeGoals {
	"LOSE_WEIGHT" = "LOSE WEIGHT",
	"INCREASE_MASS_MUSCLE" = "INCREASE MASS MUSCLE",
	"LOSE_WEIGHT_HEALTHY_HABITS" = "LOSE WEIGHT HEALTHY HABITS",
}

export enum CoachPlansServices {
	"MUSCLE" = "MUSCLE",
	"RITMIA" = "RITMIA",
	"HIPERTROFIA" = "HIPERTROFIA",
	"NOT_APPLY" = "NOT APPLY",
}

export enum GoalStatus {
	"CREATED" = "CREATED",
	"STARTED" = "STARTED",
	"IN_PROGRESS" = "IN PROGRESS",
	"COMPLETED" = "COMPLETED",
	"CANCELED" = "CANCELED",
	"MODIFIED" = "MODIFIED",
}

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

export enum TrainingStatus {
	CREATED,
	RESERVED,
	PAUSED,
	IN_PROGRESS,
	COMPLETED,
	CANCELED,
	NOT_APPLY,
}

export enum TypeDiets {
	"LOSE_WEIGHT" = "LOSE WEIGHT 🏃",
	"INCREASE_MASS_MUSCLE" = "INCREASE MASS MUSCLE 💪",
	"LOSE_WEIGHT_HEALTHY_HABITS" = "LOSE WEIGHT HEALTHY HABITS 🥑",
}

export interface GoalResponseDTO {
	id: number;
	client_id: number;
	status: GoalStatus;
	/** Descripcion del objetivo consiso, ej:
	 *      Reducir un 8% del peso corporal en los próximos seis meses de manera sostenible y saludable.
	 * */
	descriptionGoal: string;
	/** Tiempo dispuesto para completar el objetivo ej: 6 */
	timeLapse: string;
	/** Unidad de tiempo dispuesto para completar el objetivo ej: meses*/
	timeUnit: string;
	/** Porcentaje de perdida o ganancia de peso o musculo que se desea para esta meta EJ: 8% perdida de peso.*/
	percentage: string;
	/** Para entender el tipo de objetivo planteado ej:
	 *      - Perdida de Peso
	 *      - Alimentacion Saludable
	 *      - Aumento de masa muscular
	 *      - etc..
	 * */
	goalType: TypeGoals;
	/** Descripcion del profesional sobre la recomendación que le otorgo al usuario*/
	healthyFocusDescription: string;

	/** Si tiene un plan marcado por la/el coach, cual plan es*/
	trainerPlans: CoachPlansServices;
	/** Si tiene un plan marcado por la/el nutricionista, cual plan es*/
	nutritionistPlans: NutritionistPlansServices;

	/** Estado de la Dieta enviada por la/el nutriscionista*/
	dietStatus: DietStatus;

	/** Estado del Entrenamiento enviada por la/el Coach*/
	trainingStatus: TrainingStatus;

	/** Cuando se inicia el objetivo */
	init_on: string;
	/** Cuando finaliza el objetivo*/
	end_on: string;

	created_on: string;
	updated_on: string;
	isCompleted: boolean;
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
