export interface ProgressResponseDTO {
    id: string;
    client_id: number | string;
    goal_id: number | string;
    advace_pictures_uris_form: {
        [key: string]: string | undefined 
    } | null;
    delivery_status: string;
    description_advance?: string | null;
    professional_feedback?: string | null;
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
}