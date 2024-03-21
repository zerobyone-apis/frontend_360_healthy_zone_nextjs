export enum ROLES {
    "ADMIN",                // Full access
    "SUPERVISOR",     // Semi full access, got access to barbers, hairdresser, edit, remove, etc, reserves, modifications,etc.
    "CLIENT",               // User Consumer Only
    "NUTRITIONIST",   // Profiles Barber, and reserves
    "COACH",               // Profiles Hairdresser, and reserves
}

export interface UserBody {
    userId: string;
    email: string;
    username: string;
    roles: ROLES,
    isAdmin: boolean
};

export interface User {
    user: UserBody;
    client: object | null;
    nutrisionist: object | null;
    coach: object | null;
}

export enum COUNTRIES {
    "UY",
    "USA",
    "CO",
    "BR",
    "EQ",
    "ARG"
}

export interface ClientBody {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    city: string;
    country: COUNTRIES;
    description: string | null;
    profile_picture: string;
    address: string | null;
    subscription: string | null;
    nutritionist_id: number | null; //CONSULTAR TYPO
    coach_id: number | null;
    goals: any[];
    is_blocked: boolean;
    isActive: boolean;

}

// const userTest = {
// 	user: {
// 		userId: "1",
// 		email: "gaston.nicolas.morales.olivera@gmail.com",
// 		username: "Gaston.Morales",
// 		roles: "CLIENT",
// 		isAdmin: false,
// 	},
// 	client: {
// 		id: 1,
// 		first_name: "Gaston",
// 		last_name: "Morales",
// 		phone: "5986393429239",
// 		email: "gaston.nicolas.morales.olivera@gmail.com",
// 		city: "",
// 		country: "UY",
// 		description: null,
// 		profile_picture: "",
// 		address: null,
// 		subscription: null,
// 		nutritionist_id: null,
// 		coach_id: null,
// 		goals: [],
// 		is_blocked: false,
// 		isActive: true,
// 	},
// 	nutritionist: null,
// 	coach: null,
// };