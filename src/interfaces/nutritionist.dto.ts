/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientEdited } from "./goals";

export interface NutritionistDto {
        "id": number | string;
        "username": string;
        "first_name": string;
        "last_name": string;
        "phone": string;
        "email": string;
        "limit_clients": number;
        "active_clients_remaining": number;
        "city": string;
        "country": string;
        "description": string;
        "image_profile_url": string;
        "clients": ClientEdited[];
        "diets": any[];
        "is_blocked": boolean;
        "isActive": boolean;
    
}