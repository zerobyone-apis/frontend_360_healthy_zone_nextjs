export interface ProgressResponseDTO {
	id: string;
	client_id: number | string;
	goal_id: number | string;
	advace_pictures_uris_form: {
		[key: string]: string | undefined;
	} | null;
	delivery_status: string;
	description_advance?: string | null;
	initial_height: number;
	initial_weight: number;
	initial_body_fat_percentage: number;
	current_weight: number;
	target_weight: number;
	current_body_fat_percentage: number;
	target_body_fat_percentage: number;
	created_on: string;
	updated_on: string | null;
	is_valid: boolean;
	is_blocked: boolean;
	is_feedback_approved: boolean;
	professionalComment: string | null;
	professional_comment_date: null | string;
	professional_id: string | number;
	satisfaction_level: SelectedType;
	selected_type: string;
	diet_id: number | string | null;
	training_id: number | string | null;
}

enum SelectedType {
	"EXELENTE" = "EXELENTE",
	"BIEN" = "BIEN",
	"MAS_O_MENOS" = "MAS_O_MENOS",
	"MAL" = "MAL",
	"MUY_MAL" = "MUY_MAL",
}
