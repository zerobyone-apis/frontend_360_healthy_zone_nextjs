import { ClientEdited } from "./goals";
import { TrainingResponseDto } from "./trainings";

export interface CoachDto {
    "id": number | string;
    "username": string;
    "first_name": string;
    "last_name": string;
    "phone": string;
    "email": string;
    "limit_clients": number;
    "remaining_clients": number;
    "city": string;
    "country": string;
    "description": string;
    "image_profile_url": string;
    "clients": ClientEdited[];
    "trainings": TrainingResponseDto[];
    "is_blocked": boolean;
    "isActive": boolean;
}