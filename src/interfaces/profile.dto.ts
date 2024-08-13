export interface ProfileDto {
    "id": string;
    "user_id": string;
    "first_name": string;
    "last_name": string;
    "email": string;
    "phone": string;
    "city": string | null;
    "initial_height": number | null;
    "initial_weight": number | null;
    "current_weight": number | null;
    "country": string;
    "address": string | null;
    "description": string | null;
    "profile_picture": string |  null;
    "type": string;
    "updated_on": string;
    "isActive": boolean;
}